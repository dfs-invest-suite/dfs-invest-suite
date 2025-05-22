// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/domain-event-emitter.interface.ts
// Autor: L.I.A Legacy (IA Asistente)
import { IDomainEvent } from './domain-event.interface';

/**
 * Símbolo de inyección para el `IDomainEventEmitterPort`.
 * Utilizado por los contenedores de Inyección de Dependencias (DI) para resolver
 * la implementación concreta de este puerto.
 */
export const DOMAIN_EVENT_EMITTER_PORT = Symbol('IDomainEventEmitterPort');

/**
 * Puerto (Interfaz) para un emisor de Eventos de Dominio.
 * Las Raíces de Agregado (`AggregateRoot`) usan este puerto (indirectamente,
 * la capa de persistencia o un UoW lo usaría después de guardar el agregado)
 * para publicar los eventos de dominio que han acumulado.
 *
 * La implementación concreta de este puerto (ej. en `api-main` usando `@nestjs/event-emitter`
 * o en `infraqueue` usando BullMQ para un bus distribuido) se encargará de despachar
 * los eventos a los `IDomainEventHandler`s suscritos.
 */
export interface IDomainEventEmitterPort {
  /**
   * Publica un único evento de dominio.
   * @template TEvent - El tipo del evento de dominio.
   * @param event El evento de dominio a publicar.
   * @returns Puede ser `void` para publicación síncrona en memoria,
   *          o `Promise<void>` si la publicación es asíncrona (ej. a una cola).
   */
  publish<TEvent extends IDomainEvent>(event: TEvent): Promise<void> | void;

  /**
   * Publica múltiples eventos de dominio.
   * Usualmente se llama con los eventos acumulados por un `AggregateRoot`
   * después de que el agregado ha sido persistido exitosamente.
   *
   * La implementación decidirá cómo maneja errores en los handlers (ej. si un handler falla,
   * ¿los demás siguen procesando? ¿Se reintenta?).
   * @template TEvent - El tipo de los eventos de dominio.
   * @param events Array de eventos de dominio a publicar.
   */
  publishAll<TEvent extends IDomainEvent>(
    events: TEvent[]
  ): Promise<void> | void;
}
// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/domain-event-emitter.interface.ts
/* SECCIÓN DE MEJORAS REALIZADAS (Confirmada previamente)
[
  { "mejora": "Tipado genérico para `publish` y `publishAll`.", "justificacion": "Mejora la seguridad de tipos al trabajar con eventos específicos.", "impacto": "Claridad." },
  { "mejora": "JSDoc detallado explicando el rol y uso del puerto.", "justificacion": "Facilita la comprensión para la implementación y consumo.", "impacto": "Mantenibilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
