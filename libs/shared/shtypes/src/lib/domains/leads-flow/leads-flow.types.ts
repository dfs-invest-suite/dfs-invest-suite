// libs/shared/shtypes/src/lib/domains/leads-flow/leads-flow.types.ts
import {
  EnhancedBrand,
  type BrandMetadata,
} from '../../core/enhanced-brand.type';

// --- LeadId ---
export const LEAD_ID_METADATA: BrandMetadata = {
  description: 'Unique identifier for a Lead entity.',
  example: 'lead_6a5f4e3d-2c1b-4b5a-8f0e-1d2c3b4a5e6f',
  since: '1.0.0',
};
export type LeadId = EnhancedBrand<string, 'LeadId', typeof LEAD_ID_METADATA>;

// --- InteractionId ---
export const INTERACTION_ID_METADATA: BrandMetadata = {
  description: 'Unique identifier for a Lead Interaction entity.',
  example: 'int_9b8c7d6e-5f4a-3b2c-1a0f-e1d2c3b4a5f6',
  since: '1.0.0',
};
export type InteractionId = EnhancedBrand<
  string,
  'InteractionId',
  typeof INTERACTION_ID_METADATA
>;
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/domains/leads-flow/leads-flow.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `LeadId` e `InteractionId` directamente en `shtypes` bajo su propio subdirectorio de dominio.", "justificacion": "Rompe la dependencia circular donde `codoleadsflow` definía estos tipos y `shtypes` intentaba re-exportarlos. Ahora `shtypes` es la fuente de verdad para todos los Branded IDs.", "impacto": "Elimina la dependencia circular `shtypes -> codoleadsflow -> shtypes` y resuelve errores `TS2305` (X no tiene miembro exportado Y) en `codoleadsflow` para estos IDs." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
