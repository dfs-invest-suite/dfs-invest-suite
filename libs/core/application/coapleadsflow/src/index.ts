// RUTA: libs/core/application/coapleadsflow/src/index.ts

// --- Commands & Use Cases ---
export * from './lib/use-cases/create-lead.use-case'; // Genérico, puede ser llamado por portal, whatsapp, importación
export * from './lib/commands/create-lead.command';

export * from './lib/use-cases/update-lead-details.use-case';
export * from './lib/commands/update-lead-details.command';

export * from './lib/use-cases/import-leads.use-case'; // Para CSV/Excel
export * from './lib/commands/import-leads.command';

export * from './lib/use-cases/qualify-lead.use-case'; // Aplica reglas y/o IA
export * from './lib/commands/qualify-lead.command';

export * from './lib/use-cases/assign-lead.use-case'; // A consultor
export * from './lib/commands/assign-lead.command';

export * from './lib/use-cases/track-lead-interaction.use-case'; // Registra interacciones de varios canales
export * from './lib/commands/track-lead-interaction.command';

export * from './lib/use-cases/change-lead-status.use-case';
export * from './lib/commands/change-lead-status.command';

// export * from './lib/use-cases/nurture-lead.use-case'; // Futuro: Inicia secuencias de nurturing
// export * from './lib/use-cases/merge-duplicate-leads.use-case'; // Futuro

// --- Queries & Handlers ---
export * from './lib/queries/get-lead-details.query';
export * from './lib/queries/get-lead-details.query-handler';
export * from './lib/queries/list-leads.query'; // Con filtros y paginación
export * from './lib/queries/list-leads.query-handler';
// export * from './lib/queries/get-lead-interaction-history.query';

// --- DTOs ---
export * from './lib/dtos/lead-creation.dto';
export * from './lib/dtos/lead-details.dto';
export * from './lib/dtos/lead-summary.dto';
export * from './lib/dtos/lead-interaction.dto';
export * from './lib/dtos/lead-filter.dto'; // Para listLeads
// export * from './lib/dtos/lead-import-result.dto';

// --- Application Service Ports (si se necesitan abstracciones específicas aquí) ---
// export * from './lib/ports/i-lead-scoring-provider.port'; // Si el scoring es un servicio externo complejo
