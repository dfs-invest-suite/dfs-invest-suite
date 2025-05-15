// libs/shared/errors/src/lib/exception.base.ts
import { CorrelationId, ObjectLiteral } from '@dfs-suite/shared-types';

export interface SerializedException {
  message: string;
  code: string;
  correlationId: CorrelationId;
  stack?: string;
  cause?: string;
  metadata?: ObjectLiteral;
}

export abstract class ExceptionBase extends Error {
  abstract readonly code: string;
  public readonly correlationId: CorrelationId;
  public readonly metadata?: Readonly<ObjectLiteral>;

  constructor(
    message: string,
    readonly cause?: Error,
    metadata?: ObjectLiteral,
    correlationId?: CorrelationId
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;

    if (metadata) {
      this.metadata = Object.freeze({ ...metadata });
    }

    this.correlationId = correlationId || ('UNKNOWN_CORR_ID' as CorrelationId); // Placeholder para contexto

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      stack: process.env['NODE_ENV'] === 'development' ? this.stack : undefined, // CORREGIDO
      correlationId: this.correlationId,
      cause: this.cause?.toString(),
      metadata: this.metadata,
    };
  }
}
