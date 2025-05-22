// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/command.interface.ts
// Autor: L.I.A Legacy (IA Asistente)
import {
  CorrelationId,
  Maybe,
  UserId,
  CommandInstanceId,
  IsoDateString,
  DomainEventInstanceId,
  CausationId, // Usaremos el Branded Type
  ObjectLiteral,
} from '@dfs-suite/shtypes';

/**
 * Define la estructura de los metadatos asociados a un comando.
 * Estos metadatos son cruciales para la trazabilidad, auditoría y contexto de la operación.
 */
export interface ICommandMetadata {
  /** ID único para correlacionar esta operación a través de diferentes servicios o contextos. */
  readonly correlationId: CorrelationId;
  /** ID de la operación (otro Comando, Evento de Dominio o CorrelationId) que causó la ejecución de este comando. */
  readonly causationId?: Maybe<
    CausationId | CommandInstanceId | DomainEventInstanceId | CorrelationId
  >;
  /** ID del usuario que inició el comando, si aplica. */
  readonly userId?: Maybe<UserId>;
  /** Timestamp de cuándo se creó la instancia del comando, en formato ISO 8601 UTC. */
  readonly timestamp: IsoDateString;
}

/**
 * Interfaz base para todos los Comandos en el sistema.
 * Un Comando representa una intención de cambiar el estado del sistema.
 * No devuelve datos, solo indica éxito o fracaso (manejado por el `Result` del `ICommandHandler`).
 *
 * @template TPayload - El tipo del objeto de datos (payload) específico del comando.
 *                      Por defecto es un objeto vacío si el comando no lleva datos adicionales.
 */
export interface ICommand<
  TPayload extends ObjectLiteral = Record<string, never>
> {
  /** ID único de esta instancia particular del comando. */
  readonly commandId: CommandInstanceId;
  /** Nombre de la clase del comando concreto, usado para identificación y por buses de comandos. */
  readonly commandName: string;
  /** Metadatos asociados al comando. */
  readonly metadata: Readonly<ICommandMetadata>;
  /** Los datos específicos necesarios para ejecutar el comando. */
  readonly payload: Readonly<TPayload>; // Asegurar que el payload también sea readonly
}
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/command.interface.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports actualizados a `@dfs-suite/shtypes`.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "Payload en `ICommand` ahora es `Readonly<TPayload>`.", "justificacion": "Los comandos y sus payloads deben ser inmutables una vez creados.", "impacto": "Mayor robustez." },
  { "mejora": "JSDoc detallado para todas las interfaces y propiedades.", "justificacion": "Claridad y mantenibilidad.", "impacto": "DX." },
  { "mejora": "Añadido `ObjectLiteral` a imports y `TPayload` extiende `ObjectLiteral`.", "justificacion": "Asegura que el payload sea un objeto.", "impacto": "Seguridad de tipos."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
