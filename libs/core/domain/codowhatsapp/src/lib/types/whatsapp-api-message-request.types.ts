// RUTA: libs/core/domain/codowhatsapp/src/lib/types/whatsapp-api-message-request.types.ts
import { Maybe, PhoneNumberString, UrlString } from '@dfs-suite/shtypes';

import { EWhatsAppMessageType } from '../enums'; // <<< AÑADIDO IMPORT

// Base para todos los mensajes
export interface TWhatsAppApiMessageRequestBase {
  messaging_product: 'whatsapp';
  recipient_type?: 'individual';
  to: PhoneNumberString;
  type: EWhatsAppMessageType; // Usar el Enum importado
  context?: {
    message_id: string;
  };
}

// --- Tipos de Mensajes Específicos ---

// 1. Texto
export interface TWhatsAppTextBody {
  preview_url?: boolean;
  body: string;
}
export interface TWhatsAppApiTextMessageRequest
  extends TWhatsAppApiMessageRequestBase {
  type: 'text'; // Se puede refinar usando EWhatsAppMessageType.TEXT si se prefiere
  text: TWhatsAppTextBody;
}

// 2. Media (Imagen, Audio, Video, Documento, Sticker)
export interface TWhatsAppMediaObject {
  id?: Maybe<string>;
  link?: Maybe<UrlString>;
  caption?: Maybe<string>;
  filename?: Maybe<string>;
}
export interface TWhatsAppApiImageMessageRequest
  extends TWhatsAppApiMessageRequestBase {
  type: 'image'; // EWhatsAppMessageType.IMAGE
  image: TWhatsAppMediaObject;
}
export interface TWhatsAppApiAudioMessageRequest
  extends TWhatsAppApiMessageRequestBase {
  type: 'audio'; // EWhatsAppMessageType.AUDIO
  audio: TWhatsAppMediaObject;
}
export interface TWhatsAppApiVideoMessageRequest
  extends TWhatsAppApiMessageRequestBase {
  type: 'video'; // EWhatsAppMessageType.VIDEO
  video: TWhatsAppMediaObject;
}
export interface TWhatsAppApiDocumentMessageRequest
  extends TWhatsAppApiMessageRequestBase {
  type: 'document'; // EWhatsAppMessageType.DOCUMENT
  document: TWhatsAppMediaObject;
}
export interface TWhatsAppApiStickerMessageRequest
  extends TWhatsAppApiMessageRequestBase {
  type: 'sticker'; // EWhatsAppMessageType.STICKER
  sticker: TWhatsAppMediaObject;
}

// 3. Contactos
export interface TWhatsAppContactName {
  formatted_name: string;
  first_name?: Maybe<string>;
  last_name?: Maybe<string>;
  middle_name?: Maybe<string>;
  suffix?: Maybe<string>;
  prefix?: Maybe<string>;
}
export interface TWhatsAppContactAddress {
  street?: Maybe<string>;
  city?: Maybe<string>;
  state?: Maybe<string>;
  zip?: Maybe<string>;
  country?: Maybe<string>;
  country_code?: Maybe<string>;
  type?: 'HOME' | 'WORK';
}
export interface TWhatsAppContactEmail {
  email?: Maybe<string>; // Podría ser EmailString de shtypes si se valida
  type?: 'HOME' | 'WORK';
}
export interface TWhatsAppContactOrg {
  company?: Maybe<string>;
  department?: Maybe<string>;
  title?: Maybe<string>;
}
export interface TWhatsAppContactPhone {
  phone?: Maybe<PhoneNumberString>;
  type?: 'CELL' | 'MAIN' | 'IPHONE' | 'HOME' | 'WORK';
  wa_id?: Maybe<PhoneNumberString>;
}
export interface TWhatsAppContactUrl {
  url?: Maybe<UrlString>;
  type?: 'HOME' | 'WORK';
}
export interface TWhatsAppContact {
  addresses?: Maybe<TWhatsAppContactAddress[]>;
  birthday?: Maybe<string>; // YYYY-MM-DD
  emails?: Maybe<TWhatsAppContactEmail[]>;
  name: TWhatsAppContactName;
  org?: Maybe<TWhatsAppContactOrg>;
  phones?: Maybe<TWhatsAppContactPhone[]>;
  urls?: Maybe<TWhatsAppContactUrl[]>;
}
export interface TWhatsAppApiContactsMessageRequest
  extends TWhatsAppApiMessageRequestBase {
  type: 'contacts'; // EWhatsAppMessageType.CONTACTS
  contacts: TWhatsAppContact[];
}

// 4. Ubicación
export interface TWhatsAppLocation {
  longitude: number;
  latitude: number;
  name?: Maybe<string>;
  address?: Maybe<string>;
}
export interface TWhatsAppApiLocationMessageRequest
  extends TWhatsAppApiMessageRequestBase {
  type: 'location'; // EWhatsAppMessageType.LOCATION
  location: TWhatsAppLocation;
}

