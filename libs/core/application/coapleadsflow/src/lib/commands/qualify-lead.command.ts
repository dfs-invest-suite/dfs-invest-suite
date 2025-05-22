// RUTA: libs/core/application/coapleadsflow/src/lib/commands/qualify-lead.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { LeadId, TenantId, Maybe, ObjectLiteral } from '@dfs-suite/shtypes';

export interface QualifyLeadCommandPayload {
  readonly tenantId: TenantId;
  readonly leadId: LeadId;
  readonly interactionText?: Maybe<string>; // Texto de la última interacción para análisis IA
  readonly manualScoreOverride?: Maybe<number>; // Si un supervisor ajusta el score manualmente
  readonly qualificationSource:
    | 'AUTO_INTERACTION'
    | 'AI_ANALYSIS'
    | 'MANUAL_SUPERVISOR'
    | 'SYSTEM_RULE';
  readonly additionalContext?: Maybe<ObjectLiteral>; // Para pasar más datos al motor de calificación
}

export class QualifyLeadCommand extends CommandBase<QualifyLeadCommandPayload> {
  constructor(payload: QualifyLeadCommandPayload, metadata: ICommandMetadata) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapleadsflow/src/lib/commands/qualify-lead.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de QualifyLeadCommand.", "justificacion": "Comando para (re)calificar un lead, ya sea automáticamente o manualmente.", "impacto": "Permite la evolución del score y estado del lead." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
