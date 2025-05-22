// RUTA: libs/core/application/coapmessagelog/src/lib/dtos/message-log.dto.ts
// TODO: [LIA Legacy - Implementar MessageLogDto]
// Propósito: DTO para exponer datos de MessageLogEntity a través de la API.
import { EMessageDirection } from '@dfs-suite/codomessagelog'; // Asumiendo que se exporta
import { EMessageInternalStatus } from '@dfs-suite/codomessagelog';
import { EWhatsAppMessageStatus } from '@dfs-suite/codowhatsapp';
import {
  AggregateId,
  CorrelationId,
  IsoDateString,
  LeadId,
  Maybe,
  TenantId,
  WhatsAppAccountId,
} from '@dfs-suite/shtypes';

export interface MessageLogDto {
  readonly id: AggregateId;
  readonly tenantId: TenantId;
  readonly waMessageId?: Maybe<string>;
  readonly correlationId: CorrelationId;
  readonly direction: EMessageDirection;
  readonly statusWhatsapp?: Maybe<EWhatsAppMessageStatus>;
  readonly statusInternal: EMessageInternalStatus;
  readonly errorMessage?: Maybe<string>;
  readonly errorCode?: Maybe<string>;
  readonly leadId: LeadId;
  readonly tenantPhoneNumberId: WhatsAppAccountId;
  readonly recipientWaId: string;
  readonly templateName?: Maybe<string>;
  readonly messageType: string;
  readonly messageContentPreview?: Maybe<string>;
  readonly conversationId?: Maybe<string>;
  readonly pricingCategory?: Maybe<string>;
  readonly pricingModel?: Maybe<'CBP' | 'PMP'>;
  readonly cost?: Maybe<number>;
  readonly currency?: Maybe<string>;
  readonly sentAt?: Maybe<IsoDateString>;
  readonly deliveredToUserAt?: Maybe<IsoDateString>;
  readonly readAt?: Maybe<IsoDateString>;
  readonly failedAt?: Maybe<IsoDateString>;
  readonly createdAt: IsoDateString;
  readonly updatedAt: IsoDateString;
}
/* SECCIÓN DE MEJORAS FUTURAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
