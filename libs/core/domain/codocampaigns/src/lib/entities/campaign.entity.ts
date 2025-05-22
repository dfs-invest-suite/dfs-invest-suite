// RUTA: libs/core/domain/codocampaigns/src/lib/entities/campaign.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import {
  CampaignId,
  TenantId,
  MessageTemplateId,
  Maybe,
  IsoDateString,
  CorrelationId,
  UserId,
} from '@dfs-suite/shtypes';

import { CampaignScheduleVO } from '../value-objects/campaign-schedule.vo';
import { CampaignStatisticsVO } from '../value-objects/campaign-statistics.vo';
import { CampaignStatusVO } from '../value-objects/campaign-status.vo';
import { CampaignTargetAudienceVO } from '../value-objects/campaign-target-audience.vo';
// Importar Eventos y Errores
// import { CampaignCreatedEvent, CampaignCreatedPayload } from '../events/campaign-created.event';

export interface CampaignProps {
  // tenantId: TenantId; // Implícito
  name: string;
  status: CampaignStatusVO;
  messageTemplateId: MessageTemplateId; // HSM ID de la plantilla a usar
  targetAudience: CampaignTargetAudienceVO; // Define a quién se enviará
  schedule?: Maybe<CampaignScheduleVO>; // Cuándo se enviará
  statistics?: Maybe<CampaignStatisticsVO>; // Métricas de envío
  // Campos para Anti-Ban a nivel de campaña:
  // preferredWhatsAppAccountId?: Maybe<WhatsAppAccountId>;
  // sendingStrategy?: 'DEFAULT' | 'ROUND_ROBIN_HEALTHY'; // etc.
}

export interface CreateCampaignProps {
  tenantId: TenantId; // Para evento
  correlationId: CorrelationId; // Para evento
  name: string;
  messageTemplateId: MessageTemplateId;
  targetAudience: {
    type: 'LEAD_IDS' | 'SEGMENT_ID' | 'FILTER_CRITERIA';
    value: string[] | string;
  };
  createdByUserId: UserId;
}

export class CampaignEntity extends AggregateRoot<CampaignProps, CampaignId> {
  constructor(createEntityProps: CreateEntityProps<CampaignProps, CampaignId>) {
    super(createEntityProps);
  }

  public static create(
    props: CreateCampaignProps,
    id?: CampaignId
  ): CampaignEntity {
    // ... validaciones ...
    // ... crear VOs para targetAudience ...
    // ... const entityProps: CampaignProps = { ... };
    // ... const campaign = new CampaignEntity({ id, props: entityProps, ... });
    // ... campaign.addEvent(new CampaignCreatedEvent(...));
    // return campaign;
    // --- Placeholder ---
    const campaignId = id || ('temp-campaign-id' as CampaignId);
    const mockProps: CampaignProps = {
      name: props.name,
      status: CampaignStatusVO.newDraft(),
      messageTemplateId: props.messageTemplateId,
      targetAudience: CampaignTargetAudienceVO.fromLeadIds(['lead1'] as any), // Placeholder
    };
    return new CampaignEntity({ id: campaignId, props: mockProps });
    // --- Fin Placeholder ---
  }

  // ... Getters ...
  // ... Métodos de cambio de estado (schedule, launch, pause, complete, archive) ...
  public validate(): void {
    /* ... */
  }
}
// RUTA: libs/core/domain/codocampaigns/src/lib/entities/campaign.entity.ts
