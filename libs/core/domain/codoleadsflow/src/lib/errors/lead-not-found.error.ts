// RUTA: libs/core/domain/codoleadsflow/src/lib/errors/lead-not-found.error.ts
import { NotFoundException } from '@dfs-suite/sherrors';
import {
  LeadId,
  Maybe,
  ObjectLiteral,
  CorrelationId,
} from '@dfs-suite/shtypes';

export const LEAD_NOT_FOUND_ERROR_CODE = 'LEADS_FLOW.LEAD_NOT_FOUND';

export class LeadNotFoundError extends NotFoundException {
  constructor(
    leadId: LeadId | string, // Puede ser el ID o un identificador como email
    cause?: Maybe<Error | unknown>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(
      `Lead with identifier "${String(leadId)}" not found.`,
      cause,
      { leadIdentifier: String(leadId) },
      correlationId
    );
    this.code = LEAD_NOT_FOUND_ERROR_CODE;
  }
}
// RUTA: libs/core/domain/codoleadsflow/src/lib/errors/lead-not-found.error.ts
