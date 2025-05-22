// RUTA: libs/core/domain/codomessagelog/src/lib/entities/message-log.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import {
  EWhatsAppMessageStatus,
  EWhatsAppMessageType,
  TWhatsAppError,
  TWhatsAppPricing,
} from '@dfs-suite/codowhatsapp';
import {
  CorrelationId,
  IsoDateString,
  LeadId,
  Maybe, // <<< AÑADIDO IMPORT
  MessageLogId,
  MessageTemplateId,
  PhoneNumberString,
  TenantId,
  WabaId,
  WhatsAppAccountId,
} from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';

import {
  MessageLogCostRecordedEvent,
  MessageLogCostRecordedPayload,
} from '../events/message-log-cost-recorded.event';
import {
  MessageLogCreatedEvent,
  MessageLogCreatedPayload,
} from '../events/message-log-created.event';
import {
  MessageLogStatusUpdatedEvent,
  MessageLogStatusUpdatedPayload,
} from '../events/message-log-status-updated.event';
import {
  EMessageDirection,
  MessageDirectionVO,
} from '../value-objects/message-direction.vo';
import { MessageInternalStatusVO } from '../value-objects/message-internal-status.vo';

export interface MessageLogProps {
  waMessageId?: Maybe<string>;
  correlationId: CorrelationId;
  direction: MessageDirectionVO;
  statusWhatsapp?: Maybe<EWhatsAppMessageStatus>;
  statusInternal: MessageInternalStatusVO;
  errorMessage?: Maybe<string>;
  errorCode?: Maybe<string>;
  errorDetailsJson?: Maybe<string>;
  leadId: LeadId;
  tenantWabaId: WabaId;
  tenantPhoneNumberId: WhatsAppAccountId;
  recipientWaId: PhoneNumberString; // Usa el PhoneNumberString importado
  templateId?: Maybe<MessageTemplateId>;
  templateName?: Maybe<string>;
  messageType: EWhatsAppMessageType | string;
  messageContentPreview?: Maybe<string>;
  conversationId?: Maybe<string>;
  pricingCategory?: Maybe<string>;
  pricingModel?: Maybe<'CBP' | 'PMP' | string>;
  costInCents?: Maybe<number>;
  currency?: Maybe<string>;
  sentToApiAt?: Maybe<IsoDateString>;
  deliveredToWhatsappAt?: Maybe<IsoDateString>;
  deliveredToUserAt?: Maybe<IsoDateString>;
  readAt?: Maybe<IsoDateString>;
  failedAt?: Maybe<IsoDateString>;
}

export interface CreateInitialMessageLogProps {
  tenantId: TenantId;
  wabaId: WabaId;
  correlationId: CorrelationId;
  direction: EMessageDirection;
  leadId: LeadId;
  tenantPhoneNumberId: WhatsAppAccountId;
  recipientWaId: PhoneNumberString; // Usa el PhoneNumberString importado
  messageType: EWhatsAppMessageType | string;
  templateId?: Maybe<MessageTemplateId>;
  templateName?: Maybe<string>;
  messageContentPreview?: Maybe<string>;
}

// MessageLogEntity usa MessageLogId como su tipo de ID específico
export class MessageLogEntity extends AggregateRoot<
  MessageLogProps,
  MessageLogId
