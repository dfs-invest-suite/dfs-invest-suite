// libs/core/domain/tenancy/src/lib/errors/invalid-tenant-status-transition.error.ts
import { ExceptionBase } from '@dfs-suite/shared-errors';
import { CorrelationId, ObjectLiteral } from '@dfs-suite/shared-types';

export const INVALID_TENANT_STATUS_TRANSITION = 'TENANCY.INVALID_TENANT_STATUS_TRANSITION';

export class InvalidTenantStatusTransitionError extends ExceptionBase {
  readonly code = INVALID_TENANT_STATUS_TRANSITION;

  constructor(message: string, cause?: Error, metadata?: ObjectLiteral, correlationId?: CorrelationId) {
    super(message, cause, metadata, correlationId);
  }
}
