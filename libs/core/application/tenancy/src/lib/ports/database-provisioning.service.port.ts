// libs/core/application/tenancy/src/lib/ports/database-provisioning.service.port.ts
import { Result } from '@dfs-suite/shared-result';
import { TenantId } from '@dfs-suite/shared-types';
import { ExceptionBase } from '@dfs-suite/shared-errors';
import { DbConnectionConfigVO } from '@dfs-suite/core-domain-tenancy'; // Asumiendo que se exporta

export const DATABASE_PROVISIONING_SERVICE_PORT = Symbol(
  'DATABASE_PROVISIONING_SERVICE_PORT'
);

export interface IDatabaseProvisioningServicePort {
  provisionTenantDatabase(
    tenantId: TenantId
    // config: DbConnectionConfigVO, // El config podría ser generado internamente por el servicio
  ): Promise<Result<DbConnectionConfigVO, ExceptionBase | Error>>; // Devuelve la config de conexión generada/usada
}
