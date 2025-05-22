// RUTA: libs/core/application/coapusersroles/src/lib/commands/update-user-role.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { EUserRole } from '@dfs-suite/codousersroles';
import { TenantId, UserId } from '@dfs-suite/shtypes';

export interface UpdateUserRoleCommandPayload {
  readonly tenantId: TenantId;
  readonly userIdToUpdate: UserId;
  readonly newRole: EUserRole;
  readonly updatedByUserId: UserId; // Generalmente un TENANT_ADMIN
}

export class UpdateUserRoleCommand extends CommandBase<UpdateUserRoleCommandPayload> {
  constructor(
    payload: UpdateUserRoleCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/commands/update-user-role.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `UpdateUserRoleCommand`.", "justificacion": "Comando para cambiar el rol de un usuario dentro de un tenant.", "impacto": "Gestión de permisos y roles." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
