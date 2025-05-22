// RUTA: libs/core/domain/codowhatsapp/src/lib/events/raw-whatsapp-webhook-received.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { TenantId, CorrelationId, Maybe, WabaId } from '@dfs-suite/shtypes';

import { TWhatsAppWebhookPayload } from '../types'; // Dependerá de los tipos definidos en esta lib

export interface RawWhatsAppWebhookReceivedPayload {
  tenantIdResolved?: Maybe<TenantId>; // Puede ser null si no se pudo resolver el tenant desde el WABA ID
  wabaId: WabaId; // El WABA ID del webhook
  correlationId: CorrelationId; // ID generado al recibir el webhook
  webhookBody: TWhatsAppWebhookPayload; // El cuerpo completo del webhook
  signatureValid: boolean;
  processingError?: Maybe<string>; // Si hubo un error inicial al procesar/validar
}

export class RawWhatsAppWebhookReceivedEvent extends DomainEventBase<RawWhatsAppWebhookReceivedPayload> {
  constructor(props: DomainEventProps<RawWhatsAppWebhookReceivedPayload>) {
    // El aggregateId podría ser el WABA_ID o un ID de evento si el webhook no se asocia a una entidad específica
    super({ ...props, aggregateId: props.payload.wabaId as string });
  }
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/events/raw-whatsapp-webhook-received.event.ts
