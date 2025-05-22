// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/sync-single-template-from-meta.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import {
  TenantId,
  UserId,
  WabaId,
  MessageTemplateId as HsmId,
} from '@dfs-suite/shtypes';

export interface SyncSingleTemplateFromMetaCommandPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  hsmId: HsmId; // El ID de la plantilla en Meta
  triggeredByUserId?: UserId; // Opcional, si es una acción manual
}

export class SyncSingleTemplateFromMetaCommand extends CommandBase<SyncSingleTemplateFromMetaCommandPayload> {
  constructor(
    payload: SyncSingleTemplateFromMetaCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/sync-single-template-from-meta.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS: N/A (Archivo nuevo) */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
