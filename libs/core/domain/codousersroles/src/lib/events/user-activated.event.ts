// RUTA: libs/core/domain/codousersroles/src/lib/events/user-activated.event.ts
// Autor: L.I.A Legacy (IA Asistente)
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { UserId, TenantId } from '@dfs-suite/shtypes';

export interface UserActivatedEventPayload {
  readonly userId: UserId;
  readonly tenantId: TenantId;
}

export class UserActivatedEvent extends DomainEventBase<UserActivatedEventPayload> {
  constructor(props: DomainEventProps<UserActivatedEventPayload>) {
    super({ ...props, aggregateId: props.payload.userId });
  }
}
// RUTA: libs/core/domain/codousersroles/src/lib/events/user-activated.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "**NUEVO ARTEFACTO**: Creado `UserActivatedEvent`.", "justificacion": "Evento de dominio para cuando un usuario es activado.", "impacto": "Permite reacciones a cambios de estado de actividad del usuario." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
