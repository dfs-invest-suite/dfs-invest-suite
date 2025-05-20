// RUTA: libs/shared/sherrors/src/lib/generic.exceptions.ts
// TODO: [LIA Legacy - Refactorizar imports en GenericExceptions] - ¡REALIZADO!
// Propósito: Define clases de excepción concretas y genéricas que heredan de ExceptionBase.
// Relacionado con Casos de Uso: Manejo de errores comunes en todas las capas.

import { CorrelationId, ObjectLiteral, Maybe } from '@dfs-suite/shtypes'; // Correcto

import { ExceptionBase } from './exception.base'; // Correcto (relativo interno)
import {
  GENERIC_ARGUMENT_INVALID,
  GENERIC_ARGUMENT_NOT_PROVIDED,
  GENERIC_ARGUMENT_OUT_OF_RANGE,
  GENERIC_CONFLICT,
  GENERIC_INTERNAL_SERVER_ERROR,
  GENERIC_NOT_FOUND,
  GENERIC_UNAUTHORIZED,
  GENERIC_FORBIDDEN,
} from './exception.codes'; // Correcto (relativo interno)

export class ArgumentInvalidException extends ExceptionBase {
  readonly code = GENERIC_ARGUMENT_INVALID;
  constructor(
    message = 'Argument Invalid',
    cause?: Maybe<Error | unknown>,
    metadata?: Maybe<ObjectLiteral>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = GENERIC_ARGUMENT_NOT_PROVIDED;
  constructor(
    message = 'Argument Not Provided',
    cause?: Maybe<Error | unknown>,
    metadata?: Maybe<ObjectLiteral>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = GENERIC_ARGUMENT_OUT_OF_RANGE;
  constructor(
    message = 'Argument Out Of Range',
    cause?: Maybe<Error | unknown>,
    metadata?: Maybe<ObjectLiteral>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class ConflictException extends ExceptionBase {
  readonly code = GENERIC_CONFLICT;
  constructor(
    message = 'Conflict',
    cause?: Maybe<Error | unknown>,
    metadata?: Maybe<ObjectLiteral>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class NotFoundException extends ExceptionBase {
  readonly code = GENERIC_NOT_FOUND;
  constructor(
    message = 'Not Found',
    cause?: Maybe<Error | unknown>,
    metadata?: Maybe<ObjectLiteral>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class InternalServerErrorException extends ExceptionBase {
  readonly code = GENERIC_INTERNAL_SERVER_ERROR;
  constructor(
    message = 'Internal Server Error',
    cause?: Maybe<Error | unknown>,
    metadata?: Maybe<ObjectLiteral>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class UnauthorizedException extends ExceptionBase {
  readonly code = GENERIC_UNAUTHORIZED;
  constructor(
    message = 'Unauthorized',
    cause?: Maybe<Error | unknown>,
    metadata?: Maybe<ObjectLiteral>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(message, cause, metadata, correlationId);
  }
}

export class ForbiddenException extends ExceptionBase {
  readonly code = GENERIC_FORBIDDEN;
  constructor(
    message = 'Forbidden',
    cause?: Maybe<Error | unknown>,
    metadata?: Maybe<ObjectLiteral>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(message, cause, metadata, correlationId);
  }
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports verificados y correctos para `@dfs-suite/shtypes` y archivos locales.", "justificacion": "Asegura la correcta resolución de tipos y dependencias.", "impacto": "Estabilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
// RUTA: libs/shared/sherrors/src/lib/generic.exceptions.ts
