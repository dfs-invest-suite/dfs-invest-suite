// libs/core/domain/shared-kernel/cdskevents/src/lib/domain-event.interface.ts
import {
  CommandInstanceId,
  CorrelationId,
  DomainEventInstanceId,
  IsoDateString,
  Maybe,
  ObjectLiteral, // Asegurar que esté importado
  UserId,
  CausationId,
  AggregateId as AggregateIdType, // Mantener el alias para claridad semántica si se prefiere
} from '@dfs-suite/shtypes';

/**
 * Define la estructura de los metadatos asociados a un evento de dominio.
 */
export interface IDomainEventMetadata {
  readonly timestamp: IsoDateString;
  readonly correlationId: CorrelationId;
  readonly causationId?: Maybe<
    CausationId | CommandInstanceId | DomainEventInstanceId | CorrelationId
  >;
  readonly userId?: Maybe<UserId>; // Usuario que indirectamente causó el evento
}

/**
 * Interfaz base para todos los Eventos de Dominio en el sistema.
 * Un Evento de Dominio representa algo significativo que ha ocurrido en el pasado dentro del dominio.
 *
 * @template TPayload - El tipo del objeto de datos (payload) específico del evento.
 *                      Debe ser un objeto literal.
 */
export interface IDomainEvent<
  TPayload extends ObjectLiteral = ObjectLiteral // CAMBIO: Default a ObjectLiteral
> {
  readonly id: DomainEventInstanceId;
  readonly eventName: string;
  readonly aggregateId: AggregateIdType; // Es string (o el BrandedType que es string)
  readonly payload: Readonly<TPayload>;
  readonly metadata: Readonly<IDomainEventMetadata>;
}
// FIN DEL ARCHIVO: libs/core/domain/shared-kernel/cdskevents/src/lib/domain-event.interface.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Cambiado el tipo genérico por defecto de `TPayload` en `IDomainEvent` de `Record<string, never>` a `ObjectLiteral`.", "justificacion": "Resuelve el error TS2345 donde payloads de evento específicos (ej. `LeadCreatedPayload`) no eran asignables a `Record<string, never>`. `ObjectLiteral` (definido en `shtypes` como `T extends object ? T : { [key: string]: T }`) es un tipo más flexible que acepta cualquier objeto.", "impacto": "Los eventos de dominio ahora pueden tener payloads con propiedades definidas sin causar errores de tipo con la interfaz base." },
  { "mejora": "Asegurada la importación de `ObjectLiteral` y `AggregateIdType` (como alias) desde `@dfs-suite/shtypes`.", "justificacion": "Correctitud de tipos.", "impacto": "Resolución de dependencias."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
