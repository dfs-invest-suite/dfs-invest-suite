// RUTA: libs/core/domain/codocampaigns/src/lib/ports/campaign.repository.port.ts
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import {
  Maybe,
  TenantId,
  IPaginatedQueryParams,
  IPaginated,
} from '@dfs-suite/shtypes';

import {
  CampaignEntity,
  CampaignProps,
  CampaignId,
} from '../entities/campaign.entity'; // Ajustar import
import { ECampaignStatus } from '../enums/campaign-status.enum';

export const CAMPAIGN_REPOSITORY_PORT = Symbol('ICampaignRepositoryPort');

export interface ICampaignRepository
  extends IRepositoryPort<CampaignProps, CampaignId, CampaignEntity> {
  // findById ya está en IRepositoryPort

  findAllByTenantPaginated( // Ya no necesita tenantId explícito
    params: IPaginatedQueryParams,
    filters?: {
      status?: ECampaignStatus[];
      nameQuery?: Maybe<string>;
    }
  ): Promise<Result<IPaginated<CampaignEntity>, ExceptionBase>>;

  findByNameForTenant(
    name: string
  ): Promise<Result<Maybe<CampaignEntity>, ExceptionBase>>;
}
// RUTA: libs/core/domain/codocampaigns/src/lib/ports/campaign.repository.port.ts
