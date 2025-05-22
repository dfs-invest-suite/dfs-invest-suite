// libs/shared/shtypes/src/lib/domains/tenant/tenant.types.ts
import {
  EnhancedBrand,
  type BrandMetadata,
} from '../../core/enhanced-brand.type';

// --- TenantId ---
export const TENANT_ID_METADATA: BrandMetadata = {
  description:
    'Unique identifier for a Tenant in the DFS Invest Suite platform.',
  example: 'tnt_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type TenantId = EnhancedBrand<
  string,
  'TenantId',
  typeof TENANT_ID_METADATA
>;

// --- TenantConfigKey ---
export const TENANT_CONFIG_KEY_METADATA: BrandMetadata = {
  description:
    'Key for a tenant-specific configuration entry (e.g., WHATSAPP_API_TOKEN, DB_CONNECTION_STRING).',
  example: 'WHATSAPP_API_TOKEN',
  since: '1.0.0',
};
export type TenantConfigKey = EnhancedBrand<
  string,
  'TenantConfigKey',
  typeof TENANT_CONFIG_KEY_METADATA
>;
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/domains/tenant/tenant.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmada la definición de `TenantId` y `TenantConfigKey` con `EnhancedBrand` y `BrandMetadata`.", "justificacion": "Establece la estructura estándar para los Branded IDs de dominio.", "impacto": "Claridad y consistencia." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
