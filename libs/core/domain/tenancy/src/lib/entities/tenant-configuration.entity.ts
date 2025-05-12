// libs/core/domain/tenancy/src/lib/entities/tenant-configuration.entity.ts
import { Entity, CreateEntityProps } from '@dfs-suite/core-domain-shared-kernel-entities';
import { ArgumentNotProvidedException } from '@dfs-suite/shared-errors';
import { AggregateId, TenantId } from '@dfs-suite/shared-types'; // AggregateId es el tipo para el ID de la entidad
import { Guard, UuidUtils } from '@dfs-suite/shared-utils';

interface TenantConfigurationProps {
  tenantId: TenantId; // El ID del tenant al que pertenece esta configuración
  key: string;        // La clave de la configuración (ej. "WHATSAPP_API_TOKEN", "MAX_USERS")
  value: string;      // El valor de la configuración (podría ser string encriptado o JSON stringified)
  description?: string; // Descripción opcional de la configuración
}

// Props para crear una nueva configuración
interface CreateTenantConfigurationProps {
  tenantId: TenantId;
  key: string;
  value: string;
  description?: string;
}

export class TenantConfigurationEntity extends Entity<TenantConfigurationProps> {
  // El constructor es llamado por el método factoría `create` o al reconstruir desde persistencia
  constructor(createEntityProps: CreateEntityProps<TenantConfigurationProps>) {
    super(createEntityProps);
  }

  /**
   * Método factoría para crear una nueva instancia de TenantConfigurationEntity.
   * @param props - Propiedades para la creación.
   * @param id - (Opcional) ID de la configuración si ya existe.
   * @returns Nueva instancia de TenantConfigurationEntity.
   */
  public static create(props: CreateTenantConfigurationProps, id?: AggregateId): TenantConfigurationEntity {
    if (Guard.isEmpty(props.tenantId)) {
      throw new ArgumentNotProvidedException('tenantId cannot be empty for TenantConfiguration.');
    }
    if (Guard.isEmpty(props.key?.trim())) { // Añadido trim()
      throw new ArgumentNotProvidedException('Configuration key cannot be empty.');
    }
    if (Guard.isNil(props.value)) { // Permitir string vacío para 'value', pero no null/undefined
      throw new ArgumentNotProvidedException('Configuration value cannot be null or undefined.');
    }

    const configId = id || UuidUtils.generateAggregateId(); // Usar AggregateId para el ID de la entidad
    return new TenantConfigurationEntity({
      id: configId,
      props: {
        tenantId: props.tenantId,
        key: props.key.trim(), // Guardar la clave trimeada
        value: props.value,     // Guardar el valor tal cual (podría ser string vacío)
        description: props.description?.trim() || undefined, // Trimear descripción o dejar undefined
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // --- Getters ---
  get tenantId(): TenantId {
    return this.props.tenantId;
  }
  get key(): string {
    return this.props.key;
  }
  get value(): string {
    return this.props.value;
  }
  get description(): string | undefined { // Tipo explícito con undefined
    return this.props.description;
  }

  // --- Métodos de Comportamiento ---
  /**
   * Actualiza el valor de esta configuración.
   * @param newValue - El nuevo valor para la configuración.
   */
  public updateValue(newValue: string): void {
    if (Guard.isNil(newValue)) { // Permitir string vacío
      throw new ArgumentNotProvidedException('New configuration value cannot be null or undefined.');
    }
    if (this.props.value === newValue) {
      return; // No hay cambio, no actualizar timestamp ni emitir eventos (si los hubiera)
    }
    this.props.value = newValue;
    this.setUpdatedAt(); // Actualiza el timestamp de EntityBase
    // Podría emitirse un evento `TenantConfigurationValueUpdatedEvent` si fuera necesario
  }

  /**
   * Actualiza la descripción de esta configuración.
   * @param newDescription - La nueva descripción.
   */
  public updateDescription(newDescription: string | undefined | null): void {
    const trimmedDescription = newDescription?.trim() || undefined;
    if (this.props.description === trimmedDescription) {
      return; // No hay cambio
    }
    this.props.description = trimmedDescription;
    this.setUpdatedAt();
    // Podría emitirse un evento `TenantConfigurationDescriptionUpdatedEvent`
  }


  // --- Validación de Invariantes ---
  /**
   * Valida los invariantes de la entidad.
   * Es llamado por el constructor de EntityBase.
   */
  public validate(): void {
    if (Guard.isEmpty(this.props.tenantId)) {
      throw new ArgumentNotProvidedException('TenantConfigurationEntity: tenantId is required.');
    }
    if (Guard.isEmpty(this.props.key)) {
      throw new ArgumentNotProvidedException('TenantConfigurationEntity: key is required.');
    }
    if (Guard.isNil(this.props.value)) { // value puede ser un string vacío, pero no null/undefined
      throw new ArgumentNotProvidedException('TenantConfigurationEntity: value is required (cannot be null/undefined).');
    }
    // Podrían añadirse otras validaciones, ej. longitud máxima para key/value/description,
    // o un conjunto de claves permitidas si fuera un enum.
  }
}

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
