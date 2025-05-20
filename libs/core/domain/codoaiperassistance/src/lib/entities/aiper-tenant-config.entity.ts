// RUTA: libs/core/domain/codoaiperassistance/src/lib/entities/aiper-tenant-config.entity.ts
// TODO: [LIA Legacy - Implementar AiperTenantConfigEntity]
// Propósito: Almacena la configuración específica de Aiper para un tenant (modelo LLM preferido,
//            modelo de embedding, prompt de sistema base, identidad del tenant para Aiper).
// import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
// import { TenantId, Maybe } from '@dfs-suite/shtypes';
// import { AiModelIdentifierVO } from '../value-objects/ai-model-identifier.vo';

export interface AiperTenantConfigProps {
  // tenantId: TenantId; // Implícito
  preferredLlmModel: AiModelIdentifierVO;
  preferredEmbeddingModel: AiModelIdentifierVO;
  systemBasePrompt: string; // Prompt base para todas las interacciones de Aiper
  tenantPersonaDescription: string; // "Identidad" del tenant (misión, visión, tono)
  // enableRag: boolean;
  // maxRagContextTokens: Maybe<number>;
}
// export class AiperTenantConfigEntity extends AggregateRoot<AiperTenantConfigProps> { /* ... */ }
