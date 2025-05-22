// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-details.dto.ts
import { ELeadSourceChannel, ELeadStatus } from '@dfs-suite/codoleadsflow';
import {
  EmailString,
  IsoDateString,
  LeadId,
  Maybe,
  ObjectLiteral,
  PhoneNumberString,
  TenantId,
  UserId,
} from '@dfs-suite/shtypes';

import { LeadInteractionDto } from './lead-interaction.dto'; // DTO para interacciones

export interface LeadDetailsDto {
  id: LeadId;
  tenantId: TenantId; // Importante para el contexto, aunque el query ya esté filtrado
  name?: Maybe<string>;
  email?: Maybe<EmailString>;
  phoneNumber?: Maybe<PhoneNumberString>;
  waId?: Maybe<PhoneNumberString>;
  status: ELeadStatus;
  score: number;
  sourceChannel?: Maybe<ELeadSourceChannel>;
  referralSourceText?: Maybe<string>;
  assignedToUser?: Maybe<{ id: UserId; name: string; email: EmailString }>; // Info básica del consultor
  lastInteractionAt?: Maybe<IsoDateString>;
  optInWhatsApp: boolean;
  optInEmail: boolean;
  tags?: Maybe<string[]>;
  customFields?: Maybe<ObjectLiteral>;
  interactions?: Maybe<LeadInteractionDto[]>; // Primeras N interacciones o paginado
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}
// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-details.dto.ts
