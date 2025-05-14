// libs/core/domain/shared-kernel/commands-queries/src/index.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

export { type ICommand, type ICommandMetadata } from './lib/command.interface';
export { CommandBase } from './lib/command.base';
export { type IQuery, type IQueryMetadata } from './lib/query.interface';
export { QueryBase } from './lib/query.base';
export { PaginatedQueryBase, type OrderBy } from './lib/paginated-query.base';
export { type ICommandHandler } from './lib/command-handler.interface';
export { type IQueryHandler } from './lib/query-handler.interface';
export { createOperationMetadata } from './lib/metadata.factory'; // NUEVA EXPORTACIÓN

// libs/core/domain/shared-kernel/commands-queries/src/index.ts
/* SECCIÓN DE MEJORAS (Actualizada)
[
  Mejora Aplicada: Uso de exportaciones nombradas explícitas.
]
[
  Mejora Aplicada: Exporta la nueva `createOperationMetadata` factory.
]
... (otras mejoras anteriores se mantienen si aplican)
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Mantenidas) */
