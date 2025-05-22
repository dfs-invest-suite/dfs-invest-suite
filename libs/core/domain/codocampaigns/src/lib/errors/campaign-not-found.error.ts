// RUTA: libs/core/domain/codocampaigns/src/lib/errors/campaign-not-found.error.ts
import { NotFoundException } from '@dfs-suite/sherrors';
import { CampaignId, Maybe, CorrelationId } from '@dfs-suite/shtypes';

export const CAMPAIGN_NOT_FOUND_ERROR_CODE = 'CAMPAIGNS.CAMPAIGN_NOT_FOUND';

export class CampaignNotFoundError extends NotFoundException {
  constructor(
    campaignId: CampaignId | string,
    cause?: Maybe<Error | unknown>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(
      `Campaign with identifier "${String(campaignId)}" not found.`,
      cause,
      { campaignIdentifier: String(campaignId) },
      correlationId
    );
    this.code = CAMPAIGN_NOT_FOUND_ERROR_CODE;
  }
}
// RUTA: libs/core/domain/codocampaigns/src/lib/errors/campaign-not-found.error.ts
