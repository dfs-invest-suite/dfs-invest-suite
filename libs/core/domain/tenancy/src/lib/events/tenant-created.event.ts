// libs/core/domain/tenancy/src/lib/events/tenant-created.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/core-domain-shared-kernel-events';
import { UserId } from '@dfs-suite/shared-types';
import { TenantStatusEnum } from '../value-objects/tenant-status.vo';

export interface ITenantCreatedEventPayload {
  readonly name: string;
  readonly ownerUserId: UserId;
  readonly status: TenantStatusEnum;
  // Añadir firma de índice para satisfacer Record<string, unknown>
  // Permite que cualquier otra propiedad string con valor de estos tipos (o unknown) exista,
  // haciendo la interfaz compatible con Record<string, unknown>.
  readonly [key: string]: string | UserId | TenantStatusEnum | unknown;
}

export class TenantCreatedEvent extends DomainEventBase<ITenantCreatedEventPayload> {
  constructor(props: DomainEventProps<ITenantCreatedEventPayload>) {
    super(props);
  }
}

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
