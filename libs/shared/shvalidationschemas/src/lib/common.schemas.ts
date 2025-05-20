// RUTA: libs/shared/shvalidationschemas/src/lib/common.schemas.ts
// TODO: [LIA Legacy - Corregir uso de .brand y refactorizar imports] - ¡REALIZADO Y CORREGIDO!
// Propósito: Define schemas Zod comunes y reutilizables para tipos primitivos y Branded Types.
// Relacionado con Casos de Uso: Validación de DTOs, entidades, VOs en todas las capas.

import { SIMPLE_EMAIL_REGEX, UUID_V4_REGEX } from '@dfs-suite/shconstants';
import {
  // Estos tipos se importan para usarlos en .brand<'TypeName'>()
  // Si ESLint sigue marcándolos como no usados, es porque la regla no considera este uso.
  // Podríamos añadir // eslint-disable-next-line @typescript-eslint/no-unused-vars encima de cada uno
  // o ajustar la regla de ESLint globalmente. Por ahora, los mantenemos.
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
  IsoDateString,
  EmailString,
  PhoneNumberString,
  UrlString,
  JwtString,
  HexColorString,
  CidString,
  HtmlString,
  MarkdownString,
  FilePathString,
  MimeTypeString,
} from '@dfs-suite/shtypes';

import { z } from './zod.instance';

export const EmailSchema = z
  .string({
    required_error: 'Email es requerido.',
    invalid_type_error: 'Email debe ser un string.',
  })
  .trim()
  .toLowerCase()
  .min(5, { message: 'Email debe tener al menos 5 caracteres.' })
  .max(320, { message: 'Email no debe exceder los 320 caracteres.' })
  .regex(SIMPLE_EMAIL_REGEX, { message: 'Formato de email inválido.' })
  .brand<'EmailString'>(); // CORREGIDO: .BRAND a .brand

export const UuidSchema = z
  .string({
    required_error: 'UUID es requerido.',
    invalid_type_error: 'UUID debe ser un string.',
  })
  .trim()
  .regex(UUID_V4_REGEX, { message: 'Formato de UUID v4 inválido.' });

// --- Schemas para Branded IDs (basados en UuidSchema o string genérico) ---
export const AggregateIdSchema = UuidSchema.brand<'AggregateId'>();
export const TenantIdSchema = UuidSchema.brand<'TenantId'>();
export const UserIdSchema = UuidSchema.brand<'UserId'>();
export const LeadIdSchema = UuidSchema.brand<'LeadId'>();
export const WhatsAppAccountIdSchema = z
  .string()
  .trim()
  .min(1, { message: 'WhatsApp Account ID no puede estar vacío.' })
  .brand<'WhatsAppAccountId'>();
export const WabaIdSchema = z
  .string()
  .trim()
  .min(1, { message: 'WABA ID no puede estar vacío.' })
  .brand<'WabaId'>();
export const MessageTemplateIdSchema = z
  .string()
  .trim()
  .min(1, { message: 'Message Template ID no puede estar vacío.' })
  .brand<'MessageTemplateId'>();
export const MessageLogIdSchema = UuidSchema.brand<'MessageLogId'>();

export const AiperConversationIdSchema =
  UuidSchema.brand<'AiperConversationId'>();
export const AiperMessageIdSchema = UuidSchema.brand<'AiperMessageId'>();
export const AiperSystemPromptIdSchema =
  UuidSchema.brand<'AiperSystemPromptId'>();
export const KnowledgeDocumentIdSchema =
  UuidSchema.brand<'KnowledgeDocumentId'>();
export const KnowledgeChunkIdSchema = UuidSchema.brand<'KnowledgeChunkId'>();

export const PropertyListingIdSchema = UuidSchema.brand<'PropertyListingId'>();
export const PortalAppearanceConfigIdSchema =
  UuidSchema.brand<'PortalAppearanceConfigId'>();
export const EducationalContentIdSchema =
  UuidSchema.brand<'EducationalContentId'>();
export const ContentCategoryIdSchema = UuidSchema.brand<'ContentCategoryId'>();

export const DocumentIdSchema = UuidSchema.brand<'DocumentId'>();
export const ContractTemplateIdSchema =
  UuidSchema.brand<'ContractTemplateId'>();
export const SignatureRequestIdSchema =
  UuidSchema.brand<'SignatureRequestId'>();
