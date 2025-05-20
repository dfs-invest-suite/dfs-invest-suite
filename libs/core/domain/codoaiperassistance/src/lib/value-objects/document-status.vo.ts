// RUTA: libs/core/domain/codoaiperassistance/src/lib/value-objects/document-status.vo.ts
// TODO: [LIA Legacy - Implementar lógica adicional si es necesaria para DocumentStatusVO]
// Propósito: Value Object para el estado de un documento en el proceso de indexación RAG.
// Relacionado con Casos de Uso: IndexTenantDocumentUseCase, ListIndexedDocumentsQuery.

import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export enum EDocumentStatus {
  PENDING_UPLOAD = 'PENDING_UPLOAD', // Archivo aún no subido a storage
  UPLOADED = 'UPLOADED', // Archivo subido, pendiente de procesamiento
  PENDING_PROCESSING = 'PENDING_PROCESSING', // En cola para extracción de texto y chunking
  PROCESSING_TEXT = 'PROCESSING_TEXT', // Extrayendo texto
  PROCESSING_CHUNKS = 'PROCESSING_CHUNKS', // Dividiendo en chunks
  PENDING_EMBEDDING = 'PENDING_EMBEDDING', // Chunks listos para generar embeddings
  GENERATING_EMBEDDINGS = 'GENERATING_EMBEDDINGS',
  PENDING_INDEXING = 'PENDING_INDEXING', // Embeddings generados, listos para DB vectorial
  INDEXING = 'INDEXING', // Guardando en DB vectorial
  INDEXED = 'INDEXED', // Proceso completado exitosamente
  ERROR_UPLOAD = 'ERROR_UPLOAD',
  ERROR_PROCESSING = 'ERROR_PROCESSING', // Error en extracción de texto o chunking
  ERROR_EMBEDDING = 'ERROR_EMBEDDING',
  ERROR_INDEXING = 'ERROR_INDEXING',
  DELETING = 'DELETING', // En proceso de eliminación de la DB vectorial y storage
  DELETED = 'DELETED',
  ARCHIVED = 'ARCHIVED', // No se usa para RAG pero se conserva el registro
}

export class DocumentStatusVO extends ValueObject<EDocumentStatus> {
  constructor(value: EDocumentStatus) {
    super({ value });
  }

  public get value(): EDocumentStatus {
    return this.props.value;
  }

  protected validate(props: { value: EDocumentStatus }): void {
    if (!Object.values(EDocumentStatus).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid document status: "${props.value}".`
      );
    }
  }

  public static pendingUpload(): DocumentStatusVO {
    return new DocumentStatusVO(EDocumentStatus.PENDING_UPLOAD);
  }
  public static uploaded(): DocumentStatusVO {
    return new DocumentStatusVO(EDocumentStatus.UPLOADED);
  }
  public static pendingProcessing(): DocumentStatusVO {
    return new DocumentStatusVO(EDocumentStatus.PENDING_PROCESSING);
  }
  public static indexed(): DocumentStatusVO {
    return new DocumentStatusVO(EDocumentStatus.INDEXED);
  }
  // ... métodos factory para otros estados

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

/* SECCIÓN DE MEJORAS FUTURAS
[
  { "mejora": "Añadir transiciones de estado válidas (ej. un documento 'INDEXED' no puede pasar a 'PENDING_UPLOAD').", "justificacion": "Mayor robustez del modelo de estado.", "impacto": "Más lógica en la entidad KnowledgeDocumentEntity para gestionar estas transiciones." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
