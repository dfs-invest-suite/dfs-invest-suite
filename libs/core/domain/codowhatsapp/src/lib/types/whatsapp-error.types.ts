// RUTA: libs/core/domain/codowhatsapp/src/lib/types/whatsapp-error.types.ts
import { Maybe } from '@dfs-suite/shtypes';

/**
 * Estructura de error devuelta por la API de WhatsApp Cloud.
 * @see https://developers.facebook.com/docs/graph-api/guides/error-handling/
 * @see https://developers.facebook.com/docs/whatsapp/cloud-api/support/error-codes/
 */
export interface TWhatsAppApiErrorData {
  messaging_product: 'whatsapp';
  details?: Maybe<string>; // Descripción detallada del error
  // Campos adicionales específicos del error pueden estar aquí
  blame_field_specs?: Maybe<Array<[string]>>; // Para errores de validación de plantillas
}

export interface TWhatsAppError {
  code: number; // Código de error numérico de Meta
  title?: Maybe<string>; // Título legible del error
  message: string; // Mensaje de error principal
  error_subcode?: Maybe<number>; // Subcódigo de error, si aplica
  is_transient?: Maybe<boolean>; // Si el error es transitorio y se puede reintentar
  error_data?: Maybe<TWhatsAppApiErrorData>;
  fbtrace_id?: Maybe<string>; // ID de rastreo de Facebook
  type?: Maybe<string>; // Tipo de excepción de Graph API (ej. "OAuthException")
}

// Para la respuesta de error completa de la API Graph
export interface TWhatsAppGraphApiErrorResponse {
  error: TWhatsAppError;
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/types/whatsapp-error.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de TWhatsAppError y TWhatsAppGraphApiErrorResponse.", "justificacion": "Modela la estructura de errores de la API de Meta, incluyendo subcódigos y fbtrace_id.", "impacto": "Manejo de errores más preciso." } */
