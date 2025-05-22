// RUTA: libs/core/domain/codocampaigns/src/lib/events/campaign-created.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  TenantId,
  CampaignId,
  CorrelationId,
  UserId,
  MessageTemplateId,
} from '@dfs-suite/shtypes';

import { ECampaignStatus } from '../enums/campaign-status.enum'; // Importar el enum local

export interface CampaignCreatedPayload {
  tenantId: TenantId;
  campaignId: CampaignId;
  correlationId: CorrelationId;
  name: string;
  messageTemplateId: MessageTemplateId;
  status: ECampaignStatus; // Usar el enum local
  createdByUserId: UserId;
}

export class CampaignCreatedEvent extends DomainEventBase<CampaignCreatedPayload> {
  constructor(props: DomainEventProps<CampaignCreatedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codocampaigns/src/lib/events/campaign-created.event.ts
