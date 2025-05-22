// RUTA: libs/core/domain/codonotificationscore/src/lib/value-objects/notification-channel.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export enum ENotificationChannel {
  IN_APP_PWA_SUPERVISOR = 'IN_APP_PWA_SUPERVISOR', // Notificación dentro de la PWA Supervisor (ej. Toast, panel de notificaciones)
  IN_APP_PWA_CONSULTANT = 'IN_APP_PWA_CONSULTANT',
  IN_APP_PWA_ADMIN_PLATFORM = 'IN_APP_PWA_ADMIN_PLATFORM',
  MOBILE_PUSH_CONSULTANT = 'MOBILE_PUSH_CONSULTANT', // Notificación Push a la app móvil
  EMAIL = 'EMAIL',
  SMS = 'SMS', // Futuro
  // WHATSAPP_INTERNAL = 'WHATSAPP_INTERNAL' // Futuro: Notificar a usuarios internos vía WA
}

export class NotificationChannelVO extends ValueObject<ENotificationChannel> {
  protected constructor(props: IDomainPrimitive<ENotificationChannel>) {
    super(props);
  }
  get value(): ENotificationChannel {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<ENotificationChannel>): void {
    if (!Object.values(ENotificationChannel).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid notification channel: "${props.value}".`
      );
    }
  }
  public static create(channel: ENotificationChannel): NotificationChannelVO {
    return new NotificationChannelVO({ value: channel });
  }
}
// RUTA: libs/core/domain/codonotificationscore/src/lib/value-objects/notification-channel.vo.ts
