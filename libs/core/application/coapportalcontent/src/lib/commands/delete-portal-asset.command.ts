// RUTA: libs/core/application/coapportalcontent/src/lib/commands/delete-portal-asset.command.ts
// TODO: [LIA Legacy - Implementar DeletePortalAssetCommand]
// Propósito: Comando para eliminar un activo del portal.
// Relacionado con Casos de Uso: BP-PORTAL-ASSET-002 (Eliminar Activo)
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, AggregateId } from '@dfs-suite/shtypes';

export interface DeletePortalAssetCommandPayload {
  readonly tenantId: TenantId;
  readonly assetId: AggregateId; // ID del PortalAssetEntity
  readonly deletedByUserId: UserId;
}
export class DeletePortalAssetCommand
  extends CommandBase
  implements DeletePortalAssetCommandPayload {
  // ... propiedades y constructor
}
