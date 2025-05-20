// RUTA: libs/core/application/coapaiperassistance/src/lib/dtos/aiper-tenant-config.dto.ts
// TODO: [LIA Legacy - Implementar AiperTenantConfigDto]
// Propósito: DTO para transferir la configuración de Aiper de un tenant.
// Relacionado con Casos de Uso: UpdateAiperTenantConfigUseCase, GetAiperTenantConfigQuery
import { Maybe } from '@dfs-suite/shtypes';

export interface AiModelIdentifierDto {
  id: string; // ej. "gemini-1.5-pro", "text-embedding-ada-002"
  provider?: Maybe<string>; // ej. "google", "openai"
}

export interface AiperTenantConfigDto {
  readonly preferredLlmModelId: string; // Usaremos strings simples para IDs de modelo, el VO de dominio los encapsula
  readonly preferredEmbeddingModelId: string;
  readonly systemBasePrompt: string;
  readonly tenantPersonaDescription: string;
  // readonly enableRag: boolean;
  // readonly maxRagContextTokens?: Maybe<number>;
}
