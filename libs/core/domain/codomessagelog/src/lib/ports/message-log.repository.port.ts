// RUTA: libs/core/domain/codomessagelog/src/lib/ports/message-log.repository.port.ts
// TODO: [LIA Legacy - Definir IMessageLogRepositoryPort]
// Propósito: Puerto para persistencia de MessageLogEntity.

import { IRepositoryPort } from '@dfs-suite/cdskports';
import { MessageLogEntity } from '../entities/message-log.entity';
import { Result } from '@dfs-suite/shresult';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { CorrelationId, LeadId, Maybe } from '@dfs-suite/shtypes';

export const MESSAGE_LOG_REPOSITORY_PORT = Symbol('IMessageLogRepositoryPort');

export interface IMessageLogRepositoryPort
  extends IRepositoryPort<MessageLogEntity> {
  findByWaMessageId(
    waMessageId: string
  ): Promise<Result<Maybe<MessageLogEntity>, ExceptionBase | Error>>;

  findByCorrelationId(
    correlationId: CorrelationId
  ): Promise<Result<Maybe<MessageLogEntity>, ExceptionBase | Error>>;

  // Futuro:
  // findByLeadId(leadId: LeadId, pagination: IPaginatedQueryParams): Promise<Result<IPaginated<MessageLogEntity>, ExceptionBase | Error>>;
}
/* SECCIÓN DE MEJORAS FUTURAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
