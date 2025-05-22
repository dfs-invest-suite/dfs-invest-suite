// RUTA: libs/core/domain/codocampaigns/src/lib/events/campaign-paused.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  CampaignId,
  CorrelationId,
  IsoDateString,
  UserId,
  Maybe,
} from '@dfs-suite/shtypes';

export interface CampaignPausedPayload {
  tenantId: TenantId;
  campaignId: CampaignId;
  correlationId: CorrelationId;
  pausedAt: IsoDateString;
  pausedByUserId?: Maybe<UserId>; // Si fue pausada por un usuario
  pauseReason:
    | 'USER_REQUEST'
    | 'SYSTEM_ANTIBAN'
    | 'INSUFFICIENT_CREDITS'
    | 'OTHER';
  details?: Maybe<string>; // Más detalles sobre la razón
}

export class CampaignPausedEvent extends DomainEventBase<CampaignPausedPayload> {
  constructor(props: DomainEventProps<CampaignPausedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codocampaigns/src/lib/events/campaign-paused.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `CampaignPausedEvent` y su payload.", "justificacion": "Evento para cuando una campaña es pausada, manual o automáticamente.", "impacto": "Permite detener y registrar la pausa de campañas." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
