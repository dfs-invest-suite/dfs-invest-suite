// libs/shared/shtypes/src/lib/domains/aiper-assistance/aiper-assistance.types.ts
import {
  EnhancedBrand,
  type BrandMetadata,
} from '../../core/enhanced-brand.type';

// --- AiperConversationId ---
export const AIPER_CONVERSATION_ID_METADATA: BrandMetadata = {
  description: 'Unique identifier for an Aiper conversation session.',
  example: 'aiconv_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type AiperConversationId = EnhancedBrand<
  string,
  'AiperConversationId',
  typeof AIPER_CONVERSATION_ID_METADATA
>;

// --- AiperMessageId ---
export const AIPER_MESSAGE_ID_METADATA: BrandMetadata = {
  description:
    'Unique identifier for a single message within an Aiper conversation.',
  example: 'aimsg_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type AiperMessageId = EnhancedBrand<
  string,
  'AiperMessageId',
  typeof AIPER_MESSAGE_ID_METADATA
>;

// --- AiperSystemPromptId (ID de la AiperTenantConfigEntity/Identidad Aiper) ---
export const AIPER_SYSTEM_PROMPT_ID_METADATA: BrandMetadata = {
  description:
    'Unique identifier for an Aiper System Prompt configuration (Aiper Identity).',
  example: 'aisysp_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type AiperSystemPromptId = EnhancedBrand<
  string,
  'AiperSystemPromptId',
  typeof AIPER_SYSTEM_PROMPT_ID_METADATA
>;

// --- KnowledgeDocumentId (Para RAG) ---
export const KNOWLEDGE_DOCUMENT_ID_METADATA: BrandMetadata = {
  description:
    'Unique identifier for a document indexed in the Aiper RAG knowledge base.',
  example: 'kdoc_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type KnowledgeDocumentId = EnhancedBrand<
  string,
  'KnowledgeDocumentId',
  typeof KNOWLEDGE_DOCUMENT_ID_METADATA
>;

// --- KnowledgeChunkId (Para RAG) ---
export const KNOWLEDGE_CHUNK_ID_METADATA: BrandMetadata = {
  description:
    'Unique identifier for a specific chunk of a document in the Aiper RAG knowledge base.',
  example: 'kchk_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type KnowledgeChunkId = EnhancedBrand<
  string,
  'KnowledgeChunkId',
  typeof KNOWLEDGE_CHUNK_ID_METADATA
>;
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/domains/aiper-assistance/aiper-assistance.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmada la definición de Branded IDs para el dominio `aiper-assistance` en `shtypes`.", "justificacion": "Centralización de IDs.", "impacto": "Disponibilidad de estos tipos para todo el sistema." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
