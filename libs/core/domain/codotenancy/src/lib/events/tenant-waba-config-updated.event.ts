// RUTA: libs/core/domain/codotenancy/src/lib/events/tenant-waba-config-updated.event.ts
// Autor: L.I.A Legacy (IA Asistente)
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { TenantId, WabaId } from '@dfs-suite/shtypes';

export interface TenantWabaConfigUpdatedPayload {
  readonly tenantId: TenantId;
  readonly wabaId: WabaId;
  // Podría incluir también los phone_number_ids si fueran relevantes para todos los listeners
}

export class TenantWabaConfigUpdatedEvent extends DomainEventBase<TenantWabaConfigUpdatedPayload> {
  constructor(props: DomainEventProps<TenantWabaConfigUpdatedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codotenancy/src/lib/events/tenant-waba-config-updated.event.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "**NUEVO ARTEFACTO**: Creado `TenantWabaConfigUpdatedEvent`.", "justificacion": "Necesario para señalizar que la configuración de WhatsApp de un tenant ha cambiado, permitiendo que otros módulos (como Anti-Ban o WhatsApp Asset Sync) reaccionen.", "impacto": "Habilita la reactividad a cambios de configuración WA." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
