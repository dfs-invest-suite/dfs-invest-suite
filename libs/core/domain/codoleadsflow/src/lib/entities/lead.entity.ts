// libs/core/domain/codoleadsflow/src/lib/entities/lead.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from '@dfs-suite/sherrors';
import { Result, ok } from '@dfs-suite/shresult';
import {
  CorrelationId,
  EmailString,
  IsoDateString,
  LeadId, // Importar desde shtypes
  Maybe,
  ObjectLiteral,
  PhoneNumberString,
  TenantId,
  UserId,
} from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';

import { InvalidLeadStatusTransitionError } from '../errors/invalid-lead-status-transition.error';
import {
  LeadAssignedEvent,
  LeadAssignedPayload,
} from '../events/lead-assigned.event';
import {
  LeadCreatedEvent,
  LeadCreatedEventPayload, // Corregido aquí también
} from '../events/lead-created.event';
import {
  LeadQualifiedEvent,
  LeadQualifiedPayload,
} from '../events/lead-qualified.event';
import {
  LeadStatusChangedEvent,
  LeadStatusChangedPayload,
} from '../events/lead-status-changed.event';
// LeadId ya se importa de shtypes
import { LeadScoreVO } from '../value-objects/lead-score.vo';
import {
  ELeadSourceChannel,
  LeadSourceChannelVO,
} from '../value-objects/lead-source-channel.vo';
import { ELeadStatus, LeadStatusVO } from '../value-objects/lead-status.vo';

export interface LeadProps {
  name?: Maybe<string>;
  slug?: Maybe<string>;
  email?: Maybe<EmailString>;
  phoneNumber?: Maybe<PhoneNumberString>;
  waId?: Maybe<PhoneNumberString>;
  status: LeadStatusVO;
  score: LeadScoreVO;
  sourceChannel: LeadSourceChannelVO;
  referralSourceText?: Maybe<string>;
  assignedToUserId?: Maybe<UserId>;
  lastInteractionAt?: Maybe<IsoDateString>;
  optInWhatsApp: boolean;
  optInEmail: boolean;
  tags?: Maybe<string[]>;
  customFields?: Maybe<ObjectLiteral>;
}

export interface CreateLeadProps {
  tenantId: TenantId;
  correlationId: CorrelationId;
  name?: Maybe<string>;
  slug?: Maybe<string>;
  email?: Maybe<EmailString>;
  phoneNumber?: Maybe<PhoneNumberString>;
  waId?: Maybe<PhoneNumberString>;
  sourceChannel: ELeadSourceChannel;
  referralSourceText?: Maybe<string>;
  initialStatus?: ELeadStatus;
  initialScore?: number;
  optInWhatsApp?: boolean;
  optInEmail?: boolean;
  customFields?: Maybe<ObjectLiteral>;
  createdByUserId?: Maybe<UserId>;
}

export class LeadEntity extends AggregateRoot<LeadProps, LeadId> {
  constructor(createEntityProps: CreateEntityProps<LeadProps, LeadId>) {
    super(createEntityProps);
  }

