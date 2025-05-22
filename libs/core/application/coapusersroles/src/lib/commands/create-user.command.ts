// RUTA: libs/core/application/coapusersroles/src/lib/commands/create-user.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { EUserRole } from '@dfs-suite/codousersroles'; // Importar EUserRole del dominio
import { TenantId, UserId, EmailString, Maybe } from '@dfs-suite/shtypes';

export interface CreateUserCommandPayload {
  readonly tenantId: TenantId; // Contexto del tenant donde se crea el usuario
  readonly email: EmailString;
  readonly name: string;
  readonly role: EUserRole; // Usar el Enum del dominio
  readonly password: string; // Contraseña en texto plano, el UC la hasheará
  readonly createdByUserId: UserId; // Quién está ejecutando esta acción
  readonly correlationId: string; // Ya está en metadata, pero útil aquí para el UC
}

export class CreateUserCommand extends CommandBase<CreateUserCommandPayload> {
  constructor(
    payload: CreateUserCommandPayload,
    metadata: ICommandMetadata // Usar ICommandMetadata de cdskcommandsqueries
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/commands/create-user.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Comando `CreateUserCommand` definido con payload robusto.", "justificacion": "Incluye todos los campos necesarios para la creación de un usuario, usando tipos Branded y Enums de dominio.", "impacto": "Establece un contrato claro para el caso de uso." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
