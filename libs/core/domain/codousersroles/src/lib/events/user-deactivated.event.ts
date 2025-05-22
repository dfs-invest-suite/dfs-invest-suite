// RUTA: libs/core/domain/codousersroles/src/lib/events/user-deactivated.event.ts
// Autor: L.I.A Legacy (IA Asistente)
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { UserId, TenantId } from '@dfs-suite/shtypes';

export interface UserDeactivatedEventPayload {
  readonly userId: UserId;
  readonly tenantId: TenantId;
}

export class UserDeactivatedEvent extends DomainEventBase<UserDeactivatedEventPayload> {
  constructor(props: DomainEventProps<UserDeactivatedEventPayload>) {
    super({ ...props, aggregateId: props.payload.userId });
  }
}
// RUTA: libs/core/domain/codousersroles/src/lib/events/user-deactivated.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "**NUEVO ARTEFACTO**: Creado `UserDeactivatedEvent`.", "justificacion": "Evento de dominio para cuando un usuario es desactivado.", "impacto": "Permite reacciones a cambios de estado de actividad del usuario." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
