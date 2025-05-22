// RUTA: libs/shared/shvalidationschemas/src/lib/common.schemas.ts
import { SIMPLE_EMAIL_REGEX, UUID_V4_REGEX } from '@dfs-suite/shconstants';
// Los tipos Branded de shtypes NO se importan aquí para los schemas Zod,
// ya que Zod usa sus propios `.brand<'NombreDelTipo'>()` con strings literales.
// Solo se importarían si se usan para type guards o transforms que devuelvan el tipo TS.

// --- IMPORTACIÓN TEMPORAL PARA EL SPRINT DE 24H ---
// TODO: [REFACTOR-TYPE-REGISTRY] Eliminar esta dependencia directa. Los dominios deben proveer/registrar sus validadores.
// import { TenantId as ActualTenantIdType } from '@dfs-suite/shtypes'; // Se importará TenantId directamente de shtypes (que lo re-exporta de domains)
// import { UserId as ActualUserIdType } from '@dfs-suite/shtypes';

import { z } from './zod.instance';

// CORRECCIÓN: Definición completa de BaseStringSchema y OptionalStringSchema
export const BaseStringSchema = (
  fieldName = 'Campo de texto',
  minLength = 1,
  maxLength = 255
) =>
  z
    .string({
      required_error: `${fieldName} es requerido.`,
      invalid_type_error: `${fieldName} debe ser un string.`,
    })
    .trim()
    .min(minLength, {
      message: `${fieldName} debe tener al menos ${minLength} caracteres.`,
    })
    .max(maxLength, {
      message: `${fieldName} no debe exceder los ${maxLength} caracteres.`,
    });

export const OptionalStringSchema = (maxLength = 255) =>
  z.string().trim().max(maxLength).optional().nullable();

export const EmailSchema = BaseStringSchema('Email', 5, 320)
  .toLowerCase()
  .regex(SIMPLE_EMAIL_REGEX, { message: 'Formato de email inválido.' })
  .brand<'EmailString'>();

export const UuidSchema = BaseStringSchema('UUID', 36, 36).regex(
  UUID_V4_REGEX,
  { message: 'Formato de UUID v4 inválido.' }
);

// --- Schemas para IDs de Sistema y Kernel Compartido (usando Branded Types de shtypes) ---
export const AggregateIdSchema = UuidSchema.brand<'AggregateId'>();
export const CommandInstanceIdSchema = UuidSchema.brand<'CommandInstanceId'>();
export const QueryInstanceIdSchema = UuidSchema.brand<'QueryInstanceId'>();
export const DomainEventInstanceIdSchema =
  UuidSchema.brand<'DomainEventInstanceId'>();
export const IntegrationEventInstanceIdSchema =
  UuidSchema.brand<'IntegrationEventInstanceId'>();
export const CorrelationIdSchema = UuidSchema.brand<'CorrelationId'>();
export const CausationIdSchema = UuidSchema.brand<'CausationId'>();
export const SessionIdSchema = UuidSchema.brand<'SessionId'>();

// --- Schemas para IDs Específicos de Dominio ---
// Estos usan el string literal del Brand. La validación de que el TIPO TypeScript
// exista se hará donde se consuman estos schemas y se espere el tipo Branded.
export const TenantIdSchema = UuidSchema.brand<'TenantId'>();
export const UserIdSchema = UuidSchema.brand<'UserId'>();
export const LeadIdSchema = UuidSchema.brand<'LeadId'>();
export const InteractionIdSchema = UuidSchema.brand<'InteractionId'>();
export const NotificationTemplateIdSchema =
  UuidSchema.brand<'NotificationTemplateId'>();
export const WhatsAppAccountIdSchema = BaseStringSchema(
  'WhatsApp Account ID'
).brand<'WhatsAppAccountId'>();
export const WabaIdSchema = BaseStringSchema('WABA ID').brand<'WabaId'>();
export const MessageTemplateIdSchema = BaseStringSchema(
  'Message Template ID'
).brand<'MessageTemplateId'>();
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
export const BlockchainTransactionHashSchema = BaseStringSchema(
  'Hash de transacción',
  66,
  66
)
  .regex(/^0x[a-fA-F0-9]{64}$/, {
    message: 'Formato de hash de transacción Ethereum inválido.',
  })
  .brand<'BlockchainTransactionHash'>();
export const WalletAddressSchema = BaseStringSchema(
  'Dirección de Wallet',
  42,
  42
)
  .regex(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Formato de dirección Ethereum inválido.',
  })
  .brand<'WalletAddress'>();
export const AssetIdSchema = UuidSchema.brand<'AssetId'>();
export const SPEIdSchema = UuidSchema.brand<'SPEId'>();
export const CampaignIdSchema = UuidSchema.brand<'CampaignId'>();
export const BillingPlanIdSchema =
  BaseStringSchema('Billing Plan ID').brand<'BillingPlanId'>();
export const BilledUsageIdSchema = UuidSchema.brand<'BilledUsageId'>();
export const PricingRateIdSchema = UuidSchema.brand<'PricingRateId'>();

// --- Schemas para Tipos Primitivos Semánticos (usando Branded Types de shtypes) ---
export const IsoDateStringSchema = z
  .string({
    required_error: 'Fecha ISO es requerida.',
    invalid_type_error: 'Fecha ISO debe ser un string.',
  })
  .datetime({
    message:
      'Formato de fecha ISO 8601 inválido (ej: 2023-10-27T10:30:00.000Z).',
    offset: true, // Permitir offset
  })
  .brand<'IsoDateString'>();

export const PhoneNumberSchemaInternal = z
  .string()
  .transform((val) => '+' + val.replace(/\D/g, ''))
  .refine((val) => /^\+[1-9]\d{7,14}$/.test(val), {
    message:
      'Formato de número de teléfono inválido después de normalizar. Se espera formato E.164 (ej: +5511987654321).',
  })
  .brand<'PhoneNumberString'>();

export const UrlSchema = z
  .string({ required_error: 'URL es requerida.' })
  .trim()
  .url({ message: 'Formato de URL inválido.' })
  .brand<'UrlString'>();

export const JwtStringSchema = BaseStringSchema(
  'JWT',
  10,
  2000
).brand<'JwtString'>(); // Incrementado max length
export const HexColorStringSchema = BaseStringSchema('Color Hexadecimal', 4, 9) // #RGB, #RRGGBB, #RGBA, #RRGGBBAA
  .regex(/^#([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, {
    message: 'Formato de color hexadecimal inválido (ej: #RRGGBB o #RGB).',
  })
  .brand<'HexColorString'>();
export const CidStringSchema = BaseStringSchema('CID IPFS', 46, 100)
  .regex(/^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[A-Za-z2-7]{58,})$/, {
    // Regex para CIDs v0 y v1
    message: 'Formato de CID IPFS inválido.',
  })
  .brand<'CidString'>();
export const HtmlStringSchema = z.string().brand<'HtmlString'>();
export const MarkdownStringSchema = z.string().brand<'MarkdownString'>();
export const FilePathStringSchema =
  BaseStringSchema('Ruta de archivo').brand<'FilePathString'>();
export const MimeTypeStringSchema = BaseStringSchema('MIME type', 3, 100)
  .toLowerCase()
  .regex(/^[a-z]+\/[-a-z0-9.+_]+$/, {
    message: 'Formato de MIME type inválido (ej: application/json).',
  })
  .brand<'MimeTypeString'>();
// FIN DEL ARCHIVO: libs/shared/shvalidationschemas/src/lib/common.schemas.ts
