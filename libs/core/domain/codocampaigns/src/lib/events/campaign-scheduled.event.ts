// RUTA: libs/core/domain/codocampaigns/src/lib/events/campaign-scheduled.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  CampaignId,
  CorrelationId,
  IsoDateString,
  UserId,
} from '@dfs-suite/shtypes';

export interface CampaignScheduledPayload {
  tenantId: TenantId;
  campaignId: CampaignId;
  correlationId: CorrelationId;
  scheduledAt: IsoDateString; // La fecha/hora para la que se programó el inicio
  scheduledByUserId: UserId; // Usuario que programó la campaña
}

export class CampaignScheduledEvent extends DomainEventBase<CampaignScheduledPayload> {
  constructor(props: DomainEventProps<CampaignScheduledPayload>) {
    super(props); // aggregateId es campaignId, ya está en el payload y DomainEventProps lo toma
  }
}
// RUTA: libs/core/domain/codocampaigns/src/lib/events/campaign-scheduled.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `CampaignScheduledEvent` y su payload.", "justificacion": "Evento para cuando una campaña es programada.", "impacto": "Permite que un scheduler (posiblemente en infraestructura) actúe sobre este evento." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
