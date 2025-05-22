// libs/shared/shtypes/src/lib/domains/whatsapp/whatsapp.types.ts
import {
  EnhancedBrand,
  type BrandMetadata,
} from '../../core/enhanced-brand.type';

// --- WhatsAppAccountId ---
export const WHATSAPP_ACCOUNT_ID_METADATA: BrandMetadata & {
  formatHint?: string;
} = {
  description:
    "Meta's Phone Number ID for a WhatsApp Business Account number. Represents a specific phone line.",
  example: '123456789012345',
  formatHint: 'Usually a large integer as a string.',
  since: '1.0.0',
};
export type WhatsAppAccountId = EnhancedBrand<
  string,
  'WhatsAppAccountId',
  typeof WHATSAPP_ACCOUNT_ID_METADATA
>;

// --- WabaId ---
export const WABA_ID_METADATA: BrandMetadata & { formatHint?: string } = {
  description:
    "Meta's WhatsApp Business Account (WABA) ID. Represents the business account.",
  example: '987654321098765',
  formatHint: 'Usually a large integer as a string.',
  since: '1.0.0',
};
export type WabaId = EnhancedBrand<string, 'WabaId', typeof WABA_ID_METADATA>;

// --- MessageTemplateId (HSM ID) ---
export const MESSAGE_TEMPLATE_ID_METADATA: BrandMetadata & {
  formatHint?: string;
} = {
  description:
    "Meta's Message Template ID (HSM ID). Can be the numeric ID or the template name itself in some API contexts.",
  example: 'hsm_123456789 or my_template_name',
  formatHint: 'String, often numeric but can be a name.',
  since: '1.0.0',
};
export type MessageTemplateId = EnhancedBrand<
  string,
  'MessageTemplateId',
  typeof MESSAGE_TEMPLATE_ID_METADATA
>;

// --- MessageLogId (Nuestro ID Interno) ---
export const MESSAGE_LOG_ID_METADATA: BrandMetadata = {
  description:
    'Internal unique identifier for a Message Log entry within DFS Invest Suite.',
  example: 'msglg_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type MessageLogId = EnhancedBrand<
  string,
  'MessageLogId',
  typeof MESSAGE_LOG_ID_METADATA
>;
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/domains/whatsapp/whatsapp.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de Branded IDs (`WhatsAppAccountId`, `WabaId`, `MessageTemplateId`, `MessageLogId`) directamente en `shtypes` bajo su propio subdirectorio de dominio.", "justificacion": "Centraliza la definición de todos los Branded IDs en `shtypes`, eliminando dependencias circulares.", "impacto": "Resuelve errores `TS2305` relacionados con estos IDs en otras librerías." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
