// RUTA: libs/core/domain/codonotificationscore/src/lib/value-objects/notification-type.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

// Estos tipos de notificación deben ser lo suficientemente genéricos
// para cubrir diferentes eventos de negocio que podrían dispararlas.
export enum ENotificationType {
  // Relacionados con Leads
  NEW_LEAD_ASSIGNED = 'NEW_LEAD_ASSIGNED',
  LEAD_STATUS_CHANGED_CRITICAL = 'LEAD_STATUS_CHANGED_CRITICAL', // Ej. a "Lost" o "Converted"
  LEAD_SCORE_THRESHOLD_REACHED = 'LEAD_SCORE_THRESHOLD_REACHED', // Ej. se volvió "Hot"
  NEW_WHATSAPP_MESSAGE_FROM_LEAD = 'NEW_WHATSAPP_MESSAGE_FROM_LEAD',

  // Relacionados con Tareas y Agenda
  TASK_DUE_SOON = 'TASK_DUE_SOON',
  TASK_OVERDUE = 'TASK_OVERDUE',
  APPOINTMENT_REMINDER = 'APPOINTMENT_REMINDER',

  // Relacionados con WhatsApp y Anti-Ban
  WHATSAPP_ACCOUNT_HEALTH_DEGRADED = 'WHATSAPP_ACCOUNT_HEALTH_DEGRADED', // Calidad ROJA o AMARILLA
  WHATSAPP_ACCOUNT_SUSPENDED = 'WHATSAPP_ACCOUNT_SUSPENDED',
  WHATSAPP_TEMPLATE_STATUS_CHANGED = 'WHATSAPP_TEMPLATE_STATUS_CHANGED', // Ej. Rechazada o Pausada

  // Relacionados con Campañas
  CAMPAIGN_COMPLETED = 'CAMPAIGN_COMPLETED',
  CAMPAIGN_ERROR = 'CAMPAIGN_ERROR',

  // Relacionados con Sistema/Plataforma
  TENANT_ONBOARDING_COMPLETED = 'TENANT_ONBOARDING_COMPLETED', // Para el admin del tenant
  BILLING_PAYMENT_FAILED = 'BILLING_PAYMENT_FAILED', // Para el admin del tenant
  PLATFORM_MAINTENANCE_SCHEDULED = 'PLATFORM_MAINTENANCE_SCHEDULED', // Para admins de plataforma y tenants

  // Otros
  CUSTOM_ALERT = 'CUSTOM_ALERT', // Para alertas configurables
}

export class NotificationTypeVO extends ValueObject<ENotificationType> {
  protected constructor(props: IDomainPrimitive<ENotificationType>) {
    super(props);
  }
  get value(): ENotificationType {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<ENotificationType>): void {
    if (!Object.values(ENotificationType).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid notification type: "${props.value}".`
      );
    }
  }
  public static create(type: ENotificationType): NotificationTypeVO {
    return new NotificationTypeVO({ value: type });
  }
}
// RUTA: libs/core/domain/codonotificationscore/src/lib/value-objects/notification-type.vo.ts
