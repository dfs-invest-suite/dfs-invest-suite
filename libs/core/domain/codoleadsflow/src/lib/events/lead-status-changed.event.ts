// RUTA: libs/core/domain/codoleadsflow/src/lib/events/lead-status-changed.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  LeadId,
  CorrelationId,
  UserId,
  Maybe /* <<< AÑADIDO IMPORT */,
} from '@dfs-suite/shtypes';

import { ELeadStatus } from '../value-objects/lead-status.vo';

export interface LeadStatusChangedPayload {
  tenantId: TenantId;
  leadId: LeadId;
  correlationId: CorrelationId;
  newStatus: ELeadStatus;
  oldStatus: ELeadStatus;
  changedByUserId: UserId;
  reason?: Maybe<string>;
}

export class LeadStatusChangedEvent extends DomainEventBase<LeadStatusChangedPayload> {
  constructor(props: DomainEventProps<LeadStatusChangedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codoleadsflow/src/lib/events/lead-status-changed.event.ts