// 5. Interactivo
export interface TWhatsAppInteractiveReplyButton {
  type: 'reply';
  reply: {
    id: string;
    title: string;
  };
}
export interface TWhatsAppInteractiveActionButton {
  type: 'button';
  buttons: TWhatsAppInteractiveReplyButton[];
}
export interface TWhatsAppInteractiveListRow {
  id: string;
  title: string;
  description?: Maybe<string>;
}
export interface TWhatsAppInteractiveListSection {
  title?: Maybe<string>;
  rows: TWhatsAppInteractiveListRow[];
}
export interface TWhatsAppInteractiveListAction {
  button: string;
  sections: TWhatsAppInteractiveListSection[];
}
export interface TWhatsAppInteractiveFlowAction {
  name: 'flow';
  parameters: {
    flow_message_version: '3';
    flow_token: string;
    flow_id: string;
    flow_cta: string;
    flow_action: 'navigate' | 'data_exchange';
    flow_action_payload: {
      screen: string;
      data?: Maybe<Record<string, unknown>>;
    };
  };
}
export interface TWhatsAppInteractiveHeader {
  type: 'text' | 'video' | 'image' | 'document';
  text?: Maybe<string>;
  video?: Maybe<TWhatsAppMediaObject>;
  image?: Maybe<TWhatsAppMediaObject>;
  document?: Maybe<TWhatsAppMediaObject>;
}
export interface TWhatsAppInteractiveBody {
  text: string;
}
export interface TWhatsAppInteractiveFooter {
  text: string;
}
export interface TWhatsAppInteractiveMessage {
  type:
    | 'button'
    | 'list'
    | 'product'
    | 'product_list'
    | 'flow'
    | 'catalog_message';
  header?: Maybe<TWhatsAppInteractiveHeader>;
  body: TWhatsAppInteractiveBody;
  footer?: Maybe<TWhatsAppInteractiveFooter>;
  action:
    | TWhatsAppInteractiveActionButton
    | TWhatsAppInteractiveListAction
    | TWhatsAppInteractiveFlowAction;
}
export interface TWhatsAppApiInteractiveMessageRequest
  extends TWhatsAppApiMessageRequestBase {
  type: 'interactive'; // EWhatsAppMessageType.INTERACTIVE
  interactive: TWhatsAppInteractiveMessage;
}

// 6. Plantillas
export interface TWhatsAppTemplateLanguage {
  code: string;
}
export interface TWhatsAppTemplateButtonParameter {
  type: 'payload' | 'text';
  payload?: Maybe<string>;
  text?: Maybe<string>;
}
export interface TWhatsAppTemplateComponentParameter {
  type:
    | 'text'
    | 'currency'
    | 'date_time'
    | 'image'
    | 'document'
    | 'video'
    | 'payload'
    | 'button';
  text?: Maybe<string>;
  currency?: Maybe<{
    fallback_value: string;
    code: string;
    amount_1000: number;
  }>;
  date_time?: Maybe<{ fallback_value: string }>;
  image?: Maybe<TWhatsAppMediaObject>;
  document?: Maybe<TWhatsAppMediaObject>;
  video?: Maybe<TWhatsAppMediaObject>;
  payload?: Maybe<string>;
  sub_type?: 'url' | 'quick_reply';
  index?: Maybe<string>;
  parameters?: TWhatsAppTemplateButtonParameter[];
}
export interface TWhatsAppTemplateComponent {
  type: 'header' | 'body' | 'footer' | 'button';
  sub_type?: 'url' | 'quick_reply' | 'carousel' | 'catalog';
  parameters?: TWhatsAppTemplateComponentParameter[];
  index?: Maybe<string>;
  cards?: Maybe<TWhatsAppTemplateCard[]>;
}
export interface TWhatsAppTemplateCardComponentButton {
  type: 'url' | 'quick_reply' | 'phone_number';
  title?: Maybe<string>;
  url?: Maybe<string>;
  phone_number?: Maybe<string>;
  payload?: Maybe<string>;
  example?: Maybe<string[]>;
}
export interface TWhatsAppTemplateCardComponent {
  type: 'header' | 'body' | 'buttons';
  format?: 'IMAGE' | 'VIDEO';
  text?: Maybe<string>;
  media_id?: Maybe<string>;
  media_link?: Maybe<string>;
  buttons?: TWhatsAppTemplateCardComponentButton[];
}
export interface TWhatsAppTemplateCard {
  card_index: number;
  components: TWhatsAppTemplateCardComponent[];
}
export interface TWhatsAppTemplate {
  namespace?: Maybe<string>;
  name: string;
  language: TWhatsAppTemplateLanguage;
  components?: TWhatsAppTemplateComponent[];
}
export interface TWhatsAppApiTemplateMessageRequest
  extends TWhatsAppApiMessageRequestBase {
  type: 'template'; // EWhatsAppMessageType.TEMPLATE
  template: TWhatsAppTemplate;
}

// 7. Reacción
export interface TWhatsAppReaction {
  message_id: string;
  emoji: string;
}
export interface TWhatsAppApiReactionMessageRequest
  extends TWhatsAppApiMessageRequestBase {
  type: 'reaction'; // EWhatsAppMessageType.REACTION
  reaction: TWhatsAppReaction;
}

export type TWhatsAppApiMessageRequest =
  | TWhatsAppApiTextMessageRequest
  | TWhatsAppApiImageMessageRequest
  | TWhatsAppApiAudioMessageRequest
  | TWhatsAppApiVideoMessageRequest
  | TWhatsAppApiDocumentMessageRequest
  | TWhatsAppApiStickerMessageRequest
  | TWhatsAppApiContactsMessageRequest
  | TWhatsAppApiLocationMessageRequest
  | TWhatsAppApiInteractiveMessageRequest
  | TWhatsAppApiTemplateMessageRequest
  | TWhatsAppApiReactionMessageRequest;
// RUTA: libs/core/domain/codowhatsapp/src/lib/types/whatsapp-api-message-request.types.ts

/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadida la importación de EWhatsAppMessageType desde ../enums.", "justificacion": "Resuelve el error no-undef para EWhatsAppMessageType.", "impacto": "El archivo ahora es sintácticamente correcto y usa el enum definido." },
{ "mejora": "Comentarios añadidos para indicar dónde usar los valores del enum EWhatsAppMessageType en los campos type.", "justificacion": "Guía para la implementación y consistencia futura.", "impacto": "Claridad." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
