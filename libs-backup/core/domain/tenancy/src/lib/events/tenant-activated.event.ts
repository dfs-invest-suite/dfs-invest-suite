// RUTA: libs/core/domain/tenancy/src/lib/events/tenant-activated.event.ts
import {
  DomainEventBase,
  DomainEventProps,
} from '@dfs-suite/core-domain-shared-kernel-events';
// AggregateId, CorrelationId, etc., se infieren a través de DomainEventProps

/**
 * Payload para el evento TenantActivatedEvent.
 * Actualmente, este evento no requiere un payload específico más allá de la información
 * base del evento de dominio. Se usa `Record<string, never>` para un objeto vacío.
 */
export type TenantActivatedEventPayload = Record<string, never>;

/**
 * Evento de dominio que se dispara cuando un tenant es activado.
 */
export class TenantActivatedEvent extends DomainEventBase<TenantActivatedEventPayload> {
  /**
   * Crea una instancia de TenantActivatedEvent.
   * @param props - Propiedades del evento, incluyendo el `aggregateId` del tenant activado
   *                y el `payload` (que debe ser un objeto vacío para este evento).
   *                La entidad que crea el evento debe pasar `payload: {}`.
   */
  constructor(props: DomainEventProps<TenantActivatedEventPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/tenancy/src/lib/events/tenant-activated.event.ts

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Payload Contextual Opcional):
    Si la activación de un tenant pudiera ocurrir por diferentes razones o con diferentes parámetros que fueran relevantes para los suscriptores (ej. activado después de pago, activado por admin, configuración específica aplicada durante la activación), `TenantActivatedEventPayload` podría expandirse.
    Justificación: Mayor contexto para los manejadores de eventos.
    Impacto: Modificación de `TenantActivatedEventPayload` y del código que dispara el evento.
]
[
  Mejora Propuesta 2 (Timestamp de Activación Específico en Payload):
    Aunque `metadata.timestamp` indica cuándo se creó el evento, si el "momento de activación" como concepto de negocio es distinto y crucial, podría incluirse en el payload: `activatedAt: IsoDateString`.
    Justificación: Precisión semántica si el timestamp del evento no es suficiente.
    Impacto: Adición al payload; la entidad sería responsable de proveer este timestamp.
]
*/
// libs/core/domain/tenancy/src/lib/events/tenant-activated.event.ts
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