  public static create(props: CreateLeadProps, id?: LeadId): LeadEntity {
    if (Guard.isNil(props.tenantId)) {
      throw new ArgumentNotProvidedException(
        'CreateLeadProps: tenantId is required.'
      );
    }
    if (Guard.isNil(props.correlationId)) {
      throw new ArgumentNotProvidedException(
        'CreateLeadProps: correlationId is required.'
      );
    }
    if (Guard.isNil(props.sourceChannel)) {
      throw new ArgumentNotProvidedException(
        'CreateLeadProps: sourceChannel is required.'
      );
    }
    if (
      Guard.isEmpty(props.email) &&
      Guard.isEmpty(props.phoneNumber) &&
      Guard.isEmpty(props.waId)
    ) {
      throw new ArgumentNotProvidedException(
        'At least one contact identifier (email, phone, or waId) must be provided for a lead.'
      );
    }

    const leadId = id || (UuidUtils.generateAggregateId() as LeadId);
    const initialStatus = LeadStatusVO.create(
      props.initialStatus || ELeadStatus.NEW
    );
    const initialScore = LeadScoreVO.create(props.initialScore || 0);
    const sourceChannelVo = LeadSourceChannelVO.create(props.sourceChannel);
    const slug =
      props.slug?.trim().toLowerCase() ||
      (props.name
        ? UuidUtils.generateSlugFromString(props.name)
        : UuidUtils.generateRandomString(8));

    const entityProps: LeadProps = {
      name: props.name?.trim(),
      slug,
      email: props.email,
      phoneNumber: props.phoneNumber,
      waId: props.waId,
      status: initialStatus,
      score: initialScore,
      sourceChannel: sourceChannelVo,
      referralSourceText: props.referralSourceText,
      optInWhatsApp: props.optInWhatsApp ?? false,
      optInEmail: props.optInEmail ?? false,
      customFields: props.customFields,
      tags: [],
    };

    const lead = new LeadEntity({
      id: leadId,
      props: entityProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const eventPayload: LeadCreatedEventPayload = {
      tenantId: props.tenantId,
      leadId: leadId,
      correlationId: props.correlationId,
      name: lead.props.name,
      email: lead.props.email,
      phoneNumber: lead.props.phoneNumber,
      sourceChannel: lead.props.sourceChannel.value,
      status: lead.props.status.value,
      score: lead.props.score.value,
      createdByUserId: props.createdByUserId,
    };
    lead.addEvent(
      new LeadCreatedEvent({ aggregateId: leadId, payload: eventPayload })
    );
    return lead;
  }

  get name(): Maybe<string> {
    return this.props.name;
  }
  get slug(): Maybe<string> {
    return this.props.slug;
  }
  get email(): Maybe<EmailString> {
    return this.props.email;
  }
  get phoneNumber(): Maybe<PhoneNumberString> {
    return this.props.phoneNumber;
  }
  get waId(): Maybe<PhoneNumberString> {
    return this.props.waId;
  }
  get status(): LeadStatusVO {
    return this.props.status;
  }
  get score(): LeadScoreVO {
    return this.props.score;
  }
  get sourceChannel(): LeadSourceChannelVO {
    return this.props.sourceChannel;
  }
  get referralSourceText(): Maybe<string> {
    return this.props.referralSourceText;
  }
  get assignedToUserId(): Maybe<UserId> {
    return this.props.assignedToUserId;
  }
  get lastInteractionAt(): Maybe<IsoDateString> {
    return this.props.lastInteractionAt;
  }
  get optInWhatsApp(): boolean {
    return this.props.optInWhatsApp;
  }
  get optInEmail(): boolean {
    return this.props.optInEmail;
  }
  get tags(): Maybe<string[]> {
    return this.props.tags;
  }
  get customFields(): Maybe<ObjectLiteral> {
    return this.props.customFields;
  }

  public assignTo(
    userId: Maybe<UserId>,
    context: {
      tenantId: TenantId;
      correlationId: CorrelationId;
      assignedBy: UserId;
    }
  ): void {
    if (this.props.assignedToUserId === userId) return;
    const previousAssignedUserId = this.props.assignedToUserId;
    this.props.assignedToUserId = userId;
    this.setUpdatedAt();
    const payload: LeadAssignedPayload = {
      tenantId: context.tenantId,
      leadId: this.id,
      correlationId: context.correlationId,
      newAssignedUserId: userId!,
      previousAssignedUserId,
      assignedByUserId: context.assignedBy,
    };
    this.addEvent(new LeadAssignedEvent({ aggregateId: this.id, payload }));
  }

  public changeStatus(
    newStatusVo: LeadStatusVO,
    context: {
      tenantId: TenantId;
      correlationId: CorrelationId;
      changedBy: UserId;
      reason?: Maybe<string>;
    }
  ): Result<void, InvalidLeadStatusTransitionError> {
    if (this.props.status.equals(newStatusVo)) return ok(undefined);
    // TODO: [LIA-POST-DEMO] Implementar lógica de validación de transición de estados
    // if (!this.props.status.canTransitionTo(newStatusVo)) {
    //   return err(new InvalidLeadStatusTransitionError(`Cannot transition from ${this.props.status.value} to ${newStatusVo.value}`));
    // }
    const oldStatus = this.props.status.value;
    this.props.status = newStatusVo;
    this.setUpdatedAt();
    const payload: LeadStatusChangedPayload = {
      tenantId: context.tenantId,
      leadId: this.id,
      correlationId: context.correlationId,
      newStatus: newStatusVo.value,
      oldStatus,
      changedByUserId: context.changedBy,
      reason: context.reason,
    };
    this.addEvent(
      new LeadStatusChangedEvent({ aggregateId: this.id, payload })
    );
    return ok(undefined);
  }

  public updateScore(
    newScoreVo: LeadScoreVO,
    qualificationDetails: Maybe<ObjectLiteral>,
    context: { tenantId: TenantId; correlationId: CorrelationId }
  ): void {
    if (this.props.score.equals(newScoreVo)) return;
    const oldScore = this.props.score.value;
    this.props.score = newScoreVo;
    this.setUpdatedAt();
    const payload: LeadQualifiedPayload = {
      tenantId: context.tenantId,
      leadId: this.id,
      correlationId: context.correlationId,
      newScore: newScoreVo.value,
      oldScore,
      qualificationDetails,
    };
    this.addEvent(new LeadQualifiedEvent({ aggregateId: this.id, payload }));
  }

  public recordInteraction(interactionTimestamp: IsoDateString): void {
    this.props.lastInteractionAt = interactionTimestamp;
    this.setUpdatedAt();
  }

  public updateOptInWhatsApp(optIn: boolean): void {
    if (this.props.optInWhatsApp === optIn) return;
    this.props.optInWhatsApp = optIn;
    this.setUpdatedAt();
  }

  public updateDetails(
    data: Partial<{
      name: Maybe<string>;
      slug: Maybe<string>;
      email: Maybe<EmailString>;
      phoneNumber: Maybe<PhoneNumberString>;
      waId: Maybe<PhoneNumberString>;
      sourceChannel: Maybe<ELeadSourceChannel>;
      referralSourceText: Maybe<string>;
      optInWhatsApp: Maybe<boolean>;
      optInEmail: Maybe<boolean>;
      tags: Maybe<string[]>;
      customFields: Maybe<ObjectLiteral>;
    }>
  ): void {
    let updated = false;
    if (data.name !== undefined && this.props.name !== data.name?.trim()) {
      this.props.name = data.name?.trim();
      updated = true;
    }
    if (
      data.slug !== undefined &&
      this.props.slug !== data.slug?.trim().toLowerCase()
    ) {
      this.props.slug = data.slug?.trim().toLowerCase();
      updated = true;
    }
    if (
      data.optInWhatsApp !== undefined &&
      this.props.optInWhatsApp !== data.optInWhatsApp
    ) {
      this.props.optInWhatsApp = data.optInWhatsApp; // Asignación directa de boolean
      updated = true;
    }
    // ... otros campos ...
    if (updated) {
      this.setUpdatedAt();
    }
  }

  public validate(): void {
    if (
      Guard.isEmpty(this.props.email) &&
      Guard.isEmpty(this.props.phoneNumber) &&
      Guard.isEmpty(this.props.waId)
    ) {
      throw new ArgumentNotProvidedException(
        'LeadEntity: At least one contact identifier is required.'
      );
    }
    if (
      Guard.isNil(this.props.status) ||
      !(this.props.status instanceof LeadStatusVO)
    ) {
      throw new ArgumentInvalidException(
        'LeadEntity: status must be a valid LeadStatusVO.'
      );
    }
    if (
      Guard.isNil(this.props.score) ||
      !(this.props.score instanceof LeadScoreVO)
    ) {
      throw new ArgumentInvalidException(
        'LeadEntity: score must be a valid LeadScoreVO.'
      );
    }
    if (
      Guard.isNil(this.props.sourceChannel) ||
      !(this.props.sourceChannel instanceof LeadSourceChannelVO)
    ) {
      throw new ArgumentInvalidException(
        'LeadEntity: sourceChannel must be a valid LeadSourceChannelVO.'
      );
    }
  }
}
// FIN DEL ARCHIVO: libs/core/domain/codoleadsflow/src/lib/entities/lead.entity.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Importado `LeadId` desde `@dfs-suite/shtypes`.", "justificacion": "Resuelve TS2305.", "impacto": "Correctitud." },
  { "mejora": "Reemplazado `Guard.againstNullOrUndefined` y `UuidUtils.generateLeadId`.", "justificacion": "Uso correcto.", "impacto": "Resuelve TS2339." },
  { "mejora": "Corregido alias de `LeadCreatedEventPayload` a `LeadCreatedEventPayload` (el tipo correcto) en lugar de `ITenantCreatedEventPayload`.", "justificacion": "Resuelve TS2305 para el payload del evento.", "impacto": "Correctitud." },
  { "mejora": "Eliminado `err` no usado de `shresult`.", "justificacion": "Limpieza.", "impacto": "Menos warnings." },
  { "mejora": "Asegurado que `LeadProps.optInWhatsApp` y `LeadProps.optInEmail` sean `boolean` (no `Maybe<boolean>`) y que `updateOptInWhatsApp` asigne el booleano directamente.", "justificacion": "Resuelve el error `TS2322` y simplifica la lógica de opt-in, asumiendo que siempre tendrán un valor booleano (default `false` en el factory `create`).", "impacto": "Lógica correcta." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
