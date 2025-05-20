// RUTA: libs/core/application/coapaiperassistance/src/lib/commands/update-aiper-config.command.ts
// TODO: [LIA Legacy - Implementar UpdateAiperConfigCommand]
// Propósito: Comando para actualizar la configuración de Aiper para un tenant.
// Relacionado con Casos de Uso: BP-AIPER-CFG-001 (Actualizar Configuración Aiper)
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId, Maybe } from '@dfs-suite/shtypes';
import { AiperTenantConfigDto } from '../dtos/aiper-tenant-config.dto'; // Se creará después

export type UpdateAiperConfigCommandPayload = AiperTenantConfigDto & {
  readonly tenantId: TenantId;
  readonly updatedByUserId: UserId;
};

export class UpdateAiperConfigCommand
  extends CommandBase
  implements UpdateAiperConfigCommandPayload
{
  readonly tenantId: TenantId;
  readonly updatedByUserId: UserId;
  readonly preferredLlmModelId: string; // Asumiendo que DTO tiene estos campos
  readonly preferredEmbeddingModelId: string;
  readonly systemBasePrompt: string;
  readonly tenantPersonaDescription: string;
  // ...otros campos del DTO

  constructor(
    payload: UpdateAiperConfigCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    this.tenantId = payload.tenantId;
    this.updatedByUserId = payload.updatedByUserId;
    this.preferredLlmModelId = payload.preferredLlmModelId;
    this.preferredEmbeddingModelId = payload.preferredEmbeddingModelId;
    this.systemBasePrompt = payload.systemBasePrompt;
    this.tenantPersonaDescription = payload.tenantPersonaDescription;
    // ...asignar otros campos
  }
}
