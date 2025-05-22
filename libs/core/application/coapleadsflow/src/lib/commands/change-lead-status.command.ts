// RUTA: libs/core/application/coapleadsflow/src/lib/commands/change-lead-status.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { ELeadStatus } from '@dfs-suite/codoleadsflow';
import { LeadId, TenantId, UserId, Maybe } from '@dfs-suite/shtypes';

export interface ChangeLeadStatusCommandPayload {
  readonly tenantId: TenantId;
  readonly leadId: LeadId;
  readonly newStatus: ELeadStatus;
  readonly reason?: Maybe<string>; // Opcional, ej. para LOST_OPPORTUNITY
  readonly changedByUserId: UserId;
}

export class ChangeLeadStatusCommand extends CommandBase<ChangeLeadStatusCommandPayload> {
  constructor(
    payload: ChangeLeadStatusCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapleadsflow/src/lib/commands/change-lead-status.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de ChangeLeadStatusCommand.", "justificacion": "Comando para cambiar el estado de un lead en el pipeline.", "impacto": "Gestión del ciclo de vida del lead." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
