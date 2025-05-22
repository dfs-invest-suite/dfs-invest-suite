// RUTA: libs/core/domain/codoaiperassistance/src/lib/entities/knowledge-document.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import {
  KnowledgeDocumentId, // ID de esta entidad
  TenantId, // Para evento
  IsoDateString,
  Maybe,
  CorrelationId, // Para evento
  UserId, // Quién subió/indexó
  CidString, // Para IPFS
} from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';

import {
  DocumentStatusVO,
  EDocumentStatus,
} from '../value-objects/document-status.vo'; // <<< IMPORTAR
// import { DocumentIndexedEvent, DocumentDeletedFromIndexEvent } from '../events';

export interface KnowledgeDocumentProps {
  // tenantId: TenantId; // Implícito por DB
  originalFileName: string;
  storagePathOrUrl: string | CidString; // Dónde está el archivo original (S3 key, IPFS CID, o URL pública)
  storageType: 'S3' | 'IPFS' | 'URL' | 'LOCAL_TEXT'; // LOCAL_TEXT para contenido pegado directamente
  documentType: string; // Ej: 'SPE_DETAILS', 'FAQ_INTERNAL', 'PROPERTY_BROCHURE', 'CHAT_HISTORY_SUMMARY'
  status: DocumentStatusVO;
  totalChunks?: Maybe<number>;
  indexedAt?: Maybe<IsoDateString>;
  lastProcessingError?: Maybe<string>;
  uploadedByUserId?: Maybe<UserId>;
  metadata?: Maybe<Record<string, string | number | boolean>>; // Para filtros en DB vectorial
}

export interface CreateKnowledgeDocumentProps {
  tenantId: TenantId; // Para evento
  correlationId: CorrelationId; // Para evento
  originalFileName: string;
  storagePathOrUrl: string | CidString;
  storageType: 'S3' | 'IPFS' | 'URL' | 'LOCAL_TEXT';
  documentType: string;
  uploadedByUserId?: Maybe<UserId>;
  initialStatus?: EDocumentStatus; // Default PENDING_UPLOAD o UPLOADED
  metadata?: Maybe<Record<string, string | number | boolean>>;
}

export class KnowledgeDocumentEntity extends AggregateRoot<
  KnowledgeDocumentProps,
  KnowledgeDocumentId
> {
  constructor(
    createEntityProps: CreateEntityProps<
      KnowledgeDocumentProps,
      KnowledgeDocumentId
    >
  ) {
    super(createEntityProps);
  }

  public static create(
    props: CreateKnowledgeDocumentProps,
    id?: KnowledgeDocumentId
  ): KnowledgeDocumentEntity {
    // Validaciones...
    const docId = id || UuidUtils.generateKnowledgeDocumentId();
    const entityProps: KnowledgeDocumentProps = {
      originalFileName: props.originalFileName,
      storagePathOrUrl: props.storagePathOrUrl,
      storageType: props.storageType,
      documentType: props.documentType,
      status: DocumentStatusVO.create(
        props.initialStatus || EDocumentStatus.UPLOADED
      ),
      uploadedByUserId: props.uploadedByUserId,
      metadata: props.metadata,
    };
    const doc = new KnowledgeDocumentEntity({
      id: docId,
      props: entityProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Emitir DocumentUploadedForIndexingEvent
    return doc;
  }

  // Getters...
  // Métodos para cambiar estado (startProcessing, markAsIndexed, markAsError, etc.)
  public startProcessing(context: { correlationId: CorrelationId }): void {
    // Validar transición
    this.props.status = DocumentStatusVO.create(
      EDocumentStatus.PENDING_PROCESSING
    ); // o PROCESSING_TEXT
    this.setUpdatedAt();
    // Emitir evento
  }

  public markAsIndexed(
    chunkCount: number,
    indexedAt: IsoDateString,
    context: { correlationId: CorrelationId }
  ): void {
    this.props.status = DocumentStatusVO.create(EDocumentStatus.INDEXED);
    this.props.totalChunks = chunkCount;
    this.props.indexedAt = indexedAt;
    this.props.lastProcessingError = undefined; // Limpiar errores previos
    this.setUpdatedAt();
    // Emitir DocumentSuccessfullyIndexedEvent
  }

  public markAsError(
    errorMsg: string,
    currentProcessingStep: EDocumentStatus,
    context: { correlationId: CorrelationId }
  ): void {
    // Mapear currentProcessingStep a un EDocumentStatus de error apropiado
    this.props.status = DocumentStatusVO.create(EDocumentStatus.ERROR_INDEXING); // o más específico
    this.props.lastProcessingError = errorMsg;
    this.setUpdatedAt();
    // Emitir DocumentIndexingFailedEvent
  }

  public validate(): void {
    // ...
  }
}
// RUTA: libs/core/domain/codoaiperassistance/src/lib/entities/knowledge-document.entity.ts
