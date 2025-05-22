// libs/core/domain/tenancy/src/lib/ports/tenant-configuration.repository.port.ts
import { IRepositoryPort } from '@dfs-suite/core-domain-shared-kernel-ports';
import { ExceptionBase } from '@dfs-suite/shared-errors';
import { Result } from '@dfs-suite/shared-result';
import { TenantId, Maybe } from '@dfs-suite/shared-types';

import { TenantConfigurationEntity } from '../entities/tenant-configuration.entity';

export const TENANT_CONFIGURATION_REPOSITORY_PORT = Symbol(
  'TENANT_CONFIGURATION_REPOSITORY_PORT'
);

export interface ITenantConfigurationRepository
  extends IRepositoryPort<TenantConfigurationEntity> {
  findByTenantIdAndKey(
    tenantId: TenantId,
    key: string
  ): Promise<Result<Maybe<TenantConfigurationEntity>, ExceptionBase | Error>>;
  findAllByTenantId(
    tenantId: TenantId
  ): Promise<Result<TenantConfigurationEntity[], ExceptionBase | Error>>;
}
