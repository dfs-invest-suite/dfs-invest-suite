// RUTA: libs/core/application/coaptenancy/src/lib/commands/activate-tenant/activate-tenant.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId } from '@dfs-suite/shtypes';

export interface ActivateTenantCommandPayload {
  readonly tenantId: TenantId;
}

export class ActivateTenantCommand extends CommandBase<ActivateTenantCommandPayload> {
  // Especificar TPayload
  // El payload se accede vía this.payload.tenantId gracias a CommandBase
  // No es necesario redeclarar explícitamente la propiedad aquí.

  constructor(
    payload: ActivateTenantCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(payload, metadata); // Pasar payload primero a CommandBase
  }
}
// RUTA: libs/core/application/coaptenancy/src/lib/commands/activate-tenant/activate-tenant.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Corregida la importación de `CommandBase` y `ICommandMetadata` para usar el alias codificado `@dfs-suite/cdskcommandsqueries`.", "justificacion": "Alineación con la nomenclatura y estructura actual de las librerías del shared-kernel.", "impacto": "Resuelve errores de importación y asegura el uso de las clases base correctas." },
  { "mejora": "El comando ahora extiende `CommandBase<ActivateTenantCommandPayload>` y pasa el payload al constructor de `super()`.", "justificacion": "Sigue el patrón establecido en `CommandBase` donde el payload se gestiona en la clase base.", "impacto": "Consistencia y correcta inicialización del comando." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
