// RUTA: libs/core/application/coapusersroles/src/lib/dtos/user-update.dto.ts
import { EUserRole } from '@dfs-suite/codousersroles';
import { Maybe, UrlString, EmailString } from '@dfs-suite/shtypes';

export interface UserUpdateAppDto {
  // El userId a actualizar y el tenantId se obtienen del contexto/path
  readonly name?: Maybe<string>;
  readonly email?: Maybe<EmailString>; // Permitir cambiar email (con validación)
  readonly profilePictureUrl?: Maybe<UrlString>;
  // Para un admin actualizando a otro usuario:
  readonly role?: Maybe<EUserRole>;
  readonly isActive?: Maybe<boolean>;
}
// RUTA: libs/core/application/coapusersroles/src/lib/dtos/user-update.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `UserUpdateAppDto`.", "justificacion": "DTO para la actualización de datos de un usuario. Permite actualizaciones parciales.", "impacto": "Contrato de datos para la modificación de usuarios." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
