// RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/process-whatsapp-message-status.use-case.ts
import {
  CommandBase /* <<< IMPORTADO */,
  ICommandHandler,
  ICommandMetadata,
} from '@dfs-suite/cdskcommandsqueries';
import { IDomainEventEmitter } from '@dfs-suite/cdskevents';
import { ILoggerPort } from '@dfs-suite/cdskports';
import { IAccountHealthManagerServicePortAppLayer } from '@dfs-suite/coapantiban';
import {
  IRecordBilledUsageUseCase,
  RecordBilledUsageCommand,
  RecordBilledUsageCommandPayload,
} from '@dfs-suite/coapbilling';
import {
  IUpdateMessageLogStatusUseCase,
  UpdateMessageLogStatusCommand,
  UpdateMessageLogStatusCommandPayload,
} from '@dfs-suite/coapmessagelog';
import { TWebhookMessageStatus } from '@dfs-suite/codowhatsapp';
import {
  ExceptionBase,
  InternalServerErrorException,
  NotFoundException,
} from '@dfs-suite/sherrors';
import { Result, err, isErr, ok } from '@dfs-suite/shresult';
import {
  CorrelationId,
  IsoDateString,
  TenantId,
  WabaId /* <<< IMPORTADO */,
} from '@dfs-suite/shtypes';

