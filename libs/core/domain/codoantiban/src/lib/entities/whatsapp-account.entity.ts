// RUTA: libs/core/domain/codoantiban/src/lib/entities/whatsapp-account.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import {
  EWhatsAppQualityRating,
  EWhatsAppMessagingLimitTier,
  EWhatsAppPhoneNumberNameStatus,
} from '@dfs-suite/codowhatsapp';
import {
  ArgumentNotProvidedException,
  ArgumentInvalidException,
} from '@dfs-suite/sherrors';
import {
  WhatsAppAccountId,
  TenantId,
  Maybe,
  IsoDateString,
  CorrelationId,
  WabaId,
  PhoneNumberString,
  UserId, // <<< AÑADIDO IMPORT
} from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';

import {
  WhatsAppAccountHealthChangedEvent,
  WhatsAppAccountHealthChangedPayload,
} from '../events/whatsapp-account-health-changed.event';
import {
  WhatsAppAccountStatusFlaggedEvent,
  WhatsAppAccountStatusFlaggedPayload,
} from '../events/whatsapp-account-status-flagged.event';
import { HealthScoreVO } from '../value-objects/health-score.vo';
// MessagingLimitTierVO es redundante si EWhatsAppMessagingLimitTier de codowhatsapp es suficiente.
// import { MessagingLimitTierVO } from '../value-objects/messaging-limit-tier.vo';
import {
  OperationalStatusVO,
  EOperationalStatus,
} from '../value-objects/operational-status.vo';

// ... (resto del archivo sin cambios en la interfaz y props de la entidad por ahora,
//      solo asegurar que el import de UserId esté arriba)

export interface WhatsAppAccountProps {
  wabaId: WabaId;
  displayPhoneNumber: PhoneNumberString;
  verifiedName: string;
  qualityRatingMeta: EWhatsAppQualityRating;
  messagingLimitTierMeta: EWhatsAppMessagingLimitTier;
  nameStatusMeta: EWhatsAppPhoneNumberNameStatus;
  operationalStatus: OperationalStatusVO;
  healthScore: HealthScoreVO;
  isOfficiallyVerifiedByMeta: boolean;
  canCurrentlySendMessage: boolean;
  currentMessageQuota24h?: Maybe<number>;
  messagesSentInWindow24h?: Maybe<number>;
  quotaResetsAt?: Maybe<IsoDateString>;
  lastQualityUpdateFromMetaAt?: Maybe<IsoDateString>;
  lastStatusUpdateFromMetaAt?: Maybe<IsoDateString>;
  lastUsedForSendingAt?: Maybe<IsoDateString>;
  customNotes?: Maybe<string>;
  restrictions?: Maybe<
    Array<{ type: string; effectiveDate: IsoDateString; reason?: string }>
  >;
}

export interface CreateWhatsAppAccountProps {
  tenantId: TenantId;
  wabaId: WabaId;
  phoneNumberId: WhatsAppAccountId;
  displayPhoneNumber: PhoneNumberString;
  verifiedName: string;
  qualityRatingMeta: EWhatsAppQualityRating;
  messagingLimitTierMeta: EWhatsAppMessagingLimitTier;
  nameStatusMeta: EWhatsAppPhoneNumberNameStatus;
  isOfficiallyVerifiedByMeta: boolean;
  correlationId: CorrelationId;
}

export class WhatsAppAccountEntity extends AggregateRoot<
  WhatsAppAccountProps,
  WhatsAppAccountId
