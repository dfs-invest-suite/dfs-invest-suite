// RUTA: libs/core/domain/codoaiperassistance/src/lib/ports/aiper-tenant-config.repository.port.ts
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { TenantId, Maybe, AiperSystemPromptId } from '@dfs-suite/shtypes';

import {
  AiperTenantConfigEntity,
  AiperTenantConfigProps,
} from '../entities/aiper-tenant-config.entity'; // Añadir Props

export const AIPER_TENANT_CONFIG_REPOSITORY_PORT = Symbol(
  'IAiperTenantConfigRepositoryPort'
);

// Usar AiperSystemPromptId como el ID del Agregado
export interface IAiperTenantConfigRepository
  extends IRepositoryPort<
    AiperTenantConfigProps,
    AiperSystemPromptId,
    AiperTenantConfigEntity
  > {
  findByTenantId( // Método específico
    tenantId: TenantId
  ): Promise<Result<Maybe<AiperTenantConfigEntity>, ExceptionBase>>;
  // El método save (para crear o actualizar) ya viene de IRepositoryPort si es upsert.
  // Si se necesita un create separado, se añadiría.
}
// RUTA: libs/core/domain/codoaiperassistance/src/lib/ports/aiper-tenant-config.repository.port.ts
