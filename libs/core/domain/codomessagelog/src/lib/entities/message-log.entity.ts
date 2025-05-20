// RUTA: libs/core/domain/codomessagelog/src/lib/entities/message-log.entity.ts
// TODO: [LIA Legacy - Implementar MessageLogEntity]
// Propósito: Registro de cada mensaje WA enviado o recibido, con sus estados y metadatos.
// Relacionado con Casos de Uso: SendWhatsAppMessageUseCase, ProcessIncomingWhatsAppMessageUseCase, ProcessWhatsAppMessageStatusUseCase.

import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import {
  AggregateId,
  CorrelationId,
  IsoDateString,
  LeadId,
  Maybe,
  TenantId,
  WhatsAppAccountId, // Phone Number ID del tenant
} from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import { MessageDirectionVO } from '../value-objects/message-direction.vo';
import { MessageInternalStatusVO } from '../value-objects/message-internal-status.vo';
import { EWhatsAppMessageStatus } from '@dfs-suite/codowhatsapp'; // Asumiendo que EWhatsAppMessageStatus se define aquí

export interface MessageLogProps {
  // tenantId: TenantId; // Implícito por la DB del tenant
  waMessageId?: Maybe<string>; // ID del mensaje de Meta (se actualiza post-envío o al recibir)
  correlationId: CorrelationId; // Para rastrear el flujo completo
  direction: MessageDirectionVO;
  statusWhatsapp?: Maybe<EWhatsAppMessageStatus>; // Estado según Meta (sent, delivered, read, failed)
  statusInternal: MessageInternalStatusVO; // Estado dentro de DFS
  errorMessage?: Maybe<string>; // Si statusInternal es un error
  errorCode?: Maybe<string>; // Código de error de Meta o interno
  leadId: LeadId;
  tenantPhoneNumberId: WhatsAppAccountId; // El número de WA del tenant involucrado
  recipientWaId: string; // El WA ID del contacto/lead
  templateName?: Maybe<string>;
  messageType: string; // text, image, template, interactive, etc. (Podría ser un EWhatsAppMessageType)
  messageContentPreview?: Maybe<string>; // Un preview del contenido (ej. primeros 200 chars)
  conversationId?: Maybe<string>; // ID de conversación de Meta (si aplica)
  pricingCategory?: Maybe<string>; // Categoría de pricing de Meta (MARKETING, UTILITY, etc.)
  pricingModel?: Maybe<'CBP' | 'PMP'>; // Modelo de precios de Meta
  cost?: Maybe<number>; // Costo del mensaje
  currency?: Maybe<string>; // Moneda del costo
  sentAt?: Maybe<IsoDateString>;
  deliveredToWhatsappAt?: Maybe<IsoDateString>; // Cuando Meta lo marca como 'sent'
  deliveredToUserAt?: Maybe<IsoDateString>; // Cuando Meta lo marca como 'delivered'
  readAt?: Maybe<IsoDateString>; // Cuando Meta lo marca como 'read'
  failedAt?: Maybe<IsoDateString>;
}

interface CreateInitialMessageLogProps {
  correlationId: CorrelationId;
  direction: MessageDirectionVO;
  leadId: LeadId;
  tenantPhoneNumberId: WhatsAppAccountId;
  recipientWaId: string;
  messageType: string;
  templateName?: Maybe<string>;
  messageContentPreview?: Maybe<string>;
  // statusInternal se setea a PENDING_ANTI_BAN o PENDING_PROCESSING por defecto
}

export class MessageLogEntity extends AggregateRoot<MessageLogProps> {
  constructor(createEntityProps: CreateEntityProps<MessageLogProps>) {
    super(createEntityProps);
  }

