// RUTA: libs/core/application/coaptenancy/src/lib/commands/create-tenant/create-tenant.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { Maybe } from '@dfs-suite/shtypes'; // EmailString se usará en el DTO/UC, aquí solo string por ahora

export interface CreateTenantCommandPayload {
  readonly name: string;
  readonly ownerEmail: string; // Email del primer admin del tenant
  readonly slug: string; // Mandatorio para el portal
  readonly planId?: Maybe<string>; // Opcional
}

export class CreateTenantCommand extends CommandBase<CreateTenantCommandPayload> {
  // Especificar TPayload
  constructor(
    payload: CreateTenantCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(payload, metadata); // Pasar payload primero
  }
}
// RUTA: libs/core/application/coaptenancy/src/lib/commands/create-tenant/create-tenant.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Corregida la importación de `CommandBase` y `ICommandMetadata`.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "Payload pasado al constructor de `CommandBase` y especificado tipo genérico.", "justificacion": "Consistencia.", "impacto": "Correcta inicialización." },
  { "mejora": "Añadido `slug` como campo mandatorio al payload.", "justificacion": "La `TenantEntity` lo requiere para su creación y es fundamental para las URLs del portal.", "impacto": "Completitud del comando para crear un tenant funcional."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
