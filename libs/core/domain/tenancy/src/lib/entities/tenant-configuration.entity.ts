// libs/core/domain/tenancy/src/lib/entities/tenant-configuration.entity.ts
// CAMBIO: Importar AggregateRoot en lugar de solo Entity
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/core-domain-shared-kernel-entities';
import { ArgumentNotProvidedException } from '@dfs-suite/shared-errors';
import { AggregateId, TenantId } from '@dfs-suite/shared-types';
import { Guard, UuidUtils } from '@dfs-suite/shared-utils';
// Si esta entidad emite eventos, se necesitarían aquí. Por ahora, no lo hace directamente.

interface TenantConfigurationProps {
  tenantId: TenantId;
  key: string;
  value: string;
  description?: string;
}

interface CreateTenantConfigurationProps {
  tenantId: TenantId;
  key: string;
  value: string;
  description?: string;
}

// CAMBIO: Extender AggregateRoot en lugar de Entity
export class TenantConfigurationEntity extends AggregateRoot<TenantConfigurationProps> {
  constructor(createEntityProps: CreateEntityProps<TenantConfigurationProps>) {
    super(createEntityProps);
  }

  public static create(props: CreateTenantConfigurationProps, id?: AggregateId): TenantConfigurationEntity {
    if (Guard.isEmpty(props.tenantId)) {
      throw new ArgumentNotProvidedException('tenantId cannot be empty for TenantConfiguration.');
    }
    if (Guard.isEmpty(props.key?.trim())) {
      throw new ArgumentNotProvidedException('Configuration key cannot be empty.');
    }
    if (Guard.isNil(props.value)) {
      throw new ArgumentNotProvidedException('Configuration value cannot be null or undefined.');
    }

    const configId = id || UuidUtils.generateAggregateId();
    return new TenantConfigurationEntity({
      id: configId,
      props: {
        tenantId: props.tenantId,
        key: props.key.trim(),
        value: props.value,
        description: props.description?.trim() || undefined,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  get tenantId(): TenantId {
    return this.props.tenantId;
  }
  get key(): string {
    return this.props.key;
  }
  get value(): string {
    return this.props.value;
  }
  get description(): string | undefined {
    return this.props.description;
  }

  public updateValue(newValue: string): void {
    if (Guard.isNil(newValue)) {
      throw new ArgumentNotProvidedException('New configuration value cannot be null or undefined.');
    }
    if (this.props.value === newValue) {
      return;
    }
    this.props.value = newValue;
    this.setUpdatedAt();
    // Ejemplo si se emitiera un evento:
    // this.addEvent(new TenantConfigurationValueUpdatedEvent({ aggregateId: this.id, payload: { key: this.key, newValue } }));
  }

  public updateDescription(newDescription: string | undefined | null): void {
    const trimmedDescription = newDescription?.trim() || undefined;
    if (this.props.description === trimmedDescription) {
      return;
    }
    this.props.description = trimmedDescription;
    this.setUpdatedAt();
  }

  public validate(): void {
    if (Guard.isEmpty(this.props.tenantId)) {
      throw new ArgumentNotProvidedException('TenantConfigurationEntity: tenantId is required.');
    }
    if (Guard.isEmpty(this.props.key)) {
      throw new ArgumentNotProvidedException('TenantConfigurationEntity: key is required.');
    }
    if (Guard.isNil(this.props.value)) {
      throw new ArgumentNotProvidedException('TenantConfigurationEntity: value is required (cannot be null/undefined).');
    }
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Eventos de Dominio para TenantConfigurationEntity):
    Si los cambios en una configuración de tenant (ej. `updateValue`, `updateDescription`) son significativos y otras partes del sistema necesitan reaccionar a ellos, `TenantConfigurationEntity` debería emitir sus propios eventos de dominio (ej. `TenantConfigurationValueUpdatedEvent`, `TenantConfigurationDescriptionUpdatedEvent`). Al heredar de `AggregateRoot`, ya tiene la capacidad (`addEvent`).
    Justificación: Permite una mayor granularidad en la reactividad del sistema y un seguimiento más fino de los cambios en las configuraciones.
    Impacto: Definición de nuevas clases de evento en `libs/core/domain/tenancy/src/lib/events/` y llamadas a `this.addEvent()` en los métodos correspondientes de esta entidad.
]
// (Otras mejoras propuestas anteriormente se mantienen)
*/
// libs/core/domain/tenancy/src/lib/entities/tenant-configuration.entity.ts

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Tipado del Valor de Configuración): Actualmente, `value` es `string`. Para configuraciones más complejas o tipadas (ej. un booleano, un número, un JSON), se podría usar un tipo genérico `TValue` para `TenantConfigurationProps` y `TenantConfigurationEntity<TValue extends ConfigValueType = string>`. `ConfigValueType` podría ser `string | number | boolean | Record<string, unknown>`.
  Justificación: Permitiría almacenar diferentes tipos de configuraciones de forma más segura y explícita, evitando conversiones manuales de string.
  Impacto: Aumentaría la complejidad de la entidad y sus tipos. Requeriría una forma de serializar/deserializar `TValue` si no es un string para el almacenamiento. Podría ser una mejora para una v2.
]
[
  Mejora Propuesta 2 (Encriptación de Valores Sensibles): Si `value` puede contener información sensible (ej. API keys), la entidad en sí no debería manejar la encriptación/desencriptación. El valor se pasaría/recibiría encriptado/desencriptado. Una capa de infraestructura (un "ConfigurationPort" con su adaptador) se encargaría de esto antes de interactuar con la entidad o la base de datos. Este VO podría tener una propiedad `isSensitive: boolean` para marcarlo.
  Justificación: Seguridad de datos. Las entidades de dominio deben ser agnósticas a los mecanismos de encriptación.
  Impacto: No hay cambio directo en este VO, pero sí en la arquitectura de cómo se manejan los valores de configuración.
]
[
  Mejora Propuesta 3 (Claves de Configuración como Enum o Tipo Estricto): En lugar de un `string` libre para `key`, si hay un conjunto finito y conocido de claves de configuración, se podría usar un `enum` o un tipo literal de string para `key`.
  Justificación: Mayor seguridad de tipos y prevención de errores tipográficos al usar/establecer configuraciones.
  Impacto: Definición de un `enum` o tipo para las claves. Modificaría la validación.
]
[
  Mejora Propuesta 4 (Eventos de Dominio): Para cambios en `value` o `description`, se podrían emitir eventos de dominio específicos (ej. `TenantConfigurationValueUpdatedEvent`) si otros módulos o procesos necesitan reaccionar a estos cambios.
  Justificación: Permite una arquitectura reactiva y desacoplada.
  Impacto: Definición de nuevos eventos de dominio y su publicación en los métodos `updateValue`/`updateDescription`. Esta entidad necesitaría extender `AggregateRoot` en lugar de `Entity` si va a emitir eventos. Actualmente extiende `Entity`, lo cual es correcto si no emite eventos por sí misma y es parte de un agregado mayor (Tenant). Si es un agregado propio, debería ser `AggregateRoot`. **Decisión: Por ahora, mantener como `Entity`, asumiendo que es parte del agregado `Tenant`. Si se maneja de forma independiente, cambiar a `AggregateRoot`.**
]

*/
