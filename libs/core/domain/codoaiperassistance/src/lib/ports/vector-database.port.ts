// RUTA: libs/core/domain/codoaiperassistance/src/lib/ports/vector-database.port.ts
// TODO: [LIA Legacy - Finalizar definición de IVectorDatabasePort]
// Propósito: Puerto para interactuar con una base de datos vectorial (almacenar y buscar chunks/embeddings).
// Relacionado con Casos de Uso: IndexTenantDocumentUseCase, ProcessAiperChatPromptUseCase (RAG).

import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { AggregateId, TenantId } from '@dfs-suite/shtypes';

import { KnowledgeChunk } from '../types/knowledge-chunk.type';

export interface VectorSearchFilter {
  // Ejemplo, puede variar mucho según la DB vectorial
  documentType?: string;
  tags?: string[];
  createdAtBefore?: Date;
  // ...otros campos de metadata de KnowledgeChunk
}

export const VECTOR_DATABASE_PORT = Symbol('IVectorDatabasePort');

export interface IVectorDatabasePort {
  // Prepara la colección/tabla para un tenant si no existe (idempotente)
  // ensureCollectionReady(tenantId: TenantId): Promise<Result<void, ExceptionBase | Error>>;

  addChunks(
    tenantId: TenantId,
    chunks: KnowledgeChunk[]
  ): Promise<Result<string[], ExceptionBase | Error>>; // Devuelve IDs de los chunks añadidos

  searchSimilarChunks(
    tenantId: TenantId,
    queryVector: number[],
    topK: number,
    minSimilarityScore?: number, // Opcional
    filters?: VectorSearchFilter
  ): Promise<Result<KnowledgeChunk[], ExceptionBase | Error>>;

  deleteChunksByDocumentId(
    tenantId: TenantId,
    documentId: AggregateId
  ): Promise<Result<void, ExceptionBase | Error>>;
  // deleteChunkById(tenantId: TenantId, chunkId: string): Promise<Result<void, ExceptionBase | Error>>;
  // updateChunk(tenantId: TenantId, chunk: KnowledgeChunk): Promise<Result<void, ExceptionBase | Error>>; // Menos común
}
