// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/phone-number-details-app.dto.ts
import { EOperationalStatus } from '@dfs-suite/codoantiban'; // Estado operativo interno
import {
  EWhatsAppQualityRating,
  EWhatsAppMessagingLimitTier,
  EWhatsAppPhoneNumberNameStatus,
} from '@dfs-suite/codowhatsapp';
import {
  WhatsAppAccountId, // El ID de Meta
  PhoneNumberString,
  WabaId,
  Maybe,
  IsoDateString,
} from '@dfs-suite/shtypes';

export interface PhoneNumberDetailsAppDto {
  id: WhatsAppAccountId; // ID de Meta (PK de WhatsAppAccountEntity)
  wabaId: WabaId;
  displayPhoneNumber: PhoneNumberString;
  verifiedName: string;
  qualityRatingMeta: EWhatsAppQualityRating;
  messagingLimitTierMeta: EWhatsAppMessagingLimitTier;
  nameStatusMeta: EWhatsAppPhoneNumberNameStatus;
  operationalStatus: EOperationalStatus; // Nuestro estado interno
  healthScore: number; // De 0 a 100
  isOfficiallyVerifiedByMeta: boolean;
  canCurrentlySendMessage: boolean;
  currentMessageQuota24h?: Maybe<number>;
  messagesSentInWindow24h?: Maybe<number>;
  quotaResetsAt?: Maybe<IsoDateString>;
  lastQualityUpdateFromMetaAt?: Maybe<IsoDateString>;
  lastStatusUpdateFromMetaAt?: Maybe<IsoDateString>;
  lastUsedForSendingAt?: Maybe<IsoDateString>;
  customNotes?: Maybe<string>;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/phone-number-details-app.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de PhoneNumberDetailsAppDto.", "justificacion": "DTO para exponer la información completa de un WhatsAppAccountEntity, incluyendo estados de Meta y nuestros estados/scores internos.", "impacto": "Permite a pwa-supervisor mostrar detalles de las cuentas WA." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
