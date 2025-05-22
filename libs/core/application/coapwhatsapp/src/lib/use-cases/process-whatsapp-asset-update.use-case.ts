// RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/process-whatsapp-asset-update.use-case.ts
import {
  CommandBase /* <<< IMPORTADO */,
  ICommandHandler,
  ICommandMetadata,
} from '@dfs-suite/cdskcommandsqueries';
import { IDomainEventEmitter } from '@dfs-suite/cdskevents';
import { ILoggerPort } from '@dfs-suite/cdskports';
import { IAccountHealthManagerServicePortAppLayer } from '@dfs-suite/coapantiban';
import {
  EWhatsAppWebhookField,
  TWebhookChange, // <<< IMPORTADO
  TWebhookValueAccountUpdate, // <<< IMPORTADO
  TWebhookValuePhoneNumberName, // <<< IMPORTADO
  TWebhookValuePhoneNumberQuality,
  TWebhookValueTemplateStatus, // <<< IMPORTADO
} from '@dfs-suite/codowhatsapp';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, err, ok } from '@dfs-suite/shresult';
import { CorrelationId, TenantId, WabaId } from '@dfs-suite/shtypes';

import { IManageWhatsAppTemplateUseCase } from './manage-whatsapp-template.use-case';

export interface ProcessWhatsAppAssetUpdateCommandPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  correlationId: CorrelationId;
  webhookChange: TWebhookChange;
}
// Usa CommandBase
export class ProcessWhatsAppAssetUpdateCommand extends CommandBase<ProcessWhatsAppAssetUpdateCommandPayload> {
  constructor(
    payload: ProcessWhatsAppAssetUpdateCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}

export const PROCESS_WHATSAPP_ASSET_UPDATE_USE_CASE = Symbol(
  'IProcessWhatsAppAssetUpdateUseCase'
);
export type IProcessWhatsAppAssetUpdateUseCase = ICommandHandler<
  ProcessWhatsAppAssetUpdateCommand,
  void
>;

export class ProcessWhatsAppAssetUpdateUseCaseImpl
  implements IProcessWhatsAppAssetUpdateUseCase
{
  constructor(
    private readonly logger: ILoggerPort,
    private readonly healthManager: IAccountHealthManagerServicePortAppLayer,
    private readonly templateManager: IManageWhatsAppTemplateUseCase, // Podría ser directamente IMessageTemplateRecordRepository si el UC de manage es muy complejo
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: ProcessWhatsAppAssetUpdateCommand
  ): Promise<Result<void, ExceptionBase>> {
    const { tenantId, wabaId, correlationId, webhookChange } = command.payload;
    const useCaseName = ProcessWhatsAppAssetUpdateUseCaseImpl.name;
    const field = webhookChange.field as EWhatsAppWebhookField; // Cast a nuestro enum
    const value = webhookChange.value;

    this.logger.log(
      `Processing WA asset update for field "${field}", tenant ${String(
        tenantId
      )}, WABA ${String(wabaId)}`,
      useCaseName,
      correlationId
    );

    try {
      switch (field) {
        case EWhatsAppWebhookField.MESSAGE_TEMPLATE_STATUS_UPDATE: {
          // Envolver en bloque
          const templateUpdate = value as TWebhookValueTemplateStatus;
          // TODO: Llamar a un método específico en templateManager o repo
          // this.templateManager.updateTemplateStatusFromWebhook(tenantId, wabaId, templateUpdate, correlationId);
          this.logger.log(
            `Processed template status update: ${templateUpdate.message_template_name} to ${templateUpdate.new_template_status}`,
            useCaseName,
            correlationId
          );
          break;
        }
        case EWhatsAppWebhookField.PHONE_NUMBER_QUALITY_UPDATE: {
          // Envolver
          const qualityUpdate = value as TWebhookValuePhoneNumberQuality;
          await this.healthManager.processPhoneNumberQualityUpdate(
            tenantId,
            wabaId,
            qualityUpdate.display_phone_number,
            qualityUpdate,
            correlationId
          );
          this.logger.log(
            `Processed phone number quality update for ${qualityUpdate.display_phone_number}`,
            useCaseName,
            correlationId
          );
          break;
        }
        case EWhatsAppWebhookField.PHONE_NUMBER_NAME_UPDATE: {
          // Envolver
          const nameUpdate = value as TWebhookValuePhoneNumberName;
          await this.healthManager.processPhoneNumberNameUpdate(
            tenantId,
            wabaId,
            nameUpdate.display_phone_number,
            nameUpdate,
            correlationId
          );
          this.logger.log(
            `Processed phone number name update for ${nameUpdate.display_phone_number}`,
            useCaseName,
            correlationId
          );
          break;
        }
        case EWhatsAppWebhookField.ACCOUNT_UPDATE: {
          // Envolver
          const accountUpdate = value as TWebhookValueAccountUpdate;
          await this.healthManager.processAccountUpdateWebhook(
            tenantId,
            wabaId,
            accountUpdate,
            correlationId
          );
          this.logger.log(
            `Processed account update event: ${accountUpdate.event}`,
            useCaseName,
            correlationId
          );
          break;
        }
        default:
          this.logger.warn(
            `Unhandled webhook field type: "${field}" for tenant ${String(
              tenantId
            )}`,
            useCaseName,
            correlationId
          );
          break;
      }
      return ok(undefined);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error processing WhatsApp asset update.',
              error as Error,
              undefined,
              correlationId
            );
      this.logger.error(
        `Error in ${useCaseName} for field ${field}: ${errBase.message}`,
        errBase.stack,
        useCaseName,
        correlationId
      );
      return err(errBase);
    }
  }
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/process-whatsapp-asset-update.use-case.ts

/* SECCIÓN DE MEJORAS REALIZADAS
[* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadidas importaciones para CommandBase, isErr, y los tipos de valor de webhook (TWebhookValue...) desde @dfs-suite/codowhatsapp.", "justificacion": "Resuelve los errores no-undef.", "impacto": "Correctitud de tipos." },
{ "mejora": "Envueltas las declaraciones dentro de los case del switch en bloques {}.", "justificacion": "Resuelve los errores no-case-declarations de ESLint.", "impacto": "Código válido." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: []
{ "mejora": "Esqueleto de ProcessWhatsAppAssetUpdateUseCaseImpl.", "justificacion": "Orquesta el procesamiento de webhooks de gestión de activos de WhatsApp (estado de plantilla, calidad de número, actualizaciones de cuenta).", "impacto": "Permite la sincronización automática del estado de los activos WA." },
{ "mejora": "Definición de ProcessWhatsAppAssetUpdateCommand.", "justificacion": "Comando específico.", "impacto": "Claridad." },
{ "mejora": "Uso de IAccountHealthManagerServicePortAppLayer y IManageWhatsAppTemplateUseCase.", "justificacion": "Delega la lógica específica a los servicios/casos de uso apropiados.", "impacto": "Desacoplamiento."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "El IAccountHealthManagerServicePortAppLayer necesitará métodos específicos para cada tipo de account_update y phone_number_quality_update y phone_number_name_update."},
{"nota": "El IManageWhatsAppTemplateUseCase necesitará un método como updateLocalTemplateStatusFromWebhook."}
]
*/
