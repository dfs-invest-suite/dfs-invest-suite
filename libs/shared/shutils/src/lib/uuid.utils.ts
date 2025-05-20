// RUTA: libs/shared/shutils/src/lib/uuid.utils.ts
// TODO: [LIA Legacy - Implementar UuidUtils] - ¡REALIZADO, REVISADO Y EXPANDIDO!
// Propósito: Proporciona métodos estáticos para generar diferentes tipos de UUIDs v4
//            "brandeados" para mejorar la seguridad de tipos en el sistema.
// Relacionado con Casos de Uso: Creación de todas las entidades y mensajes que requieren IDs únicos.

import { v4 as uuidv4 } from 'uuid';

import {
  AggregateId,
  TenantId,
  UserId,
  LeadId,
  WhatsAppAccountId,
  WabaId,
  MessageTemplateId,
  MessageLogId,
  AiperConversationId,
  AiperMessageId,
  AiperSystemPromptId,
  KnowledgeDocumentId,
  KnowledgeChunkId,
  PropertyListingId,
  PortalAppearanceConfigId,
  EducationalContentId,
  ContentCategoryId,
  DocumentId,
  ContractTemplateId,
  SignatureRequestId,
  BlockchainTransactionHash,
  WalletAddress,
  AssetId,
  SPEId,
  CampaignId,
  BillingPlanId,
  BilledUsageId,
  PricingRateId,
  CommandInstanceId,
  QueryInstanceId,
  DomainEventInstanceId,
  IntegrationEventInstanceId,
  CorrelationId,
  CausationId,
  SessionId,
} from '@dfs-suite/shtypes';

export class UuidUtils {
  private static generate(): string {
    return uuidv4();
  }

  // --- IDs de Agregados y Entidades de Dominio ---
  static generateAggregateId(): AggregateId {
    return this.generate() as AggregateId;
  }
  static generateTenantId(): TenantId {
    return this.generate() as TenantId;
  }
  static generateUserId(): UserId {
    return this.generate() as UserId;
  }
  static generateLeadId(): LeadId {
    return this.generate() as LeadId;
  }
  static generateWhatsAppAccountId(): WhatsAppAccountId {
    return this.generate() as WhatsAppAccountId;
  }
  static generateWabaId(): WabaId {
    return this.generate() as WabaId;
  }
  static generateMessageTemplateId(): MessageTemplateId {
    return this.generate() as MessageTemplateId;
  }
  static generateMessageLogId(): MessageLogId {
    return this.generate() as MessageLogId;
  }
  static generateAiperConversationId(): AiperConversationId {
    return this.generate() as AiperConversationId;
  }
  static generateAiperMessageId(): AiperMessageId {
    return this.generate() as AiperMessageId;
  }
  static generateAiperSystemPromptId(): AiperSystemPromptId {
    return this.generate() as AiperSystemPromptId;
  }
  static generateKnowledgeDocumentId(): KnowledgeDocumentId {
    return this.generate() as KnowledgeDocumentId;
  }
  static generateKnowledgeChunkId(): KnowledgeChunkId {
    return this.generate() as KnowledgeChunkId;
  }
  static generatePropertyListingId(): PropertyListingId {
    return this.generate() as PropertyListingId;
  }
  static generatePortalAppearanceConfigId(): PortalAppearanceConfigId {
    return this.generate() as PortalAppearanceConfigId;
  }
  static generateEducationalContentId(): EducationalContentId {
    return this.generate() as EducationalContentId;
  }
  static generateContentCategoryId(): ContentCategoryId {
    return this.generate() as ContentCategoryId;
  }
  static generateDocumentId(): DocumentId {
    return this.generate() as DocumentId;
  }
  static generateContractTemplateId(): ContractTemplateId {
    return this.generate() as ContractTemplateId;
  }
  static generateSignatureRequestId(): SignatureRequestId {
    return this.generate() as SignatureRequestId;
  }
  static generateBlockchainTransactionHash(): BlockchainTransactionHash {
    return this.generate() as BlockchainTransactionHash;
  }
  static generateWalletAddress(): WalletAddress {
    return this.generate() as WalletAddress;
  }
  static generateAssetId(): AssetId {
    return this.generate() as AssetId;
  }
  static generateSPEId(): SPEId {
    return this.generate() as SPEId;
  }
  static generateCampaignId(): CampaignId {
    return this.generate() as CampaignId;
  }
  static generateBillingPlanId(): BillingPlanId {
    return this.generate() as BillingPlanId;
  }
  static generateBilledUsageId(): BilledUsageId {
    return this.generate() as BilledUsageId;
  }
  static generatePricingRateId(): PricingRateId {
    return this.generate() as PricingRateId;
  }

  // --- IDs de Mensajería ---
  static generateCommandInstanceId(): CommandInstanceId {
    return this.generate() as CommandInstanceId;
  }
  static generateQueryInstanceId(): QueryInstanceId {
    return this.generate() as QueryInstanceId;
  }
  static generateDomainEventInstanceId(): DomainEventInstanceId {
    return this.generate() as DomainEventInstanceId;
  }
  static generateIntegrationEventInstanceId(): IntegrationEventInstanceId {
    return this.generate() as IntegrationEventInstanceId;
  }

  // --- IDs de Contexto y Trazabilidad ---
  static generateCorrelationId(): CorrelationId {
    return this.generate() as CorrelationId;
  }
  static generateCausationId(): CausationId {
    return this.generate() as CausationId;
  }
  static generateSessionId(): SessionId {
    return this.generate() as SessionId;
  }
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de import a `@dfs-suite/shtypes`.", "justificacion": "Alineación con la nueva nomenclatura de importPath.", "impacto": "Resolución de módulo correcta." },
  { "mejora": "Expansión exhaustiva de métodos generadores para todos los Branded IDs definidos en `shtypes`.", "justificacion": "Provee una API completa y centralizada para la generación de todos los IDs tipados del sistema.", "impacto": "Facilita la creación consistente de IDs y mejora la seguridad de tipos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Asegurar que los tests en `uuid.utils.spec.ts` cubran todos estos nuevos métodos generadores." }
]
*/
// RUTA: libs/shared/shutils/src/lib/uuid.utils.ts
