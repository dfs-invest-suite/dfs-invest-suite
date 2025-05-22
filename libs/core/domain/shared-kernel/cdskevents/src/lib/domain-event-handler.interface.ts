// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/domain-event-handler.interface.ts
// Autor: L.I.A Legacy (IA Asistente)
import { IDomainEvent } from './domain-event.interface';

/**
 * Interfaz para los manejadores (handlers) de Eventos de Dominio.
 * Cada handler se especializa en un tipo de evento de dominio específico.
 *
 * @template TEvent - El tipo del evento de dominio que este handler puede procesar.
 *                    Por defecto es `IDomainEvent` genérico, pero las implementaciones concretas
 *                    deberían usar un tipo de evento específico (ej. `TenantCreatedEvent`).
 */
export interface IDomainEventHandler<
  TEvent extends IDomainEvent = IDomainEvent
> {
  /**
   * Maneja el evento de dominio especificado.
   * Contiene la lógica de negocio o aplicación que debe ejecutarse
   * en respuesta a la ocurrencia del evento.
   * @param event El evento de dominio a manejar.
   * @returns Puede ser void o Promise<void> si el manejo es asíncrono.
   */
  handle(event: TEvent): Promise<void> | void;

  /**
   * Devuelve el nombre del evento de dominio que este handler está interesado en escuchar.
   * Este nombre DEBE coincidir con la propiedad `eventName` del evento de dominio
   * (que es, por convención, el nombre de la clase del evento concreto).
   *
   * Este método es utilizado por el `IDomainEventEmitterPort` o el `IEventBusPort`
   * para registrar y despachar eventos a los handlers correctos.
   *
   * @returns El nombre del evento a escuchar (ej. "TenantCreatedEvent").
   */
  listenTo(): string;
}
// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/domain-event-handler.interface.ts
/* SECCIÓN DE MEJORAS REALIZADAS (Confirmada previamente)
[
  { "mejora": "Añadido método `listenTo()` con JSDoc claro.", "justificacion": "Permite que un bus de eventos o un sistema de registro de handlers identifique qué eventos debe procesar este handler específico, basado en el `eventName` del evento. Esto es crucial para un sistema de eventos desacoplado y basado en suscripciones.", "impacto": "Facilita el desacoplamiento y el registro automático de handlers." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
