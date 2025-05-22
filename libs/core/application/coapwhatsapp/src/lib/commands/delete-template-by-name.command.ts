// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/delete-template-by-name.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, WabaId, Maybe } from '@dfs-suite/shtypes';

export interface DeleteTemplateByNameCommandPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  templateName: string;
  languageToDelete?: Maybe<string>;
  deletedByUserId: UserId;
}

export class DeleteTemplateByNameCommand extends CommandBase<DeleteTemplateByNameCommandPayload> {
  constructor(
    payload: DeleteTemplateByNameCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/delete-template-by-name.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS: N/A (Archivo nuevo) */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
