// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/unit-of-work.port.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';

export const UNIT_OF_WORK_PORT = Symbol('IUnitOfWorkPort');

/**
 * Puerto (Interfaz) para el patrón Unit of Work (UoW).
 * Permite agrupar múltiples operaciones de repositorio (y potencialmente otras acciones
 * como la publicación de eventos de dominio) dentro de una única transacción
 * de base de datos o de negocio, asegurando la atomicidad (todo o nada).
 *
 * Esencial para mantener la consistencia en Casos de Uso que modifican
 * múltiples Agregados.
 *
 * @template TContext - El tipo del contexto transaccional específico de la implementación
 *                      (ej. el cliente Prisma transaccional, una sesión de DB).
 * @template TResult - El tipo de resultado esperado del trabajo ejecutado dentro de la transacción.
 */
export interface IUnitOfWorkPort<TContext = unknown, TResult = unknown> {
  /**
   * Ejecuta una función de trabajo (`work`) dentro de una transacción.
   * La implementación del puerto se encarga de iniciar, confirmar (commit)
   * o deshacer (rollback) la transacción.
   *
   * @param work Una función que recibe el contexto transaccional (`transactionContext`)
   *             y devuelve una Promesa conteniendo un `Result` con el resultado del trabajo
   *             o un error. Todas las operaciones de persistencia dentro de `work` DEBEN
   *             usar el `transactionContext` que se les pasa.
   * @returns Una Promesa con el `Result` del trabajo ejecutado. Si el callback `work`
   *          devuelve un `Err`, la transacción debe ser deshecha (rollback). Si devuelve
   *          `Ok`, la transacción debe ser confirmada (commit).
   */
  executeInTransaction(
    work: (
      transactionContext: TContext
    ) => Promise<Result<TResult, ExceptionBase | Error>>
  ): Promise<Result<TResult, ExceptionBase | Error>>;
}
// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/unit-of-work.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports actualizados a alias codificados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "JSDoc detallado explicando el rol, uso, y la responsabilidad del callback `work`.", "justificacion": "Fundamental para el correcto uso del patrón UoW.", "impacto": "Claridad y prevención de errores de implementación." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
