// RUTA: libs/core/application/coapnotificationsservice/src/index.ts

// --- Commands & Use Cases ---
// Caso de uso principal para enviar una notificación.
// Este caso de uso determinaría el canal (PWA, email), el destinatario (User, Role),
// y construiría el mensaje a partir de una plantilla de notificación (del dominio codonotificationscore).
export * from './lib/use-cases/send-notification.use-case';
export * from './lib/commands/send-notification.command';

// --- DTOs ---
export * from './lib/dtos/notification-payload.dto'; // Contenido y metadatos de la notificación a enviar
// export * from './lib/dtos/notification-preferences.dto'; // Futuro: para que usuarios configuren qué notificaciones recibir

// --- Application Service Ports (para los canales de entrega) ---
export * from './lib/ports/i-pwa-notification.port'; // Para enviar a PWA vía WebSockets
export * from './lib/ports/i-email-notification.port'; // Para enviar vía Email
// export * from './lib/ports/i-sms-notification.port';       // Futuro

// --- Listeners (para disparar notificaciones basadas en eventos de otros dominios) ---
// Estos listeners son cruciales. Escuchan eventos de negocio y llaman a SendNotificationUseCase.
export * from './lib/listeners/lead-assigned-notification.listener';
export * from './lib/listeners/new-whatsapp-message-notification.listener'; // Notificar a consultor
export * from './lib/listeners/task-reminder-notification.listener';
export * from './lib/listeners/account-health-alert-notification.listener'; // Notificar a supervisor
// export * from './lib/listeners/tenant-onboarding-welcome.listener'; // Para enviar email de bienvenida
