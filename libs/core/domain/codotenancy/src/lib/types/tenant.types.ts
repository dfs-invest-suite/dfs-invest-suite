// RUTA: libs/shared/shtypes/src/lib/domains/tenant/tenant.types.ts
import { EnhancedBrand, type BrandMetadata } from '../core/enhanced-brand.type';

// Definimos la metadata específica para TenantId
const tenantIdMetadata: BrandMetadata = {
  description:
    'Unique identifier for a Tenant in the DFS Invest Suite platform.',
  example: 'tnt_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type TenantId = EnhancedBrand<
  string,
  'TenantId',
  typeof tenantIdMetadata
>;

// Definimos la metadata específica para TenantConfigKey
const tenantConfigKeyMetadata: BrandMetadata = {
  description: 'Key for a tenant-specific configuration entry.',
  example: 'WHATSAPP_API_TOKEN',
  since: '1.0.0',
};
export type TenantConfigKey = EnhancedBrand<
  string,
  'TenantConfigKey',
  typeof tenantConfigKeyMetadata
>;

// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/domains/tenant/tenant.types.ts
