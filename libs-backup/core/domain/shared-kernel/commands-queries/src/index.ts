// RUTA: libs/core/domain/shared-kernel/commands-queries/src/index.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

export { type ICommandHandler } from './lib/command-handler.interface';
export { CommandBase } from './lib/command.base';
export { type ICommand, type ICommandMetadata } from './lib/command.interface';
export { PaginatedQueryBase, type OrderBy } from './lib/paginated-query.base';
export { type IQueryHandler } from './lib/query-handler.interface';
export { QueryBase } from './lib/query.base';
export { type IQuery, type IQueryMetadata } from './lib/query.interface';
// ELIMINADO: export { createOperationMetadata } from './lib/metadata.factory';
// RUTA: libs/core/domain/shared-kernel/commands-queries/src/index.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Eliminada la exportación de `createOperationMetadata`.",
    "justificacion": "La factoría `createOperationMetadata` ha sido movida a `libs/shared/utils` y se exportará desde allí. Esta librería ya no es su propietaria.",
    "impacto": "Evita exportaciones duplicadas o incorrectas."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
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
