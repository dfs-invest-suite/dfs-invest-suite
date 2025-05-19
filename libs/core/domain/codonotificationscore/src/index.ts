// RUTA: libs/core/domain/codonotificationscore/src/index.ts

// Entities (Si las definiciones de notificación son persistibles y configurables)
// export * from './lib/entities/notification-trigger.entity';
// export * from './lib/entities/notification-template.entity'; // Plantilla de la notificación (no de WhatsApp)

// Value Objects
export * from './lib/value-objects/notification-type.vo'; // (NEW_LEAD_ASSIGNED, WHATSAPP_MESSAGE_RECEIVED, TASK_REMINDER)
export * from './lib/value-objects/notification-channel.vo'; // (PWA_CONSULTANT, PWA_SUPERVISOR, EMAIL)
export * from './lib/value-objects/notification-recipient.vo'; // (UserId, Role, etc.)

// Ports (Si se necesita persistir o cargar definiciones de notificación)
// export * from './lib/ports/notification-definition.repository.port';

// Domain Events (Eventos que podrían disparar una notificación)
// Esta librería definiría QUÉ notificar, no CÓMO. La capa de aplicación
// escucharía eventos de otros dominios y decidiría si una notificación definida aquí aplica.
