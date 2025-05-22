// RUTA: libs/core/application/coapusersroles/src/lib/commands/reset-user-password.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId } from '@dfs-suite/shtypes';

export interface ResetUserPasswordCommandPayload {
  readonly tenantId: TenantId;
  readonly userIdToReset: UserId; // El usuario cuya contraseña se está reseteando
  readonly newPassword: string; // La nueva contraseña (generada o definida por admin)
  readonly resetByUserId: UserId; // El admin que realiza el reseteo
}

export class ResetUserPasswordCommand extends CommandBase<ResetUserPasswordCommandPayload> {
  constructor(
    payload: ResetUserPasswordCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/commands/reset-user-password.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `ResetUserPasswordCommand`.", "justificacion": "Comando para que un administrador resetee la contraseña de un usuario.", "impacto": "Gestión administrativa de cuentas." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
