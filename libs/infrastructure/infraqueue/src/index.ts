// RUTA: libs/infrastructure/infraqueue/src/index.ts
export * from './lib/infraqueue.module'; // Módulo NestJS que configura BullMQ y registra procesadores
export * from './lib/processors/whatsapp-outbound.processor';
export * from './lib/processors/whatsapp-webhook.processor';
export * from './lib/processors/whatsapp-campaign-lead.processor';
export * from './lib/processors/lead-import.processor'; // Nuevo
// export * from './lib/processors/analytics-aggregation.processor'; // Futuro
// export * from './lib/services/queue.service'; // Un facade si es necesario sobre BullMQ para añadir jobs
// export * from './lib/constants/queue-names.constants'; // Para nombres de colas
