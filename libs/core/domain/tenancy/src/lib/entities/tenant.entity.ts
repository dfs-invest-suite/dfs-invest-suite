// libs/core/domain/tenancy/src/lib/entities/tenant.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/core-domain-shared-kernel-entities';
import { ArgumentInvalidException, ArgumentNotProvidedException } from '@dfs-suite/shared-errors';
import { TenantId, UserId, Maybe } from '@dfs-suite/shared-types'; // Quitamos AggregateId e IsoDateString no usados aquí directamente
import { UuidUtils, Guard } from '@dfs-suite/shared-utils';
import { TenantStatusVO, TenantStatusEnum } from '../value-objects/tenant-status.vo';
// import { DbConnectionConfigVO } from '../value-objects/db-connection-config.vo';
import { TenantCreatedEvent, TenantCreatedEventPayload } from '../events/tenant-created.event';
import { TenantActivatedEvent, TenantActivatedEventPayload } from '../events/tenant-activated.event';
import { TenantSuspendedEvent, TenantSuspendedEventPayload } from '../events/tenant-suspended.event';

interface TenantProps {
  name: string;
  ownerUserId: UserId;
  status: TenantStatusVO;
  planId: Maybe<string>;
  // dbConnectionConfig?: DbConnectionConfigVO;
}

interface CreateTenantProps {
  name: string;
  ownerUserId: UserId;
  planId?: Maybe<string>;
}

export class TenantEntity extends AggregateRoot<TenantProps> {
  constructor(createEntityProps: CreateEntityProps<TenantProps>) {
    super(createEntityProps);
  }

  public static create(props: CreateTenantProps, id?: TenantId): TenantEntity {
    if (Guard.isEmpty(props.name)) {
      throw new ArgumentNotProvidedException('Tenant name cannot be empty');
    }
    if (Guard.isEmpty(props.ownerUserId)) {
      throw new ArgumentNotProvidedException('Tenant ownerUserId cannot be empty');
    }

    const tenantId = id || UuidUtils.generateTenantId();
    const initialStatus = TenantStatusVO.newPendingSetup();
    const tenant = new TenantEntity({
      id: tenantId,
      props: {
        name: props.name,
        ownerUserId: props.ownerUserId,
        status: initialStatus,
        planId: props.planId || null,
      },
    });

    const eventPayload: TenantCreatedEventPayload = {
        name: tenant.props.name,
        ownerUserId: tenant.props.ownerUserId,
        status: initialStatus.value,
    };
    tenant.addEvent(
      new TenantCreatedEvent({
        aggregateId: tenantId,
        payload: eventPayload,
      }),
    );
    return tenant;
  }

  get name(): string {
    return this.props.name;
  }
  get ownerUserId(): UserId {
    return this.props.ownerUserId;
  }
  get status(): TenantStatusVO {
    return this.props.status;
  }
  get planId(): Maybe<string> {
    return this.props.planId;
  }

  public activate(): void {
    if (this.props.status.value === TenantStatusEnum.ACTIVE) {
      return;
    }
    if (this.props.status.value !== TenantStatusEnum.PENDING_SETUP && this.props.status.value !== TenantStatusEnum.SUSPENDED) {
      throw new ArgumentInvalidException(
        `Cannot activate tenant from status ${String(this.props.status.value)}` // CORREGIDO: String()
      );
    }
    this.props.status = TenantStatusVO.newActive();
    this.setUpdatedAt(); // Actualiza _updatedAt
    this.addEvent(new TenantActivatedEvent({ aggregateId: this.id, payload: {} as TenantActivatedEventPayload })); // Casteo si el payload es {}
  }

  public suspend(): void {
    if (this.props.status.value === TenantStatusEnum.SUSPENDED) {
      return;
    }
    if (this.props.status.value !== TenantStatusEnum.ACTIVE) {
       throw new ArgumentInvalidException(
        `Cannot suspend tenant from status ${String(this.props.status.value)}` // CORREGIDO: String()
      );
    }
    this.props.status = TenantStatusVO.newSuspended();
    this.setUpdatedAt(); // Actualiza _updatedAt
    this.addEvent(new TenantSuspendedEvent({ aggregateId: this.id, payload: {} as TenantSuspendedEventPayload })); // Casteo si el payload es {}
  }

  public validate(): void {
    if (Guard.isEmpty(this.props.name)) {
      throw new ArgumentNotProvidedException('Tenant name is required in props.');
    }
    if (Guard.isEmpty(this.props.ownerUserId)) {
      throw new ArgumentNotProvidedException('Tenant ownerUserId is required in props.');
    }
  }
}
