// libs/core/domain/codoleadsflow/src/lib/entities/lead-interaction.entity.ts
import { CreateEntityProps, Entity } from '@dfs-suite/cdskentities';
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from '@dfs-suite/sherrors';
import {
  AggregateId,
  CorrelationId,
  InteractionId, // Importar desde shtypes
  IsoDateString,
  LeadId, // Importar desde shtypes
  Maybe,
  TenantId,
  UserId,
} from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';

import {
  EInteractionChannel,
  InteractionChannelVO,
} from '../value-objects/interaction-channel.vo';

export interface LeadInteractionProps {
  leadId: LeadId;
  channel: InteractionChannelVO;
  direction: 'INBOUND' | 'OUTBOUND' | 'INTERNAL_NOTE';
  timestamp: IsoDateString;
  contentSummary: string;
  waMessageId?: Maybe<string>;
  campaignId?: Maybe<AggregateId>;
  consultantUserId?: Maybe<UserId>;
  sentiment?: Maybe<'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'>;
  intent?: Maybe<string[]>;
  durationSeconds?: Maybe<number>;
  visitorId?: Maybe<string>;
  sessionId?: Maybe<string>;
  pageUrl?: Maybe<string>;
  ctaId?: Maybe<string>;
}

export interface CreateLeadInteractionProps {
  tenantId: TenantId;
  correlationId: CorrelationId;
  leadId: LeadId;
  channel: EInteractionChannel;
  direction: 'INBOUND' | 'OUTBOUND' | 'INTERNAL_NOTE';
  contentSummary: string;
  timestamp?: IsoDateString;
  waMessageId?: Maybe<string>;
  campaignId?: Maybe<AggregateId>;
  consultantUserId?: Maybe<UserId>;
  durationSeconds?: Maybe<number>;
  visitorId?: Maybe<string>;
  sessionId?: Maybe<string>;
  pageUrl?: Maybe<string>;
  ctaId?: Maybe<string>;
}

export class LeadInteractionEntity extends Entity<
  LeadInteractionProps,
  InteractionId
