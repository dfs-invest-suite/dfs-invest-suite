// RUTA: libs/core/domain/codotenancy/src/lib/entities/tenant-configuration.entity.ts
// Autor: L.I.A Legacy (IA Asistente)
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import { AggregateId, TenantId } from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';

export interface TenantConfigurationProps {
  // Renombrado para claridad
  tenantId: TenantId;
  key: string;
  value: string; // El valor se almacena encriptado en la DB, pero la entidad lo maneja en claro.
  description?: string;
}

// No es necesario un CreateDTO separado si las props son las mismas.
// La encriptación/desencriptación es responsabilidad de la capa de infraestructura (Repositorio).

export class TenantConfigurationEntity extends AggregateRoot<
  TenantConfigurationProps,
  AggregateId
> {
  // Puede usar AggregateId genérico para su propio ID
  constructor(createEntityProps: CreateEntityProps<TenantConfigurationProps>) {
    super(createEntityProps);
  }

  public static create(
    props: TenantConfigurationProps, // Ahora toma TenantConfigurationProps directamente
    id?: AggregateId
  ): TenantConfigurationEntity {
    if (Guard.isEmpty(props.tenantId)) {
      throw new ArgumentNotProvidedException(
        'tenantId cannot be empty for TenantConfiguration.'
      );
    }
    if (Guard.isEmpty(props.key?.trim())) {
      throw new ArgumentNotProvidedException(
        'Configuration key cannot be empty.'
      );
    }
    if (Guard.isNil(props.value)) {
      // Permitir string vacío, pero no null/undefined
      throw new ArgumentNotProvidedException(
        'Configuration value cannot be null or undefined.'
      );
    }

    const configId = id || UuidUtils.generateAggregateId();
    return new TenantConfigurationEntity({
      id: configId,
      props: {
        ...props, // Copia todas las props
        key: props.key.trim(),
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
      throw new ArgumentNotProvidedException(
        'New configuration value cannot be null or undefined.'
      );
    }
    if (this.props.value === newValue) return;
    this.props.value = newValue;
    this.setUpdatedAt();
    // Considerar TenantConfigurationValueUpdatedEvent
  }

  public updateDescription(newDescription: string | undefined | null): void {
    const trimmedDescription = newDescription?.trim() || undefined;
    if (this.props.description === trimmedDescription) return;
    this.props.description = trimmedDescription;
    this.setUpdatedAt();
  }

  public validate(): void {
    if (Guard.isEmpty(this.props.tenantId))
      throw new ArgumentNotProvidedException(
        'TenantConfigurationEntity: tenantId is required.'
      );
    if (Guard.isEmpty(this.props.key))
      throw new ArgumentNotProvidedException(
        'TenantConfigurationEntity: key is required.'
      );
    if (Guard.isNil(this.props.value))
      throw new ArgumentNotProvidedException(
        'TenantConfigurationEntity: value is required (cannot be null/undefined).'
      );
  }
}
// RUTA: libs/core/domain/codotenancy/src/lib/entities/tenant-configuration.entity.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports y herencia de `AggregateRoot`.", "justificacion": "Consistencia y preparación para eventos si fueran necesarios.", "impacto": "Alineación arquitectónica." },
  { "mejora": "Simplificado el factory `create` para tomar `TenantConfigurationProps` directamente.", "justificacion": "Menos boilerplate si las props de creación son las mismas que las de la entidad.", "impacto": "DX." },
  { "mejora": "Permitir string vacío para `value` pero no null/undefined.", "justificacion": "Un string vacío puede ser un valor de configuración válido.", "impacto": "Flexibilidad."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
