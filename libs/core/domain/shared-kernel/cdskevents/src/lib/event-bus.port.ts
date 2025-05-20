// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/event-bus.port.ts
// TODO: [LIA Legacy - Definir IEventBusPort] - ¡REALIZADO!
// Propósito: Un puerto genérico para un bus de eventos, capaz de manejar
//            tanto DomainEvents (para comunicación intra-BC, intra-agregado si es necesario)
//            como IntegrationEvents (para comunicación inter-BC o con sistemas externos).
//            IDomainEventEmitter podría ser una implementación específica de este puerto o usarse en conjunto.
// Relacionado con Casos de Uso: Publicación de Eventos de Dominio y de Integración.

import { ExceptionBase } from '@dfs-suite/sherrors'; // REFACTORIZADO
import { Result } from '@dfs-suite/shresult'; // REFACTORIZADO

import { IDomainEvent } from './domain-event.interface'; // OK
import { IIntegrationEvent } from './integration-event.interface'; // OK

export const EVENT_BUS_PORT = Symbol('IEventBusPort');

export interface IEventBusPort {
  /**
   * Publica un único evento (de dominio o de integración) en el bus.
   * @param event El evento a publicar.
   * @returns Un Result que indica éxito o fracaso de la publicación.
   */
  publish(
    event: IDomainEvent | IIntegrationEvent
  ): Promise<Result<void, ExceptionBase | Error>>;

  /**
   * Publica múltiples eventos en el bus.
   * La implementación debería decidir si los publica atómicamente (todo o nada) o individualmente.
   * @param events Array de eventos a publicar.
   * @returns Un Result que indica éxito o fracaso general de la publicación.
   */
  publishAll(
    events: (IDomainEvent | IIntegrationEvent)[]
  ): Promise<Result<void, ExceptionBase | Error>>;

  // El EventBus usualmente no maneja la suscripción directamente en el puerto.
  // Los Handlers (IDomainEventHandler) se registran con el emisor/bus
  // a través de un mecanismo de la capa de infraestructura (ej. módulo NestJS con @nestjs/event-emitter o @nestjs/cqrs).
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports a alias codificados.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "Definición clara de `IEventBusPort` para publicar tanto `IDomainEvent` como `IIntegrationEvent`.", "justificacion": "Provee una interfaz unificada para la publicación de diferentes tipos de eventos, crucial para la arquitectura orientada a eventos.", "impacto": "Contrato establecido para la infraestructura del bus de eventos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La implementación de este puerto (ej. en `infraqueue` usando BullMQ para un bus distribuido, o en `api-main` usando `@nestjs/event-emitter` para un bus local en memoria) será clave." },
  { "nota": "Considerar si `publishAll` necesita devolver resultados individuales por evento en caso de fallos parciales, o si un fallo en un evento debería detener toda la publicación." }
]
*/
// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/event-bus.port.ts
