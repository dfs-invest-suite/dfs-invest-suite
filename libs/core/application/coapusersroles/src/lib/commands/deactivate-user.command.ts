// RUTA: libs/core/application/coapusersroles/src/lib/commands/deactivate-user.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId } from '@dfs-suite/shtypes';

export interface DeactivateUserCommandPayload {
  readonly tenantId: TenantId;
  readonly userIdToDeactivate: UserId;
  readonly deactivatedByUserId: UserId;
}

export class DeactivateUserCommand extends CommandBase<DeactivateUserCommandPayload> {
  constructor(
    payload: DeactivateUserCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/commands/deactivate-user.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `DeactivateUserCommand`.", "justificacion": "Comando para marcar un usuario como inactivo.", "impacto": "Gestión del ciclo de vida de usuarios." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
