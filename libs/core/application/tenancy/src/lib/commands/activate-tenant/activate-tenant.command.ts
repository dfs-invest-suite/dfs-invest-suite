// libs/core/application/tenancy/src/lib/commands/activate-tenant/activate-tenant.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/core-domain-shared-kernel-commands-queries';
import { TenantId } from '@dfs-suite/shared-types'; // Usar TenantId como identificador de negocio

export interface ActivateTenantCommandPayload {
  readonly tenantId: TenantId;
}

export class ActivateTenantCommand extends CommandBase implements ActivateTenantCommandPayload {
  readonly tenantId: TenantId;

  constructor(payload: ActivateTenantCommandPayload, metadata?: Partial<ICommandMetadata>) {
    super(metadata);
    this.tenantId = payload.tenantId;
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Payload Adicional): Si la activación de un tenant requiriera otros datos (ej. razón de activación, usuario que la realiza si no está en metadata), se añadirían a `ActivateTenantCommandPayload`.
  Justificación: Permitir un contexto más rico para la operación de activación.
  Impacto: Modificación de la interfaz del payload y del constructor del comando.
]
*/
