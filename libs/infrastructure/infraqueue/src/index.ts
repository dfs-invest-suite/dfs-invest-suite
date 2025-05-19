// RUTA: libs/infrastructure/infraqueue/src/index.ts
export * from './lib/infraqueue.module'; // Módulo NestJS que configura BullMQ y registra procesadores
export * from './lib/processors/whatsapp-outbound.processor';
export * from './lib/processors/whatsapp-webhook.processor';
export * from './lib/processors/whatsapp-campaign-lead.processor';
// export * from './lib/processors/lead-import.processor';
// export * from './lib/services/queue.service'; // Un facade si es necesario sobre BullMQ
