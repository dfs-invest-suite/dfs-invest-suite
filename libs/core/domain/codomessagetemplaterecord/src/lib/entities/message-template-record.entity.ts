// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/entities/message-template-record.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import {
  EWhatsAppQualityRating as EWhatsAppQualityRatingMeta,
  EWhatsAppTemplateCategory,
  EWhatsAppTemplateStatus as EWhatsAppTemplateStatusMeta,
} from '@dfs-suite/codowhatsapp';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import {
  AggregateId,
  CorrelationId,
  MessageTemplateId as HsmId,
  IsoDateString,
  Maybe,
  TenantId,
} from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';

import {
  MessageTemplateRecordCreatedEvent,
  MessageTemplateRecordCreatedPayload,
} from '../events/message-template-record-created.event';
import {
  MessageTemplateRecordMetaStatusUpdatedEvent,
  MessageTemplateRecordMetaStatusUpdatedPayload,
} from '../events/message-template-record-meta-status-updated.event';
import { TemplateComponentVO } from '../value-objects/template-component.vo';
import { TemplateStatusInternalVO } from '../value-objects/template-status-internal.vo';

export interface MessageTemplateRecordProps {
  hsmId: HsmId;
  name: string;
  language: string;
  category: EWhatsAppTemplateCategory;
  components: TemplateComponentVO[];
  statusMeta: EWhatsAppTemplateStatusMeta; // Usar el alias
  statusInternal: TemplateStatusInternalVO;
  qualityRatingMeta?: Maybe<EWhatsAppQualityRatingMeta>;
  rejectedReason?: Maybe<string>;
  exampleJson?: Maybe<string>;
  lastSyncedAt?: Maybe<IsoDateString>;
}

export interface CreateMessageTemplateRecordProps {
  tenantId: TenantId;
  name: string;
  language: string;
  category: EWhatsAppTemplateCategory;
  components: TemplateComponentVO[]; // Recibe VOs ya creados
  exampleJson?: Maybe<string>;
  hsmId?: Maybe<HsmId>;
  statusMeta?: EWhatsAppTemplateStatusMeta; // Usar el alias
  qualityRatingMeta?: Maybe<EWhatsAppQualityRatingMeta>;
  correlationId: CorrelationId;
}

export class MessageTemplateRecordEntity extends AggregateRoot<
  MessageTemplateRecordProps,
  AggregateId
