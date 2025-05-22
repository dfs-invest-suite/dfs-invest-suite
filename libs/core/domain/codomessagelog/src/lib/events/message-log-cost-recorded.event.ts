// RUTA: libs/core/domain/codomessagelog/src/lib/events/message-log-cost-recorded.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  AggregateId,
  CorrelationId,
  Maybe,
  TenantId,
} from '@dfs-suite/shtypes';

export interface MessageLogCostRecordedPayload {
  readonly tenantId: TenantId;
  readonly messageLogId: AggregateId;
  readonly correlationId: CorrelationId;
  readonly costInCents: number;
  readonly currency: string;
  readonly pricingCategory?: Maybe<string>;
  readonly pricingModel?: Maybe<string>;
  readonly conversationId?: Maybe<string>;
}

export class MessageLogCostRecordedEvent extends DomainEventBase<MessageLogCostRecordedPayload> {
  constructor(props: DomainEventProps<MessageLogCostRecordedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codomessagelog/src/lib/events/message-log-cost-recorded.event.ts
