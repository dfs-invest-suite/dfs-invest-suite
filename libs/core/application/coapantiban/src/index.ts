// RUTA: libs/core/application/coapantiban/src/index.ts
// // RUTA: libs/core/application/coapantiban/src/index.ts

// // --- Application Services / Facades (Principales puntos de entrada para la lógica Anti-Ban) ---

// /**
//  * @interface IAccountHealthManagerServicePortAppLayer
//  * @description Puerto de la capa de aplicación para el servicio que gestiona la salud de las cuentas WhatsApp.
//  * Orquesta la actualización del estado de las cuentas (desde webhooks de Meta o sincronización),
//  * recalcula health scores, aplica estados operativos (warmup, cooldown), y configura rate limiters.
//  * Este es el puerto que otros Casos de Uso (ej. de coapwhatsapp) o listeners consumirán.
//  */
// export * from './lib/services/account-health-manager.service.port'; // Define IAccountHealthManagerServicePortAppLayer y su TOKEN

// // La implementación AccountHealthManagerServiceImpl residirá en ./lib/services/

// // --- Commands (Intenciones de cambio de estado para la gestión de cuentas Anti-Ban) ---

// /**
//  * Comando para actualizar manualmente el estado operativo de una cuenta WhatsApp.
//  * Usado por pwa-supervisor.
//  */
// export * from './lib/commands/set-manual-operational-status.command';

// /**
//  * Comando para iniciar explícitamente el proceso de calentamiento (warmup) de una cuenta.
//  * Usado por pwa-supervisor o por lógica de onboarding.
//  */
// export * from './lib/commands/trigger-phone-number-warmup.command';

// /**
//  * Comando para iniciar explícitamente el proceso de enfriamiento (cooldown) de una cuenta.
//  * Usado por pwa-supervisor o automáticamente por el sistema.
//  */
// export * from './lib/commands/trigger-phone-number-cooldown.command';

// /**
//  * Comando para procesar una actualización de calidad de número de teléfono recibida (ej. de webhook).
//  * Disparado internamente por el sistema.
//  */
// export * from './lib/commands/process-phone-number-quality-update.command';

// /**
//  * Comando para procesar una actualización a nivel de cuenta de WhatsApp (ej. ban, cambio de límite).
//  * Disparado internamente por el sistema.
//  */
// export * from './lib/commands/process-account-update-webhook.command';

// /**
//  * (Futuro) Comando para actualizar la configuración específica del Anti-Ban para un tenant o una cuenta.
//  * ej. umbrales de health score, estrategias de rotación.
//  */
// // export * from './lib/commands/update-anti-ban-settings.command';

// // --- Use Cases (Implementaciones de ICommandHandler/IQueryHandler para los comandos y queries) ---
// // Los tokens de inyección y las interfaces explícitas (I...UseCase) se exportan junto a sus implementaciones.

// // Caso de Uso para actualizar manualmente el estado operativo.
// export * from './lib/use-cases/set-manual-operational-status.use-case';
// export { SET_MANUAL_OPERATIONAL_STATUS_USE_CASE } from './lib/use-cases/set-manual-operational-status.use-case';

// // Caso de Uso para iniciar el calentamiento.
// export * from './lib/use-cases/trigger-phone-number-warmup.use-case';
// export { TRIGGER_PHONE_NUMBER_WARMUP_USE_CASE } from './lib/use-cases/trigger-phone-number-warmup.use-case';

// // Caso de Uso para iniciar el enfriamiento.
// export * from './lib/use-cases/trigger-phone-number-cooldown.use-case';
// export { TRIGGER_PHONE_NUMBER_COOLDOWN_USE_CASE } from './lib/use-cases/trigger-phone-number-cooldown.use-case';

// /**
//  * (Conceptual) El `AccountHealthManagerService` podría ser el handler principal para los comandos
//  * `ProcessPhoneNumberQualityUpdateCommand` y `ProcessAccountUpdateWebhookCommand`,
//  * o podrían ser Casos de Uso separados que luego interactúan con el servicio.
//  * Por ahora, la lógica estará en el servicio.
//  */

// // --- Queries (Intenciones de lectura de datos para Anti-Ban) ---

// /**
//  * Query para obtener una vista general del estado de salud y configuración Anti-Ban
//  * para todas las cuentas de un tenant. Usado por pwa-supervisor.
//  */
// export * from './lib/queries/get-anti-ban-status-overview.query';

// /**
//  * (Futuro) Query para obtener el historial de cambios de salud de una cuenta específica.
//  */
// // export * from './lib/queries/get-account-health-history.query';

// /**
//  * (Futuro) Query para obtener la configuración Anti-Ban actual de un tenant.
//  */
// // export * from './lib/queries/get-anti-ban-settings.query';

// // --- Query Handlers ---
// // Se exportarían los tokens y/o las implementaciones.
// export { GET_ANTI_BAN_STATUS_OVERVIEW_QUERY_HANDLER } from './lib/queries/get-anti-ban-status-overview.query';

// // --- DTOs (Data Transfer Objects para la capa de aplicación Anti-Ban) ---

// /**
//  * DTO para representar la salud de una cuenta WhatsApp individual, combinando
//  * datos de Meta y datos internos del sistema Anti-Ban.
//  * Usado como parte del resultado de GetAntiBanStatusOverviewQuery.
//  */
// export * from './lib/dtos/whatsapp-account-health.dto';

// /**
//  * (Futuro) DTO para la configuración del sistema Anti-Ban por tenant.
//  */
// // export * from './lib/dtos/anti-ban-settings.dto';

// /**
//  * (Futuro) DTO para un punto de datos en el historial de salud de una cuenta.
//  */
// // export * from './lib/dtos/account-health-log-entry.dto';

// // --- Listeners de Eventos (Si este módulo necesita reaccionar a eventos de otros dominios) ---
// // No se prevén listeners directos aquí por ahora, ya que la lógica de reacción a webhooks
// // de WhatsApp (que afectan la salud) se manejará a través de comandos procesados por
// // el AccountHealthManagerService o Casos de Uso específicos.
// // Sin embargo, podría haber un listener para, por ejemplo, un TenantActivatedEvent
// // para inicializar la configuración Anti-Ban por defecto para un nuevo tenant.

// // export * from './lib/listeners/tenant-activated-anti-ban.listener';

// // RUTA: libs/core/application/coapantiban/src/index.ts
// /* SECCIÓN DE MEJORAS REALIZADAS
// [
// { "mejora": "Definición proactiva del index.ts para coapantiban.", "justificacion": "Identifica y exporta los principales artefactos de la capa de aplicación necesarios para el sistema Anti-Ban, incluyendo servicios de aplicación (puertos), comandos, casos de uso (con sus tokens), queries y DTOs. Se incluyen comentarios para artefactos futuros.", "impacto": "Proporciona una API pública clara y completa para la lógica de aplicación del Anti-Ban, facilitando su consumo por api-main y la organización interna de la librería." }
// ]
// /
// / NOTAS PARA IMPLEMENTACIÓN FUTURA
// [
// { "nota": "Se necesitará crear todos los archivos para los comandos, casos de uso, queries, DTOs y el puerto IAccountHealthManagerServicePortAppLayer." },
// { "nota": "La implementación del AccountHealthManagerServiceImpl será central y orquestará la interacción con el dominio codoantiban (entidades, servicios de dominio) y los puertos de infraestructura (repositorio, rate limiter)." }
// ]
// */
export {};
// FIN DEL ARCHIVO: libs/core/application/coapantiban/src/index.ts
