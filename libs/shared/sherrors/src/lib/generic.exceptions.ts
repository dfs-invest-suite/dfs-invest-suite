// libs/shared/errors/src/lib/generic.exceptions.ts
import {
  GENERIC_ARGUMENT_INVALID,
  GENERIC_ARGUMENT_NOT_PROVIDED,
  GENERIC_ARGUMENT_OUT_OF_RANGE,
  GENERIC_CONFLICT,
  GENERIC_INTERNAL_SERVER_ERROR,
  GENERIC_NOT_FOUND,
  GENERIC_UNAUTHORIZED,
  GENERIC_FORBIDDEN,
} from './exception.codes';
import { ExceptionBase } from './exception.base';
import { CorrelationId, ObjectLiteral } from '@dfs-suite/shared-types';

export class ArgumentInvalidException extends ExceptionBase {
  readonly code = GENERIC_ARGUMENT_INVALID;
  constructor(
    message = 'Argument Invalid',
    cause?: Error,
    metadata?: ObjectLiteral,
    correlationId?: CorrelationId
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = GENERIC_ARGUMENT_NOT_PROVIDED;
  constructor(
    message = 'Argument Not Provided',
    cause?: Error,
    metadata?: ObjectLiteral,
    correlationId?: CorrelationId
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = GENERIC_ARGUMENT_OUT_OF_RANGE;
  constructor(
    message = 'Argument Out Of Range',
    cause?: Error,
    metadata?: ObjectLiteral,
    correlationId?: CorrelationId
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class ConflictException extends ExceptionBase {
  readonly code = GENERIC_CONFLICT;
  constructor(
    message = 'Conflict',
    cause?: Error,
    metadata?: ObjectLiteral,
    correlationId?: CorrelationId
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class NotFoundException extends ExceptionBase {
  readonly code = GENERIC_NOT_FOUND;
  constructor(
    message = 'Not Found',
    cause?: Error,
    metadata?: ObjectLiteral,
    correlationId?: CorrelationId
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class InternalServerErrorException extends ExceptionBase {
  readonly code = GENERIC_INTERNAL_SERVER_ERROR;
  constructor(
    message = 'Internal Server Error',
    cause?: Error,
    metadata?: ObjectLiteral,
    correlationId?: CorrelationId
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class UnauthorizedException extends ExceptionBase {
  readonly code = GENERIC_UNAUTHORIZED;
  constructor(
    message = 'Unauthorized',
    cause?: Error,
    metadata?: ObjectLiteral,
    correlationId?: CorrelationId
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class ForbiddenException extends ExceptionBase {
  readonly code = GENERIC_FORBIDDEN;
  constructor(
    message = 'Forbidden',
    cause?: Error,
    metadata?: ObjectLiteral,
    correlationId?: CorrelationId
  ) {
    super(message, cause, metadata, correlationId);
  }
}
