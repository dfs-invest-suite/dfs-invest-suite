// libs/shared/shtypes/src/lib/domains/portal-content/portal-content.types.ts
import {
  EnhancedBrand,
  type BrandMetadata,
} from '../../core/enhanced-brand.type';

// --- PropertyListingId ---
export const PROPERTY_LISTING_ID_METADATA: BrandMetadata = {
  description: 'Unique identifier for a property listing in the tenant portal.',
  example: 'prop_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type PropertyListingId = EnhancedBrand<
  string,
  'PropertyListingId',
  typeof PROPERTY_LISTING_ID_METADATA
>;

// --- PortalAppearanceConfigId ---
export const PORTAL_APPEARANCE_CONFIG_ID_METADATA: BrandMetadata = {
  description:
    "Unique identifier for a tenant's portal appearance configuration.",
  example: 'pcfg_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type PortalAppearanceConfigId = EnhancedBrand<
  string,
  'PortalAppearanceConfigId',
  typeof PORTAL_APPEARANCE_CONFIG_ID_METADATA
>;

// --- AssetId (para Banco de Assets del Portal) ---
export const ASSET_ID_METADATA: BrandMetadata = {
  description:
    "Unique identifier for a shared asset (image, document) in the tenant's asset bank.",
  example: 'asset_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type AssetId = EnhancedBrand<
  string,
  'AssetId',
  typeof ASSET_ID_METADATA
>;

// --- SPEId (si se modela como entidad separada, relacionada a PropertyListing) ---
export const SPE_ID_METADATA: BrandMetadata = {
  description:
    'Unique identifier for a Sociedade de Propósito Específico (SPE).',
  example: 'spe_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type SPEId = EnhancedBrand<string, 'SPEId', typeof SPE_ID_METADATA>;
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/domains/portal-content/portal-content.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmada la definición de Branded IDs para el dominio `portal-content` en `shtypes`.", "justificacion": "Centralización de IDs.", "impacto": "Disponibilidad de estos tipos para todo el sistema." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
