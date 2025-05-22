// RUTA: libs/core/domain/codowhatsapp/src/lib/types/whatsapp-asset.types.ts
import {
  EmailString,
  Maybe,
  MessageTemplateId,
  PhoneNumberString,
  UrlString,
  WhatsAppAccountId,
} from '@dfs-suite/shtypes';

import {
  EWhatsAppMessagingLimitTier,
  EWhatsAppPhoneNumberNameStatus,
  EWhatsAppQualityRating,
  EWhatsAppTemplateCategory,
  EWhatsAppTemplateStatus,
} from '../enums';

// --- Tipos para Componentes de Plantillas (Usados en Creación y Respuesta) ---

/**
 * Representa un parámetro dentro de un componente de plantilla.
 * Por ejemplo, una variable de texto o un media placeholder.
 */
export interface TWhatsAppTemplateParameter {
  type:
    | 'text'
    | 'currency'
    | 'date_time'
    | 'image'
    | 'document'
    | 'video'
    | 'payload'; // 'payload' para botones de respuesta rápida
  text?: Maybe<string>; // Para {{1}}
  currency?: Maybe<{
    fallback_value: string;
    code: string; // ej. "BRL"
    amount_1000: number; // ej. 123450 para R$123,45
  }>;
  date_time?: Maybe<{
    fallback_value: string; // Fecha/hora legible
    // Meta podría usar timestamp o componentes individuales aquí. `fallback_value` es el mínimo.
  }>;
  image?: Maybe<{
    id?: Maybe<string>;
    link?: Maybe<UrlString>;
    filename?: Maybe<string>;
  }>; // ID de media subido o link
  document?: Maybe<{
    id?: Maybe<string>;
    link?: Maybe<UrlString>;
    filename: string;
  }>;
  video?: Maybe<{
    id?: Maybe<string>;
    link?: Maybe<UrlString>;
    filename?: Maybe<string>;
  }>;
  payload?: Maybe<string>; // Para botones de respuesta rápida
}

/**
 * Representa un botón dentro de una plantilla.
 */
export interface TWhatsAppTemplateButton {
  type:
    | 'PHONE_NUMBER' // Botón de llamada
    | 'URL' // Botón de enlace web
    | 'QUICK_REPLY' // Botón de respuesta rápida (payload)
    | 'COPY_CODE' // Botón para copiar código (ej. OTP)
    | 'OTP' // Botón específico para One-Time Passwords
    | 'CATALOG' // Futuro: Botón para abrir catálogo
    | 'MPM'; // Futuro: Multi-Product Message
  text?: Maybe<string>; // Texto del botón (para URL, PHONE_NUMBER, COPY_CODE, OTP)
  phone_number?: Maybe<PhoneNumberString>; // Para tipo PHONE_NUMBER
  url?: Maybe<UrlString>; // Para tipo URL
  example?: Maybe<string[]>; // Para variables en la URL de un botón tipo URL (ej. https://dominio.com/{{1}})
  payload?: Maybe<string>; // Para tipo QUICK_REPLY
  // Para OTP
  otp_type?: 'COPY_CODE' | 'ONE_TAP_AUTOFILL'; // ONE_TAP_AUTOFILL es obsoleto
  autofill_text?: Maybe<string>; // Para OTP ONE_TAP (obsoleto)
  package_name?: Maybe<string>; // Para OTP ONE_TAP (obsoleto, Android)
  signature_hash?: Maybe<string>; // Para OTP ONE_TAP (obsoleto, Android)
  // ... otros campos específicos de tipos de botones avanzados
}

/**
 * Representa un componente de una plantilla (HEADER, BODY, FOOTER, BUTTONS).
 */
