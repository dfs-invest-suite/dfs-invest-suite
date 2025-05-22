// RUTA: libs/core/domain/codoaiperassistance/src/lib/entities/aiper-tenant-config.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import {
  TenantId,
  Maybe,
  AiperSystemPromptId,
  CorrelationId,
} from '@dfs-suite/shtypes'; // AiperSystemPromptId es el ID de esta entidad
import { Guard, UuidUtils } from '@dfs-suite/shutils';

import { AiModelIdentifierVO } from '../value-objects/ai-model-identifier.vo'; // <<< IMPORTAR
// import { AiperConfigUpdatedEvent, AiperConfigUpdatedPayload } from '../events/aiper-config-updated.event';

export interface AiperTenantConfigProps {
  tenantId: TenantId; // Guardamos el tenantId aquí para referencia y eventos
  preferredLlmModel: AiModelIdentifierVO;
  preferredEmbeddingModel: AiModelIdentifierVO;
  systemBasePrompt: string;
  tenantPersonaDescription: string; // "Identidad" del tenant para Aiper
  enableRag: boolean; // Default true
  ragSearchTopK?: Maybe<number>; // Default 5
  ragMinSimilarityScore?: Maybe<number>; // Default 0.7
  // Otros campos como límites de tokens, configuración de tools permitidas, etc.
}

export interface CreateAiperTenantConfigProps {
  tenantId: TenantId;
  correlationId: CorrelationId; // Para el evento
  preferredLlmModel: AiModelIdentifierVO;
  preferredEmbeddingModel: AiModelIdentifierVO;
  systemBasePrompt: string;
  tenantPersonaDescription: string;
  enableRag?: boolean;
  ragSearchTopK?: Maybe<number>;
  ragMinSimilarityScore?: Maybe<number>;
}

export class AiperTenantConfigEntity extends AggregateRoot<
  AiperTenantConfigProps,
  AiperSystemPromptId // Usamos AiperSystemPromptId como ID de esta entidad
> {
  constructor(
    createEntityProps: CreateEntityProps<
      AiperTenantConfigProps,
      AiperSystemPromptId
    >
  ) {
    super(createEntityProps);
  }

  public static create(
    props: CreateAiperTenantConfigProps,
    id?: AiperSystemPromptId
  ): AiperTenantConfigEntity {
    Guard.againstNullOrUndefinedBulk([
      { argument: props.tenantId, argumentName: 'tenantId' },
      { argument: props.preferredLlmModel, argumentName: 'preferredLlmModel' },
      // ...
    ]);

    const configId = id || UuidUtils.generateAiperSystemPromptId();
    const entityProps: AiperTenantConfigProps = {
      tenantId: props.tenantId,
      preferredLlmModel: props.preferredLlmModel,
      preferredEmbeddingModel: props.preferredEmbeddingModel,
      systemBasePrompt: props.systemBasePrompt,
      tenantPersonaDescription: props.tenantPersonaDescription,
      enableRag: props.enableRag ?? true,
      ragSearchTopK: props.ragSearchTopK,
      ragMinSimilarityScore: props.ragMinSimilarityScore,
    };

    const config = new AiperTenantConfigEntity({
      id: configId,
      props: entityProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Emitir evento AiperTenantConfigCreatedEvent
    return config;
  }

  // Getters...
  get tenantId(): TenantId {
    return this.props.tenantId;
  }
  // ...

  public updateSettings(
    updateData: Partial<Omit<AiperTenantConfigProps, 'tenantId'>>, // No permitir cambiar tenantId
    context: { correlationId: CorrelationId }
  ): void {
    let updated = false;
    if (
      updateData.preferredLlmModel &&
      !this.props.preferredLlmModel.equals(updateData.preferredLlmModel)
    ) {
      this.props.preferredLlmModel = updateData.preferredLlmModel;
      updated = true;
    }
    // ... lógica similar para otros campos ...
    if (
      updateData.systemBasePrompt !== undefined &&
      this.props.systemBasePrompt !== updateData.systemBasePrompt
    ) {
      this.props.systemBasePrompt = updateData.systemBasePrompt;
      updated = true;
    }

    if (updated) {
      this.setUpdatedAt();
      // Emitir AiperConfigUpdatedEvent
      // const payload: AiperConfigUpdatedPayload = { ... }
      // this.addEvent(new AiperConfigUpdatedEvent({ aggregateId: this.id, payload }))
    }
  }

  public validate(): void {
    // ...
  }
}
// RUTA: libs/core/domain/codoaiperassistance/src/lib/entities/aiper-tenant-config.entity.ts
