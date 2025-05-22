// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-qualification-result.dto.ts
import { ELeadStatus } from '@dfs-suite/codoleadsflow';
import { LeadId, Maybe, ObjectLiteral } from '@dfs-suite/shtypes';

export interface LeadQualificationResultDto {
  leadId: LeadId;
  oldScore: number;
  newScore: number;
  oldStatus: ELeadStatus;
  newStatus: ELeadStatus; // Podría cambiar el estado también
  qualificationDetails?: Maybe<ObjectLiteral>; // Factores, resultado IA
}
// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-qualification-result.dto.ts
