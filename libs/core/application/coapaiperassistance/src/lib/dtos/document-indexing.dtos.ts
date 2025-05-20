// RUTA: libs/core/application/coapaiperassistance/src/lib/dtos/document-indexing.dtos.ts
// TODO: [LIA Legacy - Implementar DocumentIndexingDtos]
// Propósito: DTOs para la indexación y gestión de documentos RAG.
// Relacionado con Casos de Uso: IndexTenantDocumentUseCase, DeleteIndexedDocumentUseCase, ListIndexedDocumentsQuery
import {
  AggregateId,
  IsoDateString,
  Maybe,
  TenantId,
} from '@dfs-suite/shtypes';

export interface DocumentUploadInputDto {
  // Para iniciar la indexación
  readonly tenantId: TenantId;
  readonly originalFileName: string;
  readonly fileReference: string; // URL al archivo, o path temporal si se sube al backend
  readonly documentType: string; // Categoría/tipo del documento
}

export interface IndexedDocumentDto {
  readonly id: AggregateId; // ID de KnowledgeDocumentEntity
  readonly tenantId: TenantId;
  readonly originalFileName: string;
  readonly documentType: string;
  readonly status: string; // (PENDING_INDEXING, INDEXED, ERROR, DELETED) - string del VO
  readonly indexedAt?: Maybe<IsoDateString>;
  readonly totalChunks?: Maybe<number>;
  readonly lastError?: Maybe<string>;
}
