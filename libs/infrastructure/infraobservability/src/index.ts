
// RUTA: libs/infrastructure/infraobservability/src/index.ts
export * from './lib/infraobservability.module'; 
export * from './lib/logger/pino-logger.adapter';
export * from './lib/telemetry/opentelemetry.config';
export * from './lib/filters/all-exceptions.filter'; 
export * from './lib/interceptors/logging.interceptor'; 
export * from './lib/interceptors/transform-response.interceptor'; 
// FIN DEL ARCHIVO: libs/infrastructure/infraobservability/src/index.ts

// RUTA: libs/infrastructure/infraobservability/src/index.ts

// // --- Módulo NestJS ---
// // (Si se crea un módulo NestJS para agrupar y proveer estos componentes)
// export * from './lib/infraobservability.module';

// // --- Adaptadores / Implementaciones de Puertos ---
// // Implementación del ILoggerPort (ej. usando Pino)
// export * from './lib/logger/pino-logger.adapter';
// export { LOGGER_PORT } from '@dfs-suite/cdskports'; // Re-exportar el token del puerto que implementa

// // --- Componentes NestJS (Filtros, Interceptors) ---
// // Filtro global de excepciones para estandarizar respuestas de error
// export * from './lib/filters/all-exceptions.filter';

// // Interceptor para logging de solicitudes y respuestas
// export * from './lib/interceptors/logging.interceptor';

// // Interceptor para transformar respuestas a un formato estándar IApiResponse (para REST)
// export * from './lib/interceptors/transform-response.interceptor';

// // --- Configuración de Telemetría ---
// // Función de setup para OpenTelemetry (tracing y métricas)
// export * from './lib/telemetry/opentelemetry.config';
