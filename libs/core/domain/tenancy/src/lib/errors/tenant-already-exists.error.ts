// libs/core/domain/tenancy/src/lib/errors/tenant-already-exists.error.ts
import { ConflictException } from '@dfs-suite/shared-errors';
import { CorrelationId, ObjectLiteral } from '@dfs-suite/shared-types';

export const TENANT_ALREADY_EXISTS = 'TENANCY.TENANT_ALREADY_EXISTS';

export class TenantAlreadyExistsError extends ConflictException {
  override readonly code = TENANT_ALREADY_EXISTS;

  constructor(message = 'Tenant with the same identifier already exists.', cause?: Error, metadata?: ObjectLiteral, correlationId?: CorrelationId) {
    super(message, cause, metadata, correlationId);
  }
}
