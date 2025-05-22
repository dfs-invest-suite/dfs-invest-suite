// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/asset-update-app.dto.ts
import {
  EWhatsAppTemplateStatus,
  EWhatsAppTemplateCategory,
  EWhatsAppQualityRating,
  EWhatsAppPhoneNumberNameStatus,
  EWhatsAppMessagingLimitTier,
  // TWebhookAccountUpdate, // Usamos un tipo más aplanado aquí
} from '@dfs-suite/codowhatsapp';
import {
  TenantId,
  WabaId,
  CorrelationId,
  MessageTemplateId,
  PhoneNumberString,
  Maybe,
} from '@dfs-suite/shtypes';

// DTO para el payload del ProcessWhatsAppAssetUpdateUseCase cuando el field es 'message_template_status_update'
export interface TemplateStatusUpdateAppDto {
  tenantId: TenantId;
  wabaId: WabaId;
  correlationId: CorrelationId;
  messageTemplateId: MessageTemplateId;
  messageTemplateName: string;
  messageTemplateLanguage?: Maybe<string>;
  messageTemplateCategory?: Maybe<EWhatsAppTemplateCategory>;
  newStatus: EWhatsAppTemplateStatus;
  reason?: Maybe<string>;
}

// DTO para el payload del ProcessWhatsAppAssetUpdateUseCase cuando el field es 'phone_number_quality_update'
export interface PhoneNumberQualityUpdateAppDto {
  tenantId: TenantId;
  wabaId: WabaId;
  correlationId: CorrelationId;
  displayPhoneNumber: PhoneNumberString;
  currentLimit: EWhatsAppMessagingLimitTier | string; // El string es por si Meta añade nuevos tiers no cubiertos por el enum
  // Podría añadirse el WhatsAppAccountId (nuestro ID) si se resuelve antes de llamar al UC
}

// DTO para el payload del ProcessWhatsAppAssetUpdateUseCase cuando el field es 'phone_number_name_update'
export interface PhoneNumberNameUpdateAppDto {
  tenantId: TenantId;
  wabaId: WabaId;
  correlationId: CorrelationId;
  displayPhoneNumber: PhoneNumberString;
  newNameStatus: EWhatsAppPhoneNumberNameStatus;
  // ... otros campos relevantes del webhook de Meta
}

// DTO para el payload del ProcessWhatsAppAssetUpdateUseCase cuando el field es 'account_update'
// Este es más genérico porque 'account_update' puede tener varios 'event' types.
export interface AccountUpdateAppDto {
  tenantId: TenantId;
  wabaId: WabaId;
  correlationId: CorrelationId;
  event: string; // ej. 'ban_state_update', 'messaging_limit_tier_update', 'business_capability_update'
  details: Record<string, any>; // Payload específico del sub-evento (ban_info, messaging_limit_tier_update, etc.)
  phoneNumber?: Maybe<PhoneNumberString>; // Si la actualización es a nivel de número
}

// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/asset-update-app.dto.ts

/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de DTOs específicos para cada tipo de actualización de activo de WhatsApp (TemplateStatusUpdateAppDto, PhoneNumberQualityUpdateAppDto, PhoneNumberNameUpdateAppDto, AccountUpdateAppDto).", "justificacion": "Proporciona estructuras de datos claras y tipadas para el ProcessWhatsAppAssetUpdateUseCase, facilitando el manejo de los diferentes payloads de webhooks de gestión.", "impacto": "Mejora la robustez y mantenibilidad del procesamiento de webhooks de activos." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "El campo details: any en AccountUpdateAppDto debería ser tipado más estrictamente con una unión de tipos para cada posible sub-evento de account_update (ej. BanInfoPayload, MessagingLimitTierUpdatePayload) una vez que estos sean completamente definidos según la documentación de Meta."}
]
*/
