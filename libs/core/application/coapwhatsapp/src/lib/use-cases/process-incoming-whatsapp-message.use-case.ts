// RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/process-incoming-whatsapp-message.use-case.ts
import {
  ICommandHandler,
  ICommandMetadata,
  CommandBase /* <<< IMPORTADO */,
} from '@dfs-suite/cdskcommandsqueries';
import {
  IDomainEventEmitter,
  DOMAIN_EVENT_EMITTER_PORT,
} from '@dfs-suite/cdskevents';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import {
  ITrackLeadInteractionUseCase,
  TRACK_LEAD_INTERACTION_USE_CASE,
  TrackLeadInteractionCommandPayload,
  TrackLeadInteractionCommand,
} from '@dfs-suite/coapleadsflow';
import {
  IQualifyLeadUseCase,
  QUALIFY_LEAD_USE_CASE,
  QualifyLeadCommand,
  QualifyLeadCommandPayload, // Importar payload
} from '@dfs-suite/coapleadsflow';
import {
  TReceivedMessage,
  EWhatsAppMessageType,
} from '@dfs-suite/codowhatsapp';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import {
  TenantId,
  CorrelationId,
  UserId,
  LeadId,
  WabaId,
  WhatsAppAccountId,
  IsoDateString /* <<< IMPORTADO */,
} from '@dfs-suite/shtypes';

export interface ProcessIncomingWhatsAppMessageCommandPayload {
  tenantId: TenantId;
  correlationId: CorrelationId;
  receivedMessage: TReceivedMessage;
  wabaId: WabaId; // WABA que recibió
  tenantPhoneNumberId: WhatsAppAccountId; // Número del tenant que recibió
}
// Usa CommandBase
export class ProcessIncomingWhatsAppMessageCommand extends CommandBase<ProcessIncomingWhatsAppMessageCommandPayload> {
  constructor(
    payload: ProcessIncomingWhatsAppMessageCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}

export const PROCESS_INCOMING_WHATSAPP_MESSAGE_USE_CASE = Symbol(
  'IProcessIncomingWhatsAppMessageUseCase'
);
export type IProcessIncomingWhatsAppMessageUseCase = ICommandHandler<
  ProcessIncomingWhatsAppMessageCommand,
  void
>;

export class ProcessIncomingWhatsAppMessageUseCaseImpl
  implements IProcessIncomingWhatsAppMessageUseCase
{
  constructor(
    private readonly logger: ILoggerPort,
    private readonly trackInteractionUc: ITrackLeadInteractionUseCase,
    private readonly qualifyLeadUc: IQualifyLeadUseCase,
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: ProcessIncomingWhatsAppMessageCommand
  ): Promise<Result<void, ExceptionBase>> {
    const {
      tenantId,
      correlationId,
      receivedMessage,
      wabaId,
      tenantPhoneNumberId,
    } = command.payload;
    const useCaseName = ProcessIncomingWhatsAppMessageUseCaseImpl.name;

    this.logger.log(
      `Processing incoming WhatsApp message ${
        receivedMessage.id
      } for tenant ${String(tenantId)}`,
      useCaseName,
      correlationId
    );

    try {
      const interactionPayload: TrackLeadInteractionCommandPayload = {
        tenantId,
        wabaId,
        tenantPhoneNumberId,
        correlationId,
        interactionSource: 'WHATSAPP_INBOUND',
        contactWaId: receivedMessage.from,
        messageWaId: receivedMessage.id,
        timestamp: new Date(
          parseInt(receivedMessage.timestamp, 10) * 1000
        ).toISOString() as IsoDateString,
        messageType: receivedMessage.type as EWhatsAppMessageType,
        content:
          receivedMessage.text?.body || `[${receivedMessage.type} message]`,
      };
      const trackInteractionCmd = new TrackLeadInteractionCommand(
        interactionPayload,
        command.metadata
      );
      const trackResult = await this.trackInteractionUc.execute(
        trackInteractionCmd
      );

      if (isErr(trackResult)) {
        this.logger.error(
          `Failed to track interaction for WA message ${receivedMessage.id}: ${trackResult.error.message}`,
          useCaseName,
          correlationId
        );
        return err(trackResult.error);
      }

      const { leadId } = trackResult.value; // Asumiendo que devuelve leadId
      this.logger.log(
        `Interaction tracked. Lead ID: ${String(
          leadId
        )}, MessageLog ID: ${String(trackResult.value.messageLogId)}`,
        useCaseName,
        correlationId
      );

      if (leadId && receivedMessage.text?.body) {
        const qualifyPayload: QualifyLeadCommandPayload = {
          // Usar el tipo de payload
          leadId,
          interactionText: receivedMessage.text.body,
          tenantId, // Necesario para QualifyLeadUseCase
          // correlationId: correlationId // Ya está en metadata
        };
        const qualifyCmd = new QualifyLeadCommand(qualifyPayload, {
          ...command.metadata,
          causationId: command.commandId,
        });
        const qualifyResult = await this.qualifyLeadUc.execute(qualifyCmd);
        if (isErr(qualifyResult)) {
          this.logger.warn(
            `Lead qualification failed for lead ${String(
              leadId
            )} after WA message: ${qualifyResult.error.message}`,
            useCaseName,
            correlationId
          );
        } else {
          this.logger.log(
            `Lead ${String(leadId)} re-qualified. New score: ${
              qualifyResult.value.newScore
            }, Status: ${qualifyResult.value.newStatus}`,
            useCaseName,
            correlationId
          );
        }
      }
      return ok(undefined);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error processing incoming WhatsApp message.',
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
// RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/process-incoming-whatsapp-message.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadidas importaciones para WabaId, WhatsAppAccountId, IsoDateString, CommandBase, y QualifyLeadCommandPayload.", "justificacion": "Resuelve los errores no-undef.", "impacto": "Correctitud." },
{ "mejora": "ProcessIncomingWhatsAppMessageCommand ahora extiende CommandBase.", "justificacion": "Consistencia.", "impacto": "Uso de metadata." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] 
{ "mejora": "Esqueleto de ProcessIncomingWhatsAppMessageUseCaseImpl.", "justificacion": "Orquesta el procesamiento de un mensaje WA entrante, incluyendo tracking de interacción y recalificación del lead.", "impacto": "Funcionalidad clave para el pipeline de webhooks." },
{ "mejora": "Definición de ProcessIncomingWhatsAppMessageCommand y su payload.", "justificacion": "Comando específico para este caso de uso.", "impacto": "Claridad." },
{ "mejora": "Interacción con ITrackLeadInteractionUseCase y IQualifyLeadUseCase de coapleadsflow.", "justificacion": "Desacoplamiento y reutilización de la lógica de leads.", "impacto": "Arquitectura limpia."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "El payload TrackLeadInteractionCommandPayload necesita wabaId y tenantPhoneNumberId; deben ser pasados desde el ProcessIncomingWhatsAppMessageCommandPayload."},
{"nota": "La extracción de content del receivedMessage debe ser más robusta para manejar todos los tipos de mensajes (media, location, etc.)."},
{"nota": "La integración con Aiper es un paso futuro."}
]
*/
