// libs/core/domain/tenancy/src/index.ts
export * from './lib/entities/tenant.entity';
export * from './lib/entities/tenant-configuration.entity';
export * from './lib/value-objects/tenant-status.vo';
export * from './lib/value-objects/db-connection-config.vo';
export * from './lib/events/tenant-created.event';
export * from './lib/events/tenant-activated.event';
export * from './lib/events/tenant-suspended.event';
export * from './lib/ports/tenant.repository.port';
export * from './lib/ports/tenant-configuration.repository.port';
export * from './lib/errors/tenant-already-exists.error';
export * from './lib/errors/invalid-tenant-status-transition.error';

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Exportaciones Nombradas Explícitas): Para un control más fino sobre la API pública de la librería, especialmente si crece mucho, se podrían reemplazar los `export *` por exportaciones nombradas explícitas de cada artefacto.
  Justificación: Mayor claridad y mantenimiento de la interfaz pública de la librería. Evita exportar accidentalmente artefactos internos si no están bien encapsulados.
  Impacto: Más verbosidad en este archivo `index.ts`.
]
*/
// libs/core/domain/tenancy/src/index.ts
