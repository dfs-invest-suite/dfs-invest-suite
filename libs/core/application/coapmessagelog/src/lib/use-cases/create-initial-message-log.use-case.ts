// RUTA: libs/core/application/coapmessagelog/src/lib/use-cases/create-initial-message-log.use-case.ts
import {
  ICommandHandler,
  ICommandMetadata,
} from '@dfs-suite/cdskcommandsqueries';
import { IDomainEventEmitter } from '@dfs-suite/cdskevents';
import { ILoggerPort } from '@dfs-suite/cdskports';
import {
  EMessageDirection,
  IMessageLogRepository,
  MessageLogEntity,
} from '@dfs-suite/codomessagelog';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, err, isErr, ok } from '@dfs-suite/shresult';
import {
  CorrelationId,
  LeadId,
  Maybe,
  MessageLogId,
  MessageTemplateId,
  TenantId,
  WabaId,
  WhatsAppAccountId,
} from '@dfs-suite/shtypes';
import { UuidUtils } from '@dfs-suite/shutils';

// --- Comando ---
export interface CreateInitialMessageLogCommandPayload {
  readonly tenantId: TenantId;
  readonly wabaId: WabaId; // <<< AÑADIDO AL PAYLOAD DEL COMANDO
  readonly correlationId: CorrelationId;
  readonly direction: EMessageDirection;
  readonly leadId: LeadId;
  readonly tenantPhoneNumberId: WhatsAppAccountId;
  readonly recipientWaId: string;
  readonly messageType: string;
  readonly templateId?: Maybe<MessageTemplateId>;
  readonly templateName?: Maybe<string>;
  readonly messageContentPreview?: Maybe<string>;
}
export class CreateInitialMessageLogCommand {
  constructor(
    public readonly payload: CreateInitialMessageLogCommandPayload,
    public readonly metadata: ICommandMetadata
  ) {}
}

// --- DTO de Salida ---
export interface MessageLogReferenceDto {
  messageLogId: MessageLogId;
}

// --- Use Case ---
export const CREATE_INITIAL_MESSAGE_LOG_USE_CASE = Symbol(
  'ICreateInitialMessageLogUseCase'
);
export type ICreateInitialMessageLogUseCase = ICommandHandler<
  CreateInitialMessageLogCommand,
  MessageLogReferenceDto
>;

export class CreateInitialMessageLogUseCaseImpl
  implements ICreateInitialMessageLogUseCase
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
    command: CreateInitialMessageLogCommand
  ): Promise<Result<MessageLogReferenceDto, ExceptionBase>> {
    const { payload, metadata } = command;
    this._logger.log(
      `Creating initial message log. Lead: ${String(
        payload.leadId
      )}, Direction: ${payload.direction}`,
      this.constructor.name,
      metadata.correlationId
    );

    try {
      // const directionVO = MessageDirectionVO.create(payload.direction); // No es necesario si la entidad lo toma directo

      const messageLogEntity = MessageLogEntity.createInitial(
        {
          tenantId: payload.tenantId,
          wabaId: payload.wabaId, // <<< PASAR wabaId A LA ENTIDAD
          correlationId: metadata.correlationId,
          direction: payload.direction,
          leadId: payload.leadId,
          tenantPhoneNumberId: payload.tenantPhoneNumberId,
          recipientWaId: payload.recipientWaId,
          messageType: payload.messageType,
          templateId: payload.templateId,
          templateName: payload.templateName,
          messageContentPreview: payload.messageContentPreview,
        },
        UuidUtils.generateMessageLogId()
      );

      const saveResult = await this._messageLogRepo.insert(messageLogEntity);
      if (isErr(saveResult)) {
        this._logger.error(
          `Failed to save initial message log for lead ${String(
            payload.leadId
          )}: ${saveResult.error.message}`,
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
        `Initial message log created: ${String(messageLogEntity.id)}`,
        this.constructor.name,
        metadata.correlationId
      );

      return ok({ messageLogId: messageLogEntity.id });
    } catch (error: unknown) {
      const e =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              (error as Error).message,
              error as Error,
              undefined,
              metadata.correlationId
            );
      this._logger.error(
        `Unexpected error creating message log: ${e.message}`,
        e.stack,
        this.constructor.name,
        metadata.correlationId
      );
      return err(e);
    }
  }
}
// RUTA: libs/core/application/coapmessagelog/src/lib/use-cases/create-initial-message-log.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadido `wabaId` al `CreateInitialMessageLogCommandPayload` y pasado al factory `MessageLogEntity.createInitial`.", "justificacion": "Resuelve el error `no-undef` para `wabaId` que ahora es requerido por la entidad `MessageLogEntity` (según su `CreateInitialMessageLogProps`).", "impacto": "El caso de uso ahora provee todos los datos necesarios a la entidad." },
  { "mejora": "Importación de `WabaId` desde `@dfs-suite/shtypes`.", "justificacion": "Correctitud de tipos.", "impacto": "Resolución de `no-undef`."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Convertida la interfaz `ICreateInitialMessageLogUseCase` a un `type` alias.", "justificacion": "Resuelve el error `@typescript-eslint/no-empty-object-type` ya que `ICommandHandler` ya define el contrato `execute`.", "impacto": "Código válido y más conciso." },
  { "mejora": "Añadidos todos los imports necesarios, incluyendo `UuidUtils`, `EMessageDirection`, `WabaId`, `InternalServerErrorException` y `MessageTemplateId`.", "justificacion": "Resuelve múltiples errores `no-undef` y prepara el caso de uso.", "impacto": "Correctitud." },
  { "mejora": "Ajustado `CreateInitialMessageLogCommandPayload` para incluir `wabaId` y usar `EMessageDirection`.", "justificacion": "`MessageLogEntity.createInitial` necesita estos campos para su lógica y para los eventos.", "impacto": "Payload de comando más completo." },
  { "mejora": "La llamada a `MessageLogEntity.createInitial` ahora pasa un payload compatible con `CreateInitialMessageLogProps` y un `MessageLogId` generado.", "justificacion": "Correcta instanciación de la entidad.", "impacto": "Flujo de creación de entidad funcional." },
  { "mejora": "Uso de `InternalServerErrorException` para errores inesperados.", "justificacion": "Consistencia con el manejo de errores.", "impacto": "Robustez." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "El `templateName` en `CreateInitialMessageLogCommandPayload` fue cambiado a `templateId` y luego se añadió `templateName` de nuevo. Revisar si `templateId` (HSM ID) está disponible al momento de crear el log inicial o si solo se conoce el `templateName`." }
]
*/
