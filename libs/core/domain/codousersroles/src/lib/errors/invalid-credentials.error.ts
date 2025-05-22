// RUTA: libs/core/domain/codousersroles/src/lib/errors/invalid-credentials.error.ts
// Autor: L.I.A Legacy (IA Asistente)
import { UnauthorizedException } from '@dfs-suite/sherrors'; // Usar Unauthorized o un error de Dominio Base
import {
  CorrelationId,
  Maybe,
  ObjectLiteral,
  EmailString,
} from '@dfs-suite/shtypes';

export const INVALID_CREDENTIALS_ERROR_CODE = 'USERS_ROLES.INVALID_CREDENTIALS';

export class InvalidCredentialsError extends UnauthorizedException {
  // O podría ser un ExceptionBase
  constructor(
    email?: Maybe<EmailString>, // Opcional, para no loguear siempre el email
    cause?: Maybe<Error | unknown>,
    correlationId?: Maybe<CorrelationId>
  ) {
    const metadata: ObjectLiteral = {};
    if (email) metadata['attemptedEmail'] = email;

    super('Invalid credentials provided.', cause, metadata, correlationId);
    this.code = INVALID_CREDENTIALS_ERROR_CODE;
  }
}
// RUTA: libs/core/domain/codousersroles/src/lib/errors/invalid-credentials.error.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "**NUEVO ARTEFACTO**: Creado `InvalidCredentialsError`.", "justificacion": "Error específico para fallos de autenticación (contraseña incorrecta, usuario no activo, etc.).", "impacto": "Manejo de errores de autenticación más preciso." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
