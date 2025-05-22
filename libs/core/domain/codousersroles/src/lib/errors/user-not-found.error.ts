// RUTA: libs/core/domain/codousersroles/src/lib/errors/user-not-found.error.ts
// Autor: L.I.A Legacy (IA Asistente)
import { NotFoundException } from '@dfs-suite/sherrors';
import {
  CorrelationId,
  Maybe,
  ObjectLiteral,
  UserId,
} from '@dfs-suite/shtypes'; // Añadido UserId

export const USER_NOT_FOUND_ERROR_CODE = 'USERS_ROLES.USER_NOT_FOUND';

export class UserNotFoundError extends NotFoundException {
  constructor(
    identifier: string | UserId, // Puede ser email o UserId
    cause?: Maybe<Error | unknown>,
    correlationId?: Maybe<CorrelationId>
  ) {
    const metadata: ObjectLiteral = { identifier: String(identifier) };
    super(
      `User with identifier "${String(identifier)}" not found.`,
      cause,
      metadata,
      correlationId
    );
    this.code = USER_NOT_FOUND_ERROR_CODE;
  }
}
// RUTA: libs/core/domain/codousersroles/src/lib/errors/user-not-found.error.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports refactorizados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "Constructor ahora acepta `UserId` como identificador y lo incluye en metadata.", "justificacion": "Error más informativo.", "impacto": "Claridad." },
  { "mejora": "Código de error específico `USER_NOT_FOUND_ERROR_CODE`.", "justificacion": "Mejor granularidad.", "impacto": "Manejo de errores." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
