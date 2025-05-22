// RUTA: libs/core/application/coapantiban/src/lib/dtos/whatsapp-account-health.dto.ts
import { EOperationalStatus } from '@dfs-suite/codoantiban';
import {
  EWhatsAppQualityRating,
  EWhatsAppMessagingLimitTier,
  EWhatsAppPhoneNumberNameStatus,
} from '@dfs-suite/codowhatsapp';
import {
  WhatsAppAccountId,
  PhoneNumberString,
  WabaId,
  Maybe,
  IsoDateString,
} from '@dfs-suite/shtypes';

export interface WhatsAppAccountHealthDto {
  // Identificadores
  id: WhatsAppAccountId; // ID de Meta (PK de WhatsAppAccountEntity en DB del tenant)
  wabaId: WabaId;
  displayPhoneNumber: PhoneNumberString;
  verifiedName: string;

  // Estados y Calidad de Meta
  qualityRatingMeta: EWhatsAppQualityRating;
  messagingLimitTierMeta: EWhatsAppMessagingLimitTier;
  nameStatusMeta: EWhatsAppPhoneNumberNameStatus;
  isOfficiallyVerifiedByMeta: boolean;

  // Estados y Scores Internos de DFS Anti-Ban
  operationalStatus: EOperationalStatus;
  healthScore: number; // 0-100
  canCurrentlySendMessage: boolean; // Flag derivado

  // Límites y Uso (contadores nuestros)
  currentMessageQuota24h?: Maybe<number>;
  messagesSentInWindow24h?: Maybe<number>;
  quotaResetsAt?: Maybe<IsoDateString>;

  // Timestamps de Sincronización y Actividad
  lastQualityUpdateFromMetaAt?: Maybe<IsoDateString>;
  lastStatusUpdateFromMetaAt?: Maybe<IsoDateString>; // ej. baneos, cambios de límite
  lastUsedForSendingAt?: Maybe<IsoDateString>;

  // Adicional
  customNotes?: Maybe<string>;
  // restrictionsFromMeta?: Maybe<any[]>; // Podría ser una lista de restricciones activas de Meta

  // Timestamps de la entidad local
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}
// RUTA: libs/core/application/coapantiban/src/lib/dtos/whatsapp-account-health.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de WhatsAppAccountHealthDto.", "justificacion": "DTO completo para exponer toda la información relevante sobre la salud y estado de una cuenta WhatsApp a la UI.", "impacto": "Contrato de datos para queries de Anti-Ban." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "El campo restrictionsFromMeta podría tiparse más estrictamente."} ] */
