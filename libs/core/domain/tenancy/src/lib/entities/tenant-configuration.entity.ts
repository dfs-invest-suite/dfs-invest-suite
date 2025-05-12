// libs/core/domain/tenancy/src/lib/entities/tenant-configuration.entity.ts
import { Entity, CreateEntityProps } from '@dfs-suite/core-domain-shared-kernel-entities';
import { ArgumentNotProvidedException } from '@dfs-suite/shared-errors';
import { AggregateId, TenantId } from '@dfs-suite/shared-types';
import { Guard, UuidUtils } from '@dfs-suite/shared-utils';

interface TenantConfigurationProps {
  tenantId: TenantId;
  key: string;
  value: string;
  description?: string;
}

interface CreateTenantConfigurationProps {
  tenantId: TenantId;
  key: string;
  value: string;
  description?: string;
}

export class TenantConfigurationEntity extends Entity<TenantConfigurationProps> {
  constructor(createEntityProps: CreateEntityProps<TenantConfigurationProps>) {
    super(createEntityProps);
  }

  public static create(props: CreateTenantConfigurationProps, id?: AggregateId): TenantConfigurationEntity {
    if (Guard.isEmpty(props.tenantId)) {
      throw new ArgumentNotProvidedException('tenantId cannot be empty for TenantConfiguration.');
    }
    if (Guard.isEmpty(props.key)) {
      throw new ArgumentNotProvidedException('Configuration key cannot be empty.');
    }
    if (Guard.isNil(props.value)) {
      throw new ArgumentNotProvidedException('Configuration value cannot be null or undefined.');
    }

    const configId = id || UuidUtils.generateAggregateId();
    return new TenantConfigurationEntity({
      id: configId,
      props: {
        tenantId: props.tenantId,
        key: props.key,
        value: props.value,
        description: props.description,
      },
    });
  }

  get tenantId(): TenantId {
    return this.props.tenantId;
  }
  get key(): string {
    return this.props.key;
  }
  get value(): string {
    return this.props.value;
  }
  get description(): string | undefined {
    return this.props.description;
  }

  public updateValue(newValue: string): void {
    if (Guard.isNil(newValue)) {
      throw new ArgumentNotProvidedException('New configuration value cannot be null or undefined.');
    }
    this.props.value = newValue;
    this.setUpdatedAt();
  }

  public validate(): void {
    if (Guard.isEmpty(this.props.key)) {
      throw new ArgumentNotProvidedException('Configuration key is required.');
    }
    if (Guard.isNil(this.props.value)) {
      throw new ArgumentNotProvidedException('Configuration value is required.');
    }
  }
}
