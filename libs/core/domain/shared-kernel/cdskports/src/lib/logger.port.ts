// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/logger.port.ts
// Autor: L.I.A Legacy (IA Asistente)
import { CorrelationId, ObjectLiteral, Maybe } from '@dfs-suite/shtypes';

export const LOGGER_PORT = Symbol('ILoggerPort');

/**
 * Puerto (Interfaz) para el servicio de Logging.
 * Abstrae la implementación concreta del logger (Pino, Winston, etc.),
 * permitiendo que las capas de dominio y aplicación logueen de forma
 * estructurada y contextualizada sin acoplarse a una librería específica.
 */
export interface ILoggerPort {
  debug(
    message: string,
    context?: Maybe<string>,
    correlationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral>
  ): void;

  log(
    message: string,
    context?: Maybe<string>,
    correlationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral>
  ): void;

  warn(
    message: string,
    context?: Maybe<string>,
    correlationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral>
  ): void;

  /**
   * Loguea un error.
   * @param message - Puede ser un string descriptivo o el objeto Error mismo.
   * @param stack - El stack trace del error, especialmente si `message` es un string.
   * @param context - El contexto donde ocurrió el error (clase, método).
   * @param correlationId - El ID de correlación de la operación.
   * @param metadata - Metadata adicional relevante para el error.
   */
  error(
    message: string | Error,
    stack?: Maybe<string>,
    context?: Maybe<string>,
    correlationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral>
  ): void;

  verbose?(
    message: string,
    context?: Maybe<string>,
    correlationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral>
  ): void;
}
// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/logger.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports actualizados a alias codificados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "JSDoc añadido para clarificar el propósito y uso del puerto y sus métodos.", "justificacion": "Mejora la DX y mantenibilidad.", "impacto": "Claridad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
