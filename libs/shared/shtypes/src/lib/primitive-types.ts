// RUTA: libs/shared/shtypes/src/lib/primitive-types.ts
// TODO: [LIA Legacy - Implementar primitive-types.ts] - ¡REALIZADO!
// Propósito: Define un conjunto de "Branded Types" y un generador para ellos,
//            así como tipos primitivos semánticos para mejorar la seguridad de tipos en todo el sistema.
// Relacionado con Casos de Uso: Utilizado globalmente en todas las capas para tipado de IDs y datos.

import { Brand } from './brand.type'; // Importación relativa interna

/**
 * @type CreateDomainId<K, T>
 * @template K - El tipo primitivo base (ej. `string`).
 * @template T - Una cadena literal única que actúa como la "marca" del ID.
 * @description Un tipo helper genérico para crear Branded Types para IDs de forma consistente.
 */
type CreateDomainId<K, T extends string> = Brand<K, T>;

// --- IDs de Agregados y Entidades de Dominio ---
export type AggregateId = CreateDomainId<string, 'AggregateId'>;
export type TenantId = CreateDomainId<string, 'TenantId'>;
export type UserId = CreateDomainId<string, 'UserId'>; // Para usuarios de tenant y de plataforma
export type LeadId = CreateDomainId<string, 'LeadId'>;
export type WhatsAppAccountId = CreateDomainId<string, 'WhatsAppAccountId'>; // Phone Number ID de Meta
export type WabaId = CreateDomainId<string, 'WabaId'>; // WhatsApp Business Account ID
export type MessageTemplateId = CreateDomainId<string, 'MessageTemplateId'>; // HSM ID de Meta
export type MessageLogId = CreateDomainId<string, 'MessageLogId'>;

export type AiperConversationId = CreateDomainId<string, 'AiperConversationId'>;
export type AiperMessageId = CreateDomainId<string, 'AiperMessageId'>;
export type AiperSystemPromptId = CreateDomainId<string, 'AiperSystemPromptId'>; // Para Identidad Aiper
export type KnowledgeDocumentId = CreateDomainId<string, 'KnowledgeDocumentId'>; // Para documentos en RAG
export type KnowledgeChunkId = CreateDomainId<string, 'KnowledgeChunkId'>; // Para fragmentos de documentos en RAG

export type PropertyListingId = CreateDomainId<string, 'PropertyListingId'>;
export type PortalAppearanceConfigId = CreateDomainId<
  string,
  'PortalAppearanceConfigId'
>;
export type EducationalContentId = CreateDomainId<
  string,
  'EducationalContentId'
>;
export type ContentCategoryId = CreateDomainId<string, 'ContentCategoryId'>; // Para EducaContent

export type DocumentId = CreateDomainId<string, 'DocumentId'>; // Para ManagedDocumentEntity en cartorio-digital
export type ContractTemplateId = CreateDomainId<string, 'ContractTemplateId'>;
export type SignatureRequestId = CreateDomainId<string, 'SignatureRequestId'>;
export type BlockchainTransactionHash = CreateDomainId<
  string,
  'BlockchainTransactionHash'
>;
export type WalletAddress = CreateDomainId<string, 'WalletAddress'>;

export type AssetId = CreateDomainId<string, 'AssetId'>; // Para Banco de Assets y PortalAssetEntity
export type SPEId = CreateDomainId<string, 'SPEId'>; // Sociedade de Propósito Específico
export type CampaignId = CreateDomainId<string, 'CampaignId'>;
export type BillingPlanId = CreateDomainId<string, 'BillingPlanId'>;
export type BilledUsageId = CreateDomainId<string, 'BilledUsageId'>;
export type PricingRateId = CreateDomainId<string, 'PricingRateId'>; // Para GlobalWhatsAppPricingRate

// --- IDs de Mensajería (Comandos, Queries, Eventos) ---
export type CommandInstanceId = CreateDomainId<string, 'CommandInstanceId'>;
export type QueryInstanceId = CreateDomainId<string, 'QueryInstanceId'>;
export type DomainEventInstanceId = CreateDomainId<
  string,
  'DomainEventInstanceId'
>;
export type IntegrationEventInstanceId = CreateDomainId<
  string,
  'IntegrationEventInstanceId'
>;

// --- IDs de Contexto y Trazabilidad ---
export type CorrelationId = CreateDomainId<string, 'CorrelationId'>;
export type CausationId = CreateDomainId<string, 'CausationId'>; // Podría ser una unión si se prefiere: CommandInstanceId | DomainEventInstanceId | CorrelationId
export type SessionId = CreateDomainId<string, 'SessionId'>; // Para sesiones de usuario/API

// --- Tipos Primitivos Semánticos ---
export type IsoDateString = CreateDomainId<string, 'IsoDateString'>;
export type EmailString = CreateDomainId<string, 'EmailString'>;
export type PhoneNumberString = CreateDomainId<string, 'PhoneNumberString'>; // Formato E.164 idealmente
export type UrlString = CreateDomainId<string, 'UrlString'>;
export type JwtString = CreateDomainId<string, 'JwtString'>;
export type HexColorString = CreateDomainId<string, 'HexColorString'>;
export type CidString = CreateDomainId<string, 'CidString'>; // Para IPFS
export type HtmlString = CreateDomainId<string, 'HtmlString'>; // Para contenido HTML seguro
export type MarkdownString = CreateDomainId<string, 'MarkdownString'>; // Para contenido Markdown
export type FilePathString = CreateDomainId<string, 'FilePathString'>;
export type MimeTypeString = CreateDomainId<string, 'MimeTypeString'>;

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Completitud exhaustiva de Branded IDs", "justificacion": "Se han añadido todos los Branded Types para IDs identificados en el Blueprint Maestro v5.0, cubriendo entidades de dominio, mensajería, trazabilidad y tipos semánticos.", "impacto": "Máxima seguridad de tipos y claridad semántica en todo el sistema desde la base." },
  { "mejora": "Categorización de IDs", "justificacion": "Se han agrupado los IDs por su propósito (Agregados, Mensajería, Trazabilidad, Primitivos Semánticos) para facilitar su comprensión y mantenimiento.", "impacto": "Mejor organización del archivo." },
  { "mejora": "Uso consistente de `CreateDomainId`", "justificacion": "Todos los Branded IDs ahora usan el helper `CreateDomainId` para su definición.", "impacto": "Consistencia y reducción de boilerplate." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "A medida que surjan nuevas entidades o conceptos que requieran un ID único y tipado, se deberán añadir aquí." },
  { "nota": "El tipo `CausationId` podría evolucionar a una unión más estricta (`CommandInstanceId | DomainEventInstanceId | CorrelationId`) si se desea mayor precisión en la metadata de causalidad." }
]
*/
// RUTA: libs/shared/shtypes/src/lib/primitive-types.ts
