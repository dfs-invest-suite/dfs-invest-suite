// RUTA: libs/core/application/coapusersroles/src/lib/commands/reactivate-user.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId } from '@dfs-suite/shtypes';

export interface ReactivateUserCommandPayload {
  readonly tenantId: TenantId;
  readonly userIdToReactivate: UserId;
  readonly reactivatedByUserId: UserId;
}

export class ReactivateUserCommand extends CommandBase<ReactivateUserCommandPayload> {
  constructor(
    payload: ReactivateUserCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/commands/reactivate-user.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `ReactivateUserCommand`.", "justificacion": "Comando para volver a activar un usuario previamente desactivado.", "impacto": "Gestión del ciclo de vida de usuarios." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
