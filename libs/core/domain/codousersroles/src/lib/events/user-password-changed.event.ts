// RUTA: libs/core/domain/codousersroles/src/lib/events/user-password-changed.event.ts
// Autor: L.I.A Legacy (IA Asistente)
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { UserId, TenantId } from '@dfs-suite/shtypes';

export interface UserPasswordChangedEventPayload {
  readonly userId: UserId;
  readonly tenantId: TenantId;
  // No incluir la contraseña en el payload del evento por seguridad.
}

export class UserPasswordChangedEvent extends DomainEventBase<UserPasswordChangedEventPayload> {
  constructor(props: DomainEventProps<UserPasswordChangedEventPayload>) {
    super({ ...props, aggregateId: props.payload.userId });
  }
}
// RUTA: libs/core/domain/codousersroles/src/lib/events/user-password-changed.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "**NUEVO ARTEFACTO**: Creado `UserPasswordChangedEvent`.", "justificacion": "Evento de dominio para notificar cambios de contraseña.", "impacto": "Habilita la reactividad a cambios de contraseña, útil para auditoría o invalidación de sesiones." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
