// RUTA: libs/core/domain/codonotificationscore/src/lib/ports/notification-template.repository.port.ts
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { NotificationTemplateId, Maybe } from '@dfs-suite/shtypes';

import {
  NotificationTemplateEntity,
  NotificationTemplateProps,
} from '../entities/notification-template.entity';
import { ENotificationType } from '../value-objects/notification-type.vo';

export const NOTIFICATION_TEMPLATE_REPOSITORY_PORT = Symbol(
  'INotificationTemplateRepositoryPort'
);

export interface INotificationTemplateRepository
  extends IRepositoryPort<
    NotificationTemplateProps,
    NotificationTemplateId,
    NotificationTemplateEntity
  > {
  findByName(
    name: string
  ): Promise<Result<Maybe<NotificationTemplateEntity>, ExceptionBase>>;

  findByTypeAndChannel(
    notificationType: ENotificationType
    // channel: ENotificationChannel // El canal puede estar en el contenido, no para buscar
  ): Promise<Result<NotificationTemplateEntity[], ExceptionBase>>; // Puede haber varias plantillas para un tipo
}
// RUTA: libs/core/domain/codonotificationscore/src/lib/ports/notification-template.repository.port.ts
