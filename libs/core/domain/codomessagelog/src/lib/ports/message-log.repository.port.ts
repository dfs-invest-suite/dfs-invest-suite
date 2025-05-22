// RUTA: libs/core/domain/codomessagelog/src/lib/ports/message-log.repository.port.ts
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import {
  CorrelationId,
  LeadId,
  Maybe,
  IPaginatedQueryParams,
  IPaginated,
} from '@dfs-suite/shtypes';

import {
  MessageLogEntity,
  MessageLogProps,
  MessageLogId,
} from '../entities/message-log.entity'; // Importar MessageLogId

export const MESSAGE_LOG_REPOSITORY_PORT = Symbol('IMessageLogRepositoryPort');

export interface IMessageLogRepository
  extends IRepositoryPort<MessageLogProps, MessageLogId, MessageLogEntity> {
  // Usar MessageLogId como TIDType
  findByWaMessageId(
    waMessageId: string
  ): Promise<Result<Maybe<MessageLogEntity>, ExceptionBase>>; // No necesita Error como tipo de error aquí

  findByCorrelationId(
    correlationId: CorrelationId
  ): Promise<Result<Maybe<MessageLogEntity>, ExceptionBase>>;

  findAllByLeadIdPaginated( // Ejemplo de método específico
    leadId: LeadId,
    params: IPaginatedQueryParams
  ): Promise<Result<IPaginated<MessageLogEntity>, ExceptionBase>>;
}
// RUTA: libs/core/domain/codomessagelog/src/lib/ports/message-log.repository.port.ts