> {
  constructor(
    createEntityProps: CreateEntityProps<MessageLogProps, MessageLogId>
  ) {
    super(createEntityProps);
  }

  public static createInitial(
    props: CreateInitialMessageLogProps,
    id?: MessageLogId // Ahora el ID es MessageLogId
  ): MessageLogEntity {
    Guard.againstNullOrUndefinedBulk([
      { argument: props.tenantId, argumentName: 'tenantId' },
      { argument: props.wabaId, argumentName: 'wabaId' },
      { argument: props.correlationId, argumentName: 'correlationId' },
      // ... (otras validaciones)
    ]);

    const logId = id || UuidUtils.generateMessageLogId(); // <<< CORREGIDO: Usa el generador correcto
    const initialInternalStatus =
      props.direction === EMessageDirection.OUTBOUND
        ? MessageInternalStatusVO.newPendingAntiBan()
        : MessageInternalStatusVO.newPendingProcessing();

    const entityProps: MessageLogProps = {
      correlationId: props.correlationId,
      direction: MessageDirectionVO.create(props.direction),
      statusInternal: initialInternalStatus,
      leadId: props.leadId,
      tenantWabaId: props.wabaId,
      tenantPhoneNumberId: props.tenantPhoneNumberId,
      recipientWaId: props.recipientWaId,
      messageType: props.messageType,
      templateId: props.templateId,
      templateName: props.templateName,
      messageContentPreview: props.messageContentPreview,
    };

    const messageLog = new MessageLogEntity({
      id: logId,
      props: entityProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const eventPayload: MessageLogCreatedPayload = {
      tenantId: props.tenantId,
      messageLogId: logId, // <<< CORREGIDO: usa logId
      correlationId: props.correlationId,
      leadId: props.leadId,
      direction: props.direction,
      initialStatusInternal: initialInternalStatus.value,
    };
    messageLog.addEvent(
      new MessageLogCreatedEvent({ aggregateId: logId, payload: eventPayload })
    ); // <<< CORREGIDO: usa logId
    return messageLog;
  }

  // --- Getters ---
  get waMessageId(): Maybe<string> {
    return this.props.waMessageId;
  }
  get correlationId(): CorrelationId {
    return this.props.correlationId;
  }
  get direction(): MessageDirectionVO {
    return this.props.direction;
  }
  get statusWhatsapp(): Maybe<EWhatsAppMessageStatus> {
    return this.props.statusWhatsapp;
  }
  get statusInternal(): MessageInternalStatusVO {
    return this.props.statusInternal;
  }
  get errorMessage(): Maybe<string> {
    return this.props.errorMessage;
  }
  get errorCode(): Maybe<string> {
    return this.props.errorCode;
  }
  get errorDetailsJson(): Maybe<string> {
    return this.props.errorDetailsJson;
  }
  get leadId(): LeadId {
    return this.props.leadId;
  }
  get tenantWabaId(): WabaId {
    return this.props.tenantWabaId;
  }
  get tenantPhoneNumberId(): WhatsAppAccountId {
    return this.props.tenantPhoneNumberId;
  }
  get recipientWaId(): PhoneNumberString {
    return this.props.recipientWaId;
  }
  get templateId(): Maybe<MessageTemplateId> {
    return this.props.templateId;
  }
  get templateName(): Maybe<string> {
    return this.props.templateName;
  }
  get messageType(): EWhatsAppMessageType | string {
    return this.props.messageType;
  }
  get messageContentPreview(): Maybe<string> {
    return this.props.messageContentPreview;
  }
  get conversationId(): Maybe<string> {
    return this.props.conversationId;
  }
  get pricingCategory(): Maybe<string> {
    return this.props.pricingCategory;
  }
  get pricingModel(): Maybe<'CBP' | 'PMP' | string> {
    return this.props.pricingModel;
  }
  get costInCents(): Maybe<number> {
    return this.props.costInCents;
  }
  get currency(): Maybe<string> {
    return this.props.currency;
  }
  get sentToApiAt(): Maybe<IsoDateString> {
    return this.props.sentToApiAt;
  }
  get deliveredToWhatsappAt(): Maybe<IsoDateString> {
    return this.props.deliveredToWhatsappAt;
  }
  get deliveredToUserAt(): Maybe<IsoDateString> {
    return this.props.deliveredToUserAt;
  }
  get readAt(): Maybe<IsoDateString> {
    return this.props.readAt;
  }
  get failedAt(): Maybe<IsoDateString> {
    return this.props.failedAt;
  }

  // --- Métodos de Cambio de Estado ---
  public markAsQueued(correlationId?: CorrelationId): void {
    // `correlationId` es un parámetro opcional, no se usa aquí pero podría ser para log
    if (this.props.statusInternal.isQueuedForSending()) return;
    this.props.statusInternal = MessageInternalStatusVO.newQueuedForSending();
    this.setUpdatedAt();
    // Considerar evento MessageLogStatusUpdatedEvent
    // Si se emite, necesitaría `tenantId` y `correlationId` (del comando original)
  }

  public markAsSentToApi(
    waMessageId: string,
    sentToApiAt: IsoDateString,
    correlationId: CorrelationId, // Del comando original
    tenantId: TenantId // Del comando original, para el evento
  ): void {
    this.props.waMessageId = waMessageId;
    this.props.statusInternal = MessageInternalStatusVO.newSentToApi();
    this.props.sentToApiAt = sentToApiAt;
    this.props.statusWhatsapp = EWhatsAppMessageStatus.SENT;
    this.setUpdatedAt();

    const payload: MessageLogStatusUpdatedPayload = {
      messageLogId: this.id,
      tenantId,
      waMessageId,
      correlationId,
      newStatusInternal: this.props.statusInternal.value,
      newStatusWhatsapp: this.props.statusWhatsapp,
      timestamp: sentToApiAt, // O usar new Date().toISOString()
    };
    this.addEvent(
      new MessageLogStatusUpdatedEvent({ aggregateId: this.id, payload })
    );
  }

  public updateFromWebhookStatus(
    newStatusMeta: EWhatsAppMessageStatus,
    timestamp: IsoDateString, // Timestamp del evento de Meta
    context: {
      // Pasar un objeto de contexto para los datos necesarios para el evento
      tenantId: TenantId;
      correlationId: CorrelationId; // Podría ser uno nuevo o el del webhook
      pricingInfo?: Maybe<TWhatsAppPricing>;
      errorInfo?: Maybe<TWhatsAppError[]>;
      conversationInfo?: Maybe<{
        id: string;
        origin_type: string;
        expiration_timestamp?: string;
      }>;
    }
  ): void {
    this.props.statusWhatsapp = newStatusMeta;
    const updateTimestamp = new Date().toISOString() as IsoDateString; // Timestamp de esta actualización

    if (context.pricingInfo) {
      this.props.pricingCategory = context.pricingInfo.category;
      this.props.pricingModel = context.pricingInfo.pricing_model;
      if (
        context.pricingInfo.cost !== undefined &&
        context.pricingInfo.currency
      ) {
        this.recordCost(
          Math.round(context.pricingInfo.cost * 100),
          context.pricingInfo.currency,
          context.correlationId,
          context.tenantId
        );
      }
    }
    if (context.conversationInfo) {
      this.props.conversationId = context.conversationInfo.id;
    }
    if (context.errorInfo && context.errorInfo.length > 0) {
      this.props.errorMessage =
        context.errorInfo[0].title || context.errorInfo[0].message;
      this.props.errorCode = String(context.errorInfo[0].code);
      this.props.errorDetailsJson = JSON.stringify(context.errorInfo);
    }

    let internalStatusChanged = false;
    const previousStatusInternal = this.props.statusInternal.value; // Guardar para el evento

    switch (newStatusMeta) {
      case EWhatsAppMessageStatus.SENT:
        this.props.deliveredToWhatsappAt = timestamp;
        if (
          !this.props.statusInternal.isSentToApi() &&
          !this.props.statusInternal.isDeliveredToUser()
        ) {
          this.props.statusInternal = MessageInternalStatusVO.newSentToApi();
          internalStatusChanged = true;
        }
        break;
      case EWhatsAppMessageStatus.DELIVERED:
        this.props.deliveredToUserAt = timestamp;
        if (
          !this.props.statusInternal.isDeliveredToUser() &&
          !this.props.statusInternal.isReadByUser()
        ) {
          this.props.statusInternal =
            MessageInternalStatusVO.newDeliveredToUser();
          internalStatusChanged = true;
        }
        break;
      case EWhatsAppMessageStatus.READ:
        this.props.readAt = timestamp;
        // No se cambia statusInternal aquí, pero se emite evento si es necesario
        break;
      case EWhatsAppMessageStatus.FAILED:
        this.props.failedAt = timestamp;
        if (!this.props.statusInternal.isErrorState()) {
          this.props.statusInternal =
            MessageInternalStatusVO.newFailedDelivery();
          internalStatusChanged = true;
        }
        break;
    }
    this.setUpdatedAt();

    // Siempre emitir evento de status, incluso si el status interno no cambió (ej. para 'read')
    // pero el status de Meta sí.
    const eventPayload: MessageLogStatusUpdatedPayload = {
      messageLogId: this.id,
      tenantId: context.tenantId,
      waMessageId: this.props.waMessageId,
      correlationId: context.correlationId,
      newStatusInternal: this.props.statusInternal.value, // El estado interno actual
      previousStatusInternal: internalStatusChanged
        ? previousStatusInternal
        : undefined, // Solo si cambió
      newStatusWhatsapp: this.props.statusWhatsapp,
      timestamp: updateTimestamp,
      pricing: context.pricingInfo,
      errors: context.errorInfo,
      conversationId: context.conversationInfo?.id,
    };
    this.addEvent(
      new MessageLogStatusUpdatedEvent({
        aggregateId: this.id,
        payload: eventPayload,
      })
    );
  }

  public markAsFailedByAntiBan(
    reason: string,
    context: { tenantId: TenantId; correlationId: CorrelationId }
  ): void {
    if (this.props.statusInternal.isErrorAntiBan()) return;
    const previousStatusInternal = this.props.statusInternal.value;
    this.props.statusInternal = MessageInternalStatusVO.newErrorAntiBan();
    this.props.errorMessage = reason;
    this.props.failedAt = new Date().toISOString() as IsoDateString;
    this.setUpdatedAt();

    const eventPayload: MessageLogStatusUpdatedPayload = {
      /* ... completar ... */
      messageLogId: this.id,
      tenantId: context.tenantId,
      correlationId: context.correlationId,
      newStatusInternal: this.props.statusInternal.value,
      previousStatusInternal,
      newStatusWhatsapp: this.props.statusWhatsapp, // Mantener el último status de WA conocido
      timestamp: this.props.failedAt,
      errors: [{ code: -1, message: `AntiBan: ${reason}` }], // Error interno
    };
    this.addEvent(
      new MessageLogStatusUpdatedEvent({
        aggregateId: this.id,
        payload: eventPayload,
      })
    );
  }

  public markAsFailedByApi(
    reason: string,
    code: Maybe<string>,
    errorDetails: Maybe<TWhatsAppError[]>,
    context: { tenantId: TenantId; correlationId: CorrelationId }
  ): void {
    if (this.props.statusInternal.isErrorApi()) return;
    const previousStatusInternal = this.props.statusInternal.value;
    this.props.statusInternal = MessageInternalStatusVO.newErrorApi();
    this.props.errorMessage = reason;
    this.props.errorCode = code;
    if (errorDetails)
      this.props.errorDetailsJson = JSON.stringify(errorDetails);
    this.props.failedAt = new Date().toISOString() as IsoDateString;
    this.setUpdatedAt();

    const eventPayload: MessageLogStatusUpdatedPayload = {
      /* ... completar ... */
      messageLogId: this.id,
      tenantId: context.tenantId,
      correlationId: context.correlationId,
      newStatusInternal: this.props.statusInternal.value,
      previousStatusInternal,
      newStatusWhatsapp: this.props.statusWhatsapp,
      timestamp: this.props.failedAt,
      errors: errorDetails,
    };
    this.addEvent(
      new MessageLogStatusUpdatedEvent({
        aggregateId: this.id,
        payload: eventPayload,
      })
    );
  }

  public recordCost(
    costInCents: number,
    currency: string,
    correlationId: CorrelationId,
    tenantId: TenantId
  ): void {
    // No cambiar updated_at solo por registrar costo si es una operación separada
    // this.setUpdatedAt(); // Quitar si el costo se registra post-facto y no es un cambio de estado principal

    const eventPayload: MessageLogCostRecordedPayload = {
      tenantId,
      messageLogId: this.id,
      correlationId,
      costInCents,
      currency,
      pricingCategory: this.props.pricingCategory,
      pricingModel: this.props.pricingModel,
      conversationId: this.props.conversationId,
    };
    this.addEvent(
      new MessageLogCostRecordedEvent({
        aggregateId: this.id,
        payload: eventPayload,
      })
    );
  }

  public validate(): void {
    // ... validaciones ...
  }
}
// RUTA: libs/core/domain/codomessagelog/src/lib/entities/message-log.entity.ts
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{ "nota": "Los eventos MessageLogStatusUpdatedEvent y MessageLogCostRecordedEvent necesitan ser definidos en ../events/." },
{ "nota": "El tenantId y correlationId deben pasarse a los métodos que emiten eventos si son necesarios en el payload del evento y no están directamente en this.props." }
]
*/
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadidas importaciones de PhoneNumberString y MessageLogId desde @dfs-suite/shtypes.", "justificacion": "Resuelve los errores no-undef para estos tipos.", "impacto": "Correctitud de tipos." },
{ "mejora": "Corregido el typo recordId a logId en el método createInitial.", "justificacion": "La variable se llama logId en su declaración.", "impacto": "Resuelve el error no-undef para recordId." },
{ "mejora": "Añadido MessageLogId como tipo para el ID del AggregateRoot y en el constructor.", "justificacion": "Asegura que la entidad use su ID brandeado específico.", "impacto": "Consistencia y seguridad de tipos." },
{ "mejora": "Añadidos tenantId y correlationId a los parámetros de los métodos que emiten eventos si estos datos son necesarios para el payload del evento y no son propiedades directas de la entidad.", "justificacion": "Los eventos de dominio deben ser ricos y autocontenidos.", "impacto": "Eventos más útiles para los listeners." },
{ "mejora": "En updateFromWebhookStatus, el payload del evento MessageLogStatusUpdatedEvent ahora incluye previousStatusInternal solo si el estado interno realmente cambió, y el timestamp del evento es el de la actualización, no el del webhook.", "justificacion": "Información más precisa en el evento.", "impacto": "Claridad." },
{ "mejora": "Añadidos getters para todas las props.", "justificacion": "Encapsulación y acceso controlado.", "impacto": "Mejores prácticas." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{ "nota": "La lógica de updateFromWebhookStatus para determinar internalStatusChanged y el newStatusInternal puede necesitar más refinamiento según las transiciones de estado exactas que queramos modelar." },
{ "nota": "Completar los payloads de los eventos en markAsFailedByAntiBan y markAsFailedByApi." },
{ "nota": "Revisar si setUpdatedAt() debe llamarse en recordCost." }
]
*/
