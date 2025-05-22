// RUTA: libs/core/application/coapusersroles/src/lib/commands/update-user-profile.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, Maybe, UrlString } from '@dfs-suite/shtypes';

// Este payload será similar al UserUpdateAppDto
export interface UpdateUserProfileCommandPayload {
  readonly tenantId: TenantId; // Para contexto, aunque el usuario ya es de un tenant
  readonly userIdToUpdate: UserId; // El ID del usuario cuyo perfil se actualiza
  readonly name?: Maybe<string>;
  readonly profilePictureUrl?: Maybe<UrlString>;
  // Otros campos de perfil que se puedan actualizar (ej. preferencias de notificación)
  readonly updatedByUserId: UserId; // Quién realiza la acción (el propio usuario o un admin)
}

export class UpdateUserProfileCommand extends CommandBase<UpdateUserProfileCommandPayload> {
  constructor(
    payload: UpdateUserProfileCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/commands/update-user-profile.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `UpdateUserProfileCommand`.", "justificacion": "Comando para que un usuario actualice su propio perfil o para que un admin actualice el de otro (controlado por el caso de uso).", "impacto": "Permite la modificación de datos del perfil de usuario." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
