// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/incoming-message-app.dto.ts
import { EWhatsAppMessageType } from '@dfs-suite/codowhatsapp';
import {
  TenantId,
  CorrelationId,
  WabaId,
  WhatsAppAccountId, // Número del tenant que recibió
  PhoneNumberString, // WA ID del remitente
  IsoDateString,
  Maybe,
  UrlString,
} from '@dfs-suite/shtypes';

// DTO para el payload del ProcessIncomingWhatsAppMessageUseCase
export interface IncomingMessageAppDto {
  tenantId: TenantId;
  wabaId: WabaId;
  tenantPhoneNumberId: WhatsAppAccountId; // El número de WA del tenant que recibió el mensaje
  correlationId: CorrelationId;

  // Información del mensaje
  messageWaId: string; // ID del mensaje de WhatsApp
  from: PhoneNumberString; // WA ID del remitente (cliente)
  timestamp: IsoDateString; // Momento en que el mensaje fue recibido por los servidores de WA
  type: EWhatsAppMessageType | string; // text, image, interactive, etc.

  // Contenido (dependiendo del tipo)
  textContent?: Maybe<string>;
  mediaId?: Maybe<string>; // ID del media si es un mensaje de media
  mediaUrl?: Maybe<UrlString>; // URL del media (si se puede obtener/derivar)
  mediaMimeType?: Maybe<string>;
  mediaCaption?: Maybe<string>;
  location?: Maybe<{
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
    url?: UrlString;
  }>;
  // Para respuestas interactivas
  interactiveReply?: Maybe<{
    type: 'button_reply' | 'list_reply';
    id: string; // ID del botón o fila de lista
    title: string; // Título del botón o fila
    description?: Maybe<string>; // Descripción (para list_reply)
  }>;
  // Para contexto de respuesta
  repliedToMessageWaId?: Maybe<string>;

  // Perfil del remitente (opcional, si el webhook lo incluye y es el primer mensaje)
  senderProfileName?: Maybe<string>;
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/incoming-message-app.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de IncomingMessageAppDto.", "justificacion": "DTO estructurado para pasar la información relevante de un mensaje de WhatsApp entrante al ProcessIncomingWhatsAppMessageUseCase. Incluye campos clave para el tracking de interacciones y la posible calificación de leads.", "impacto": "Contrato de datos claro para el procesamiento de mensajes entrantes." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "Este DTO puede necesitar ser expandido para incluir más detalles de tipos de mensajes interactivos complejos (ej. product messages, flows) o de mensajes de sistema, a medida que se implemente el soporte para ellos."},
{"nota": "Considerar si mediaUrl siempre estará disponible o si el ProcessIncomingWhatsAppMessageUseCase o un servicio de dominio necesitará obtenerlo a partir del mediaId llamando a la API de Meta."}
]
*/
