// RUTA: libs/core/domain/codocampaigns/src/lib/events/campaign-completed.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  CampaignId,
  CorrelationId,
  IsoDateString,
} from '@dfs-suite/shtypes';

import { CampaignStatisticsProps } from '../value-objects/campaign-statistics.vo'; // Suponiendo que el VO tiene las props

export interface CampaignCompletedPayload {
  tenantId: TenantId;
  campaignId: CampaignId;
  correlationId: CorrelationId;
  completedAt: IsoDateString;
  finalStatistics: CampaignStatisticsProps;
}

export class CampaignCompletedEvent extends DomainEventBase<CampaignCompletedPayload> {
  constructor(props: DomainEventProps<CampaignCompletedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codocampaigns/src/lib/events/campaign-completed.event.ts
