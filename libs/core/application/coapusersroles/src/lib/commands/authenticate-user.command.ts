// RUTA: libs/core/application/coapusersroles/src/lib/commands/authenticate-user.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { EmailString } from '@dfs-suite/shtypes';

export interface AuthenticateUserCommandPayload {
  readonly email: EmailString;
  readonly password: string; // Contraseña en texto plano
  // El tenantId podría ser inferido del email (si los emails son únicos globalmente + @dominio_tenant)
  // o ser un parámetro adicional si los emails no son únicos globalmente entre tenants.
  // Por ahora, asumimos que el caso de uso lo manejará.
}

export class AuthenticateUserCommand extends CommandBase<AuthenticateUserCommandPayload> {
  constructor(
    payload: AuthenticateUserCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/commands/authenticate-user.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `AuthenticateUserCommand`.", "justificacion": "Comando para iniciar el proceso de autenticación de un usuario.", "impacto": "Base para el login." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
