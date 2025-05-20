// RUTA: libs/core/application/coapportalcontent/src/lib/commands/upload-portal-asset.command.ts
// TODO: [LIA Legacy - Implementar UploadPortalAssetCommand]
// Propósito: Comando para subir un nuevo activo (imagen, PDF) para el portal del tenant.
// Relacionado con Casos de Uso: BP-PORTAL-ASSET-001 (Subir Activo)

import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, Maybe } from '@dfs-suite/shtypes';

export interface UploadPortalAssetCommandPayload {
  readonly tenantId: TenantId;
  readonly uploadedByUserId: UserId;
  readonly fileName: string;
  readonly mimeType: string;
  readonly fileSizeInBytes: number;
  readonly fileBufferOrStream: Buffer | NodeJS.ReadableStream; // O referencia a archivo temporal
  readonly assetType: string; // Ej: 'PROPERTY_IMAGE', 'COMPANY_LOGO', 'PROPERTY_DOCUMENT' (del AssetTypeVO de dominio)
  readonly description?: Maybe<string>;
  readonly relatedEntityId?: Maybe<string>; // Ej: ID de la propiedad a la que pertenece la imagen
}

export class UploadPortalAssetCommand
  extends CommandBase
  implements UploadPortalAssetCommandPayload
{
  // ... propiedades y constructor
  readonly tenantId: TenantId;
  readonly uploadedByUserId: UserId;
  readonly fileName: string;
  // ...
  constructor(
    payload: UploadPortalAssetCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    // ...
  }
}
