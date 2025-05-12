// libs/core/domain/shared-kernel/events/src/lib/domain-event.base.ts
import { UuidUtils } from '@dfs-suite/shared-utils';
import { IDomainEvent, IDomainEventMetadata } from './domain-event.interface';
import { AggregateId, CorrelationId, IsoDateString, Maybe, UserId } from '@dfs-suite/shared-types';
import { Guard } from '@dfs-suite/shared-utils';
import { ArgumentNotProvidedException } from '@dfs-suite/shared-errors';

export type DomainEventProps<Payload extends Record<string, unknown>> = {
  aggregateId: AggregateId;
  payload: Payload;
  metadata?: Partial<Omit<IDomainEventMetadata, 'timestamp' | 'correlationId'>> & { correlationId?: CorrelationId };
};

export abstract class DomainEventBase<Payload extends Record<string, unknown> = Record<string, unknown>> implements IDomainEvent<Payload> {
  public readonly id: AggregateId;
  public readonly aggregateId: AggregateId;
  public readonly eventName: string;
  public readonly metadata: Readonly<IDomainEventMetadata>; // Hecho Readonly
  public readonly payload: Readonly<Payload>;

  protected constructor(props: DomainEventProps<Payload>) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException('DomainEvent props should not be empty');
    }
    this.id = UuidUtils.generateAggregateId();
    this.eventName = this.constructor.name;
    this.aggregateId = props.aggregateId;
    this.payload = Object.freeze(props.payload);

    const now = new Date().toISOString() as IsoDateString;

    let contextCorrelationId: CorrelationId;
    const placeholderCorrId = 'CONTEXT_CORRELATION_ID_EVENT_PLACEHOLDER';
    if (typeof placeholderCorrId === 'string' && placeholderCorrId) {
        contextCorrelationId = placeholderCorrId as CorrelationId;
    } else {
        contextCorrelationId = UuidUtils.generateCorrelationId();
    }

    this.metadata = Object.freeze({
      timestamp: now,
      correlationId: props.metadata?.correlationId || contextCorrelationId,
      causationId: props.metadata?.causationId, // Maybe y UserId son usados aquí
      userId: props.metadata?.userId,           // por IDomainEventMetadata
    });
  }
}
