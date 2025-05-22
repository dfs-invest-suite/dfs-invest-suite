// RUTA: libs/core/domain/codowhatsapp/src/lib/types/whatsapp-api-message-response.types.ts
import { PhoneNumberString } from '@dfs-suite/shtypes';

/**
 * Representa la respuesta de la API de WhatsApp al enviar un mensaje.
 * @see https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#successful-response
 */
export interface TWhatsAppApiMessageResponse {
  messaging_product: 'whatsapp';
  contacts: Array<{
    input: PhoneNumberString; // El número de teléfono al que se envió el mensaje
    wa_id: PhoneNumberString; // El WhatsApp ID del destinatario
  }>;
  messages: Array<{
    id: string; // El WA Message ID del mensaje enviado
    message_status?: string; // Estado inicial, usualmente 'sent' o similar si el webhook no está configurado para status.
  }>;
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/types/whatsapp-api-message-response.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Creación del tipo TWhatsAppApiMessageResponse.", "justificacion": "Define la estructura de la respuesta esperada al enviar un mensaje a la API Cloud.", "impacto": "Tipado para el IWhatsAppMessagePort." }
]
*/
