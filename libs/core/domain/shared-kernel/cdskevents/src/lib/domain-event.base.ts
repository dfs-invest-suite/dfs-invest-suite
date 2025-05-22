// libs/core/domain/shared-kernel/cdskevents/src/lib/domain-event.base.ts
import {
  AggregateId as AggregateIdType, // Mantener alias
  DomainEventInstanceId,
  ObjectLiteral, // Asegurar importación
} from '@dfs-suite/shtypes';
import { createOperationMetadata, UuidUtils } from '@dfs-suite/shutils';

import { IDomainEvent, IDomainEventMetadata } from './domain-event.interface';

export interface DomainEventProps<TPayload extends ObjectLiteral> {
  readonly aggregateId: AggregateIdType; // ID del agregado relacionado (string)
  readonly payload: TPayload;
  readonly metadata?: Partial<IDomainEventMetadata>;
}

export abstract class DomainEventBase<
  TPayload extends ObjectLiteral = ObjectLiteral // CAMBIO: Default a ObjectLiteral
> implements IDomainEvent<TPayload>
{
  readonly id: DomainEventInstanceId;
  readonly eventName: string;
  readonly aggregateId: AggregateIdType;
  readonly payload: Readonly<TPayload>;
  readonly metadata: Readonly<IDomainEventMetadata>;

  protected constructor(props: DomainEventProps<TPayload>) {
    this.id = UuidUtils.generateDomainEventInstanceId(); // Este método debe existir en UuidUtils
    this.eventName = this.constructor.name;
    this.aggregateId = props.aggregateId;

    const payloadToFreeze =
      typeof props.payload === 'object' && props.payload !== null
        ? { ...props.payload }
        : ({} as TPayload); // Asegurar que siempre sea un objeto, incluso si TPayload permite `never`
    this.payload = Object.freeze(payloadToFreeze);

    this.metadata = Object.freeze(
      createOperationMetadata(props.metadata) as IDomainEventMetadata
    );
  }
}
// FIN DEL ARCHIVO: libs/core/domain/shared-kernel/cdskevents/src/lib/domain-event.base.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Cambiado el tipo genérico por defecto de `TPayload` en `DomainEventBase` a `ObjectLiteral`.", "justificacion": "Alineación con `IDomainEvent` para resolver errores TS2345. Asegura que la clase base y la interfaz sean consistentes.", "impacto": "Correcta implementación de la interfaz `IDomainEvent`." },
  { "mejora": "Asegurada la importación de `ObjectLiteral` y `AggregateIdType` desde `@dfs-suite/shtypes`.", "justificacion": "Correctitud de tipos.", "impacto": "Resolución de dependencias." },
  { "mejora": "El constructor ahora usa `UuidUtils.generateDomainEventInstanceId()`.", "justificacion": "Asegura que este método exista en `UuidUtils` o que se use el generador correcto.", "impacto": "Correcta generación de IDs de evento."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA:
[
  {"nota": "Confirmar que `UuidUtils` en `@dfs-suite/shutils` exporta `generateDomainEventInstanceId()`. Si no, se debe añadir o usar `generateAggregateId() as DomainEventInstanceId`."}
]
*/
