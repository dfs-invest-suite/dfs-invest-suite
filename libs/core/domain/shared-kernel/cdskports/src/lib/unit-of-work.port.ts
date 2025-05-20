// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/unit-of-work.port.ts
// TODO: [LIA Legacy - Definir IUnitOfWorkPort] - ¡REALIZADO!
// Propósito: Define una interfaz para el patrón Unit of Work (UoW).
//            Permite agrupar múltiples operaciones de repositorio (y potencialmente otras acciones)
//            dentro de una única transacción de base de datos o de negocio.
//            Esencial para mantener la consistencia en Casos de Uso complejos.
// Relacionado con Casos de Uso: Casos de Uso que modifican múltiples Agregados y requieren atomicidad.

import { ExceptionBase } from '@dfs-suite/sherrors'; // REFACTORIZADO
import { Result } from '@dfs-suite/shresult'; // REFACTORIZADO

export const UNIT_OF_WORK_PORT = Symbol('IUnitOfWorkPort');

/**
 * @template TContext El tipo del contexto transaccional específico de la implementación
 *                  (ej. el cliente Prisma transaccional, una sesión de DB).
 * @template TResult El tipo de resultado esperado del trabajo ejecutado dentro de la transacción.
 */
export interface IUnitOfWorkPort<TContext = unknown, TResult = unknown> {
  /**
   * Ejecuta una función de trabajo (`work`) dentro de una transacción.
   * La implementación del puerto se encarga de iniciar, confirmar (commit) o deshacer (rollback) la transacción.
   * @param work Una función que recibe el contexto transaccional y devuelve una Promesa
   *             conteniendo un `Result` con el resultado del trabajo o un error.
   *             Todas las operaciones de persistencia dentro de `work` DEBEN usar el `transactionContext`.
   * @returns Una Promesa con el `Result` del trabajo ejecutado.
   */
  executeInTransaction(
    work: (
      transactionContext: TContext
    ) => Promise<Result<TResult, ExceptionBase | Error>>
  ): Promise<Result<TResult, ExceptionBase | Error>>;

  // Alternativamente, o de forma complementaria, una API más manual:
  // startTransaction(): Promise<Result<TContext, ExceptionBase | Error>>;
  // commitTransaction(transactionContext: TContext): Promise<Result<void, ExceptionBase | Error>>;
  // rollbackTransaction(transactionContext: TContext): Promise<Result<void, ExceptionBase | Error>>;
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports a alias codificados.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "Definición clara de `IUnitOfWorkPort` con `executeInTransaction`.", "justificacion": "Proporciona un contrato robusto para la gestión de transacciones a nivel de Caso de Uso. El tipo genérico `TContext` permite flexibilidad para diferentes implementaciones de persistencia.", "impacto": "Establece el patrón para operaciones atómicas complejas." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La implementación concreta de este puerto (ej. `PrismaUnitOfWorkAdapter`) residirá en `libs/infrastructure/persistence/prisma/` y utilizará `prisma.$transaction((tx) => work(tx))`." },
  { "nota": "Los Casos de Uso que necesiten UoW inyectarán `IUnitOfWorkPort` y pasarán sus operaciones de repositorio al callback `work`." }
]
*/
// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/unit-of-work.port.ts
