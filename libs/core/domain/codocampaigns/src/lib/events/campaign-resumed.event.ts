// RUTA: libs/core/domain/codocampaigns/src/lib/events/campaign-resumed.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  CampaignId,
  CorrelationId,
  IsoDateString,
  UserId,
  Maybe,
} from '@dfs-suite/shtypes';

export interface CampaignResumedPayload {
  tenantId: TenantId;
  campaignId: CampaignId;
  correlationId: CorrelationId;
  resumedAt: IsoDateString;
  resumedByUserId?: Maybe<UserId>; // Si fue reanudada por un usuario
}

export class CampaignResumedEvent extends DomainEventBase<CampaignResumedPayload> {
  constructor(props: DomainEventProps<CampaignResumedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codocampaigns/src/lib/events/campaign-resumed.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `CampaignResumedEvent` y su payload.", "justificacion": "Evento para cuando una campaña pausada es reanudada.", "impacto": "Permite continuar la ejecución de campañas." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
