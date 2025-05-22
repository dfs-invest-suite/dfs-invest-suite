// libs/shared/shtypes/src/lib/domains/billing/billing.types.ts
import {
  EnhancedBrand,
  type BrandMetadata,
} from '../../core/enhanced-brand.type';

// --- BillingPlanId ---
export const BILLING_PLAN_ID_METADATA: BrandMetadata = {
  description: 'Unique identifier for a subscription billing plan.',
  example: 'plan_standard_monthly_v1',
  since: '1.0.0',
};
export type BillingPlanId = EnhancedBrand<
  string,
  'BillingPlanId',
  typeof BILLING_PLAN_ID_METADATA
>;

// --- BilledUsageId ---
export const BILLED_USAGE_ID_METADATA: BrandMetadata = {
  description:
    'Unique identifier for a specific billed usage record (e.g., a WhatsApp conversation).',
  example: 'usage_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type BilledUsageId = EnhancedBrand<
  string,
  'BilledUsageId',
  typeof BILLED_USAGE_ID_METADATA
>;

// --- PricingRateId (Para tarifas de WhatsApp, si las almacenamos) ---
export const PRICING_RATE_ID_METADATA: BrandMetadata = {
  description:
    'Unique identifier for a specific pricing rate (e.g., for a WhatsApp message category/country).',
  example: 'rate_wa_utility_br_202501',
  since: '1.0.0',
};
export type PricingRateId = EnhancedBrand<
  string,
  'PricingRateId',
  typeof PRICING_RATE_ID_METADATA
>;
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/domains/billing/billing.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmada la definición de Branded IDs para el dominio `billing` en `shtypes`.", "justificacion": "Centralización de IDs.", "impacto": "Disponibilidad." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