export const BlockchainTransactionHashSchema = z
  .string()
  .trim()
  .min(1, { message: 'Hash de transacción no puede estar vacío.' })
  .regex(/^0x[a-fA-F0-9]{64}$/, {
    message: 'Formato de hash de transacción Ethereum inválido.',
  })
  .brand<'BlockchainTransactionHash'>();
export const WalletAddressSchema = z
  .string()
  .trim()
  .regex(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Formato de dirección Ethereum inválido.',
  })
  .brand<'WalletAddress'>();

export const AssetIdSchema = UuidSchema.brand<'AssetId'>();
export const SPEIdSchema = UuidSchema.brand<'SPEId'>();
export const CampaignIdSchema = UuidSchema.brand<'CampaignId'>();
export const BillingPlanIdSchema = z
  .string()
  .trim()
  .min(1, { message: 'Billing Plan ID no puede estar vacío.' })
  .brand<'BillingPlanId'>();
export const BilledUsageIdSchema = UuidSchema.brand<'BilledUsageId'>();
export const PricingRateIdSchema = UuidSchema.brand<'PricingRateId'>();

export const CommandInstanceIdSchema = UuidSchema.brand<'CommandInstanceId'>();
export const QueryInstanceIdSchema = UuidSchema.brand<'QueryInstanceId'>();
export const DomainEventInstanceIdSchema =
  UuidSchema.brand<'DomainEventInstanceId'>();
export const IntegrationEventInstanceIdSchema =
  UuidSchema.brand<'IntegrationEventInstanceId'>();

export const CorrelationIdSchema = UuidSchema.brand<'CorrelationId'>();
export const CausationIdSchema = z
  .string()
  .trim()
  .min(1)
  .brand<'CausationId'>();
export const SessionIdSchema = UuidSchema.brand<'SessionId'>();

export const IsoDateStringSchema = z
  .string({
    required_error: 'Fecha ISO es requerida.',
    invalid_type_error: 'Fecha ISO debe ser un string.',
  })
  .datetime({
    message:
      'Formato de fecha ISO 8601 inválido (ej: 2023-10-27T10:30:00.000Z).',
    offset: true,
  })
  .brand<'IsoDateString'>();

export const UrlSchema = z
  .string({ required_error: 'URL es requerida.' })
  .trim()
  .url({ message: 'Formato de URL inválido.' })
  .brand<'UrlString'>();
export const JwtStringSchema = z
  .string()
  .trim()
  .min(10, { message: 'JWT parece demasiado corto.' })
  .brand<'JwtString'>();
export const HexColorStringSchema = z
  .string()
  .trim()
  .regex(/^#([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, {
    message: 'Formato de color hexadecimal inválido (ej: #RRGGBB o #RGB).',
  })
  .brand<'HexColorString'>();
export const CidStringSchema = z
  .string()
  .trim()
  .min(46, { message: 'CID de IPFS parece demasiado corto.' })
  .regex(/^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[A-Za-z2-7]{58,})$/, {
    message: 'Formato de CID inválido.',
  })
  .brand<'CidString'>();
export const HtmlStringSchema = z.string().brand<'HtmlString'>();
export const MarkdownStringSchema = z.string().brand<'MarkdownString'>();
export const FilePathStringSchema = z
  .string()
  .trim()
  .min(1, { message: 'Ruta de archivo no puede estar vacía.' })
  .brand<'FilePathString'>();
export const MimeTypeStringSchema = z
  .string()
  .trim()
  .transform((val) => val.toLowerCase())
  .refine((val) => /^[a-z]+\/[a-z0-9.+-]+$/.test(val), {
    message:
      'Formato de MIME type inválido después de normalizar (ej: application/json).',
  })
  .brand<'MimeTypeString'>();

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Corrección de `.BRAND` a `.brand` para todos los schemas Zod.", "justificacion": "Zod v3 utiliza el método `.brand()` en minúsculas. Esto resuelve el error de TypeScript `La propiedad \"BRAND\" no existe...`.", "impacto": "Los schemas ahora son sintácticamente correctos y deberían funcionar con los Branded Types de `shtypes`." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Los warnings de `@typescript-eslint/no-unused-vars` para los Branded Types importados de `@dfs-suite/shtypes` (como `TenantId`, `UserId`, etc.) persistirán si la regla de ESLint no considera el uso en `.brand<'TypeName'>()` como un uso válido. Se puede ajustar la regla o ignorar estos warnings específicos si el código es funcional." }
]
*/
// RUTA: libs/shared/shvalidationschemas/src/lib/common.schemas.ts
