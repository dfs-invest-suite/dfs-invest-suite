// RUTA: libs/core/domain/codoaiperassistance/src/lib/entities/knowledge-document.entity.ts
// TODO: [LIA Legacy - Implementar KnowledgeDocumentEntity]
// Propósito: Representa un documento que ha sido (o será) procesado e indexado
//            en la base de datos vectorial para la funcionalidad RAG de Aiper.
// import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
// import { TenantId, IsoDateString, Maybe } from '@dfs-suite/shtypes';
// import { DocumentStatusVO } from '../value-objects/document-status.vo';

export interface KnowledgeDocumentProps {
  // tenantId: TenantId; // Implícito
  originalFileName: string;
  storagePathOrUrl: string; // Dónde está almacenado el archivo original
  documentType: string; // Ej: 'SPE_DETAILS', 'FAQ_INTERNAL', 'PROPERTY_BROCHURE'
  status: DocumentStatusVO;
  totalChunks?: Maybe<number>;
  indexedAt?: Maybe<IsoDateString>;
  lastError?: Maybe<string>;
  // metadata?: Maybe<Record<string, any>>; // Para filtros adicionales
}
// export class KnowledgeDocumentEntity extends AggregateRoot<KnowledgeDocumentProps> { /* ... */ }
