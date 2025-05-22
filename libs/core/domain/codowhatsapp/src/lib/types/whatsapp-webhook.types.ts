// RUTA: libs/core/domain/codowhatsapp/src/lib/types/whatsapp-webhook.types.ts
import {
  Maybe,
  PhoneNumberString,
  IsoDateString,
  WabaId,
  MessageTemplateId,
  WhatsAppAccountId as PhoneNumberId,
  UrlString /* <<< AÑADIDO */,
} from '@dfs-suite/shtypes';

import {
  EWhatsAppMessageStatus,
  EWhatsAppMessageType,
  EWhatsAppTemplateCategory,
  EWhatsAppTemplateStatus,
  EWhatsAppWebhookField,
  EWhatsAppQualityRating,
  EWhatsAppPhoneNumberNameStatus,
  EWhatsAppMessagingLimitTier,
  EWhatsAppConversationCategory /* <<< AÑADIDO */,
} from '../enums';

import { TWhatsAppError, TWhatsAppPricing } from './';

// --- Estructuras Comunes de Webhook ---
export interface TWebhookBusiness {
  id: WabaId;
  phone_number_id: PhoneNumberId;
  display_phone_number: PhoneNumberString;
  name?: Maybe<string>;
}

export interface TWebhookMetadata {
  display_phone_number: PhoneNumberString;
  phone_number_id: PhoneNumberId;
}

export interface TWebhookContactProfile {
  name: string;
}
export interface TWebhookContact {
  profile: TWebhookContactProfile;
  wa_id: PhoneNumberString;
}

// --- Estructuras de Mensajes Entrantes ---
export interface TWebhookTextMessage {
  body: string;
}
export interface TWebhookMediaMessage {
  id: string;
  mime_type: string;
  sha256?: Maybe<string>;
  caption?: Maybe<string>;
  filename?: Maybe<string>;
}
export interface TWebhookLocationMessage {
  latitude: number;
  longitude: number;
  name?: Maybe<string>;
  address?: Maybe<string>;
  url?: Maybe<UrlString>; // <<< CORREGIDO
}
export interface TWebhookContactsMessage {
  contacts: TWebhookContact[];
}
export interface TWebhookInteractiveReplyContext {
  type: 'button_reply';
  button_reply: {
    id: string;
    title: string;
  };
}
export interface TWebhookInteractiveListContext {
  type: 'list_reply';
  list_reply: {
    id: string;
    title: string;
    description?: Maybe<string>;
  };
}
export interface TWebhookOrderMessage {
  catalog_id: string;
  text?: Maybe<string>;
  product_items: Array<{
    product_retailer_id: string;
    quantity: string;
    item_price: string;
    currency: string;
  }>;
}
export interface TWebhookSystemUpdate {
  body: string;
  identity?: Maybe<string>;
  new_wa_id?: Maybe<PhoneNumberString>;
  type: 'customer_changed_number' | 'customer_identity_changed';
}
export interface TWebhookMessageContext {
  forwarded?: Maybe<boolean>;
  frequently_forwarded?: Maybe<boolean>;
  from?: Maybe<PhoneNumberString>;
  id?: Maybe<string>;
}
export interface TReceivedMessage {
  from: PhoneNumberString;
  id: string;
  timestamp: string;
  type: EWhatsAppMessageType | string;
  text?: Maybe<TWebhookTextMessage>;
  image?: Maybe<TWebhookMediaMessage>;
  audio?: Maybe<TWebhookMediaMessage>;
  video?: Maybe<TWebhookMediaMessage>;
  document?: Maybe<TWebhookMediaMessage>;
  sticker?: Maybe<TWebhookMediaMessage>;
  location?: Maybe<TWebhookLocationMessage>;
  contacts?: Maybe<TWebhookContactsMessage>;
  interactive?: Maybe<
    TWebhookInteractiveReplyContext | TWebhookInteractiveListContext
  >;
  order?: Maybe<TWebhookOrderMessage>;
  system?: Maybe<TWebhookSystemUpdate>;
  errors?: Maybe<TWhatsAppError[]>;
  context?: Maybe<TWebhookMessageContext>;
}

