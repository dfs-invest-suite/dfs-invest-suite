// libs/core/domain/tenancy/src/lib/events/tenant-created.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/core-domain-shared-kernel-events';
import { UserId } from '@dfs-suite/shared-types';
import { TenantStatusEnum } from '../value-objects/tenant-status.vo';

export interface ITenantCreatedEventPayload {
  readonly name: string;
  readonly ownerUserId: UserId;
  readonly status: TenantStatusEnum;
  // CORRECCIÓN: Firma de índice para satisfacer Record<string, unknown> de forma más precisa,
  // o eliminarla si la restricción en DomainEventBase es suficiente con la inferencia.
  // Dado que DomainEventBase usa Record<string, unknown>, esta interfaz sin firma de índice
  // debería ser compatible si sus propiedades lo son. El error de "index signature missing"
  // es el que nos forzó a añadirla. Si persiste, la mantendremos.
  // Si el error TS2344 en tenant.entity.ts se resuelve con el cambio en AggregateRoot,
  // podríamos intentar quitar esta firma de índice redundante.
  // Por ahora, la mantenemos para máxima compatibilidad con la restricción estricta.
  readonly [key: string]: string | UserId | TenantStatusEnum; // Eliminamos ' | unknown' para que no sea redundante.
}

export class TenantCreatedEvent extends DomainEventBase<ITenantCreatedEventPayload> {
  constructor(props: DomainEventProps<ITenantCreatedEventPayload>) {
    super(props);
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
// (Mismas que antes)
*/
// libs/core/domain/tenancy/src/lib/events/tenant-created.event.ts
/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Simplificación de Firma de Índice): Si la única razón de la firma de índice es satisfacer la restricción `Record<string, unknown>` y no se esperan realmente propiedades adicionales, se podría investigar si un `utility type` podría hacer que `ITenantCreatedEventPayload` (sin la firma de índice explícita) sea compatible. Alternativamente, si `DomainEventBase` usara `Payload extends object` y se tuviera cuidado en la construcción, esto podría evitarse, pero `Record<string, unknown>` es más específico para payloads de datos. Por ahora, la firma de índice es la solución más directa.
  Justificación: Reducir la verbosidad en las interfaces de payload si es posible manteniendo la seguridad de tipos.
  Impacto: Investigación y posible refactorización de tipos genéricos.
]
// (Otras mejoras se mantienen)
*/
// libs/core/domain/tenancy/src/lib/events/tenant-created.event.ts
/* SECCIÓN DE MEJORAS FUTURAS
// (Mismas que antes)
*/
// libs/core/domain/tenancy/src/lib/events/tenant-created.event.ts
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Inclusión de `planId` en Payload):
    Si el `planId` es una pieza de información relevante para los suscriptores de este evento inmediatamente después de la creación del tenant, podría añadirse a `ITenantCreatedEventPayload`.
    Justificación: Proporciona más contexto a los manejadores de eventos sin necesidad de que realicen consultas adicionales para obtener el plan.
    Impacto: Adición de `readonly planId: Maybe<string>;` a la interfaz del payload y asegurar que se popule al crear el evento.
]
[
  Mejora Propuesta 2 (Payload Mínimo vs. Completo):
    Evaluar si el payload debe contener solo los IDs y datos mínimos necesarios para que los handlers actúen, o si debe ser más rico. Un payload más rico evita consultas adicionales por parte de los handlers, pero un payload mínimo promueve un mayor desacoplamiento (los handlers son responsables de obtener los datos frescos que necesitan).
    Justificación: Balancear entre performance (menos queries) y desacoplamiento.
    Impacto: Diseño cuidadoso del contenido del payload basado en las necesidades de los consumidores del evento.
]

*/
// libs/core/domain/tenancy/src/lib/events/tenant-created.event.ts

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Tipado de Firma de Índice más Estricto): La firma de índice actual `[key: string]: string | UserId | TenantStatusEnum | unknown;` es bastante permisiva. Si se quisiera ser más estricto y solo permitir las propiedades definidas, se podría investigar si hay una forma más elegante de satisfacer la restricción `Record<string, unknown>` sin una firma de índice tan abierta o si la restricción genérica en `DomainEventBase` puede ser afinada. Sin embargo, `Record<string, unknown>` inherentemente implica que cualquier clave string puede existir.
  Justificación: Mayor precisión en el tipado del payload si se desea restringir propiedades adicionales.
  Impacto: Investigación y posible refactorización de tipos. Por ahora, esta solución es pragmática.
]
[
  Mejora Propuesta 2 (Validación del Payload en Constructor del Evento): Aunque `DomainEventBase` valida que el payload no sea nulo/indefinido, la clase `TenantCreatedEvent` podría añadir validaciones específicas para las propiedades de `ITenantCreatedEventPayload` en su propio constructor antes de llamar a `super(props)`, si fuera necesario asegurar ciertos invariantes del payload del evento.
  Justificación: Asegurar que los eventos se creen siempre con un payload válido según las reglas del evento específico.
  Impacto: Lógica adicional en el constructor de `TenantCreatedEvent`.
]

*/
/* SECCIÓN DE MEJORAS FUTURAS
// (Mismas que antes)
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Payload Inmutable): Asegurar que todas las propiedades de `TenantCreatedEventPayload` sean `readonly` ya está hecho, lo cual es una buena práctica para los eventos de dominio.
]
[
  Mejora Propuesta 2 (Tipos de Payload más Específicos en Evento Base): Si la firma de índice en cada payload se vuelve tediosa, se podría investigar si una utilidad de tipo en `DomainEventBase` puede hacer que las interfaces simples sean compatibles con `Record<string, unknown>` sin necesidad de la firma de índice explícita en cada payload. Por ejemplo, usando `Payload extends { [K in keyof Payload]: unknown }`.
  Justificación: Reducir boilerplate en la definición de payloads de eventos.
  Impacto: Modificación de tipos genéricos en `DomainEventBase`.
]
*/
