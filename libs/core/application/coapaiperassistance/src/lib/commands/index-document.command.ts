// RUTA: libs/core/application/coapaiperassistance/src/lib/commands/index-document.command.ts
// TODO: [LIA Legacy - Implementar IndexDocumentCommand]
// Propósito: Comando para iniciar la indexación de un documento en la base de conocimiento del tenant (RAG).
// Relacionado con Casos de Uso: BP-AIPER-RAG-001 (Indexar Documento)

import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, AggregateId } from '@dfs-suite/shtypes';

export interface IndexDocumentCommandPayload {
  readonly tenantId: TenantId;
  readonly documentId: AggregateId; // ID de la KnowledgeDocumentEntity
  readonly fileReference: string; // Path en storage, URL, o contenido base64
  readonly originalFileName: string;
  readonly documentType: string; // Ej: 'SPE_DETAILS', 'FAQ_INTERNAL'
  readonly initiatedByUserId?: UserId;
}

export class IndexDocumentCommand
  extends CommandBase
  implements IndexDocumentCommandPayload
{
  readonly tenantId: TenantId;
  readonly documentId: AggregateId;
  readonly fileReference: string;
  readonly originalFileName: string;
  readonly documentType: string;
  readonly initiatedByUserId?: UserId;

  constructor(
    payload: IndexDocumentCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    this.tenantId = payload.tenantId;
    this.documentId = payload.documentId;
    this.fileReference = payload.fileReference;
    this.originalFileName = payload.originalFileName;
    this.documentType = payload.documentType;
    this.initiatedByUserId = payload.initiatedByUserId;
  }
}
