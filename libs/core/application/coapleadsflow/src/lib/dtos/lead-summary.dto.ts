// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-summary.dto.ts
import { ELeadStatus, ELeadSourceChannel } from '@dfs-suite/codoleadsflow';
import {
  LeadId,
  TenantId,
  UserId,
  Maybe,
  IsoDateString,
  EmailString,
  PhoneNumberString,
} from '@dfs-suite/shtypes';

export interface LeadSummaryDto {
  id: LeadId;
  tenantId: TenantId;
  name?: Maybe<string>;
  primaryContact?: Maybe<EmailString | PhoneNumberString>; // Email o teléfono principal
  status: ELeadStatus;
  score: number;
  sourceChannel?: Maybe<ELeadSourceChannel>;
  assignedToUserName?: Maybe<string>;
  lastInteractionAt?: Maybe<IsoDateString>;
  updatedAt: IsoDateString;
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/lead-summary.dto.ts
