// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/repository.port.ts
// TODO: [LIA Legacy - Implementar IRepositoryPort] - ¡REVISADO Y REFACTORIZADO!
// Propósito: Define la interfaz base para los repositorios del dominio,
//            abstrae las operaciones de persistencia para los Agregados.
// Relacionado con Casos de Uso: Todos los Casos de Uso que interactúan con la persistencia.

import { AggregateRoot } from '@dfs-suite/cdskentities'; // REFACTORIZADO
import { ExceptionBase } from '@dfs-suite/sherrors'; // REFACTORIZADO
import { Result } from '@dfs-suite/shresult'; // REFACTORIZADO
import {
  AggregateId,
  IPaginated,
  IPaginatedQueryParams,
  Maybe,
} from '@dfs-suite/shtypes'; // REFACTORIZADO

export const REPOSITORY_PORT = Symbol('IRepositoryPort'); // Símbolo genérico, cada repo específico tendrá el suyo

export interface IRepositoryPort<
  // TProps para el tipo de props del Agregado
  // TIDType para el tipo específico del ID del Agregado (ej. TenantId, LeadId)
  // Esto permite que los métodos como findOneById tomen el tipo de ID específico.
  TProps,
  TIDType extends AggregateId = AggregateId, // Por defecto AggregateId genérico
  TAggregate extends AggregateRoot<TProps, TIDType> = AggregateRoot<
    TProps,
    TIDType
  > // El tipo de Agregado que maneja
> {
  /**
   * Encuentra un agregado por su ID.
   * @param id - El ID del agregado (del tipo específico TIDType).
   * @returns Un Result con el agregado encontrado (Maybe<TAggregate>) o un error.
   */
  findOneById(
    id: TIDType
  ): Promise<Result<Maybe<TAggregate>, ExceptionBase | Error>>;

  /**
   * (Opcional) Encuentra todos los agregados.
   * @returns Un Result con un array de agregados o un error.
   */
  findAll?(): Promise<Result<TAggregate[], ExceptionBase | Error>>;

  /**
   * (Opcional) Encuentra todos los agregados con paginación.
   * @param params - Parámetros de paginación.
   * @returns Un Result con los datos paginados de agregados o un error.
   */
  findAllPaginated?(
    params: IPaginatedQueryParams
  ): Promise<Result<IPaginated<TAggregate>, ExceptionBase | Error>>;

  /**
   * Inserta un nuevo agregado.
   * @param entity - El agregado a insertar.
   * @returns Un Result vacío en caso de éxito, o un error.
   */
  insert(entity: TAggregate): Promise<Result<void, ExceptionBase | Error>>;

  /**
   * Actualiza un agregado existente.
   * @param entity - El agregado a actualizar.
   * @returns Un Result vacío en caso de éxito, o un error.
   */
  update(entity: TAggregate): Promise<Result<void, ExceptionBase | Error>>; // Hecho no opcional

  /**
   * Elimina un agregado por su ID o la entidad misma.
   * @param entityOrId - El ID del agregado o la instancia del agregado a eliminar.
   * @returns Un Result con un booleano indicando si la eliminación fue exitosa (true) o no encontrada/fallida (false), o un error.
   */
  delete(
    entityOrId: TAggregate | TIDType
  ): Promise<Result<boolean, ExceptionBase | Error>>;

  /**
   * (Opcional) Inicia y ejecuta una serie de operaciones dentro de una transacción.
   * El callback 'handler' recibe un contexto transaccional (ej. cliente Prisma transaccional)
   * que DEBE ser usado para todas las operaciones de repositorio dentro del handler.
   * @param work - Una función callback que contiene las operaciones a ejecutar transaccionalmente.
   * @template TResult - El tipo de resultado del trabajo transaccional.
   * @returns El resultado del trabajo transaccional.
   */
  transaction?<TResult>(
    work: (transactionContext: unknown) => Promise<TResult>
  ): Promise<TResult>; // El Result se maneja dentro del 'work'
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de todos los imports a alias codificados.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "Tipado genérico `IRepositoryPort<TProps, TIDType, TAggregate>`.", "justificacion": "Permite que los repositorios específicos definan el tipo de su Agregado y su ID Brandeado, mejorando la seguridad de tipos en métodos como `findOneById(id: TIDType)` y `delete(entityOrId: TAggregate | TIDType)`.", "impacto": "Interfaces de repositorio más precisas y type-safe." },
  { "mejora": "Método `update` ahora es mandatorio.", "justificacion": "La actualización es una operación CRUD fundamental.", "impacto": "Contrato de repositorio más completo." },
  { "mejora": "`delete` ahora devuelve `Result<boolean, ...>`.", "justificacion": "Proporciona feedback sobre si la entidad fue encontrada y eliminada.", "impacto": "API más informativa." },
  { "mejora": "Clarificación del método `transaction`.", "justificacion": "Se detalla que el callback `work` debe usar el contexto transaccional proporcionado. El manejo de `Result` se espera dentro de `work`.", "impacto": "Mejor guía para la implementación y uso." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "El tipo `transactionContext: unknown` en `transaction` es genérico. Las implementaciones concretas (ej. Prisma) castearán esto a su tipo de cliente transaccional específico." },
  { "nota": "Considerar añadir métodos como `exists(id: TIDType): Promise<Result<boolean, Error>>` si es una necesidad común." }
]
*/
// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/repository.port.ts
