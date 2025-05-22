// RUTA: libs/core/domain/codomessagelog/src/lib/events/message-log-created.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  AggregateId, // MessageLogId
  CorrelationId,
  LeadId,
  TenantId,
} from '@dfs-suite/shtypes';

import { EMessageDirection } from '../value-objects/message-direction.vo';
import { EMessageInternalStatus } from '../value-objects/message-internal-status.vo';

export interface MessageLogCreatedPayload {
  readonly tenantId: TenantId;
  readonly messageLogId: AggregateId; // El ID de MessageLogEntity
  readonly correlationId: CorrelationId;
  readonly leadId: LeadId;
  readonly direction: EMessageDirection;
  readonly initialStatusInternal: EMessageInternalStatus;
}

export class MessageLogCreatedEvent extends DomainEventBase<MessageLogCreatedPayload> {
  constructor(props: DomainEventProps<MessageLogCreatedPayload>) {
    super(props); // aggregateId ya está en props
  }
}
// RUTA: libs/core/domain/codomessagelog/src/lib/events/message-log-created.event.ts