export interface ProcessWhatsAppMessageStatusCommandPayload {
  tenantId: TenantId;
  wabaId: WabaId; // Añadido
  correlationId: CorrelationId;
  statusUpdate: TWebhookMessageStatus;
}
// Usa CommandBase
export class ProcessWhatsAppMessageStatusCommand extends CommandBase<ProcessWhatsAppMessageStatusCommandPayload> {
  constructor(
    payload: ProcessWhatsAppMessageStatusCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}

export const PROCESS_WHATSAPP_MESSAGE_STATUS_USE_CASE = Symbol(
  'IProcessWhatsAppMessageStatusUseCase'
);
export type IProcessWhatsAppMessageStatusUseCase = ICommandHandler<
  ProcessWhatsAppMessageStatusCommand,
  void
>;

export class ProcessWhatsAppMessageStatusUseCaseImpl
  implements IProcessWhatsAppMessageStatusUseCase
{
  constructor(
    private readonly logger: ILoggerPort,
    private readonly updateMessageLogUc: IUpdateMessageLogStatusUseCase,
    private readonly recordBillingUc: IRecordBilledUsageUseCase,
    private readonly healthManager: IAccountHealthManagerServicePortAppLayer,
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: ProcessWhatsAppMessageStatusCommand
  ): Promise<Result<void, ExceptionBase>> {
    const { tenantId, correlationId, statusUpdate, wabaId } = command.payload;
    const useCaseName = ProcessWhatsAppMessageStatusUseCaseImpl.name;

    this.logger.log(
      `Processing WA message status update ${statusUpdate.id} (${
        statusUpdate.status
      }) for tenant ${String(tenantId)}`,
      useCaseName,
      correlationId
    );

    try {
      const updateLogPayload: UpdateMessageLogStatusCommandPayload = {
        tenantId,
        correlationId,
        waMessageId: statusUpdate.id,
        // messageLogId:  // Se buscará por waMessageId en el UC de UpdateMessageLogStatus
        newWhatsappStatus: statusUpdate.status,
        timestamp: new Date(
          parseInt(statusUpdate.timestamp, 10) * 1000
        ).toISOString() as IsoDateString,
        errorMessage: statusUpdate.errors?.[0]?.message,
        errorCode: statusUpdate.errors?.[0]?.code
          ? String(statusUpdate.errors[0].code)
          : undefined,
        pricingCategory: statusUpdate.pricing?.category,
        pricingModel: statusUpdate.pricing?.pricing_model,
        conversationId: statusUpdate.conversation?.id,
        // Se necesita el phoneNumberId del tenant que envió el mensaje
        // Esto debería estar en el MessageLogEntity o ser inferible.
      };
      const updateLogCmd = new UpdateMessageLogStatusCommand(
        updateLogPayload,
        command.metadata
      );
      const updateLogResult = await this.updateMessageLogUc.execute(
        updateLogCmd
      );

      if (isErr(updateLogResult)) {
        if (updateLogResult.error instanceof NotFoundException) {
          this.logger.warn(
            `MessageLog not found for WA message ${statusUpdate.id}, cannot update status.`,
            useCaseName,
            correlationId
          );
          return ok(undefined);
        }
        return err(updateLogResult.error);
      }
      this.logger.log(
        `Message log updated for WA message ${statusUpdate.id}`,
        useCaseName,
        correlationId
      );

      if (statusUpdate.pricing?.billable) {
        const billingPayload: RecordBilledUsageCommandPayload = {
          tenantId,
          wabaId, // Necesario para el contexto de billing
          correlationId,
          messageWaId: statusUpdate.id,
          conversationId: statusUpdate.conversation?.id,
          pricingModel: statusUpdate.pricing.pricing_model,
          category: statusUpdate.pricing.category,
          billedAt: new Date(
            parseInt(statusUpdate.timestamp, 10) * 1000
          ).toISOString() as IsoDateString,
          // El costo exacto se podría calcular en el UC de billing o venir de otra fuente
        };
        const recordBillingCmd = new RecordBilledUsageCommand(
          billingPayload,
          command.metadata
        );
        const billingResult = await this.recordBillingUc.execute(
          recordBillingCmd
        );
        if (isErr(billingResult)) {
          this.logger.error(
            `Failed to record billed usage for WA message ${statusUpdate.id}: ${billingResult.error.message}`,
            useCaseName,
            correlationId
          );
        } else {
          this.logger.log(
            `Billed usage recorded for WA message ${statusUpdate.id}`,
            useCaseName,
            correlationId
          );
        }
      }

      // TODO: Notificar a AccountHealthManagerService. Se necesita el tenantPhoneNumberId.
      // Asumimos que el MessageLogEntity (actualizado por updateMessageLogUc) contiene el tenantPhoneNumberId.
      // const updatedLog = await this.getMessageLogDetailsUc.execute( ... con waMessageId ... );
      // if (isOk(updatedLog) && updatedLog.value.tenantPhoneNumberId) {
      //    await this.healthManager.processMessageStatusEvent(tenantId, updatedLog.value.tenantPhoneNumberId, statusUpdate, correlationId);
      // }

      return ok(undefined);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error processing WhatsApp message status.',
              error as Error,
              undefined,
              correlationId
            );
      this.logger.error(
        `Error in ${useCaseName}: ${errBase.message}`,
        errBase.stack,
        useCaseName,
        correlationId
      );
      return err(errBase);
    }
  }
}
/* RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/process-whatsapp-message-status.use-case.ts/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Esqueleto de ProcessWhatsAppMessageStatusUseCaseImpl.", "justificacion": "Orquesta la actualización del log de mensajes, registro de facturación (si aplica) y notificación al sistema Anti-Ban basado en un webhook de estado de mensaje.", "impacto": "Funcionalidad clave para el pipeline de webhooks y la sincronización de estado." },
{ "mejora": "Definición de ProcessWhatsAppMessageStatusCommand.", "justificacion": "Comando específico.", "impacto": "Claridad." },
{ "mejora": "Interacción con UCs de coapmessagelog y coapbilling, y servicio de coapantiban.", "justificacion": "Desacoplamiento y reutilización.", "impacto": "Arquitectura limpia."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "El UPDATE_MESSAGE_LOG_STATUS_USE_CASE y RECORD_BILLED_USAGE_USE_CASE y sus tokens deben ser definidos en sus respectivas librerías (coapmessagelog, coapbilling)."},
{"nota": "La obtención del tenantPhoneNumberId para notificar al AccountHealthManagerService es un punto a refinar. El MessageLogEntity (recuperado y actualizado por UpdateMessageLogStatusUseCase) debería contener este ID. UpdateMessageLogStatusUseCase podría devolver el MessageLogEntity actualizado o su ID, que luego se usaría para obtener los detalles completos si es necesario."},
{"nota": "El costo exacto de un mensaje PMP puede venir en un webhook posterior o necesitar ser consultado vía API de analíticas. El RecordBilledUsageUseCase podría solo marcar el mensaje como facturable inicialmente."}
]
*/