> {
  constructor(
    createEntityProps: CreateEntityProps<
      MessageTemplateRecordProps,
      AggregateId
    >
  ) {
    super(createEntityProps);
  }

  public static create(
    props: CreateMessageTemplateRecordProps,
    id?: AggregateId
  ): MessageTemplateRecordEntity {
    // ... (validaciones)
    Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'props.name' },
      { argument: props.language, argumentName: 'props.language' },
      { argument: props.category, argumentName: 'props.category' },
      { argument: props.components, argumentName: 'props.components' },
      { argument: props.tenantId, argumentName: 'props.tenantId' },
      { argument: props.correlationId, argumentName: 'props.correlationId' },
    ]);
    if (Guard.isEmpty(props.name.trim()))
      throw new ArgumentNotProvidedException('Template name cannot be empty.');

    const recordId = id || UuidUtils.generateAggregateId(); // ID interno de nuestro registro
    const entityProps: MessageTemplateRecordProps = {
      hsmId:
        props.hsmId ||
        (UuidUtils.generateMessageTemplateId() as unknown as HsmId),
      name: props.name.trim(),
      language: props.language.trim(),
      category: props.category,
      components: props.components,
      statusMeta: props.statusMeta || EWhatsAppTemplateStatusMeta.PENDING, // <<< Usar el alias EWhatsAppTemplateStatusMeta
      statusInternal: props.hsmId
        ? TemplateStatusInternalVO.newSynced()
        : TemplateStatusInternalVO.newDraft(),
      qualityRatingMeta: props.qualityRatingMeta,
      exampleJson: props.exampleJson,
      lastSyncedAt: props.hsmId
        ? (new Date().toISOString() as IsoDateString)
        : undefined,
    };

    const record = new MessageTemplateRecordEntity({
      id: recordId,
      props: entityProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const eventPayload: MessageTemplateRecordCreatedPayload = {
      tenantId: props.tenantId,
      messageTemplateRecordId: recordId,
      hsmId: record.props.hsmId,
      name: record.props.name,
      language: record.props.language,
      category: record.props.category,
      statusInternal: record.props.statusInternal.value,
      statusMeta: record.props.statusMeta, // <<< Usar el alias EWhatsAppTemplateStatusMeta
      correlationId: props.correlationId,
    };
    record.addEvent(
      new MessageTemplateRecordCreatedEvent({
        aggregateId: recordId,
        payload: eventPayload,
      })
    );
    return record;
  }

  // Getters ...
  get hsmId(): HsmId {
    return this.props.hsmId;
  }
  get name(): string {
    return this.props.name;
  }
  get language(): string {
    return this.props.language;
  }
  get category(): EWhatsAppTemplateCategory {
    return this.props.category;
  }
  get components(): TemplateComponentVO[] {
    return [...this.props.components];
  }
  get statusMeta(): EWhatsAppTemplateStatusMeta {
    return this.props.statusMeta;
  } // <<< Usar el alias EWhatsAppTemplateStatusMeta
  get statusInternal(): TemplateStatusInternalVO {
    return this.props.statusInternal;
  }
  get qualityRatingMeta(): Maybe<EWhatsAppQualityRatingMeta> {
    return this.props.qualityRatingMeta;
  }
  get rejectedReason(): Maybe<string> {
    return this.props.rejectedReason;
  }
  get exampleJson(): Maybe<string> {
    return this.props.exampleJson;
  }
  get lastSyncedAt(): Maybe<IsoDateString> {
    return this.props.lastSyncedAt;
  }

  public updateMetaStatus(
    newMetaStatus: EWhatsAppTemplateStatusMeta, // <<< Usar el alias EWhatsAppTemplateStatusMeta
    newQualityRating: Maybe<EWhatsAppQualityRatingMeta>,
    reason: Maybe<string>,
    correlationId: CorrelationId,
    tenantId: TenantId
  ): void {
    const previousMetaStatus = this.props.statusMeta;
    this.props.statusMeta = newMetaStatus;
    this.props.qualityRatingMeta = newQualityRating;
    this.props.rejectedReason = reason;
    this.props.lastSyncedAt = new Date().toISOString() as IsoDateString;

    if (
      newMetaStatus === EWhatsAppTemplateStatusMeta.APPROVED && // <<< Usar el alias EWhatsAppTemplateStatusMeta
      this.props.statusInternal.isDraft()
    ) {
      this.props.statusInternal = TemplateStatusInternalVO.newSynced();
    } else if (
      (newMetaStatus === EWhatsAppTemplateStatusMeta.REJECTED || // <<< Usar el alias EWhatsAppTemplateStatusMeta
        newMetaStatus === EWhatsAppTemplateStatusMeta.PAUSED) && // <<< Usar el alias EWhatsAppTemplateStatusMeta
      this.props.statusInternal.isSynced()
    ) {
      this.props.statusInternal = TemplateStatusInternalVO.newNeedsReview();
    }

    this.setUpdatedAt();
    const eventPayload: MessageTemplateRecordMetaStatusUpdatedPayload = {
      tenantId,
      messageTemplateRecordId: this.id,
      hsmId: this.hsmId,
      name: this.name,
      language: this.language,
      previousMetaStatus,
      newMetaStatus,
      newQualityRating,
      reason,
      correlationId,
    };
    this.addEvent(
      new MessageTemplateRecordMetaStatusUpdatedEvent({
        aggregateId: this.id,
        payload: eventPayload,
      })
    );
  }

  public updateComponents(
    newComponents: TemplateComponentVO[],
    exampleJson?: Maybe<string>
  ): void {
    if (
      !this.props.statusInternal.isDraft() &&
      !this.props.statusInternal.isNeedsReview()
    ) {
      console.warn(
        `Cannot update components of template ${this.name} in status ${this.props.statusInternal.value}`
      );
      return;
    }
    this.props.components = newComponents;
    if (exampleJson) {
      this.props.exampleJson = exampleJson;
    }
    this.setUpdatedAt();
  }

  public markAsLocallyDeleted(): void {
    this.props.statusInternal = TemplateStatusInternalVO.newLocallyDeleted();
    this.setUpdatedAt();
  }

  public validate(): void {
    // ... (validaciones como estaban)
    if (Guard.isEmpty(this.props.name?.trim()))
      throw new ArgumentNotProvidedException('Template name is required.');
    if (Guard.isEmpty(this.props.language?.trim()))
      throw new ArgumentNotProvidedException('Template language is required.');
    if (!this.props.components || this.props.components.length === 0)
      throw new ArgumentNotProvidedException(
        'Template components are required.'
      );
    this.props.components.forEach((comp) => {
      if (!(comp instanceof TemplateComponentVO)) {
        throw new ArgumentNotProvidedException(
          'All template components must be valid TemplateComponentVO instances.'
        );
      }
    });
  }

  public isApprovedByMeta(): boolean {
    // Método helper
    return this.props.statusMeta === EWhatsAppTemplateStatusMeta.APPROVED;
  }
}
// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/entities/message-template-record.entity.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadido el import de `EWhatsAppTemplateStatus as EWhatsAppTemplateStatusMeta` desde `@dfs-suite/codowhatsapp` y se utiliza este alias en todo el archivo.", "justificacion": "Resuelve el error `no-undef` para `EWhatsAppTemplateStatus` y clarifica que este enum representa el estado de Meta.", "impacto": "El archivo es sintácticamente correcto y los tipos de estado son claros." },
  { "mejora": "Añadido método helper `isApprovedByMeta()`.", "justificacion": "Simplifica la verificación del estado de aprobación de Meta.", "impacto": "Mejora la legibilidad en los casos de uso que dependen de este estado." },
  { "mejora": "Verificado el import de `TWhatsAppTemplateComponent` y su uso. Si `TemplateComponentVO` ya encapsula esta estructura, el import directo de `TWhatsAppTemplateComponent` en la entidad podría no ser necesario.", "justificacion": "Asegurar que se usen los tipos de dominio (VOs) internamente.", "impacto": "Consistencia."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "El placeholder `UuidUtils.generateMessageTemplateId() as unknown as HsmId` en `create()` para el `hsmId` cuando no se provee es temporal. Un template creado localmente no tendría un `hsmId` hasta ser enviado y aceptado por Meta. El `hsmId` en `props` debería ser `Maybe<HsmId>`." }
]
*/
// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/entities/message-template-record.entity.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Implementación completa de MessageTemplateRecordEntity.", "justificacion": "Define la entidad para el registro local de plantillas de WhatsApp, incluyendo propiedades, factory create, métodos de cambio de estado (updateMetaStatus, updateComponents, markAsLocallyDeleted) y validaciones. Emite eventos de dominio.", "impacto": "Entidad de dominio funcional para plantillas." },
{ "mejora": "Uso de TemplateStatusInternalVO y TemplateComponentVO (a definir).", "justificacion": "Encapsula la lógica de estado interno y la estructura de componentes.", "impacto": "Modelo de dominio más rico." },
{ "mejora": "Inclusión de tenantId y correlationId en el payload del evento MessageTemplateRecordCreatedEvent y MessageTemplateRecordMetaStatusUpdatedEvent.", "justificacion": "Contexto necesario para los listeners.", "impacto": "Eventos más útiles."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{ "nota": "Los VOs TemplateStatusInternalVO y TemplateComponentVO necesitan ser implementados en ../value-objects/." },
{ "nota": "Los eventos MessageTemplateRecordCreatedEvent y MessageTemplateRecordMetaStatusUpdatedEvent necesitan ser implementados en ../events/." }
]
*/
