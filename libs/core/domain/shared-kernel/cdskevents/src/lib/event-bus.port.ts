// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/event-bus.port.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';

import { IDomainEvent } from './domain-event.interface';
import { IIntegrationEvent } from './integration-event.interface';

/**
 * Símbolo de inyección para el `IEventBusPort`.
 * Utilizado por los contenedores de Inyección de Dependencias (DI) para resolver
 * la implementación concreta de este puerto.
 */
export const EVENT_BUS_PORT = Symbol('IEventBusPort');

/**
 * Puerto (Interfaz) para un Bus de Eventos genérico.
 * Este bus es responsable de publicar tanto Eventos de Dominio (para comunicación
 * dentro de un mismo Bounded Context o entre agregados) como Eventos de Integración
 * (para comunicación entre diferentes Bounded Contexts o con sistemas externos).
 *
 * Las implementaciones pueden variar desde un simple emisor en memoria (como
 * `@nestjs/event-emitter`) hasta sistemas de colas de mensajes robustos (como BullMQ/Redis
 * o Kafka) para una arquitectura distribuida y resiliente.
 */
export interface IEventBusPort {
  /**
   * Publica un único evento (de dominio o de integración) en el bus.
   * La implementación del puerto se encargará de despachar el evento
   * a los `IDomainEventHandler`s o a los consumidores de eventos de integración suscritos.
   * @param event El evento a publicar.
   * @returns Un `Result` que indica el éxito (`Ok<void>`) o fracaso (`Err<ExceptionBase | Error>`)
   *          de la operación de publicación en el bus.
   */
  publish(
    event: IDomainEvent | IIntegrationEvent
  ): Promise<Result<void, ExceptionBase | Error>>;

  /**
   * Publica múltiples eventos (de dominio o de integración) en el bus.
   * La implementación debería decidir cómo manejar la atomicidad y los errores:
   * - ¿Publicación atómica (todo o nada)?
   * - ¿Qué sucede si la publicación de un evento falla? ¿Se detiene o continúan los demás?
   * - ¿Devuelve un resultado agregado o resultados individuales?
   * Por simplicidad, esta interfaz asume un resultado agregado.
   *
   * @param events Array de eventos a publicar.
   * @returns Un `Result` que indica el éxito o fracaso general de la publicación de todos los eventos.
   */
  publishAll(
    events: (IDomainEvent | IIntegrationEvent)[]
  ): Promise<Result<void, ExceptionBase | Error>>;
}
// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/event-bus.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS (Confirmada previamente)
[
  { "mejora": "Refactorización de imports a alias codificados.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "Definición clara de `IEventBusPort` para publicar tanto `IDomainEvent` como `IIntegrationEvent`.", "justificacion": "Provee una interfaz unificada para la publicación de diferentes tipos de eventos, crucial para la arquitectura orientada a eventos.", "impacto": "Contrato establecido para la infraestructura del bus de eventos." },
  { "mejora": "JSDoc detallado explicando el rol y uso del puerto, y las consideraciones para la implementación.", "justificacion": "Facilita la comprensión y la correcta implementación por la capa de infraestructura.", "impacto": "Mantenibilidad y robustez."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
