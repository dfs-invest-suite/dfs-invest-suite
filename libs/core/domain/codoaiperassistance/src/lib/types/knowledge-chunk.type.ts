// RUTA: libs/core/domain/codoaiperassistance/src/lib/types/knowledge-chunk.type.ts
// TODO: [LIA Legacy - Finalizar definición de KnowledgeChunk]
// Propósito: Representa un fragmento de texto de un documento, con su embedding y metadatos,
//            para ser almacenado y recuperado de una base de datos vectorial (RAG).
// Relacionado con Casos de Uso: IndexTenantDocumentUseCase, IVectorDatabasePort.
import { TenantId, AggregateId, Maybe } from '@dfs-suite/shtypes';

export interface KnowledgeChunk {
  readonly id: string; // UUID para el chunk, generado por la aplicación o la DB vectorial
  readonly documentId: AggregateId; // ID de la KnowledgeDocumentEntity a la que pertenece
  readonly tenantId: TenantId; // Para aislamiento de datos en la DB vectorial
  readonly textContent: string; // El contenido textual del chunk
  readonly embedding: number[]; // El vector de embedding del textContent
  readonly orderInDocument?: Maybe<number>; // Posición del chunk dentro del documento original
  readonly metadata?: Maybe<Record<string, string | number | boolean>>; // Metadatos adicionales para filtrado (ej. títulos de sección, página)
  readonly similarityScore?: Maybe<number>; // Añadido por la DB vectorial durante la búsqueda
}
