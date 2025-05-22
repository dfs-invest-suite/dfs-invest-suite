// RUTA: libs/core/domain/codoleadsflow/src/lib/events/lead-assigned.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  LeadId,
  CorrelationId,
  UserId,
  Maybe,
} from '@dfs-suite/shtypes';

export interface LeadAssignedPayload {
  tenantId: TenantId;
  leadId: LeadId;
  correlationId: CorrelationId;
  newAssignedUserId: UserId;
  previousAssignedUserId?: Maybe<UserId>;
  assignedByUserId: UserId; // Quién realizó la asignación
}

export class LeadAssignedEvent extends DomainEventBase<LeadAssignedPayload> {
  constructor(props: DomainEventProps<LeadAssignedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codoleadsflow/src/lib/events/lead-assigned.event.ts
