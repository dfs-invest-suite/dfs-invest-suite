// RUTA: libs/core/application/coapusersroles/src/lib/commands/change-user-password.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId } from '@dfs-suite/shtypes';

export interface ChangeUserPasswordCommandPayload {
  readonly tenantId: TenantId;
  readonly userIdChanging: UserId; // El usuario que está cambiando su propia contraseña
  readonly oldPassword: string; // Contraseña actual en texto plano
  readonly newPassword: string; // Nueva contraseña en texto plano
}

export class ChangeUserPasswordCommand extends CommandBase<ChangeUserPasswordCommandPayload> {
  constructor(
    payload: ChangeUserPasswordCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/commands/change-user-password.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `ChangeUserPasswordCommand`.", "justificacion": "Comando para que un usuario cambie su propia contraseña.", "impacto": "Seguridad de cuenta." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
