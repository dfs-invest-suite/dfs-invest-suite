// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/logger.port.ts
// TODO: [LIA Legacy - Implementar ILoggerPort] - ¡REVISADO Y REFACTORIZADO!
// Propósito: Define la interfaz para el servicio de logging, abstrayendo la implementación concreta (Pino, Winston, etc.).
// Relacionado con Casos de Uso: Utilizado en todas las capas para logging estructurado y contextualizado.

import { CorrelationId, ObjectLiteral, Maybe } from '@dfs-suite/shtypes'; // REFACTORIZADO

export const LOGGER_PORT = Symbol('ILoggerPort');

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

  error(
    message: string | Error, // Puede ser un string o un objeto Error
    stack?: Maybe<string>, // El stack trace, especialmente si message es string
    context?: Maybe<string>,
    correlationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral> // Para metadata adicional del error
  ): void;

  verbose?( // Opcional, no todos los loggers lo implementan con este nombre
    message: string,
    context?: Maybe<string>,
    correlationId?: Maybe<CorrelationId>,
    metadata?: Maybe<ObjectLiteral>
  ): void;
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports a alias codificados.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "Uso de `Maybe` para parámetros opcionales.", "justificacion": "Clarifica que estos parámetros pueden ser `null` o `undefined`.", "impacto": "Mejor precisión de tipos." },
  { "mejora": "Parámetro `message` en `error` ahora puede ser `string | Error`.", "justificacion": "Permite pasar directamente objetos `Error` para un logging más rico de la causa.", "impacto": "Flexibilidad en el reporte de errores." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La implementación de este puerto (ej. `PinoLoggerAdapter`) se encargará de formatear estos datos en un log JSON estructurado." }
]
*/
// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/logger.port.ts
