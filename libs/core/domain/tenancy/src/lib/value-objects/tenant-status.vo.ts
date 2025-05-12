// libs/core/domain/tenancy/src/lib/value-objects/tenant-status.vo.ts
import { ValueObject } from '@dfs-suite/core-domain-shared-kernel-value-objects';
import { ArgumentInvalidException } from '@dfs-suite/shared-errors';

export enum TenantStatusEnum {
  PENDING_SETUP = 'PENDING_SETUP',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

// Eliminada la interfaz TenantStatusProps no utilizada

export class TenantStatusVO extends ValueObject<TenantStatusEnum> {
  constructor(value: TenantStatusEnum) {
    super({ value });
  }

  public get value(): TenantStatusEnum {
    return this.props.value;
  }

  protected validate(props: { value: TenantStatusEnum }): void {
    if (!Object.values(TenantStatusEnum).includes(props.value)) {
      throw new ArgumentInvalidException(`Invalid tenant status: ${props.value}`);
    }
  }

  public static newPendingSetup(): TenantStatusVO {
    return new TenantStatusVO(TenantStatusEnum.PENDING_SETUP);
  }

  public static newActive(): TenantStatusVO {
    return new TenantStatusVO(TenantStatusEnum.ACTIVE);
  }

  public static newSuspended(): TenantStatusVO {
    return new TenantStatusVO(TenantStatusEnum.SUSPENDED);
  }

  public isActive(): boolean {
    return this.props.value === TenantStatusEnum.ACTIVE;
  }

  public isSuspended(): boolean {
    return this.props.value === TenantStatusEnum.SUSPENDED;
  }
}
