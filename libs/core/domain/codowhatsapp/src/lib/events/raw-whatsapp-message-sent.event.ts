// RUTA: libs/core/domain/codowhatsapp/src/lib/events/raw-whatsapp-message-sent.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  CorrelationId,
  Maybe,
  AggregateId,
  WabaId,
  WhatsAppAccountId,
} from '@dfs-suite/shtypes';

import {
  TWhatsAppApiMessageRequest,
  TWhatsAppApiMessageResponse,
} from '../types/whatsapp-api-message-request.types'; // Ajustado para ser más específico
import { TWhatsAppError } from '../types/whatsapp-error.types';

export interface RawWhatsAppMessageSentPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  phoneNumberId: WhatsAppAccountId;
  messageLogId: AggregateId;
  correlationId: CorrelationId;
  requestPayload: TWhatsAppApiMessageRequest;
  responseFromMeta?: Maybe<TWhatsAppApiMessageResponse>;
  errorFromMeta?: Maybe<TWhatsAppError>; // Tipado a TWhatsAppError
}

export class RawWhatsAppMessageSentEvent extends DomainEventBase<RawWhatsAppMessageSentPayload> {
  constructor(props: DomainEventProps<RawWhatsAppMessageSentPayload>) {
    super({ ...props, aggregateId: props.payload.messageLogId as string });
  }
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/events/raw-whatsapp-message-sent.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Ajustada la importación de TWhatsAppApiMessageResponse para ser más específica y asegurar que se importa de ../types/whatsapp-api-message-request.types si está allí, o ../types si está en el index.ts de types.", "justificacion": "Precisión en la importación.", "impacto": "Resolución correcta." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
