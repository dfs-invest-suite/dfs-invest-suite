// RUTA: libs/core/application/coapmessagelog/src/lib/use-cases/create-initial-message-log.use-case.ts
// TODO: [LIA Legacy - Implementar CreateInitialMessageLogUseCase]
// Propósito: Orquesta la creación inicial de un MessageLogEntity.

import {
  ICommandHandler,
  ICommandMetadata,
} from '@dfs-suite/cdskcommandsqueries';
import {
  IMessageLogRepository,
  MESSAGE_LOG_REPOSITORY_PORT,
  MessageLogEntity,
  MessageDirectionVO,
  MessageInternalStatusVO,
} from '@dfs-suite/codomessagelog';
import {
  IDomainEventEmitter,
  DOMAIN_EVENT_EMITTER_PORT,
} from '@dfs-suite/cdskevents';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import {
  CorrelationId,
  LeadId,
  TenantId,
  Maybe,
  WhatsAppAccountId,
} from '@dfs-suite/shtypes';

// --- Comando ---
export interface CreateInitialMessageLogCommandPayload {
  readonly tenantId: TenantId; // Aunque implícito en la DB, es útil para el evento y el log
  readonly correlationId: CorrelationId;
  readonly direction: 'INBOUND' | 'OUTBOUND';
  readonly leadId: LeadId;
  readonly tenantPhoneNumberId: WhatsAppAccountId;
  readonly recipientWaId: string;
  readonly messageType: string;
  readonly templateName?: Maybe<string>;
  readonly messageContentPreview?: Maybe<string>;
}
export class CreateInitialMessageLogCommand {
  // No necesita extender CommandBase si el UC lo instancia
  constructor(
    public readonly payload: CreateInitialMessageLogCommandPayload,
    public readonly metadata: ICommandMetadata // Para trazabilidad
  ) {}
}

// --- DTO de Salida ---
export interface MessageLogReferenceDto {
  messageLogId: string; // El ID del MessageLogEntity creado
}

// --- Use Case ---
export const CREATE_INITIAL_MESSAGE_LOG_USE_CASE = Symbol(
  'ICreateInitialMessageLogUseCase'
);
export interface ICreateInitialMessageLogUseCase
  extends ICommandHandler<
    CreateInitialMessageLogCommand,
    MessageLogReferenceDto
  > {}

export class CreateInitialMessageLogUseCase
  implements ICreateInitialMessageLogUseCase
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
    command: CreateInitialMessageLogCommand
  ): Promise<Result<MessageLogReferenceDto, ExceptionBase>> {
    const { payload, metadata } = command;
    this.logger.log(
      `Creating initial message log. Lead: ${payload.leadId}, Direction: ${payload.direction}`,
      this.constructor.name,
      metadata.correlationId
    );

    try {
      const directionVO =
        payload.direction === 'INBOUND'
          ? MessageDirectionVO.newInbound()
          : MessageDirectionVO.newOutbound();

      const messageLogEntity = MessageLogEntity.createInitial({
        correlationId: metadata.correlationId,
        direction: directionVO,
        leadId: payload.leadId,
        tenantPhoneNumberId: payload.tenantPhoneNumberId,
        recipientWaId: payload.recipientWaId,
        messageType: payload.messageType,
        templateName: payload.templateName,
        messageContentPreview: payload.messageContentPreview,
      });

      const saveResult = await this.messageLogRepo.insert(messageLogEntity); // o save
      if (isErr(saveResult)) {
        this.logger.error(
          `Failed to save initial message log for lead ${payload.leadId}: ${saveResult.error.message}`,
          saveResult.error.stack,
          this.constructor.name,
          metadata.correlationId
        );
        return err(saveResult.error);
      }

      // Aquí podrías emitir el MessageLogCreatedEvent si la entidad no lo hace
      // O si lo hace, obtenerlo de messageLogEntity.getAndClearDomainEvents() y publicarlo.
      // Por simplicidad, asumamos que se maneja o que un evento aquí es redundante si el UC principal emite uno.
      // if (messageLogEntity.domainEvents.length > 0) {
      //   await this.eventEmitter.publishAll(messageLogEntity.getAndClearDomainEvents());
      // }

      this.logger.log(
        `Initial message log created: ${messageLogEntity.id}`,
        this.constructor.name,
        metadata.correlationId
      );

      return ok({ messageLogId: messageLogEntity.id as string });
    } catch (error) {
      const e =
        error instanceof ExceptionBase
          ? error
          : new ExceptionBase((error as Error).message, error as Error);
      this.logger.error(
        `Unexpected error creating message log: ${e.message}`,
        e.stack,
        this.constructor.name,
        metadata.correlationId
      );
      return err(e);
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
