// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/unit-of-work.port.ts
// TODO: [LIA Legacy - Implementar IUnitOfWorkPort]
// Propósito: Definir una interfaz para el patrón Unit of Work, para gestionar
// transacciones que abarcan múltiples operaciones de repositorio dentro de un caso de uso.
// Se usaría principalmente en la capa de aplicación.
// import { Result } from '@dfs-suite/shresult';
// import { ExceptionBase } from '@dfs-suite/sherrors';

// export const UNIT_OF_WORK_PORT = Symbol('IUnitOfWorkPort');
// export interface IUnitOfWorkPort {
//   executeInTransaction<T>(
//     work: (transactionContext: unknown) => Promise<Result<T, ExceptionBase | Error>>
//   ): Promise<Result<T, ExceptionBase | Error>>;
//   // El 'transactionContext' podría ser el cliente Prisma transaccional, por ejemplo.
//   // O métodos como:
//   // startTransaction(): Promise<void>;
//   // commitTransaction(): Promise<void>;
//   // rollbackTransaction(): Promise<void>;
//   // getTransactionContext<ContextType>(): ContextType;
// }
