// libs/shared/shtypes/src/lib/domains/educa-content/educa-content.types.ts
import {
  EnhancedBrand,
  type BrandMetadata,
} from '../../core/enhanced-brand.type';

// --- EducationalContentId ---
export const EDUCATIONAL_CONTENT_ID_METADATA: BrandMetadata = {
  description: 'Unique identifier for a piece of educational content.',
  example: 'edu_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type EducationalContentId = EnhancedBrand<
  string,
  'EducationalContentId',
  typeof EDUCATIONAL_CONTENT_ID_METADATA
>;

// --- ContentCategoryId ---
export const CONTENT_CATEGORY_ID_METADATA: BrandMetadata = {
  description: 'Unique identifier for a category of educational content.',
  example: 'cat_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type ContentCategoryId = EnhancedBrand<
  string,
  'ContentCategoryId',
  typeof CONTENT_CATEGORY_ID_METADATA
>;
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/domains/educa-content/educa-content.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmada la definición de Branded IDs para el dominio `educa-content` en `shtypes`.", "justificacion": "Centralización de IDs.", "impacto": "Disponibilidad de estos tipos para todo el sistema." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
