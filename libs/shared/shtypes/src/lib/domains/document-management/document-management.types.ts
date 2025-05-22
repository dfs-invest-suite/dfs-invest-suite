// libs/shared/shtypes/src/lib/domains/document-management/document-management.types.ts
import {
  EnhancedBrand,
  type BrandMetadata,
} from '../../core/enhanced-brand.type';

// --- DocumentId (para ManagedDocumentEntity) ---
export const DOCUMENT_ID_METADATA: BrandMetadata = {
  description: 'Unique identifier for a managed document in the system.',
  example: 'doc_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type DocumentId = EnhancedBrand<
  string,
  'DocumentId',
  typeof DOCUMENT_ID_METADATA
>;

// --- ContractTemplateId ---
export const CONTRACT_TEMPLATE_ID_METADATA: BrandMetadata = {
  description: 'Unique identifier for a contract template.',
  example: 'ctpl_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type ContractTemplateId = EnhancedBrand<
  string,
  'ContractTemplateId',
  typeof CONTRACT_TEMPLATE_ID_METADATA
>;

// --- SignatureRequestId ---
export const SIGNATURE_REQUEST_ID_METADATA: BrandMetadata = {
  description:
    'Unique identifier for a signature request associated with a document.',
  example: 'sigreq_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type SignatureRequestId = EnhancedBrand<
  string,
  'SignatureRequestId',
  typeof SIGNATURE_REQUEST_ID_METADATA
>;
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/domains/document-management/document-management.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmada la definición de Branded IDs para el dominio `document-management` en `shtypes`.", "justificacion": "Centralización de IDs.", "impacto": "Disponibilidad de estos tipos para todo el sistema." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
