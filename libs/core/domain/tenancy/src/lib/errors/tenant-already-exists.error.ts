// libs/core/domain/tenancy/src/lib/errors/tenant-already-exists.error.ts
import { ConflictException } from '@dfs-suite/shared-errors'; // Usamos la genérica ConflictException
import { CorrelationId, ObjectLiteral } from '@dfs-suite/shared-types';

export const TENANT_ALREADY_EXISTS = 'TENANCY.TENANT_ALREADY_EXISTS'; // Código específico

export class TenantAlreadyExistsError extends ConflictException { // Hereda de ConflictException
  // Sobrescribimos el código si queremos uno más específico para este dominio
  override readonly code = TENANT_ALREADY_EXISTS;

  constructor(message = 'Tenant with the same identifier already exists.', cause?: Error, metadata?: ObjectLiteral, correlationId?: CorrelationId) {
    super(message, cause, metadata, correlationId);
  }
}
