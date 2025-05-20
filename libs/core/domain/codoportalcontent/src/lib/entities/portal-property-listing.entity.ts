// RUTA: libs/core/domain/codoportalcontent/src/lib/entities/portal-property-listing.entity.ts
// TODO: [LIA Legacy - Implementar PortalPropertyListingEntity]
// Propósito: Detalles de una propiedad o SPE para mostrar en el portal.
// import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
// import { TenantId, Maybe, IsoDateString } from '@dfs-suite/shtypes';
// import { PropertyAddressVO, PropertyFeaturesVO, PropertyStatusPublicVO, SeoMetadataVO } from '../value-objects';
// import { PortalAssetEntity } from './portal-asset.entity'; // Para la galería

export interface PortalPropertyListingProps {
  // tenantId: TenantId; // Implícito
  title: string;
  slug: string; // Generado, URL amigable
  description: string; // Podría ser Markdown o HTML enriquecido
  propertyType: string; // ej. 'APARTMENT', 'HOUSE', 'SPE_QUOTA'
  statusPublic: PropertyStatusPublicVO;
  address: PropertyAddressVO;
  features: PropertyFeaturesVO;
  priceOrValueRange?: Maybe<string>; // Ej. "Desde R$ 500.000" o "Cuotas desde R$ 1.000"
  // galleryAssetIds: string[]; // IDs de PortalAssetEntity para imágenes
  // mainImageBannerAssetId?: Maybe<string>;
  // documentAssetIds: string[]; // IDs de PortalAssetEntity para PDFs
  // videoUrl?: Maybe<Url>;
  seoMetadata?: Maybe<SeoMetadataVO>;
  isFeatured?: boolean;
  publishedAt?: Maybe<IsoDateString>;
}
// export class PortalPropertyListingEntity extends AggregateRoot<PortalPropertyListingProps> { /* ... */ }
