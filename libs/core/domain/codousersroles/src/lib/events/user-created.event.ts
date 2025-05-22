// RUTA: libs/core/domain/codousersroles/src/lib/events/user-created.event.ts
// Autor: L.I.A Legacy (IA Asistente)
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { UserId, EmailString as Email } from '@dfs-suite/shtypes'; // Usar EmailString

import { EUserRole } from '../value-objects/user-role.vo'; // Importar el Enum

export interface UserCreatedEventPayload {
  readonly userId: UserId;
  readonly email: Email;
  readonly name: string;
  readonly role: EUserRole; // Usar el Enum
  readonly tenantId: string; // Añadido para saber a qué tenant pertenece el usuario
}

export class UserCreatedEvent extends DomainEventBase<UserCreatedEventPayload> {
  constructor(props: DomainEventProps<UserCreatedEventPayload>) {
    // aggregateId aquí sería el userId
    super({ ...props, aggregateId: props.payload.userId });
  }
}
// RUTA: libs/core/domain/codousersroles/src/lib/events/user-created.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports refactorizados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "Payload de `UserCreatedEvent` ahora incluye `tenantId` y usa `EUserRole`.", "justificacion": "`tenantId` es crucial para los listeners que operan en un contexto multi-tenant. Usar el enum `EUserRole` mejora la seguridad de tipos.", "impacto": "Evento más informativo y robusto." },
  { "mejora": "El constructor ahora pasa `props.payload.userId` como `aggregateId` a `DomainEventBase`.", "justificacion": "El ID del agregado para este evento es el ID del usuario creado.", "impacto": "Consistencia con `DomainEventBase`." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
