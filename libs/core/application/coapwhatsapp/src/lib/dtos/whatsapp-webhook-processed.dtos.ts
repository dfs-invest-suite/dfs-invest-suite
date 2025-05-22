// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/whatsapp-webhook-processed.dtos.ts
import {
  EWhatsAppMessageStatus,
  EWhatsAppMessageType,
  EWhatsAppMessagingLimitTier,
  EWhatsAppTemplateCategory,
  EWhatsAppTemplateStatus,
  TWhatsAppError,
  TWhatsAppPricing,
} from '@dfs-suite/codowhatsapp';
import {
  CorrelationId,
  IsoDateString,
  Maybe,
  MessageTemplateId,
  PhoneNumberString,
  TenantId,
  UrlString,
  WabaId,
  WhatsAppAccountId,
} from '@dfs-suite/shtypes';

// ... (resto del archivo como se definió antes, ahora con los imports correctos)
export interface ProcessedIncomingMessageDto {
  tenantId: TenantId;
  wabaId: WabaId;
  tenantPhoneNumberId: WhatsAppAccountId;
  correlationId: CorrelationId;
  messageWaId: string;
  from: PhoneNumberString;
  timestamp: IsoDateString;
  type: EWhatsAppMessageType | string;
  textContent?: Maybe<string>;
  mediaUrl?: Maybe<UrlString>; // Usa el tipo importado
  mediaMimeType?: Maybe<string>;
  mediaCaption?: Maybe<string>;
  location?: Maybe<{
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
    url?: UrlString;
  }>;
  interactiveReply?: Maybe<{
    type: 'button_reply' | 'list_reply';
    id: string;
    title: string;
    description?: Maybe<string>;
  }>;
  repliedToMessageWaId?: Maybe<string>;
  senderProfileName?: Maybe<string>;
}

export interface ProcessedMessageStatusDto {
  tenantId: TenantId;
  wabaId: WabaId;
  correlationId: CorrelationId;
  messageWaId: string;
  recipientWaId: PhoneNumberString;
  status: EWhatsAppMessageStatus;
  timestamp: IsoDateString;
  conversationId?: Maybe<string>;
  pricing?: Maybe<TWhatsAppPricing>;
  errors?: Maybe<TWhatsAppError[]>;
}

export interface ProcessedTemplateStatusUpdateDto {
  tenantId: TenantId;
  wabaId: WabaId;
  correlationId: CorrelationId;
  messageTemplateId: MessageTemplateId;
  messageTemplateName: string;
  messageTemplateLanguage?: Maybe<string>;
  messageTemplateCategory?: Maybe<EWhatsAppTemplateCategory>; // Usa el tipo importado
  newStatus: EWhatsAppTemplateStatus;
  reason?: Maybe<string>;
}

export interface ProcessedPhoneNumberQualityUpdateDto {
  tenantId: TenantId;
  wabaId: WabaId;
  correlationId: CorrelationId;
  displayPhoneNumber: PhoneNumberString;
  currentLimit: EWhatsAppMessagingLimitTier | string;
}

export interface AccountUpdateAppDto {
  tenantId: TenantId;
  wabaId: WabaId;
  correlationId: CorrelationId;
  event: string;
  details: Record<string, any>; // Mantener any por ahora
  phoneNumber?: Maybe<PhoneNumberString>;
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/whatsapp-webhook-processed.dtos.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de DTOs para webhooks procesados (ProcessedIncomingMessageDto, ProcessedMessageStatusDto, etc.).", "justificacion": "Proporcionan una capa de abstracción sobre los payloads raw de los webhooks, facilitando su consumo por los Casos de Uso de la capa de aplicación. Incluyen tenantId y correlationId.", "impacto": "Desacoplamiento y claridad en el procesamiento de webhooks." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "El ProcessedIncomingMessageDto necesitará un mapeo cuidadoso desde TReceivedMessage para extraer y aplanar la información relevante de los diferentes tipos de mensajes (texto, media, interactivo)."},
{"nota": "El campo details: any en ProcessedAccountUpdateDto debe tiparse más estrictamente a medida que se implemente la lógica para cada tipo de account_update."}
]
*/
