// RUTA: libs/core/domain/codousersroles/src/lib/errors/permission-denied.error.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ForbiddenException } from '@dfs-suite/sherrors';
import {
  CorrelationId,
  Maybe,
  ObjectLiteral,
  UserId,
} from '@dfs-suite/shtypes';

export const PERMISSION_DENIED_ERROR_CODE = 'USERS_ROLES.PERMISSION_DENIED';

export class PermissionDeniedError extends ForbiddenException {
  constructor(
    userId: UserId,
    action: string,
    resource?: Maybe<string>,
    cause?: Maybe<Error | unknown>,
    correlationId?: Maybe<CorrelationId>
  ) {
    const metadata: ObjectLiteral = { userId: String(userId), action };
    if (resource) metadata['resource'] = resource;
    const message = resource
      ? `User "${String(
          userId
        )}" does not have permission to perform action "${action}" on resource "${resource}".`
      : `User "${String(
          userId
        )}" does not have permission to perform action "${action}".`;

    super(message, cause, metadata, correlationId);
    this.code = PERMISSION_DENIED_ERROR_CODE;
  }
}
// RUTA: libs/core/domain/codousersroles/src/lib/errors/permission-denied.error.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "**NUEVO ARTEFACTO**: Creado `PermissionDeniedError`.", "justificacion": "Error específico para fallos de autorización.", "impacto": "Manejo de errores de autorización más preciso." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
