// RUTA: libs/core/domain/codoleadsflow/src/lib/ports/lead-interaction.repository.port.ts
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { LeadId, IPaginatedQueryParams, IPaginated } from '@dfs-suite/shtypes';

import {
  LeadInteractionEntity,
  LeadInteractionProps,
  InteractionId,
} from '../entities/lead-interaction.entity';

export const LEAD_INTERACTION_REPOSITORY_PORT = Symbol(
  'ILeadInteractionRepositoryPort'
);

export interface ILeadInteractionRepositoryPort
  extends IRepositoryPort<
    LeadInteractionProps,
    InteractionId,
    LeadInteractionEntity
  > {
  findAllByLeadIdPaginated(
    leadId: LeadId,
    params: IPaginatedQueryParams
  ): Promise<Result<IPaginated<LeadInteractionEntity>, ExceptionBase>>;
}
// RUTA: libs/core/domain/codoleadsflow/src/lib/ports/lead-interaction.repository.port.ts
