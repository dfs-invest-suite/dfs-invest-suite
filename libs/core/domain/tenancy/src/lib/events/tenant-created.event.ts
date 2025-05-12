// libs/core/domain/tenancy/src/lib/events/tenant-created.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/core-domain-shared-kernel-events';
import { UserId } from '@dfs-suite/shared-types'; // TenantId se quita si aggregateId ya está bien tipado
import { TenantStatusEnum } from '../value-objects/tenant-status.vo';


export interface TenantCreatedEventPayload {
  readonly name: string;
  readonly ownerUserId: UserId;
  readonly status: TenantStatusEnum;
}

export class TenantCreatedEvent extends DomainEventBase<TenantCreatedEventPayload> {
  constructor(props: DomainEventProps<TenantCreatedEventPayload>) {
    super(props);
  }
}
