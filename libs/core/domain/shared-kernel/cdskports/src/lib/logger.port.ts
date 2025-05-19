// libs/core/domain/shared-kernel/ports/src/lib/logger.port.ts
import { CorrelationId, ObjectLiteral } from '@dfs-suite/shared-types'; // Eliminado Maybe

export const LOGGER_PORT = Symbol('LOGGER_PORT');

export interface ILoggerPort {
  debug(
    message: string,
    context?: string,
    correlationId?: CorrelationId,
    metadata?: ObjectLiteral
  ): void;
  log(
    message: string,
    context?: string,
    correlationId?: CorrelationId,
    metadata?: ObjectLiteral
  ): void;
  warn(
    message: string,
    context?: string,
    correlationId?: CorrelationId,
    metadata?: ObjectLiteral
  ): void;
  error(
    message: string | Error,
    stack?: string,
    context?: string,
    correlationId?: CorrelationId,
    metadata?: ObjectLiteral
  ): void;
  verbose?(
    message: string,
    context?: string,
    correlationId?: CorrelationId,
    metadata?: ObjectLiteral
  ): void;
}
