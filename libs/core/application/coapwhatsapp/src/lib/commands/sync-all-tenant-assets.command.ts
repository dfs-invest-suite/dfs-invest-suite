// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/sync-all-tenant-assets.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, WabaId } from '@dfs-suite/shtypes';

export interface SyncAllTenantAssetsCommandPayload {
  tenantId: TenantId;
  wabaId: WabaId; // El WABA ID a sincronizar
  triggeredByUserId?: UserId; // Opcional
}

export class SyncAllTenantAssetsCommand extends CommandBase<SyncAllTenantAssetsCommandPayload> {
  constructor(
    payload: SyncAllTenantAssetsCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/sync-all-tenant-assets.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS: N/A (Archivo nuevo) */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