> {
  constructor(
    createEntityProps: CreateEntityProps<LeadInteractionProps, InteractionId>
  ) {
    super(createEntityProps);
  }

  public static create(
    props: CreateLeadInteractionProps,
    id?: InteractionId
  ): LeadInteractionEntity {
    if (Guard.isNil(props.tenantId)) {
      throw new ArgumentNotProvidedException(
        'CreateLeadInteractionProps: tenantId is required.'
      );
    }
    if (Guard.isNil(props.correlationId)) {
      throw new ArgumentNotProvidedException(
        'CreateLeadInteractionProps: correlationId is required.'
      );
    }
    if (Guard.isNil(props.leadId)) {
      throw new ArgumentNotProvidedException(
        'CreateLeadInteractionProps: leadId is required.'
      );
    }
    if (Guard.isNil(props.channel)) {
      throw new ArgumentNotProvidedException(
        'CreateLeadInteractionProps: channel is required.'
      );
    }
    if (Guard.isNil(props.direction)) {
      throw new ArgumentNotProvidedException(
        'CreateLeadInteractionProps: direction is required.'
      );
    }
    if (
      Guard.isNil(props.contentSummary) ||
      Guard.isEmpty(props.contentSummary.trim())
    ) {
      throw new ArgumentNotProvidedException(
        'Interaction contentSummary cannot be empty.'
      );
    }

    const interactionId =
      id || (UuidUtils.generateAggregateId() as InteractionId);
    const entityProps: LeadInteractionProps = {
      leadId: props.leadId,
      channel: InteractionChannelVO.create(props.channel),
      direction: props.direction,
      timestamp: props.timestamp || (new Date().toISOString() as IsoDateString),
      contentSummary: props.contentSummary.trim(),
      waMessageId: props.waMessageId,
      campaignId: props.campaignId,
      consultantUserId: props.consultantUserId,
      durationSeconds: props.durationSeconds,
      visitorId: props.visitorId,
      sessionId: props.sessionId,
      pageUrl: props.pageUrl,
      ctaId: props.ctaId,
    };

    const interaction = new LeadInteractionEntity({
      id: interactionId,
      props: entityProps,
      createdAt: new Date(entityProps.timestamp),
      updatedAt: new Date(entityProps.timestamp),
    });
    return interaction;
  }

  get leadId(): LeadId {
    return this.props.leadId;
  }
  get channel(): InteractionChannelVO {
    return this.props.channel;
  }
  get direction(): 'INBOUND' | 'OUTBOUND' | 'INTERNAL_NOTE' {
    return this.props.direction;
  }
  get timestamp(): IsoDateString {
    return this.props.timestamp;
  }
  get contentSummary(): string {
    return this.props.contentSummary;
  }
  get waMessageId(): Maybe<string> {
    return this.props.waMessageId;
  }
  get campaignId(): Maybe<AggregateId> {
    return this.props.campaignId;
  }
  get consultantUserId(): Maybe<UserId> {
    return this.props.consultantUserId;
  }
  get sentiment(): Maybe<'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'> {
    return this.props.sentiment;
  }
  get intent(): Maybe<string[]> {
    return this.props.intent;
  }
  get durationSeconds(): Maybe<number> {
    return this.props.durationSeconds;
  }
  get visitorId(): Maybe<string> {
    return this.props.visitorId;
  }
  get sessionId(): Maybe<string> {
    return this.props.sessionId;
  }
  get pageUrl(): Maybe<string> {
    return this.props.pageUrl;
  }
  get ctaId(): Maybe<string> {
    return this.props.ctaId;
  }

  public updateSentimentAndIntent(
    sentiment?: Maybe<'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'>,
    intents?: Maybe<string[]>
  ): void {
    let updated = false;
    if (sentiment !== undefined && this.props.sentiment !== sentiment) {
      this.props.sentiment = sentiment;
      updated = true;
    }
    if (
      intents !== undefined &&
      JSON.stringify(this.props.intent) !== JSON.stringify(intents)
    ) {
      this.props.intent = intents;
      updated = true;
    }
    if (updated) {
      this.setUpdatedAt();
    }
  }

  public validate(): void {
    if (Guard.isNil(this.props.leadId))
      throw new ArgumentNotProvidedException(
        'LeadInteractionEntity: leadId is required.'
      );
    if (
      Guard.isNil(this.props.channel) ||
      !(this.props.channel instanceof InteractionChannelVO)
    ) {
      throw new ArgumentInvalidException(
        'LeadInteractionEntity: channel must be a valid InteractionChannelVO.'
      );
    }
    if (Guard.isNil(this.props.direction))
      throw new ArgumentNotProvidedException(
        'LeadInteractionEntity: direction is required.'
      );
    if (Guard.isNil(this.props.timestamp))
      throw new ArgumentNotProvidedException(
        'LeadInteractionEntity: timestamp is required.'
      );
    if (Guard.isEmpty(this.props.contentSummary)) {
      throw new ArgumentNotProvidedException(
        'LeadInteractionEntity: contentSummary is required.'
      );
    }
  }
}
// FIN DEL ARCHIVO: libs/core/domain/codoleadsflow/src/lib/entities/lead-interaction.entity.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Importados `LeadId` e `InteractionId` desde `@dfs-suite/shtypes` (que ahora los define en su subdirectorio `domains/leads-flow`).", "justificacion": "Centraliza la fuente de estos Branded IDs y resuelve el error de no encontrarlos.", "impacto": "Correctitud de tipos y resolución de dependencias." },
  { "mejora": "Reemplazado `Guard.againstNullOrUndefined` por `if (Guard.isNil(...)) throw new ArgumentNotProvidedException(...)` en todo el archivo.", "justificacion": "Uso correcto de la API de `Guard` definida en `shutils`.", "impacto": "Resuelve los errores TS2339 (método no existe) y asegura que las validaciones funcionen como se espera." },
  { "mejora": "Cambiado `UuidUtils.generateInteractionId()` a `UuidUtils.generateAggregateId() as InteractionId`.", "justificacion": "Alineación con la refactorización de `UuidUtils` donde los generadores específicos de dominio fueron eliminados. Ahora se genera un `AggregateId` (string base) y se castea al Branded Type `InteractionId`.", "impacto": "Resuelve el error TS2339 (método no existe) y mantiene el tipado fuerte para el ID de la entidad." },
  { "mejora": "Añadidos getters faltantes para todas las `LeadInteractionProps`.", "justificacion": "Proporciona una API de lectura completa para la entidad.", "impacto": "Completitud y encapsulación." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
