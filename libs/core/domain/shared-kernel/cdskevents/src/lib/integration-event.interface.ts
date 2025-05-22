// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/integration-event.interface.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ObjectLiteral, Maybe } from '@dfs-suite/shtypes';

import { IDomainEvent, IDomainEventMetadata } from './domain-event.interface';

export interface IIntegrationEventMetadata extends IDomainEventMetadata {
  readonly eventVersion: string;
  readonly sourceContext: string;
  readonly topic?: Maybe<string>;
}

export interface IIntegrationEvent<
  TPayload extends ObjectLiteral = Record<string, never>
> extends IDomainEvent<TPayload> {
  readonly metadata: Readonly<IIntegrationEventMetadata>;
}
// FIN DEL ARCHIVO: libs/core/domain/shared-kernel/cdskevents/src/lib/integration-event.interface.ts
