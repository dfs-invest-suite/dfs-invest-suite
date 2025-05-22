// RUTA: libs/core/domain/codoaiperassistance/src/lib/value-objects/document-status.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export enum EDocumentStatus {
  PENDING_UPLOAD = 'PENDING_UPLOAD',
  UPLOADED = 'UPLOADED',
  PENDING_PROCESSING = 'PENDING_PROCESSING',
  PROCESSING_TEXT = 'PROCESSING_TEXT',
  PROCESSING_CHUNKS = 'PROCESSING_CHUNKS',
  PENDING_EMBEDDING = 'PENDING_EMBEDDING',
  GENERATING_EMBEDDINGS = 'GENERATING_EMBEDDINGS',
  PENDING_INDEXING = 'PENDING_INDEXING',
  INDEXING = 'INDEXING',
  INDEXED = 'INDEXED',
  ERROR_UPLOAD = 'ERROR_UPLOAD',
  ERROR_PROCESSING = 'ERROR_PROCESSING',
  ERROR_EMBEDDING = 'ERROR_EMBEDDING',
  ERROR_INDEXING = 'ERROR_INDEXING',
  DELETING = 'DELETING',
  DELETED = 'DELETED',
  ARCHIVED = 'ARCHIVED',
}

export class DocumentStatusVO extends ValueObject<EDocumentStatus> {
  constructor(value: EDocumentStatus) {
    // El constructor espera el valor primitivo directamente
    super({ value });
  }

  public get value(): EDocumentStatus {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<EDocumentStatus>): void {
    if (!Object.values(EDocumentStatus).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid document status: "${props.value}".`
      );
    }
  }

  public static create(status: EDocumentStatus): DocumentStatusVO {
    return new DocumentStatusVO(status);
  }
  // ... (métodos helper como isErrorState, isInProgress) ...
  public isInProgress(): boolean {
    return [
      EDocumentStatus.UPLOADED,
      EDocumentStatus.PENDING_PROCESSING,
      EDocumentStatus.PROCESSING_TEXT,
      EDocumentStatus.PROCESSING_CHUNKS,
      EDocumentStatus.PENDING_EMBEDDING,
      EDocumentStatus.GENERATING_EMBEDDINGS,
      EDocumentStatus.PENDING_INDEXING,
      EDocumentStatus.INDEXING,
      EDocumentStatus.DELETING,
    ].includes(this.props.value);
  }

  public isErrorState(): boolean {
    return [
      EDocumentStatus.ERROR_UPLOAD,
      EDocumentStatus.ERROR_PROCESSING,
      EDocumentStatus.ERROR_EMBEDDING,
      EDocumentStatus.ERROR_INDEXING,
    ].includes(this.props.value);
  }
}
// RUTA: libs/core/domain/codoaiperassistance/src/lib/value-objects/document-status.vo.ts
