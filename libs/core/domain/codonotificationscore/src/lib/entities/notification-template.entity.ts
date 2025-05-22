// RUTA: libs/core/domain/codonotificationscore/src/lib/entities/notification-template.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import {
  NotificationTemplateId, // NUEVO Branded ID
  Maybe,
  CorrelationId, // Para evento
  UserId, // Para createdBy/updatedBy
  TenantId, // Si las plantillas son por tenant
} from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';

import {
  ENotificationChannel,
  NotificationChannelVO,
} from '../value-objects/notification-channel.vo';
import {
  ENotificationType,
  NotificationTypeVO,
} from '../value-objects/notification-type.vo';
// import { NotificationTemplateCreatedEvent, NotificationTemplateUpdatedEvent } from '../events';

export interface NotificationTemplateContent {
  subject?: Maybe<string>; // Para Email
  bodyText: string; // Plantilla de texto con placeholders (ej. "Hola {{userName}}, tienes un nuevo lead {{leadName}}.")
  // bodyHtml?: Maybe<string>; // Para Email
  // deepLink?: Maybe<string>; // Para abrir una sección específica en la PWA/móvil
}

export interface NotificationTemplateProps {
  // tenantId?: Maybe<TenantId>; // Si las plantillas son por tenant
  name: string; // Nombre único de la plantilla, ej. "NEW_LEAD_ASSIGNED_PWA_CONSULTANT"
  description?: Maybe<string>;
  notificationType: NotificationTypeVO; // A qué tipo de evento de negocio se asocia
  defaultChannels: NotificationChannelVO[]; // Canales por defecto para esta plantilla
  contentByChannel: Partial<
    Record<ENotificationChannel, NotificationTemplateContent>
  >; // Contenido específico por canal
  requiredPlaceholders?: Maybe<string[]>; // Lista de placeholders que esta plantilla espera
  isActive: boolean;
}

export interface CreateNotificationTemplateProps {
  // tenantId?: Maybe<TenantId>;
  correlationId: CorrelationId;
  name: string;
  description?: Maybe<string>;
  notificationType: ENotificationType;
  defaultChannels: ENotificationChannel[];
  contentByChannel: Partial<
    Record<ENotificationChannel, NotificationTemplateContent>
  >;
  requiredPlaceholders?: Maybe<string[]>;
  createdByUserId: UserId;
}

export class NotificationTemplateEntity extends AggregateRoot<
  NotificationTemplateProps,
  NotificationTemplateId
> {
  constructor(
    createEntityProps: CreateEntityProps<
      NotificationTemplateProps,
      NotificationTemplateId
    >
  ) {
    super(createEntityProps);
  }

  public static create(
    props: CreateNotificationTemplateProps,
    id?: NotificationTemplateId
  ): NotificationTemplateEntity {
    Guard.againstNullOrUndefined(props.name, 'Template name');
    Guard.againstNullOrUndefined(props.notificationType, 'Notification type');
    Guard.againstNullOrUndefined(props.defaultChannels, 'Default channels');
    if (props.defaultChannels.length === 0)
      throw new ArgumentNotProvidedException(
        'At least one default channel is required.'
      );
    Guard.againstNullOrUndefined(props.contentByChannel, 'Content by channel');
    if (Object.keys(props.contentByChannel).length === 0)
      throw new ArgumentNotProvidedException(
        'Content for at least one channel is required.'
      );

    const templateId = id || UuidUtils.generateNotificationTemplateId(); // Necesita generador
    const entityProps: NotificationTemplateProps = {
      name: props.name.trim(),
      description: props.description,
      notificationType: NotificationTypeVO.create(props.notificationType),
      defaultChannels: props.defaultChannels.map((ch) =>
        NotificationChannelVO.create(ch)
      ),
      contentByChannel: props.contentByChannel,
      requiredPlaceholders: props.requiredPlaceholders,
      isActive: true,
    };
    const template = new NotificationTemplateEntity({
      id: templateId,
      props: entityProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // template.addEvent(new NotificationTemplateCreatedEvent(...));
    return template;
  }

  // Getters
  get name(): string {
    return this.props.name;
  }
  // ...

  public updateContent(
    newContentByChannel: Partial<
      Record<ENotificationChannel, NotificationTemplateContent>
    >,
    updatedByUserId: UserId,
    correlationId: CorrelationId
  ): void {
    // ... lógica de actualización, validación de placeholders ...
    this.props.contentByChannel = {
      ...this.props.contentByChannel,
      ...newContentByChannel,
    };
    this.setUpdatedAt();
    // Emitir NotificationTemplateUpdatedEvent
  }

  public addChannel(
    channel: NotificationChannelVO,
    content: NotificationTemplateContent
  ): void {
    // ...
  }
  public removeChannel(channel: ENotificationChannel): void {
    // ...
  }

  public activate(): void {
    /* ... */
  }
  public deactivate(): void {
    /* ... */
  }

  public validate(): void {
    Guard.againstNullOrUndefined(
      this.props.name,
      'NotificationTemplateEntity: name'
    );
    Guard.againstNullOrUndefined(
      this.props.notificationType,
      'NotificationTemplateEntity: notificationType'
    );
    // ... más validaciones ...
  }
}
// RUTA: libs/core/domain/codonotificationscore/src/lib/entities/notification-template.entity.ts
