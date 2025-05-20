// RUTA: libs/core/application/coapmessagelog/src/lib/use-cases/update-message-log-status.use-case.ts
// TODO: [LIA Legacy - Implementar UpdateMessageLogStatusUseCase]
// Propósito: Actualiza el estado (interno y de WhatsApp) de un MessageLogEntity existente.

import {
  ICommandHandler,
  ICommandMetadata,
} from '@dfs-suite/cdskcommandsqueries';
import {
  IMessageLogRepository,
  MESSAGE_LOG_REPOSITORY_PORT,
  MessageLogEntity,
  MessageInternalStatusVO,
} from '@dfs-suite/codomessagelog';
import { EWhatsAppMessageStatus } from '@dfs-suite/codowhatsapp';
import {
  IDomainEventEmitter,
  DOMAIN_EVENT_EMITTER_PORT,
} from '@dfs-suite/cdskevents';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import { ExceptionBase, NotFoundException } from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import {
  CorrelationId,
  IsoDateString,
  Maybe,
  AggregateId,
} from '@dfs-suite/shtypes';

// --- Comando ---
export interface UpdateMessageLogStatusCommandPayload {
  readonly messageLogId?: Maybe<AggregateId>; // ID de nuestro MessageLogEntity
  readonly waMessageId?: Maybe<string>; // ID del mensaje de Meta
  readonly tenantId: TenantId; // Para logging y contexto, aunque el repo opera en DB del tenant
  readonly correlationId: CorrelationId;

  readonly newWhatsappStatus?: Maybe<EWhatsAppMessageStatus>;
  readonly newInternalStatus?: Maybe<MessageInternalStatusVO>;
  readonly timestamp: IsoDateString; // Timestamp del evento que originó esta actualización

  readonly errorMessage?: Maybe<string>;
  readonly errorCode?: Maybe<string>;
  readonly pricingCategory?: Maybe<string>;
  readonly pricingModel?: Maybe<'CBP' | 'PMP'>;
  readonly conversationId?: Maybe<string>;
  readonly cost?: Maybe<number>;
  readonly currency?: Maybe<string>;
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
export interface IUpdateMessageLogStatusUseCase
  extends ICommandHandler<UpdateMessageLogStatusCommand, void> {}

export class UpdateMessageLogStatusUseCase
  implements IUpdateMessageLogStatusUseCase
{
  constructor(
    // @Inject(MESSAGE_LOG_REPOSITORY_PORT)
    private readonly messageLogRepo: IMessageLogRepository,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly eventEmitter: IDomainEventEmitter,
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort
  ) {}

  async execute(
    command: UpdateMessageLogStatusCommand
  ): Promise<Result<void, ExceptionBase>> {
    const { payload, metadata } = command;
    this.logger.log(
      `Updating message log status. ID: ${
        payload.messageLogId || payload.waMessageId
      }`,
      this.constructor.name,
      metadata.correlationId
    );

    try {
      let messageLogResult: Result<
        Maybe<MessageLogEntity>,
        ExceptionBase | Error
      >;
      if (payload.messageLogId) {
        messageLogResult = await this.messageLogRepo.findOneById(
          payload.messageLogId
        );
      } else if (payload.waMessageId) {
        messageLogResult = await this.messageLogRepo.findByWaMessageId(
          payload.waMessageId
        );
      } else {
        return err(
          new NotFoundException(
            'Either messageLogId or waMessageId must be provided.'
          )
        );
      }

      if (isErr(messageLogResult)) return err(messageLogResult.error);
      if (!messageLogResult.value) {
        return err(
          new NotFoundException(
            `MessageLog not found with ID: ${
              payload.messageLogId || payload.waMessageId
            }`
          )
        );
      }

      const messageLogEntity = messageLogResult.value;

      if (payload.newWhatsappStatus) {
        messageLogEntity.updateWhatsappStatus(
          payload.newWhatsappStatus,
          payload.timestamp,
          payload.pricingCategory,
          payload.pricingModel,
          payload.conversationId,
          metadata.correlationId
        );
      }
      if (payload.newInternalStatus) {
        // Aquí se necesitaría un método en la entidad para setear el status interno.
        // Por ahora, asumimos una asignación directa si el VO es simple.
        // messageLogEntity.setStatusInternal(payload.newInternalStatus, metadata.correlationId);
        // O si MessageInternalStatusVO solo tiene el value, se podría hacer:
        // messageLogEntity.props.statusInternal = payload.newInternalStatus;
        // pero esto rompe la encapsulación. Idealmente la entidad tiene un método.
      }
      if (payload.cost !== undefined && payload.currency) {
        messageLogEntity.recordCost(
          payload.cost,
          payload.currency,
          metadata.correlationId
        );
      }
      // ... manejar otros campos como errorMessage, errorCode

      const saveResult = await this.messageLogRepo.update(messageLogEntity); // o save
      if (isErr(saveResult)) {
        this.logger.error(
          `Failed to update message log ${messageLogEntity.id}: ${saveResult.error.message}`,
          saveResult.error.stack,
          this.constructor.name,
          metadata.correlationId
        );
        return err(saveResult.error);
      }

      // Emitir evento si es necesario
      this.logger.log(
        `Message log status updated: ${messageLogEntity.id}`,
        this.constructor.name,
        metadata.correlationId
      );
      return ok(undefined);
    } catch (error) {
      const e =
        error instanceof ExceptionBase
          ? error
          : new ExceptionBase((error as Error).message, error as Error);
      this.logger.error(
        `Unexpected error updating message log: ${e.message}`,
        e.stack,
        this.constructor.name,
        metadata.correlationId
      );
      return err(e);
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA:
[
  {"nota": "MessageLogEntity necesita un método como `setStatusInternal(status: MessageInternalStatusVO, reason?: string)`"}
]
*/