// --- Estructuras de Status de Mensajes ---
export interface TWebhookMessageStatusOrigin {
  type:
    | EWhatsAppConversationCategory
    | 'user_initiated'
    | 'business_initiated'
    | 'referral_conversion'
    | string; // <<< CORREGIDO
}
export interface TWebhookMessageStatusConversation {
  id: string;
  origin: TWebhookMessageStatusOrigin;
  expiration_timestamp?: Maybe<string>;
}
export interface TWebhookMessageStatus {
  id: string;
  recipient_id: PhoneNumberString;
  status: EWhatsAppMessageStatus;
  timestamp: string;
  conversation?: Maybe<TWebhookMessageStatusConversation>;
  pricing?: Maybe<TWhatsAppPricing>;
  errors?: Maybe<TWhatsAppError[]>;
}

// --- Estructuras de Actualización de Activos ---
export interface TWebhookTemplateStatusUpdate {
  message_template_id: MessageTemplateId;
  message_template_name: string;
  message_template_language: string;
  event: 'template_status_update';
  new_template_status: EWhatsAppTemplateStatus;
  reason?: Maybe<string>;
}
export interface TWebhookPhoneNumberQualityUpdate {
  event: 'phone_number_quality_update';
  current_limit: EWhatsAppMessagingLimitTier | string;
  display_phone_number: PhoneNumberString;
}
export interface TWebhookPhoneNumberNameUpdate {
  event: 'phone_number_name_update';
  display_phone_number: PhoneNumberString;
  name_status: EWhatsAppPhoneNumberNameStatus;
}
export interface TWebhookAccountUpdate {
  event: 'account_update';
  phone_number?: Maybe<PhoneNumberString>;
  ban_info?: Maybe<{
    waba_id: WabaId;
    ban_state: 'BANNED' | 'UNBANNED' | 'SCHEDULE_FOR_DISABLE' | 'REINSTATED';
    ban_date?: Maybe<IsoDateString>;
  }>;
  account_restrictions?: Maybe<
    Array<{
      type:
        | 'MESSAGING_LIMIT_UPDATE'
        | 'PHONE_NUMBER_QUALITY_UPDATE'
        | 'ACCOUNT_BANNED_FOR_POLICY_VIOLATION'
        | string;
      config?: Maybe<Record<string, unknown>>;
    }>
  >;
  messaging_limit_tier_update?: Maybe<{
    messaging_limit_tier: EWhatsAppMessagingLimitTier;
    effective_date?: Maybe<string>;
  }>;
  business_capability_update?: Maybe<{
    business_capability: 'PHONE_NUMBER_VERIFICATION' | string;
    new_value: string;
    event_effective_date?: Maybe<string>;
  }>;
}

// --- Valor del Webhook ---
export type TWebhookValueMessages = {
  messaging_product: 'whatsapp';
  metadata: TWebhookMetadata;
  contacts?: Maybe<TWebhookContact[]>;
  messages?: Maybe<TReceivedMessage[]>;
  statuses?: Maybe<TWebhookMessageStatus[]>;
  errors?: Maybe<TWhatsAppError[]>;
};

export type TWebhookValueTemplateStatus = TWebhookTemplateStatusUpdate;
export type TWebhookValuePhoneNumberQuality = TWebhookPhoneNumberQualityUpdate;
export type TWebhookValuePhoneNumberName = TWebhookPhoneNumberNameUpdate;
export type TWebhookValueAccountUpdate = TWebhookAccountUpdate;

export type TWebhookValue =
  | TWebhookValueMessages
  | TWebhookValueTemplateStatus
  | TWebhookValuePhoneNumberQuality
  | TWebhookValuePhoneNumberName
  | TWebhookValueAccountUpdate;

// --- Estructura Principal del Webhook ---
export interface TWebhookChange {
  value: TWebhookValue;
  field: EWhatsAppWebhookField | string;
}
export interface TWhatsAppWebhookEntry {
  id: WabaId;
  changes: TWebhookChange[];
}
export interface TWhatsAppWebhookPayload {
  object: 'whatsapp_business_account';
  entry: TWhatsAppWebhookEntry[];
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/types/whatsapp-webhook.types.ts
