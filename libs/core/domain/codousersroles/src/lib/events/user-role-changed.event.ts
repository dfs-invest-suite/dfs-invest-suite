// RUTA: libs/core/domain/codousersroles/src/lib/events/user-role-changed.event.ts
// Autor: L.I.A Legacy (IA Asistente)
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { UserId, TenantId } from '@dfs-suite/shtypes';

import { EUserRole } from '../value-objects/user-role.vo';

export interface UserRoleChangedEventPayload {
  readonly userId: UserId;
  readonly tenantId: TenantId;
  readonly oldRole: EUserRole;
  readonly newRole: EUserRole;
  readonly changedByUserId?: UserId; // Quién realizó el cambio
}

export class UserRoleChangedEvent extends DomainEventBase<UserRoleChangedEventPayload> {
  constructor(props: DomainEventProps<UserRoleChangedEventPayload>) {
    super({ ...props, aggregateId: props.payload.userId });
  }
}
// RUTA: libs/core/domain/codousersroles/src/lib/events/user-role-changed.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "**NUEVO ARTEFACTO**: Creado `UserRoleChangedEvent`.", "justificacion": "Evento de dominio para notificar cambios en el rol de un usuario del tenant.", "impacto": "Habilita la reactividad a cambios de roles." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
