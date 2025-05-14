// libs/shared/utils/src/lib/uuid.utils.ts
import { v4 as uuidv4 } from 'uuid';
import {
  AggregateId,
  CorrelationId,
  TenantId,
  UserId,
  CommandInstanceId,
  QueryInstanceId,
  DomainEventInstanceId,
} from '@dfs-suite/shared-types';

/**
 * @class UuidUtils
 * @description Proporciona métodos estáticos para generar diferentes tipos de UUIDs v4
 * "brandeados" para mejorar la seguridad de tipos en el sistema.
 */
export class UuidUtils {
  /**
   * @static
   * @private
   * @method generate
   * @returns {string} Un UUID v4 estándar como string.
   * @description Método base privado para generar un UUID v4.
   */
  private static generate(): string {
    return uuidv4();
  }

  /**
   * @static
   * @method generateTenantId
   * @returns {TenantId} Un nuevo `TenantId`.
   */
  static generateTenantId(): TenantId {
    return this.generate() as TenantId;
  }

  /**
   * @static
   * @method generateUserId
   * @returns {UserId} Un nuevo `UserId`.
   */
  static generateUserId(): UserId {
    return this.generate() as UserId;
  }

  /**
   * @static
   * @method generateAggregateId
   * @returns {AggregateId} Un nuevo `AggregateId` genérico.
   */
  static generateAggregateId(): AggregateId {
    return this.generate() as AggregateId;
  }

  /**
   * @static
   * @method generateCorrelationId
   * @returns {CorrelationId} Un nuevo `CorrelationId`.
   */
  static generateCorrelationId(): CorrelationId {
    return this.generate() as CorrelationId;
  }

  /**
   * @static
   * @method generateCommandInstanceId
   * @returns {CommandInstanceId} Un nuevo `CommandInstanceId`.
   */
  static generateCommandInstanceId(): CommandInstanceId {
    return this.generate() as CommandInstanceId;
  }

  /**
   * @static
   * @method generateQueryInstanceId
   * @returns {QueryInstanceId} Un nuevo `QueryInstanceId`.
   */
  static generateQueryInstanceId(): QueryInstanceId {
    return this.generate() as QueryInstanceId;
  }

  /**
   * @static
   * @method generateDomainEventInstanceId
   * @returns {DomainEventInstanceId} Un nuevo `DomainEventInstanceId`.
   */
  static generateDomainEventInstanceId(): DomainEventInstanceId {
    return this.generate() as DomainEventInstanceId;
  }
}
// libs/shared/utils/src/lib/uuid.utils.ts
/* SECCIÓN DE MEJORAS (Consolidado y actualizado)
[
  Mejora Implementada: Método `generate()` hecho privado.
]
[
  Mejora Implementada: Métodos añadidos para generar los nuevos IDs brandeados.
]
[
  Mejora Crítica Pendiente: Añadir tests unitarios exhaustivos en `uuid.utils.spec.ts`.
]
[
  Mejora Opcional Considerada en Tests: La validación del formato UUID v4 se incluirá en los tests.
]
[
  Mejora Opcional (Inyección de `uuidv4` / `IIdGenerator`): Se mantiene como opcional avanzada,
    el mockeo estático es suficiente para los tests de los consumidores de `UuidUtils`.
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Mantenidas) */
