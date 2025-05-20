// RUTA: libs/core/domain/codoaiperassistance/src/lib/ports/aiper-tenant-config.repository.port.ts
// TODO: [LIA Legacy - Definir IAiperTenantConfigRepositoryPort]
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { AiperTenantConfigEntity } from '../entities/aiper-tenant-config.entity';
import { TenantId, Maybe } from '@dfs-suite/shtypes';
import { Result } from '@dfs-suite/shresult';
import { ExceptionBase } from '@dfs-suite/sherrors';

export const AIPER_TENANT_CONFIG_REPOSITORY_PORT = Symbol(
  'IAiperTenantConfigRepositoryPort'
);
export interface IAiperTenantConfigRepositoryPort
  extends IRepositoryPort<AiperTenantConfigEntity> {
  findByTenantId(
    tenantId: TenantId
  ): Promise<Result<Maybe<AiperTenantConfigEntity>, ExceptionBase | Error>>;
  // save(config: AiperTenantConfigEntity): Promise<Result<AiperTenantConfigEntity, ExceptionBase | Error>>; // save puede ser upsert
}
