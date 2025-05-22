// libs/core/domain/codoleadsflow/src/index.ts
// --- Types (Branded IDs específicos de este dominio, ahora definidos y re-exportados desde shtypes) ---
export type { InteractionId, LeadId } from '@dfs-suite/shtypes'; // Importar los tipos re-exportados por shtypes

// --- Entities ---
export * from './lib/entities/lead-interaction.entity';
export type {
  CreateLeadInteractionProps,
  LeadInteractionProps,
} from './lib/entities/lead-interaction.entity';
export * from './lib/entities/lead.entity';
export type { CreateLeadProps, LeadProps } from './lib/entities/lead.entity';

// --- Value Objects ---
export * from './lib/value-objects/interaction-channel.vo';
export { EInteractionChannel } from './lib/value-objects/interaction-channel.vo';
export * from './lib/value-objects/lead-score.vo';
export * from './lib/value-objects/lead-source-channel.vo';
export { ELeadSourceChannel } from './lib/value-objects/lead-source-channel.vo';
export * from './lib/value-objects/lead-status.vo';
export { ELeadStatus } from './lib/value-objects/lead-status.vo';

// --- Ports (Interfaces para Repositorios y Servicios de Dominio) ---
export * from './lib/ports/lead-interaction.repository.port';
export * from './lib/ports/lead.repository.port';

// --- Domain Events ---
export * from './lib/events/lead-assigned.event';
export * from './lib/events/lead-created.event';
export * from './lib/events/lead-interacted.event';
export * from './lib/events/lead-qualified.event';
export * from './lib/events/lead-status-changed.event';

// --- Errors ---
export * from './lib/errors/invalid-lead-status-transition.error';
export * from './lib/errors/lead-already-exists.error';
export * from './lib/errors/lead-not-found.error';
// FIN DEL ARCHIVO: libs/core/domain/codoleadsflow/src/index.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "`LeadId` e `InteractionId` ahora se importan como tipos desde `@dfs-suite/shtypes` en lugar de exportarse desde un archivo local `types/lead.types.ts`.", "justificacion": "Alinea con la estrategia de centralizar la definición de todos los Branded IDs en `shtypes` para romper ciclos de dependencia.", "impacto": "Resuelve dependencias circulares y asegura una única fuente de verdad para estos IDs." },
  { "mejora": "Confirmada la exportación de los archivos de error creados (`lead-already-exists.error` y `invalid-lead-status-transition.error`).", "justificacion": "Completa la API pública de errores del dominio.", "impacto": "Permite que la capa de aplicación y otros consumidores manejen estos errores específicos."}
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
