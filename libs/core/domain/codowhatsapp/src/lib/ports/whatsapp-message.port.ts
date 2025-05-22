// RUTA: libs/core/domain/codowhatsapp/src/lib/ports/whatsapp-message.port.ts
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { TenantId, WhatsAppAccountId } from '@dfs-suite/shtypes'; // WhatsAppAccountId es el alias para el Phone Number ID de Meta

import {
  TWhatsAppApiMessageRequest,
  TWhatsAppApiMessageResponse,
} from '../types';

export const WHATSAPP_MESSAGE_PORT = Symbol('IWhatsAppMessagePort');

export interface IWhatsAppMessagePort {
  sendMessage(
    tenantId: TenantId,
    phoneNumberIdToSendFrom: WhatsAppAccountId,
    payload: TWhatsAppApiMessageRequest
  ): Promise<Result<TWhatsAppApiMessageResponse, ExceptionBase>>;

  markMessageAsRead(
    tenantId: TenantId,
    phoneNumberId: WhatsAppAccountId,
    messageWaId: string
  ): Promise<Result<{ success: boolean }, ExceptionBase>>;
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/ports/whatsapp-message.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Confirmación de imports y uso de WhatsAppAccountId.", "justificacion": "Asegura consistencia y correctitud.", "impacto": "Estabilidad." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
