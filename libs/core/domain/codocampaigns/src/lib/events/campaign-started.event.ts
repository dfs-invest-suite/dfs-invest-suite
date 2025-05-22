// RUTA: libs/core/domain/codocampaigns/src/lib/events/campaign-started.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  CampaignId,
  CorrelationId,
  IsoDateString,
} from '@dfs-suite/shtypes';

export interface CampaignStartedPayload {
  tenantId: TenantId;
  campaignId: CampaignId;
  correlationId: CorrelationId;
  startedAt: IsoDateString; // Momento real en que comenzó la ejecución
  totalLeadsToProcess: number;
}

export class CampaignStartedEvent extends DomainEventBase<CampaignStartedPayload> {
  constructor(props: DomainEventProps<CampaignStartedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codocampaigns/src/lib/events/campaign-started.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `CampaignStartedEvent` y su payload.", "justificacion": "Evento para cuando una campaña comienza su ejecución (envío de mensajes).", "impacto": "Permite el seguimiento del ciclo de vida de la campaña y la actualización de UI." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
