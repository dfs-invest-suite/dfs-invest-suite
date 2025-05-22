// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/integration-event.base.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ObjectLiteral } from '@dfs-suite/shtypes';

import { DomainEventBase, DomainEventProps } from './domain-event.base';
import { IDomainEventMetadata } from './domain-event.interface';
import {
  IIntegrationEvent,
  IIntegrationEventMetadata,
} from './integration-event.interface';

export type IntegrationEventProps<TPayload extends ObjectLiteral> =
  DomainEventProps<TPayload> & {
    metadata?: Partial<
      Omit<IIntegrationEventMetadata, keyof IDomainEventMetadata> &
        Partial<IDomainEventMetadata>
    >;
  };

export abstract class IntegrationEventBase<
    TPayload extends ObjectLiteral = Record<string, never>
  >
  extends DomainEventBase<TPayload>
  implements IIntegrationEvent<TPayload>
{
  declare readonly metadata: Readonly<IIntegrationEventMetadata>;

  protected constructor(props: IntegrationEventProps<TPayload>) {
    super(props);

    const baseMetadata = this.metadata as IDomainEventMetadata;

    const integrationMetadataSpecifics = {
      eventVersion: props.metadata?.eventVersion || '1.0.0',
      sourceContext:
        props.metadata?.sourceContext ||
        this.constructor.name.replace(/Event$/, 'Context'),
      topic: props.metadata?.topic,
    };

    const finalMetadata: IIntegrationEventMetadata = Object.freeze({
      ...baseMetadata,
      ...integrationMetadataSpecifics,
    });

    (this as { -readonly [K in keyof this]: this[K] }).metadata = finalMetadata;
  }
}
// FIN DEL ARCHIVO: libs/core/domain/shared-kernel/cdskevents/src/lib/integration-event.base.ts
