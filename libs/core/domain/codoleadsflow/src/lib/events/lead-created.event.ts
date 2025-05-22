// RUTA: libs/core/domain/codoleadsflow/src/lib/events/lead-created.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  LeadId,
  CorrelationId,
  Maybe,
  UserId,
  EmailString,
  PhoneNumberString,
} from '@dfs-suite/shtypes';

import { ELeadSourceChannel } from '../value-objects/lead-source-channel.vo';
import { ELeadStatus } from '../value-objects/lead-status.vo';

export interface LeadCreatedPayload {
  tenantId: TenantId;
  leadId: LeadId;
  correlationId: CorrelationId;
  name?: Maybe<string>;
  email?: Maybe<EmailString>;
  phoneNumber?: Maybe<PhoneNumberString>;
  sourceChannel: ELeadSourceChannel;
  status: ELeadStatus;
  score: number;
  createdByUserId?: Maybe<UserId>;
}

export class LeadCreatedEvent extends DomainEventBase<LeadCreatedPayload> {
  constructor(props: DomainEventProps<LeadCreatedPayload>) {
    super(props); // aggregateId ya está en props y debería ser leadId
  }
}
// RUTA: libs/core/domain/codoleadsflow/src/lib/events/lead-created.event.ts
