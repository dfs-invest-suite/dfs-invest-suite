// RUTA: libs/core/domain/codonotificationscore/src/lib/events/notification-template-created.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  NotificationTemplateId,
  CorrelationId,
  UserId,
} from '@dfs-suite/shtypes';

export interface NotificationTemplateCreatedPayload {
  notificationTemplateId: NotificationTemplateId;
  name: string;
  createdByUserId: UserId;
  correlationId: CorrelationId;
}

export class NotificationTemplateCreatedEvent extends DomainEventBase<NotificationTemplateCreatedPayload> {
  constructor(props: DomainEventProps<NotificationTemplateCreatedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codonotificationscore/src/lib/events/notification-template-created.event.ts
