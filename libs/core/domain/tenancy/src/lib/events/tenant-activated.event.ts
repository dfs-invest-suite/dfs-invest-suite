// libs/core/domain/tenancy/src/lib/events/tenant-activated.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/core-domain-shared-kernel-events';
import { AggregateId, CorrelationId } from '@dfs-suite/shared-types'; // Removidos UserId, Maybe si no se usan aquí
import { IDomainEventMetadata } from '@dfs-suite/core-domain-shared-kernel-events'; // <--- IMPORT AÑADIDO

export type TenantActivatedEventPayload = Record<string, never>;

export class TenantActivatedEvent extends DomainEventBase<TenantActivatedEventPayload> {
  constructor(props: {
    aggregateId: AggregateId;
    payload?: TenantActivatedEventPayload;
    metadata?: Partial<Omit<IDomainEventMetadata, 'timestamp' | 'correlationId'>> & { correlationId?: CorrelationId };
  }) {
    super({
      aggregateId: props.aggregateId,
      payload: props.payload || ({} as TenantActivatedEventPayload),
      metadata: props.metadata,
    });
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Consistencia del Constructor con DomainEventProps):
    Para mayor consistencia con `DomainEventBase` y `TenantCreatedEvent`, el constructor podría simplemente tomar `props: DomainEventProps<TenantActivatedEventPayload>`.
    La entidad `TenantEntity` ya se encarga de construir el payload como `{}`.
    Ejemplo:
    `constructor(props: DomainEventProps<TenantActivatedEventPayload>) { super(props); }`
  Justificación: Simplifica el constructor del evento concreto y delega la construcción del payload a la entidad.
  Impacto: Cambio menor en la firma del constructor aquí, y asegurar que `TenantEntity` pase `{ aggregateId: this.id, payload: {} }`. (Actualmente `TenantEntity` pasa `{ aggregateId: this.id, payload: {} as TenantActivatedEventPayload }` lo cual es compatible con `DomainEventProps`).
]
// (Otras mejoras propuestas anteriormente se mantienen)
*/
// libs/core/domain/tenancy/src/lib/events/tenant-activated.event.ts
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Payload Contextual Opcional): Si en el futuro la activación de un tenant involucrara información contextual relevante que deba ser comunicada (ej. quién lo activó si no está en la metadata, o alguna configuración específica aplicada durante la activación), se podría expandir `TenantActivatedEventPayload`.
  Justificación: Permitiría a los manejadores de eventos tener más contexto sobre la activación sin necesidad de consultar otras fuentes.
  Impacto: Modificación de `TenantActivatedEventPayload` y del constructor para aceptar estos nuevos datos. Los manejadores de eventos existentes podrían necesitar ajustes si dependen de un payload vacío.
]
[
  Mejora Propuesta 2 (Validación de Prerrequisitos en el Evento): Aunque la lógica de activación reside en `TenantEntity`, el evento mismo podría (opcionalmente y con cuidado de no duplicar lógica de dominio) llevar información sobre los prerrequisitos que se cumplieron para la activación, si esto es crucial para algún consumidor del evento. Por ejemplo, `activationPrerequisitesMet: { dbConfigured: boolean; ... }`.
  Justificación: Proporcionaría información adicional a los suscriptores del evento sobre el estado del tenant en el momento de la activación.
  Impacto: Adición de nuevas propiedades al payload. Se debe tener cuidado de no convertir el evento en un portador de estado excesivo.
]

*/
