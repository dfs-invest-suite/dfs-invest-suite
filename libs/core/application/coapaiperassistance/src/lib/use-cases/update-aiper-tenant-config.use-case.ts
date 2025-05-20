// RUTA: libs/core/application/coapaiperassistance/src/lib/use-cases/update-aiper-tenant-config.use-case.ts
// TODO: [LIA Legacy - Implementar UpdateAiperTenantConfigUseCase]
// Propósito: Actualiza la configuración específica de Aiper para un tenant.
// Relacionado con Casos de Uso: BP-AIPER-CFG-001

import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
import { UpdateAiperConfigCommand } from '../commands/update-aiper-config.command';
import { AiperTenantConfigDto } from '../dtos/aiper-tenant-config.dto';
import { Result, ok, err } from '@dfs-suite/shresult';
import { ExceptionBase, NotFoundException } from '@dfs-suite/sherrors';
import {
  IAiperTenantConfigRepository,
  AIPER_TENANT_CONFIG_REPOSITORY_PORT,
  AiperTenantConfigEntity,
  AiModelIdentifierVO,
} from '@dfs-suite/codoaiperassistance';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';

export class UpdateAiperTenantConfigUseCase
  implements ICommandHandler<UpdateAiperConfigCommand, AiperTenantConfigDto>
{
  constructor() // @Inject(LOGGER_PORT) private readonly logger: ILoggerPort, // @Inject(AIPER_TENANT_CONFIG_REPOSITORY_PORT) private readonly configRepo: IAiperTenantConfigRepository,
  {}

  async execute(
    command: UpdateAiperConfigCommand
  ): Promise<Result<AiperTenantConfigDto, ExceptionBase>> {
    const { tenantId, updatedByUserId, ...configData } = command.payload;
    this.logger.log(
      `Attempting to update Aiper config for tenant: ${tenantId}`,
      this.constructor.name,
      command.metadata.correlationId
    );

    // 1. Obtener AiperTenantConfigEntity existente por tenantId.
    // 2. Si no existe, crear una nueva.
    // 3. Actualizar las propiedades de la entidad con configData (mapeando IDs de modelo a AiModelIdentifierVO).
    // 4. Guardar la entidad.
    // 5. Mapear la entidad actualizada a AiperTenantConfigDto.

    // const llmModelVo = AiModelIdentifierVO.create({ modelId: configData.preferredLlmModelId, provider: 'PROVIDER_AQUI' }); // El provider podría venir de una config o ser inferido
    // const embeddingModelVo = AiModelIdentifierVO.create({ modelId: configData.preferredEmbeddingModelId, provider: 'PROVIDER_AQUI' });
    // ...
    // entity.updateConfiguration(llmModelVo, embeddingModelVo, configData.systemBasePrompt, configData.tenantPersonaDescription);
    // await this.configRepo.save(entity);

    return ok({} as AiperTenantConfigDto); // Placeholder
  }
}