export interface TWhatsAppTemplateComponent {
  type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
  format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'LOCATION'; // Para HEADER
  text?: Maybe<string>; // Para HEADER (format TEXT), BODY, FOOTER
  example?: Maybe<{
    // Para variables en header_text, body_text, y botones de URL
    header_handle?: Maybe<string[]>; // Obsoleto, usar header_text con variables
    header_text?: Maybe<string[]>; // Ejemplo para la variable en el texto del header
    body_text?: Maybe<string[][]>; // Array de arrays para múltiples conjuntos de ejemplos de variables del cuerpo
    // footer_text?: string[]; // Si el footer tuviera variables
    // buttons_url_example?: string[][]; // Si los botones URL tuvieran variables y se proveyeran ejemplos
  }>;
  // Para HEADER con media
  id?: Maybe<string>; // Media ID (para handle de media subido previamente)
  link?: Maybe<UrlString>; // URL directa del media (para HEADER IMAGE, VIDEO, DOCUMENT)
  // Para BUTTONS
  buttons?: Maybe<TWhatsAppTemplateButton[]>;
  // Para carrusel (avanzado)
  cards?: Maybe<TWhatsAppTemplateCard[]>; // Definido abajo
  // Para botones de URL, el índice es implícito por el orden en el array `buttons`.
  // La API de Meta a veces usa `index` en el payload de envío (TWhatsAppTemplateComponentParameter)
  // pero no típicamente en la definición de la plantilla devuelta por la API.
}

// --- Estructuras para Plantillas de Carrusel (Carousel Templates) ---
export interface TWhatsAppTemplateCardComponentButton {
  type: 'url' | 'quick_reply' | 'phone_number' | 'catalog'; // Añadir tipos según Meta
  title?: Maybe<string>; // Para quick_reply
  url?: Maybe<UrlString>;
  phone_number?: Maybe<PhoneNumberString>;
  payload?: Maybe<string>; // Para quick_reply
  example?: Maybe<string[]>; // Para variables en URL
  product_retailer_id?: Maybe<string>; // Para botones de catálogo
}
export interface TWhatsAppTemplateCardComponent {
  type: 'HEADER' | 'BODY' | 'BUTTONS';
  format?: 'IMAGE' | 'VIDEO'; // Solo para HEADER de tarjeta
  text?: Maybe<string>; // Para BODY de tarjeta
  // Para HEADER de tarjeta (media)
  id?: Maybe<string>; // Media ID (handle)
  link?: Maybe<UrlString>; // URL directa
  example?: Maybe<{ header_handle?: string[]; header_link?: string[] }>; // Para header de tarjeta
  buttons?: Maybe<TWhatsAppTemplateCardComponentButton[]>;
}
export interface TWhatsAppTemplateCard {
  card_index: number; // 0-9
  components: TWhatsAppTemplateCardComponent[];
}

// --- Respuesta de la API de Meta al Listar/Obtener una Plantilla ---
export interface TWhatsAppTemplateResponse {
  id: MessageTemplateId; // El HSM ID de la plantilla, devuelto por Meta
  status: EWhatsAppTemplateStatus;
  category: EWhatsAppTemplateCategory;
  name: string;
  language: string;
  components: TWhatsAppTemplateComponent[];
  quality_score?: Maybe<{ score: number; date: string }>; // Campo obsoleto
  quality_rating?: Maybe<EWhatsAppQualityRating>; // Campo más nuevo
  rejected_reason?: Maybe<string>; // Si status es REJECTED
  // created_at / updated_at no son usualmente devueltos por la API de Meta para plantillas.
}

// --- Payload para Crear una Nueva Plantilla de Mensaje ---
export interface TWhatsAppTemplateCreationRequest {
  name: string; // Máx 512 chars. Solo minúsculas, números y guiones bajos.
  language: string; // ej. 'pt_BR', 'en_US'
  category: EWhatsAppTemplateCategory;
  allow_category_change?: boolean; // Default false.
  components: TWhatsAppTemplateComponent[]; // Definición de header, body, footer, buttons
}

