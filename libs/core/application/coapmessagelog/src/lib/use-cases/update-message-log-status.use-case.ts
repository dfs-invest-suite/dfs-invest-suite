// RUTA: libs/core/application/coapmessagelog/src/lib/use-cases/update-message-log-status.use-case.ts
import {
  ICommandHandler,
  ICommandMetadata,
} from '@dfs-suite/cdskcommandsqueries';
import { IDomainEventEmitter } from '@dfs-suite/cdskevents';
import { ILoggerPort } from '@dfs-suite/cdskports';
import {
  IMessageLogRepository,
  MessageInternalStatusVO, // Asumiendo que este token se exporta del dominio
  MessageLogEntity,
} from '@dfs-suite/codomessagelog';
import {
  EWhatsAppMessageStatus,
  TWhatsAppError, // Importar para el payload
  TWhatsAppPricing, // Importar para el payload
} from '@dfs-suite/codowhatsapp';
import {
  ExceptionBase,
  InternalServerErrorException,
  NotFoundException,
} from '@dfs-suite/sherrors';
import { Result, err, isErr, ok } from '@dfs-suite/shresult';
import {
  AggregateId,
  CorrelationId,
  IsoDateString,
  Maybe,
  TenantId, // Importado
  WabaId, // Importado para el contexto del evento
  WhatsAppAccountId, // Importado para el contexto del evento
} from '@dfs-suite/shtypes';

// --- Comando ---
export interface UpdateMessageLogStatusCommandPayload {
  readonly messageLogId?: Maybe<AggregateId>;
  readonly waMessageId?: Maybe<string>;
  readonly tenantId: TenantId;
  readonly correlationId: CorrelationId;
  readonly newWhatsappStatus?: Maybe<EWhatsAppMessageStatus>;
  readonly newInternalStatus?: Maybe<MessageInternalStatusVO>; // El VO para el estado interno
  readonly timestamp: IsoDateString;
  readonly errorMessage?: Maybe<string>;
  readonly errorCode?: Maybe<string>;
  readonly pricingCategory?: Maybe<string>; // Directamente del webhook
  readonly pricingModel?: Maybe<'CBP' | 'PMP' | string>; // Directamente del webhook
  readonly conversationId?: Maybe<string>; // Directamente del webhook
  readonly cost?: Maybe<number>; // Costo en centavos (si se calcula aquí o se pasa)
  readonly currency?: Maybe<string>; // Ej. "USD"
  readonly wabaId: WabaId; // Necesario para el contexto del evento
  readonly tenantPhoneNumberId: WhatsAppAccountId; // Necesario para el contexto del evento
}
export class UpdateMessageLogStatusCommand {
  constructor(
    public readonly payload: UpdateMessageLogStatusCommandPayload,
    public readonly metadata: ICommandMetadata
  ) {}
}

// --- Use Case ---
export const UPDATE_MESSAGE_LOG_STATUS_USE_CASE = Symbol(
  'IUpdateMessageLogStatusUseCase'
);
// CAMBIO: Convertir a type alias
export type IUpdateMessageLogStatusUseCase = ICommandHandler<
  UpdateMessageLogStatusCommand,
  void
>;

