// RUTA: libs/core/domain/codousersroles/src/lib/events/user-created.event.ts
// TODO: [LIA Legacy - Implementar UserCreatedEvent]
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { UserId, Email } from '@dfs-suite/shtypes';
import { EUserRole } from '../value-objects/user-role.vo';

export interface UserCreatedEventPayload {
  readonly userId: UserId;
  readonly email: Email;
  readonly name: string;
  readonly role: EUserRole;
}
export class UserCreatedEvent extends DomainEventBase<UserCreatedEventPayload> {
  constructor(props: DomainEventProps<UserCreatedEventPayload>) {
    super(props);
  }
}
// (Crear esqueletos similares para los otros eventos, ajustando el Payload)