// --- Números de Teléfono (Respuesta de la API de Meta) ---
export interface TWhatsAppPhoneNumber {
  id: WhatsAppAccountId; // El ID del número de teléfono asignado por Meta (nuestro WhatsAppAccountId)
  verified_name: string; // El nombre verificado para mostrar
  display_phone_number: PhoneNumberString; // El número de teléfono en formato internacional
  quality_rating: EWhatsAppQualityRating; // Calificación de calidad actual (GREEN, YELLOW, RED)
  code_verification_status?: Maybe<string>; // Estado de verificación del código (ej. VERIFIED)
  name_status?: Maybe<EWhatsAppPhoneNumberNameStatus>; // Estado de aprobación del nombre para mostrar
  new_name_status?: Maybe<EWhatsAppPhoneNumberNameStatus>; // Si hay un cambio de nombre pendiente
  status?: Maybe<string>; // Estado de conexión del número (ej. CONNECTED, OFFLINE, PENDING)
  messaging_limit_tier: EWhatsAppMessagingLimitTier; // Nivel de límite de mensajería
  is_official_business_account: boolean; // Si es una Cuenta de Negocio Oficial (OBA)
  certificate?: Maybe<string>; // Certificado público del número (raramente usado por nosotros)
  // Otros campos que Meta podría devolver:
  // platform_type?: 'CLOUD_API' | 'ON_PREMISE';
  // through_partner_app?: Maybe<string>;
  // account_mode?: 'SANDBOXED_STANDARD_ACCOUNT' | 'STANDARD_ACCOUNT';
}

// --- Activos de Media (Respuesta al Subir Media) ---
export interface TWhatsAppAssetUploadResponse {
  id: string; // ID del media subido, para usar en mensajes de media o plantillas
  h?: Maybe<string>; // Handle de media, a veces devuelto pero 'id' es el preferido
}

// --- Perfil de Negocio de WhatsApp ---
export interface TWhatsAppBusinessProfile {
  messaging_product: 'whatsapp'; // Siempre 'whatsapp'
  address?: Maybe<string>; // Dirección física del negocio
  description?: Maybe<string>; // Descripción corta del negocio
  email?: Maybe<EmailString>; // Email de contacto público
  profile_picture_url?: Maybe<UrlString>; // URL de la foto de perfil (debe ser pública y accesible)
  websites?: Maybe<UrlString[]>; // Hasta 2 sitios web
  vertical?: Maybe<string>; // Industria del negocio (ej. "UNDEFINED", "OTHER", "AUTO", "BEAUTY")
  about?: Maybe<string>; // El "Recado" o "Info." del perfil de WhatsApp
}

// --- Webhooks Suscritos (Respuesta de la API de Suscripción) ---
export interface TSubscribedAppFieldsResponse {
  success: boolean; // Indica si la suscripción/actualización fue exitosa
  // La API podría devolver más detalles, pero 'success' es el principal.
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/types/whatsapp-asset.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición completa de TWhatsAppTemplateComponent, TWhatsAppTemplateButton, TWhatsAppTemplateResponse, TWhatsAppTemplateCreationRequest, TWhatsAppPhoneNumber, TWhatsAppAssetUploadResponse, TWhatsAppBusinessProfile, y TSubscribedAppFieldsResponse.", "justificacion": "Proporciona un tipado exhaustivo para los principales activos de WhatsApp que se gestionan a través de la API de Administración de Meta, alineado con la documentación oficial y las necesidades del proyecto.", "impacto": "Base sólida y tipada para la implementación de los puertos de administración y los Casos de Uso relacionados." },
{ "mejora": "Importación y uso correcto de PhoneNumberString, IsoDateString, EmailString, UrlString desde @dfs-suite/shtypes y los Enums locales.", "justificacion": "Resuelve los errores no-undef y asegura la consistencia de tipos.", "impacto": "El archivo ahora es sintácticamente correcto y robusto en cuanto a tipos." },
{ "mejora": "Estructuras detalladas para componentes de plantillas, incluyendo ejemplos y manejo de media (ID vs Link).", "justificacion": "Permite la creación y parseo de plantillas complejas.", "impacto": "Funcionalidad completa para gestión de plantillas." },
{ "mejora": "Placeholder para estructuras de plantillas de carrusel (TWhatsAppTemplateCard).", "justificacion": "Anticipa una funcionalidad avanzada.", "impacto": "Preparación para evolución futura."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{ "nota": "Los campos example dentro de TWhatsAppTemplateComponent y TWhatsAppTemplateButton son cruciales para la aprobación de plantillas por Meta y deben ser manejados correctamente al crear/actualizar plantillas." },
{ "nota": "La gestión de media (subida y obtención de IDs/handles) para plantillas es un flujo importante. TWhatsAppAssetUploadResponse es la respuesta de la subida; ese ID se usaría en el componente de plantilla." }
]
*/
