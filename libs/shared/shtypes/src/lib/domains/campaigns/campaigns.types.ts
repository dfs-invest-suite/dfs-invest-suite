// libs/shared/shtypes/src/lib/domains/campaigns/campaigns.types.ts
import {
  EnhancedBrand,
  type BrandMetadata,
} from '../../core/enhanced-brand.type';

// --- CampaignId ---
export const CAMPAIGN_ID_METADATA: BrandMetadata = {
  description: 'Unique identifier for a marketing or nurturing campaign.',
  example: 'cmp_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type CampaignId = EnhancedBrand<
  string,
  'CampaignId',
  typeof CAMPAIGN_ID_METADATA
>;
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/domains/campaigns/campaigns.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmada la definición de `CampaignId` en `shtypes`.", "justificacion": "Centralización de IDs.", "impacto": "Disponibilidad." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
