// libs/core/domain/codoleadsflow/src/lib/types/lead.types.ts
import { EnhancedBrand, type BrandMetadata } from '@dfs-suite/shtypes';

// --- LeadId ---
export const LEAD_ID_METADATA: BrandMetadata = {
  description:
    'Unique identifier for a Lead entity within the LeadsFlow domain.',
  example: 'lead_6a5f4e3d-2c1b-4b5a-8f0e-1d2c3b4a5e6f',
  since: '1.0.0',
};
export type LeadId = EnhancedBrand<string, 'LeadId', typeof LEAD_ID_METADATA>;

// --- InteractionId ---
export const INTERACTION_ID_METADATA: BrandMetadata = {
  description:
    'Unique identifier for a LeadInteraction entity within the LeadsFlow domain.',
  example: 'int_9b8c7d6e-5f4a-3b2c-1a0f-e1d2c3b4a5f6',
  since: '1.0.0',
};
export type InteractionId = EnhancedBrand<
  string,
  'InteractionId',
  typeof INTERACTION_ID_METADATA
>;
// FIN DEL ARCHIVO: libs/core/domain/codoleadsflow/src/lib/types/lead.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creación de tipos Branded `LeadId` e `InteractionId` específicos para el dominio `codoleadsflow`.", "justificacion": "Define identificadores únicos y semánticos para las entidades principales del dominio, utilizando `EnhancedBrand` de `shtypes` para la estructura y metadatos.", "impacto": "Mejora la seguridad de tipos y la claridad del código dentro del dominio y para sus consumidores." },
  { "mejora": "Inclusión de `BrandMetadata` con `description`, `example` y `since` para cada tipo.", "justificacion": "Proporciona documentación y contexto directamente en la definición del tipo.", "impacto": "Mejor DX y mantenibilidad." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  { "mejora": "Considerar añadir un prefijo (ej. `lead_`, `int_`) a los ejemplos o como parte de la metadata si se quiere seguir una convención de nombrado estricta para los IDs generados.", "justificacion": "Podría ayudar en la depuración y en la identificación rápida del tipo de ID.", "impacto": "Cambio menor en `BrandMetadata` y en los generadores de ID." }
]
*/