export class UpdateMessageLogStatusUseCaseImpl // Renombrado para consistencia
  implements IUpdateMessageLogStatusUseCase
{
  constructor(
    // @Inject(MESSAGE_LOG_REPOSITORY_PORT)
    private readonly _messageLogRepo: IMessageLogRepository,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly _eventEmitter: IDomainEventEmitter,
    // @Inject(LOGGER_PORT)
    private readonly _logger: ILoggerPort
  ) {}

  async execute(
    command: UpdateMessageLogStatusCommand
  ): Promise<Result<void, ExceptionBase>> {
    const { payload, metadata } = command;
    this._logger.log(
      `Updating message log status. ID: ${
        String(payload.messageLogId) || String(payload.waMessageId)
      } for tenant ${String(payload.tenantId)}`,
      this.constructor.name,
      metadata.correlationId
    );

    try {
      let messageLogResult: Result<
        Maybe<MessageLogEntity>,
        ExceptionBase | Error
      >;
      if (payload.messageLogId) {
        messageLogResult = await this._messageLogRepo.findOneById(
          payload.messageLogId
        );
      } else if (payload.waMessageId) {
        messageLogResult = await this._messageLogRepo.findByWaMessageId(
          payload.waMessageId
        );
      } else {
        return err(
          new NotFoundException(
            'Either messageLogId or waMessageId must be provided for UpdateMessageLogStatus.'
          )
        );
      }

      if (isErr(messageLogResult)) return err(messageLogResult.error);
      if (!messageLogResult.value) {
        return err(
          new NotFoundException(
            `MessageLog not found with ID: ${
              String(payload.messageLogId) || String(payload.waMessageId)
            } for tenant ${String(payload.tenantId)}.`
          )
        );
      }

      const messageLogEntity = messageLogResult.value;

      // El contexto para los eventos de la entidad ahora incluye WABA ID y el Phone Number ID del tenant
      const eventContext = {
        tenantId: payload.tenantId,
        wabaId: payload.wabaId,
        tenantPhoneNumberId: payload.tenantPhoneNumberId,
        correlationId: payload.correlationId,
        pricingInfo:
          payload.pricingModel && payload.pricingCategory
            ? ({
                billable: payload.cost !== undefined && payload.cost > 0,
                pricing_model: payload.pricingModel,
                category: payload.pricingCategory as any, // Cast temporal
              } as TWhatsAppPricing)
            : undefined,
        errorInfo:
          payload.errorCode || payload.errorMessage
            ? [
                {
                  code: payload.errorCode ? parseInt(payload.errorCode, 10) : 0,
                  message: payload.errorMessage || 'Unknown error',
                } as TWhatsAppError,
              ]
            : undefined,
        conversationInfo: payload.conversationId
          ? { id: payload.conversationId, origin_type: 'unknown' }
          : undefined,
      };

      if (payload.newWhatsappStatus) {
        messageLogEntity.updateFromWebhookStatus(
          payload.newWhatsappStatus,
          payload.timestamp,
          eventContext // Pasar el contexto completo
        );
      }

      if (payload.newInternalStatus) {
        // Asumiendo que la entidad tiene un método para esto
        // messageLogEntity.setInternalStatus(payload.newInternalStatus, eventContext);
      }

      const saveResult = await this._messageLogRepo.update(messageLogEntity);
      if (isErr(saveResult)) {
        this._logger.error(
          `Failed to update message log ${String(messageLogEntity.id)}: ${
            saveResult.error.message
          }`,
          saveResult.error.stack,
          this.constructor.name,
          metadata.correlationId
        );
        return err(saveResult.error);
      }

      await this._eventEmitter.publishAll(
        messageLogEntity.getAndClearDomainEvents()
      );

      this._logger.log(
        `Message log status updated: ${String(messageLogEntity.id)}`,
        this.constructor.name,
        metadata.correlationId
      );
      return ok(undefined);
    } catch (error: unknown) {
      const e =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException( // Usar InternalServerErrorException
              (error as Error).message,
              error as Error,
              undefined,
              metadata.correlationId
            );
      this._logger.error(
        `Unexpected error updating message log: ${e.message}`,
        e.stack,
        this.constructor.name,
        metadata.correlationId
      );
      return err(e);
    }
  }
}
// RUTA: libs/core/application/coapmessagelog/src/lib/use-cases/update-message-log-status.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Convertida la interfaz `IUpdateMessageLogStatusUseCase` a un `type` alias.", "justificacion": "Resuelve el error `@typescript-eslint/no-empty-object-type`.", "impacto": "Código válido." },
  { "mejora": "Añadidos imports para `TenantId`, `WabaId`, `WhatsAppAccountId`, `InternalServerErrorException`, `TWhatsAppError`, `TWhatsAppPricing`.", "justificacion": "Resuelve errores `no-undef` y permite un tipado más preciso del payload y del contexto del evento.", "impacto": "Correctitud y robustez." },
  { "mejora": "El payload del comando y el contexto para `updateFromWebhookStatus` ahora incluyen `wabaId` y `tenantPhoneNumberId`.", "justificacion": "Proporciona más contexto a la entidad y a los eventos que esta pueda emitir.", "impacto": "Información más completa para los listeners." },
  { "mejora": "Uso de `InternalServerErrorException` y `NotFoundException` de `@dfs-suite/sherrors`.", "justificacion": "Consistencia en el manejo de errores.", "impacto": "Claridad."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La lógica para construir `pricingInfo` y `errorInfo` dentro del `eventContext` es una simplificación y debería ser alimentada por datos más directos del webhook en el `ProcessWhatsAppMessageStatusUseCase` de `coapwhatsapp`." },
  { "nota": "La entidad `MessageLogEntity` necesita un método `setInternalStatus(status: MessageInternalStatusVO, context: { ... })` para manejar la actualización del estado interno de forma encapsulada y potencialmente emitir eventos específicos si es necesario." }
]
*/
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadido el import de `TenantId` desde `@dfs-suite/shtypes` y `TWhatsAppError`, `TWhatsAppPricing` desde `@dfs-suite/codowhatsapp`.", "justificacion": "Resuelve el error `no-undef` para `TenantId` y permite tipar correctamente el contexto para `updateFromWebhookStatus`.", "impacto": "El archivo es ahora sintácticamente correcto y más type-safe." },
  { "mejora": "Refactorizada la llamada a `messageLogEntity.updateFromWebhookStatus` para pasar un objeto de contexto completo.", "justificacion": "Alinea con la firma del método en `MessageLogEntity` que espera `tenantId` y `correlationId` para la correcta emisión de eventos con contexto.", "impacto": "Lógica más robusta y trazable." },
  { "mejora": "Prefijadas dependencias inyectadas con `_` para silenciar warnings `no-unused-vars` temporalmente.", "justificacion": "Limpieza de ESLint.", "impacto": "Menos ruido de linting."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La creación de los objetos `pricingInfo` y `errorInfo` dentro de `updateFromWebhookStatus` es simplificada. Se necesitará un mapeo más robusto desde los datos del webhook (que llegarían al `ProcessWhatsAppMessageStatusUseCase` de `coapwhatsapp`) al `UpdateMessageLogStatusCommandPayload`." },
  { "nota": "El `MessageLogEntity` necesita un método `setInternalStatus(status: MessageInternalStatusVO, ...)` para actualizar el estado interno de forma encapsulada." },
  { "nota": "Si `UpdateMessageLogStatusCommandPayload.tenantPhoneNumberId` se añade, este UC también podría pasarlo a `messageLogEntity.updateFromWebhookStatus` si fuera necesario para enriquecer eventos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA:
[
  {"nota": "MessageLogEntity necesita un método como `setStatusInternal(status: MessageInternalStatusVO, reason?: string)`"}
]
*/
