// RUTA: libs/core/domain/codoleadsflow/src/lib/events/lead-qualified.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  LeadId,
  CorrelationId,
  Maybe,
  ObjectLiteral,
} from '@dfs-suite/shtypes';

export interface LeadQualifiedPayload {
  tenantId: TenantId;
  leadId: LeadId;
  correlationId: CorrelationId;
  newScore: number;
  oldScore?: Maybe<number>;
  qualificationDetails?: Maybe<ObjectLiteral>; // Ej. factores que influyeron, resultado de IA
}

export class LeadQualifiedEvent extends DomainEventBase<LeadQualifiedPayload> {
  constructor(props: DomainEventProps<LeadQualifiedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codoleadsflow/src/lib/events/lead-qualified.event.ts