  public static createInitial(
    props: CreateInitialMessageLogProps,
    id?: AggregateId
  ): MessageLogEntity {
    if (Guard.isEmpty(props.correlationId)) {
      throw new ArgumentNotProvidedException(
        'correlationId is required for MessageLog.'
      );
    }
    // ... otras validaciones para props necesarias

    const logId = id || UuidUtils.generateAggregateId();
    const initialInternalStatus =
      props.direction.value === 'OUTBOUND'
        ? MessageInternalStatusVO.newPendingAntiBan()
        : MessageInternalStatusVO.newPendingProcessing(); // Para mensajes entrantes

    const entityProps: MessageLogProps = {
      correlationId: props.correlationId,
      direction: props.direction,
      statusInternal: initialInternalStatus,
      leadId: props.leadId,
      tenantPhoneNumberId: props.tenantPhoneNumberId,
      recipientWaId: props.recipientWaId,
      messageType: props.messageType,
      templateName: props.templateName,
      messageContentPreview: props.messageContentPreview,
      // Los demás campos son opcionales y se rellenarán después
    };

    const messageLog = new MessageLogEntity({
      id: logId,
      props: entityProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // No emitir evento aquí, el UC lo hará después de persistir.
    return messageLog;
  }

  // --- Getters ---
  get waMessageId(): Maybe<string> {
    return this.props.waMessageId;
  }
  get correlationId(): CorrelationId {
    return this.props.correlationId;
  }
  // ... otros getters

  // --- Métodos de Cambio de Estado ---
  public markAsQueued(correlationId?: CorrelationId): void {
    this.props.statusInternal = MessageInternalStatusVO.newQueued();
    this.setUpdatedAt();
    // Considerar evento si es necesario
  }

  public markAsSentToApi(
    waMessageId: string,
    sentAt: IsoDateString,
    correlationId?: CorrelationId
  ): void {
    this.props.waMessageId = waMessageId;
    this.props.statusInternal = MessageInternalStatusVO.newSentToApi();
    this.props.sentAt = sentAt;
    this.props.statusWhatsapp = EWhatsAppMessageStatus.SENT; // Estado inicial de Meta
    this.setUpdatedAt();
    // Considerar evento MessageLogSentToApiEvent
  }

  public updateWhatsappStatus(
    newStatus: EWhatsAppMessageStatus,
    timestamp: IsoDateString,
    pricingCategory?: string,
    pricingModel?: 'CBP' | 'PMP',
    conversationId?: string,
    correlationId?: CorrelationId
  ): void {
    this.props.statusWhatsapp = newStatus;
    if (pricingCategory) this.props.pricingCategory = pricingCategory;
    if (pricingModel) this.props.pricingModel = pricingModel;
    if (conversationId) this.props.conversationId = conversationId;

    switch (newStatus) {
      case EWhatsAppMessageStatus.DELIVERED:
        this.props.deliveredToUserAt = timestamp;
        this.props.statusInternal =
          MessageInternalStatusVO.newDeliveredToUser();
        break;
      case EWhatsAppMessageStatus.READ:
        this.props.readAt = timestamp;
        // statusInternal podría seguir siendo DELIVERED_TO_USER o uno nuevo como READ_BY_USER
        break;
      case EWhatsAppMessageStatus.FAILED:
        this.props.failedAt = timestamp;
        this.props.statusInternal = MessageInternalStatusVO.newFailedDelivery();
        break;
      case EWhatsAppMessageStatus.SENT: // Cuando Meta confirma el 'sent' (no el 'delivered_to_whatsapp_server')
        this.props.deliveredToWhatsappAt = timestamp; // Lo usamos para "delivered to WhatsApp server"
        // statusInternal podría no cambiar o ser uno intermedio si 'SENT_TO_API' es diferente.
        break;
    }
    this.setUpdatedAt();
    // Considerar evento MessageLogWhatsappStatusUpdatedEvent
  }

  public markAsFailedByAntiBan(
    reason: string,
    correlationId?: CorrelationId
  ): void {
    this.props.statusInternal = MessageInternalStatusVO.newErrorAntiBan();
    this.props.errorMessage = reason;
    this.props.failedAt = new Date().toISOString() as IsoDateString;
    this.setUpdatedAt();
  }

  public markAsFailedByApi(
    reason: string,
    code?: string,
    correlationId?: CorrelationId
  ): void {
    this.props.statusInternal = MessageInternalStatusVO.newErrorApi();
    this.props.errorMessage = reason;
    this.props.errorCode = code;
    this.props.failedAt = new Date().toISOString() as IsoDateString;
    this.setUpdatedAt();
  }

  public recordCost(
    cost: number,
    currency: string,
    correlationId?: CorrelationId
  ): void {
    this.props.cost = cost;
    this.props.currency = currency;
    this.setUpdatedAt();
    // Considerar evento MessageLogCostRecordedEvent
  }

  public validate(): void {
    if (Guard.isEmpty(this.props.correlationId)) {
      throw new ArgumentNotProvidedException(
        'MessageLogEntity: correlationId is required.'
      );
    }
    // ... más validaciones para campos mandatorios
  }
}

/* SECCIÓN DE MEJORAS FUTURAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
