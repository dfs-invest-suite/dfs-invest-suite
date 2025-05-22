// libs/core/domain/tenancy/src/lib/ports/tenant.repository.port.ts
import { IRepositoryPort } from '@dfs-suite/core-domain-shared-kernel-ports';
import { ExceptionBase } from '@dfs-suite/shared-errors';
import { Result } from '@dfs-suite/shared-result';
import { Maybe, UserId } from '@dfs-suite/shared-types'; // TenantId no se usa aquí directamente

import { TenantEntity } from '../entities/tenant.entity';

export const TENANT_REPOSITORY_PORT = Symbol('TENANT_REPOSITORY_PORT');

export interface ITenantRepository extends IRepositoryPort<TenantEntity> {
  findByName(
    name: string
  ): Promise<Result<Maybe<TenantEntity>, ExceptionBase | Error>>;
  findByOwnerUserId(
    ownerUserId: UserId
  ): Promise<Result<TenantEntity[], ExceptionBase | Error>>;
}
