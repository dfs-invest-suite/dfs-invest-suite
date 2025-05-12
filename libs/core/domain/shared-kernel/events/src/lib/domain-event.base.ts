// libs/core/domain/shared-kernel/events/src/lib/domain-event.base.ts
import { UuidUtils } from '@dfs-suite/shared-utils';
import { IDomainEvent, IDomainEventMetadata } from './domain-event.interface';
import { AggregateId, CorrelationId, IsoDateString, Maybe, UserId } from '@dfs-suite/shared-types';
import { Guard } from '@dfs-suite/shared-utils';
import { ArgumentNotProvidedException } from '@dfs-suite/shared-errors';

export type DomainEventProps<Payload extends Record<string, unknown>> = { // Volvemos a Record<string, unknown>
  aggregateId: AggregateId;
  payload: Payload;
  metadata?: Partial<Omit<IDomainEventMetadata, 'timestamp' | 'correlationId'>> & { correlationId?: CorrelationId };
};

export abstract class DomainEventBase<Payload extends Record<string, unknown> = Record<string, never>> implements IDomainEvent<Payload> { // Volvemos a Record<string, unknown>, default Record<string, never>
  public readonly id: AggregateId;
  public readonly aggregateId: AggregateId;
  public readonly eventName: string;
  public readonly metadata: Readonly<IDomainEventMetadata>;
  public readonly payload: Readonly<Payload>;

  protected constructor(props: DomainEventProps<Payload>) {
    if (Guard.isNil(props) || Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException('DomainEvent props should not be empty or null/undefined.');
    }
    if (Guard.isNil(props.payload)) {
        throw new ArgumentNotProvidedException('DomainEvent payload cannot be null or undefined.');
    }
    if (Guard.isNil(props.aggregateId) || Guard.isEmpty(props.aggregateId) ) {
        throw new ArgumentNotProvidedException('DomainEvent aggregateId cannot be empty or null/undefined.');
    }

    this.id = UuidUtils.generateAggregateId();
    this.eventName = this.constructor.name;
    this.aggregateId = props.aggregateId;
    this.payload = Object.freeze(props.payload);

    const now = new Date().toISOString() as IsoDateString;
    const contextCorrelationIdPlaceholder = 'PLACEHOLDER_CORRELATION_ID_FROM_CONTEXT';
    const defaultCorrelationId = UuidUtils.generateCorrelationId();

    this.metadata = Object.freeze({
      timestamp: now,
      correlationId: props.metadata?.correlationId || (contextCorrelationIdPlaceholder as CorrelationId) || defaultCorrelationId,
      causationId: props.metadata?.causationId,
      userId: props.metadata?.userId,
    });
  }
}

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Integración con RequestContextService para CorrelationID):
    Actualmente, `correlationId` usa un placeholder o genera uno nuevo si no se pasa en `props.metadata`.
    Lo ideal sería que `DomainEventBase` pudiera acceder a un `RequestContextService` (similar al del ejemplo `domain-driven-hexagon-master`)
    para obtener el `correlationId` de la solicitud actual de forma automática si no se especifica.
    Justificación: Asegura una trazabilidad y correlación consistentes a través de todo el sistema sin necesidad de pasarlo manualmente a cada evento.
    Impacto: Requeriría que `DomainEventBase` tenga acceso (posiblemente estático o a través de un helper) al `RequestContextService`. Esto podría introducir una dependencia indirecta a un concepto de la capa de aplicación/infraestructura en el shared-kernel, lo cual debe manejarse con cuidado (ej. el servicio de contexto se registra globalmente). Alternativamente, el `correlationId` se sigue pasando explícitamente desde el caso de uso que crea el comando/evento.
]
[
  Mejora Propuesta 2 (Tipado más Estricto para `Payload` por Defecto):
    El default `Payload extends object = Record<string, never>` es bueno porque fuerza a las clases de evento concretas a definir su payload si realmente tienen uno. Si un evento no tiene payload, `Record<string, never>` (un objeto vacío) es un buen tipo.
    Justificación: Mejora la intención y la seguridad de tipos.
    Impacto: Ninguno si se mantiene; es una buena práctica.
]
[
  Mejora Propuesta 3 (Validación del Payload):
    Actualmente, solo se valida que `props.payload` no sea `null` o `undefined`. Se podría añadir una validación más profunda para asegurar que `payload` sea realmente un objeto y no, por ejemplo, un array u otro tipo si la restricción `extends object` no es suficiente para el linter en todos los casos de uso.
    Justificación: Mayor robustez en la creación de eventos.
    Impacto: Añadir lógica de validación en el constructor.
]

*/
