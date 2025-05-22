// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/submit-template-for-approval.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import {
  TenantId,
  UserId,
  MessageTemplateId as HsmId,
} from '@dfs-suite/shtypes'; // Usamos HsmId como alias

export interface SubmitTemplateForApprovalCommandPayload {
  tenantId: TenantId;
  // Podría ser el ID de nuestro MessageTemplateRecordEntity o directamente el HSM ID si ya lo tenemos
  messageTemplateRecordId: HsmId; // o string si es nuestro ID interno
  submittedByUserId: UserId;
}

export class SubmitTemplateForApprovalCommand extends CommandBase<SubmitTemplateForApprovalCommandPayload> {
  constructor(
    payload: SubmitTemplateForApprovalCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/submit-template-for-approval.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS: N/A (Archivo nuevo) */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Decidir si se usa el ID interno de `MessageTemplateRecordEntity` o el `hsmId` de Meta."} ] */
