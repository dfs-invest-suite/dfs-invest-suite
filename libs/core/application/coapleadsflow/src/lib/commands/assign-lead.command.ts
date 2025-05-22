// RUTA: libs/core/application/coapleadsflow/src/lib/commands/assign-lead.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { LeadId, TenantId, UserId, Maybe } from '@dfs-suite/shtypes';

export interface AssignLeadCommandPayload {
  readonly tenantId: TenantId;
  readonly leadId: LeadId;
  readonly targetUserId: Maybe<UserId>; // ID del consultor. Si es null, se podría desasignar o usar lógica de "roleta".
  readonly assignedByUserId: UserId; // Quién realiza la asignación (supervisor o sistema)
  readonly assignmentMethod?: 'MANUAL' | 'ROUND_ROBIN' | 'AI_SUGGESTION'; // Cómo se eligió el targetUserId
}

export class AssignLeadCommand extends CommandBase<AssignLeadCommandPayload> {
  constructor(payload: AssignLeadCommandPayload, metadata: ICommandMetadata) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/commands/assign-lead.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de AssignLeadCommand.", "justificacion": "Comando para asignar o reasignar un lead a un consultor.", "impacto": "Gestión del pipeline de ventas." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