> {
  constructor(
    createEntityProps: CreateEntityProps<
      WhatsAppAccountProps,
      WhatsAppAccountId
    >
  ) {
    super(createEntityProps);
  }

  // ... (método create, getters sin cambios)
  public static create(
    props: CreateWhatsAppAccountProps
  ): WhatsAppAccountEntity {
    Guard.againstNullOrUndefinedBulk([
      { argument: props.tenantId, argumentName: 'tenantId' },
      { argument: props.wabaId, argumentName: 'wabaId' },
      { argument: props.phoneNumberId, argumentName: 'phoneNumberId' },
      {
        argument: props.displayPhoneNumber,
        argumentName: 'displayPhoneNumber',
      },
      { argument: props.verifiedName, argumentName: 'verifiedName' },
    ]);

    const initialHealthScore = HealthScoreVO.initial();
    const initialOperationalStatus = OperationalStatusVO.newPendingValidation();

    const entityProps: WhatsAppAccountProps = {
      wabaId: props.wabaId,
      displayPhoneNumber: props.displayPhoneNumber,
      verifiedName: props.verifiedName,
      qualityRatingMeta: props.qualityRatingMeta,
      messagingLimitTierMeta: props.messagingLimitTierMeta,
      nameStatusMeta: props.nameStatusMeta,
      operationalStatus: initialOperationalStatus,
      healthScore: initialHealthScore,
      isOfficiallyVerifiedByMeta: props.isOfficiallyVerifiedByMeta,
      canCurrentlySendMessage: false,
      messagesSentInWindow24h: 0,
    };

    const account = new WhatsAppAccountEntity({
      id: props.phoneNumberId,
      props: entityProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    account.updateCanSendMessageFlag();
    return account;
  }

  get wabaId(): WabaId {
    return this.props.wabaId;
  }
  get displayPhoneNumber(): PhoneNumberString {
    return this.props.displayPhoneNumber;
  }
  get verifiedName(): string {
    return this.props.verifiedName;
  }
  get qualityRatingMeta(): EWhatsAppQualityRating {
    return this.props.qualityRatingMeta;
  }
  get messagingLimitTierMeta(): EWhatsAppMessagingLimitTier {
    return this.props.messagingLimitTierMeta;
  }
  get nameStatusMeta(): EWhatsAppPhoneNumberNameStatus {
    return this.props.nameStatusMeta;
  }
  get operationalStatus(): OperationalStatusVO {
    return this.props.operationalStatus;
  }
  get healthScore(): HealthScoreVO {
    return this.props.healthScore;
  }
  get isOfficiallyVerifiedByMeta(): boolean {
    return this.props.isOfficiallyVerifiedByMeta;
  }
  get canCurrentlySendMessage(): boolean {
    return this.props.canCurrentlySendMessage;
  }
  get currentMessageQuota24h(): Maybe<number> {
    return this.props.currentMessageQuota24h;
  }
  get messagesSentInWindow24h(): Maybe<number> {
    return this.props.messagesSentInWindow24h;
  }
  get quotaResetsAt(): Maybe<IsoDateString> {
    return this.props.quotaResetsAt;
  }
  get lastQualityUpdateFromMetaAt(): Maybe<IsoDateString> {
    return this.props.lastQualityUpdateFromMetaAt;
  }
  get lastStatusUpdateFromMetaAt(): Maybe<IsoDateString> {
    return this.props.lastStatusUpdateFromMetaAt;
  }
  get lastUsedForSendingAt(): Maybe<IsoDateString> {
    return this.props.lastUsedForSendingAt;
  }
  get customNotes(): Maybe<string> {
    return this.props.customNotes;
  }
  get restrictions(): Maybe<
    Array<{ type: string; effectiveDate: IsoDateString; reason?: string }>
  > {
    return this.props.restrictions;
  }

  private updateCanSendMessageFlag(): void {
    const canSend =
      (this.props.operationalStatus.isActive() ||
        this.props.operationalStatus.isWarmup()) &&
      this.props.qualityRatingMeta !== EWhatsAppQualityRating.RED &&
      (this.props.messagesSentInWindow24h || 0) <
        (this.props.currentMessageQuota24h || Infinity) &&
      (!this.props.restrictions || this.props.restrictions.length === 0); // Simplificado

    if (this.props.canCurrentlySendMessage !== canSend) {
      this.props.canCurrentlySendMessage = canSend;
    }
  }

  public updateFromMetaQuality(
    newQuality: EWhatsAppQualityRating,
    timestamp: IsoDateString,
    context: { tenantId: TenantId; correlationId: CorrelationId }
  ): void {
    if (this.props.qualityRatingMeta === newQuality) return;
    const oldQuality = this.props.qualityRatingMeta;
    this.props.qualityRatingMeta = newQuality;
    this.props.lastQualityUpdateFromMetaAt = timestamp;
    this.recalculateHealthScore('META_QUALITY_CHANGE');
    this.determineOperationalStatusFromMeta(); // Esta podría necesitar la calidad para su lógica
    this.updateCanSendMessageFlag();
    this.setUpdatedAt();

    const eventPayload: WhatsAppAccountHealthChangedPayload = {
      tenantId: context.tenantId,
      wabaId: this.wabaId,
      phoneNumberId: this.id,
      newHealthScore: this.healthScore.value,
      oldHealthScore: undefined, // Podríamos necesitar almacenar el healthScore anterior
      newQualityRatingMeta: newQuality,
      oldQualityRatingMeta: oldQuality,
      newOperationalStatus: this.operationalStatus.value,
      // oldOperationalStatus: ... , // Necesitaríamos el estado anterior
      triggerEvent: 'META_QUALITY_UPDATE',
      correlationId: context.correlationId,
    };
    this.addEvent(
      new WhatsAppAccountHealthChangedEvent({
        aggregateId: this.id,
        payload: eventPayload,
      })
    );
  }

  public updateFromMetaStatus(
    eventType: string,
    details: any, // TODO: Tipar 'details' más estrictamente
    timestamp: IsoDateString, // Timestamp del evento de Meta
    context: { tenantId: TenantId; correlationId: CorrelationId }
  ): void {
    const oldOpStatus = this.props.operationalStatus.value;
    const updateTimestamp = new Date().toISOString() as IsoDateString;

    // TODO: Implementar lógica para actualizar propiedades de la entidad
    // basado en eventType y details. Ejemplos:
    // if (eventType === 'ban_state_update' && details.ban_state === 'BANNED') {
    //   this.props.operationalStatus = OperationalStatusVO.newSuspendedByMeta();
    // }
    // if (eventType === 'messaging_limit_tier_update') {
    //   this.props.messagingLimitTierMeta = details.messaging_limit_tier as EWhatsAppMessagingLimitTier;
    //   this.props.currentMessageQuota24h = MessagingLimitTierVO.create(details.messaging_limit_tier).getQuota();
    // }

    this.props.lastStatusUpdateFromMetaAt = timestamp;
    this.recalculateHealthScore(`META_STATUS_UPDATE_${eventType}`);
    // this.determineOperationalStatusFromMeta(); // Asegurar que esta se llama si el status puede cambiar
    this.updateCanSendMessageFlag();
    this.setUpdatedAt();

    if (this.props.operationalStatus.value !== oldOpStatus) {
      const eventPayload: WhatsAppAccountStatusFlaggedPayload = {
        tenantId: context.tenantId,
        wabaId: this.wabaId,
        phoneNumberId: this.id,
        flaggedStatus: this.props.operationalStatus.value,
        reason: `Meta event: ${eventType}`,
        details: details, // Puede necesitar serialización
        correlationId: context.correlationId,
      };
      this.addEvent(
        new WhatsAppAccountStatusFlaggedEvent({
          aggregateId: this.id,
          payload: eventPayload,
        })
      );
    }
  }

  public recordMessageSentAttempt(
    successful: boolean,
    isTemplate: boolean
  ): void {
    if (successful) {
      this.props.messagesSentInWindow24h =
        (this.props.messagesSentInWindow24h || 0) + 1;
      this.props.lastUsedForSendingAt =
        new Date().toISOString() as IsoDateString;
      this.recalculateHealthScore(
        isTemplate ? 'SENT_TEMPLATE_OK' : 'SENT_SESSION_OK'
      );
    } else {
      this.recalculateHealthScore(
        isTemplate ? 'SENT_TEMPLATE_FAIL' : 'SENT_SESSION_FAIL'
      );
    }
    this.updateCanSendMessageFlag();
    this.setUpdatedAt();
  }

  public recalculateHealthScore(triggerEvent: string): void {
    let currentScore = this.props.healthScore.value;
    // Lógica placeholder, refinar según estrategia
    if (
      triggerEvent.includes('FAIL') ||
      this.props.qualityRatingMeta === EWhatsAppQualityRating.RED
    ) {
      currentScore -= 20;
    } else if (
      triggerEvent.includes('OK') ||
      this.props.qualityRatingMeta === EWhatsAppQualityRating.GREEN
    ) {
      currentScore += 5;
    } else if (this.props.qualityRatingMeta === EWhatsAppQualityRating.YELLOW) {
      currentScore -= 5;
    }
    this.props.healthScore = HealthScoreVO.create(
      Math.max(0, Math.min(100, currentScore))
    );
    // this.updateCanSendMessageFlag(); // Se llama después en los métodos que invocan esta
  }

  public determineOperationalStatusFromMeta(): void {
    // Placeholder - Lógica importante a definir
    // Ejemplo:
    // if (this.props.qualityRatingMeta === EWhatsAppQualityRating.RED) {
    //   this.props.operationalStatus = OperationalStatusVO.newCooldown();
    // }
  }

  public setManualOperationalStatus(
    newStatus: OperationalStatusVO,
    reason: string,
    byUser: UserId
  ): void {
    if (this.props.operationalStatus.equals(newStatus)) return;
    this.props.operationalStatus = newStatus;
    const notePrefix = `${new Date().toISOString()} [User: ${String(
      byUser
    )}] Status set to ${newStatus.value}. Reason: ${reason}.`;
    this.props.customNotes = this.props.customNotes
      ? `${notePrefix}\n---\n${this.props.customNotes}`
      : notePrefix;
    this.updateCanSendMessageFlag();
    this.setUpdatedAt();
    // Emitir evento WhatsAppAccountStatusFlaggedEvent
  }

  public startWarmup(context: {
    tenantId: TenantId;
    correlationId: CorrelationId;
  }): void {
    // ...
  }

  public startCooldown(
    reason: string,
    context: { tenantId: TenantId; correlationId: CorrelationId }
  ): void {
    // ...
  }

  public validate(): void {
    // ...
  }
}
// RUTA: libs/core/domain/codoantiban/src/lib/entities/whatsapp-account.entity.ts
// RUTA: libs/core/domain/codoantiban/src/lib/entities/whatsapp-account.entity.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Implementación detallada de WhatsAppAccountEntity.", "justificacion": "Define la entidad central para el sistema Anti-Ban, con propiedades para estados de Meta y estados internos, health score, y métodos para actualizar estos estados y determinar la capacidad de envío.", "impacto": "Núcleo de la lógica Anti-Ban." },
{ "mejora": "Uso de WhatsAppAccountId como TID de la entidad.", "justificacion": "El ID de Meta para el número de teléfono es el identificador natural de este agregado.", "impacto": "Claridad y alineación con Meta." },
{ "mejora": "Métodos updateFromMetaQuality, updateFromMetaStatus, recordMessageSentAttempt, recalculateHealthScore, determineOperationalStatusFromMeta, y setManualOperationalStatus.", "justificacion": "Encapsulan la lógica de dominio para mantener la salud y el estado operativo de la cuenta.", "impacto": "Comportamiento de dominio robusto." },
{ "mejora": "Inclusión de wabaId, tenantId (para eventos) y correlationId para trazabilidad.", "justificacion": "Contexto necesario.", "impacto": "Mejora la capacidad de depuración y auditoría." },
{ "mejora": "Definición de CreateWhatsAppAccountProps para el factory create.", "justificacion": "Clarifica los datos necesarios para crear una nueva instancia.", "impacto": "Mejor DX." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{ "nota": "La lógica de recalculateHealthScore y determineOperationalStatusFromMeta será compleja y necesitará un diseño cuidadoso y posiblemente VOs/servicios de dominio adicionales." },
{ "nota": "Los eventos de dominio (WhatsAppAccountHealthChangedEvent, WhatsAppAccountStatusFlaggedEvent) deben ser definidos en ../events/ e importados." },
{ "nota": "El manejo de currentMessageQuota24h y messagesSentInWindow24h debe ser preciso para el rate limiting." }
]
*/
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadida la importación de UserId desde @dfs-suite/shtypes.", "justificacion": "Resuelve el error no-undef para UserId en el método setManualOperationalStatus.", "impacto": "Correctitud de tipos." },
{ "mejora": "Eliminada la importación de MessagingLimitTierVO si EWhatsAppMessagingLimitTier de codowhatsapp es suficiente.", "justificacion": "Evita redundancia y simplifica.", "impacto": "Menos código, menos warnings no-unused-vars si no se usa." },
{ "mejora": "Añadidos getters para todas las props de la entidad.", "justificacion": "Proporciona acceso controlado a las propiedades de la entidad.", "impacto": "Encapsulación y completitud de la API de la entidad." },
{ "mejora": "Esbozo de la lógica en updateCanSendMessageFlag y recalculateHealthScore y placeholders en otros métodos.", "justificacion": "Proporciona una estructura inicial para la lógica de dominio compleja.", "impacto": "Facilita la implementación futura de estos métodos." },
{ "mejora": "Añadido context a updateFromMetaQuality, updateFromMetaStatus, setManualOperationalStatus, startWarmup, startCooldown para pasar tenantId y correlationId para los eventos.", "justificacion": "Asegura que los eventos emitidos desde la entidad tengan el contexto necesario.", "impacto": "Eventos más útiles."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{ "nota": "La lógica interna de recalculateHealthScore y determineOperationalStatusFromMeta necesita un diseño detallado basado en la estrategia Anti-Ban." },
{ "nota": "Completar la emisión de eventos (WhatsAppAccountHealthChangedEvent, WhatsAppAccountStatusFlaggedEvent) en los métodos correspondientes, asegurando que los payloads tengan toda la información necesaria, incluyendo tenantId y correlationId." },
{ "nota": "Revisar y completar la lógica de updateFromMetaStatus para todos los tipos de account_update relevantes." },
{ "nota": "Tipar el parámetro details: any en updateFromMetaStatus más estrictamente una vez que los payloads de Meta sean completamente conocidos." }
]
*/
