// RUTA: libs/core/application/coapantiban/src/index.ts

// --- Application Services / Facades ---
// (AntiBanDecisionService es de dominio, pero podría haber un servicio de app que lo use y añada logging/métricas)
export * from './lib/services/account-health-manager.service'; // Orquesta actualizaciones de WhatsAppAccount y RateLimiter

// --- Use Cases ---
// (Muchos métodos de AccountHealthManagerService podrían ser Casos de Uso individuales)
export * from './lib/use-cases/update-phone-number-state-from-webhook.use-case';
export * from './lib/use-cases/update-phone-number-state-from-api.use-case'; // Para SyncWhatsAppAssets
export * from './lib/use-cases/set-manual-operational-status.use-case';
export * from './lib/use-cases/trigger-phone-number-warmup.use-case';
export * from './lib/use-cases/trigger-phone-numbercooldown.use-case';
export * from './lib/use-cases/get-anti-ban-status-overview.use-case'; // Para dashboards

// --- DTOs ---
export * from './lib/dtos/whatsapp-account-health.dto';
export * from './lib/dtos/anti-ban-settings.dto'; // Futuro: Para que el tenant configure algunos parámetros

// --- Listeners (para reaccionar a eventos de Meta o internos) ---
// Estos ya estarían más bien dentro de los use-cases de procesamiento de webhooks de coapwhatsapp
// o el AccountHealthManagerService podría tener métodos que son llamados por listeners.
// Ejemplo:
// export * from './lib/listeners/whatsapp-quality-update.listener';
