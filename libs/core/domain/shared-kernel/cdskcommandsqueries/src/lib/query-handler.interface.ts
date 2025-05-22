// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/query-handler.interface.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';

import { IQuery } from './query.interface';

/**
 * Interfaz para los Manejadores de Queries (Query Handlers).
 * Cada handler es responsable de ejecutar la lógica para una Query específica
 * y retornar los datos solicitados. Las queries NO deben modificar el estado del sistema.
 *
 * @template Q - El tipo de la Query que este handler puede procesar. Debe extender `IQuery`.
 * @template R - El tipo del resultado (los datos) que la query devuelve en caso de éxito.
 */
export interface IQueryHandler<Q extends IQuery, R> {
  /**
   * Ejecuta la query dada.
   * @param query - La instancia de la query a ejecutar.
   * @returns Una Promesa que resuelve a un `Result`.
   *          - `Ok<R>`: Contiene los datos solicitados.
   *          - `Err<ExceptionBase | Error>`: Si ocurrió un error al obtener los datos
   *                                         (ej. recurso no encontrado, error de base de datos).
   */
  execute(query: Q): Promise<Result<R, ExceptionBase | Error>>;
}
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/query-handler.interface.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports actualizados a alias codificados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "JSDoc añadido.", "justificacion": "Claridad sobre el rol y los tipos genéricos.", "impacto": "DX." },
  { "mejora": "Tipo de error en `Result` es `ExceptionBase | Error`.", "justificacion": "Consistencia.", "impacto": "Flexibilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
