// RUTA: libs/core/application/coapleadsflow/src/lib/commands/track-lead-interaction.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { EInteractionChannel } from '@dfs-suite/codoleadsflow'; // Ya estaba
import { EWhatsAppMessageType } from '@dfs-suite/codowhatsapp';
import {
  TenantId,
  LeadId,
  CorrelationId,
  Maybe,
  UserId,
  PhoneNumberString, // Ya estaba
  WabaId,
  WhatsAppAccountId,
  IsoDateString,
  CampaignId, // Ya estaba
  EmailString, // Ya estaba
  InteractionId, // Ya estaba
  ObjectLiteral,
} from '@dfs-suite/shtypes';

export interface TrackLeadInteractionCommandPayload {
  readonly tenantId: TenantId;
  readonly correlationId: CorrelationId;
  readonly interactionSource:
    | 'WHATSAPP_INBOUND'
    | 'WHATSAPP_OUTBOUND'
    | 'MANUAL_CALL'
    | 'MANUAL_EMAIL'
    | 'PORTAL_FORM'
    | 'SYSTEM_ACTION';
  readonly leadId?: Maybe<LeadId>;
  readonly contactWaId?: Maybe<PhoneNumberString>;
  readonly contactEmail?: Maybe<EmailString>;
  readonly contactPhoneNumber?: Maybe<PhoneNumberString>;
  readonly leadName?: Maybe<string>;
  readonly leadOptInWhatsApp?: Maybe<boolean>;
  readonly leadOptInEmail?: Maybe<boolean>;
  readonly messageWaId?: Maybe<string>;
  readonly wabaId?: Maybe<WabaId>;
  readonly tenantPhoneNumberId?: Maybe<WhatsAppAccountId>;
  readonly channel: EInteractionChannel;
  readonly direction: 'INBOUND' | 'OUTBOUND' | 'INTERNAL_NOTE';
  readonly timestamp?: IsoDateString;
  readonly content: string;
  readonly messageType?: EWhatsAppMessageType | string;
  readonly campaignId?: Maybe<CampaignId>;
  readonly consultantUserId?: Maybe<UserId>;
  readonly durationSeconds?: Maybe<number>;
  readonly visitorId?: Maybe<string>;
  readonly sessionId?: Maybe<string>;
  readonly pageUrl?: Maybe<string>;
  readonly ctaId?: Maybe<string>;
  readonly customFields?: Maybe<ObjectLiteral>;
}

export class TrackLeadInteractionCommand extends CommandBase<TrackLeadInteractionCommandPayload> {
  constructor(
    payload: TrackLeadInteractionCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapleadsflow/src/lib/commands/track-lead-interaction.command.ts
// RUTA: libs/core/application/coapleadsflow/src/lib/commands/track-lead-interaction.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadidas todas las importaciones necesarias desde `@dfs-suite/shtypes` (WabaId, WhatsAppAccountId, CampaignId, EmailString, InteractionId, ObjectLiteral) y `@dfs-suite/codoleadsflow` (EInteractionChannel).", "justificacion": "Resuelve los errores `no-undef` reportados para este archivo.", "impacto": "Correctitud de tipos y dependencias." },
  { "mejora": "Añadido `customFields` al payload para mayor flexibilidad.", "justificacion": "Permite que las interacciones también puedan crear o actualizar campos personalizados del lead.", "impacto": "Mayor capacidad de captura de datos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
// RUTA: libs/core/application/coapleadsflow/src/lib/commands/track-lead-interaction.command.ts

/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de TrackLeadInteractionCommand.", "justificacion": "Comando central para registrar cualquier interacción con un lead, sea cual sea el canal. También puede implicar la creación del lead si no existe.", "impacto": "Base para el historial de 360° del lead." },
{ "mejora": "Payload exhaustivo para cubrir múltiples escenarios de interacción y datos de tracking.", "justificacion": "Flexibilidad y completitud.", "impacto": "Cubre la mayoría de los casos de uso de registro de interacciones."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Asegurar que EInteractionChannel se importe correctamente de @dfs-suite/codoleadsflow."} ] */
