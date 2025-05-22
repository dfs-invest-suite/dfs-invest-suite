// RUTA: libs/core/domain/codoportalcontent/src/lib/entities/portal-property-listing.entity.ts
import { AssetId, IsoDateString, Maybe, UrlString } from '@dfs-suite/shtypes';

// Importar VOs locales
import { PropertyAddressVO } from '../value-objects/property-address.vo';
import { PropertyFeaturesVO } from '../value-objects/property-features.vo';
import { PropertyStatusPublicVO } from '../value-objects/property-status-public.vo';
import { SeoMetadataVO } from '../value-objects/seo-metadata.vo';
// import { PortalAssetEntity } from './portal-asset.entity'; // Para referencia futura

export interface PortalPropertyListingProps {
  // tenantId: TenantId; // Implícito
  title: string;
  slug: string;
  description: string;
  propertyType: string;
  statusPublic: PropertyStatusPublicVO;
  address?: Maybe<PropertyAddressVO>; // Dirección es opcional aquí, pero podría ser mandatoria.
  features?: Maybe<PropertyFeaturesVO>;
  priceOrValueRange?: Maybe<string>;
  galleryAssetIds?: Maybe<AssetId[]>;
  mainImageBannerAssetId?: Maybe<AssetId>;
  documentAssetIds?: Maybe<AssetId[]>;
  videoUrl?: Maybe<UrlString>; // Usar UrlString
  seoMetadata?: Maybe<SeoMetadataVO>;
  isFeatured?: boolean;
  publishedAt?: Maybe<IsoDateString>;
}

// Placeholder de la entidad
export class PortalPropertyListingEntity /* extends AggregateRoot<PortalPropertyListingProps, PropertyListingId> */ {
  public props: PortalPropertyListingProps;
  constructor(props: PortalPropertyListingProps) {
    this.props = props;
  }
  // TODO: Implementar lógica de entidad y factory create
}
// RUTA: libs/core/domain/codoportalcontent/src/lib/entities/portal-property-listing.entity.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadidas importaciones para VOs locales (`PropertyStatusPublicVO`, `PropertyAddressVO`, `PropertyFeaturesVO`, `SeoMetadataVO`) y tipos de `shtypes` (`Maybe`, `IsoDateString`, `UrlString`, `AssetId`).", "justificacion": "Resuelve los errores `no-undef`.", "impacto": "El archivo es sintácticamente correcto." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Esta entidad debe extender `AggregateRoot` y tener un factory `create`." },
  { "nota": "Los VOs `PropertyStatusPublicVO`, `PropertyAddressVO`, `PropertyFeaturesVO`, `SeoMetadataVO` deben estar definidos en `libs/core/domain/codoportalcontent/src/lib/value-objects/` y exportados." }
]
*/
