// RUTA: libs/core/application/coapaiperassistance/src/lib/commands/delete-indexed-document.command.ts
// TODO: [LIA Legacy - Implementar DeleteIndexedDocumentCommand]
// Propósito: Comando para eliminar un documento de la base de conocimiento RAG.
// Relacionado con Casos de Uso: BP-AIPER-RAG-002 (Eliminar Documento Indexado)
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, AggregateId, UserId } from '@dfs-suite/shtypes';

export interface DeleteIndexedDocumentCommandPayload {
  readonly tenantId: TenantId;
  readonly documentId: AggregateId; // ID de KnowledgeDocumentEntity
  readonly initiatedByUserId?: UserId;
}
export class DeleteIndexedDocumentCommand
  extends CommandBase
  implements DeleteIndexedDocumentCommandPayload
{
  readonly tenantId: TenantId;
  readonly documentId: AggregateId;
  readonly initiatedByUserId?: UserId;
  constructor(
    payload: DeleteIndexedDocumentCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    this.tenantId = payload.tenantId;
    this.documentId = payload.documentId;
    this.initiatedByUserId = payload.initiatedByUserId;
  }
}
