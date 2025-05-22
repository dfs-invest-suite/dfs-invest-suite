// RUTA: libs/core/domain/codoportalcontent/src/lib/entities/portal-asset.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import {
  AssetId,
  TenantId,
  Maybe,
  UrlString,
  CorrelationId,
  UserId,
  MimeTypeString,
  CidString,
} from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';

import { AssetTypeVO, EAssetType } from '../value-objects/asset-type.vo'; // A crear

export interface PortalAssetProps {
  // tenantId: TenantId; // Implícito
  fileName: string;
  mimeType: MimeTypeString;
  sizeInBytes: number;
  storagePathOrUrl: UrlString | CidString; // URL pública o CID de IPFS
  storageType: 'S3_PUBLIC' | 'IPFS' | 'EXTERNAL_URL'; // EXTERNAL_URL si solo referenciamos
  assetType: AssetTypeVO; // IMAGE_GALLERY, IMAGE_BANNER, DOCUMENT_PDF, COMPANY_LOGO
  description?: Maybe<string>;
  altText?: Maybe<string>; // Para imágenes
  uploadedByUserId: UserId;
  isPublic: boolean; // Default true para assets del portal
  // dimensions?: { width: number; height: number }; // Para imágenes/videos
  // duration?: number; // Para videos/audios
}

export interface CreatePortalAssetProps {
  tenantId: TenantId;
  correlationId: CorrelationId;
  fileName: string;
  mimeType: MimeTypeString;
  sizeInBytes: number;
  storagePathOrUrl: UrlString | CidString;
  storageType: 'S3_PUBLIC' | 'IPFS' | 'EXTERNAL_URL';
  assetType: EAssetType;
  uploadedByUserId: UserId;
  description?: Maybe<string>;
  altText?: Maybe<string>;
  isPublic?: boolean;
}

export class PortalAssetEntity extends AggregateRoot<
  PortalAssetProps,
  AssetId
> {
  constructor(createEntityProps: CreateEntityProps<PortalAssetProps, AssetId>) {
    super(createEntityProps);
  }

  public static create(
    props: CreatePortalAssetProps,
    id?: AssetId
  ): PortalAssetEntity {
    // Validaciones...
    const assetId = id || UuidUtils.generateAssetId();
    const entityProps: PortalAssetProps = {
      fileName: props.fileName,
      mimeType: props.mimeType,
      sizeInBytes: props.sizeInBytes,
      storagePathOrUrl: props.storagePathOrUrl,
      storageType: props.storageType,
      assetType: AssetTypeVO.create(props.assetType),
      uploadedByUserId: props.uploadedByUserId,
      isPublic: props.isPublic ?? true,
      description: props.description,
      altText: props.altText,
    };
    const asset = new PortalAssetEntity({
      id: assetId,
      props: entityProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Emitir PortalAssetCreatedEvent
    return asset;
  }

  // Getters y métodos...
  public validate(): void {
    /* ... */
  }
}
// RUTA: libs/core/domain/codoportalcontent/src/lib/entities/portal-asset.entity.ts
