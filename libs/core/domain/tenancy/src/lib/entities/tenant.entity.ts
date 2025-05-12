// libs/core/domain/tenancy/src/lib/entities/tenant.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/core-domain-shared-kernel-entities';
import { ArgumentInvalidException, ArgumentNotProvidedException } from '@dfs-suite/shared-errors';
import { UserId, Maybe, AggregateId, TenantId } from '@dfs-suite/shared-types';
import { UuidUtils, Guard } from '@dfs-suite/shared-utils';
import { TenantStatusVO } from '../value-objects/tenant-status.vo';
import { DbConnectionConfigVO } from '../value-objects/db-connection-config.vo';
// CORRECCIÓN AQUÍ: Cambiar TenantCreatedEventPayload a ITenantCreatedEventPayload
import { TenantCreatedEvent, ITenantCreatedEventPayload } from '../events/tenant-created.event';
import { TenantActivatedEvent, TenantActivatedEventPayload } from '../events/tenant-activated.event';
import { TenantSuspendedEvent, TenantSuspendedEventPayload } from '../events/tenant-suspended.event';
import { InvalidTenantStatusTransitionError } from '../errors/invalid-tenant-status-transition.error';
import { Result, ok, err } from '@dfs-suite/shared-result';

interface TenantProps {
  name: string;
  ownerUserId: UserId;
  status: TenantStatusVO;
  planId: Maybe<string>;
  dbConnectionConfig: Maybe<DbConnectionConfigVO>;
}

interface CreateTenantProps {
  name: string;
  ownerUserId: UserId;
  planId?: Maybe<string>;
}

export class TenantEntity extends AggregateRoot<TenantProps> {
  constructor(createEntityProps: CreateEntityProps<TenantProps>) {
    super(createEntityProps);
  }

  public static create(props: CreateTenantProps, id?: AggregateId | TenantId): TenantEntity {
    if (Guard.isEmpty(props.name?.trim())) {
      throw new ArgumentNotProvidedException('Tenant name cannot be empty.');
    }
    if (Guard.isEmpty(props.ownerUserId)) {
      throw new ArgumentNotProvidedException('Tenant ownerUserId cannot be empty.');
    }

    const entityId = (id as AggregateId) || UuidUtils.generateAggregateId();
    const initialStatus = TenantStatusVO.newPendingSetup();

    const tenant = new TenantEntity({
      id: entityId,
      props: {
        name: props.name.trim(),
        ownerUserId: props.ownerUserId,
        status: initialStatus,
        planId: props.planId ?? null,
        dbConnectionConfig: null,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Usar el tipo de payload importado correctamente
    const eventPayload: ITenantCreatedEventPayload = {
        name: tenant.props.name,
        ownerUserId: tenant.props.ownerUserId,
        status: initialStatus.value, // Acceder al .value del VO para el payload del evento
    };
    tenant.addEvent(
      new TenantCreatedEvent({
        aggregateId: entityId,
        payload: eventPayload,
      }),
    );
    return tenant;
  }

  get name(): string {
    return this.props.name;
  }
  get ownerUserId(): UserId {
    return this.props.ownerUserId;
  }
  get status(): TenantStatusVO {
    return this.props.status;
  }
  get planId(): Maybe<string> {
    return this.props.planId;
  }
  get dbConnectionConfig(): Maybe<DbConnectionConfigVO> {
    return this.props.dbConnectionConfig;
  }

  public activate(): Result<void, InvalidTenantStatusTransitionError | ArgumentInvalidException> {
    if (this.props.status.isActive()) {
      return ok(undefined);
    }
    if (!this.props.status.isPendingSetup() && !this.props.status.isSuspended()) {
      return err(new InvalidTenantStatusTransitionError(
        `Cannot activate tenant from status "${this.props.status.value}". Allowed from: PENDING_SETUP, SUSPENDED.`
      ));
    }
    this.props.status = TenantStatusVO.newActive();
    this.setUpdatedAt();
    this.addEvent(new TenantActivatedEvent({ aggregateId: this.id, payload: {} as TenantActivatedEventPayload }));
    return ok(undefined);
  }

  public suspend(): Result<void, InvalidTenantStatusTransitionError> {
    if (this.props.status.isSuspended()) {
      return ok(undefined);
    }
    if (!this.props.status.isActive()) {
       return err(new InvalidTenantStatusTransitionError(
        `Cannot suspend tenant from status "${this.props.status.value}". Allowed from: ACTIVE.`
      ));
    }
    this.props.status = TenantStatusVO.newSuspended();
    this.setUpdatedAt();
    this.addEvent(new TenantSuspendedEvent({ aggregateId: this.id, payload: {} as TenantSuspendedEventPayload }));
    return ok(undefined);
  }

  public setDatabaseConfiguration(config: DbConnectionConfigVO): Result<void, ArgumentNotProvidedException> {
    if (Guard.isNil(config)) {
        return err(new ArgumentNotProvidedException('Database configuration cannot be null or undefined.'));
    }
    this.props.dbConnectionConfig = config;
    this.setUpdatedAt();
    return ok(undefined);
  }

  public updateName(newName: string): Result<void, ArgumentNotProvidedException> {
    const trimmedNewName = newName?.trim();
    if (Guard.isEmpty(trimmedNewName)) {
      return err(new ArgumentNotProvidedException('New tenant name cannot be empty.'));
    }
    if (trimmedNewName === this.props.name) {
      return ok(undefined);
    }
    this.props.name = trimmedNewName;
    this.setUpdatedAt();
    return ok(undefined);
  }

  public validate(): void {
    if (Guard.isEmpty(this.props.name)) {
      throw new ArgumentNotProvidedException('TenantEntity: name is required.');
    }
    if (Guard.isEmpty(this.props.ownerUserId)) {
      throw new ArgumentNotProvidedException('TenantEntity: ownerUserId is required.');
    }
    if (!(this.props.status instanceof TenantStatusVO)) {
        throw new ArgumentInvalidException('TenantEntity: status must be a valid TenantStatusVO.');
    }
    if (this.props.dbConnectionConfig !== null &&
        this.props.dbConnectionConfig !== undefined &&
        !(this.props.dbConnectionConfig instanceof DbConnectionConfigVO)) {
        throw new ArgumentInvalidException('TenantEntity: dbConnectionConfig must be a valid DbConnectionConfigVO if provided.');
    }
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Inyección de Logger): La lógica de logging ha sido eliminada de la entidad. El logging contextual sobre las operaciones de la entidad (ej. "Tenant X activado por User Y") debería realizarse en los Casos de Uso (Servicios de Aplicación) que orquestan estas operaciones.
  Justificación: Mantiene la entidad de dominio enfocada en la lógica de negocio pura.
  Impacto: El logging se mueve a la capa de aplicación.
]
[
  Mejora Propuesta 2 (Validación de PlanId con `PlanVO`): Similar a `TenantStatusVO`, `planId` (actualmente `Maybe<string>`) podría representarse con un `PlanIdVO` o `PlanVO` que encapsule su formato y validación (ej. si los planes deben existir en un sistema de facturación o tener una estructura específica).
  Justificación: Mayor robustez y semántica para la gestión de planes.
  Impacto: Creación de un nuevo VO, modificación de `TenantProps` y de la lógica de creación/actualización de `planId`.
]
[
  Mejora Propuesta 3 (Gestión de `TenantConfigurationEntity` como parte del Agregado): Si las `TenantConfigurationEntity` son intrínsecamente parte del ciclo de vida y las invariantes del `TenantEntity` (es decir, un Tenant "posee" sus configuraciones), entonces `TenantProps` debería incluir `configurations: TenantConfigurationEntity[]`. La entidad `TenantEntity` tendría métodos para añadir, actualizar o eliminar configuraciones, asegurando la consistencia del agregado completo.
  Justificación: Modelado DDD más preciso si existe una fuerte relación de agregación.
  Impacto: Cambios significativos en `TenantProps` y adición de métodos para gestionar la colección de configuraciones. `TenantConfigurationEntity` seguiría siendo una entidad, pero no un `AggregateRoot` si es parte de otro agregado.
]
[
  Mejora Propuesta 4 (Método `updateDetails` Genérico): En lugar de métodos separados como `updateName`, se podría tener un método más genérico `updateDetails(props: Partial<UpdateableTenantProps>)` que maneje la actualización de varias propiedades a la vez, validando y emitiendo los eventos correspondientes.
  Justificación: API más flexible para actualizaciones.
  Impacto: Diseño de una interfaz `UpdateableTenantProps` y lógica de actualización más compleja.
]
[
  Mejora Propuesta 5 (Uso de `Result` en métodos de cambio de estado): Los métodos `activate`, `suspend`, `setDatabaseConfiguration`, `updateName` ahora devuelven `Result<void, SpecificErrorType>`. Esto hace explícito que estas operaciones pueden fallar debido a reglas de negocio y permite a los llamadores (Casos de Uso) manejar estos errores de forma funcional.
  Justificación: Adopción del patrón `Result` para errores de negocio esperados, mejorando la robustez y claridad del flujo de control.
  Impacto: Los Casos de Uso que llamen a estos métodos necesitarán manejar el `Result`. Las excepciones por violación de invariantes fundamentales (en `validate()` o `create()`) siguen siendo lanzadas.
]
*/
// libs/core/domain/tenancy/src/lib/entities/tenant.entity.ts
/* SECCIÓN DE MEJORAS FUTURAS
// (Mismas que antes, ligeramente ajustadas)
[
  Mejora Propuesta 1 (Inyección de Logger): La lógica de logging ha sido eliminada de la entidad. El logging contextual sobre las operaciones de la entidad (ej. "Tenant X activado por User Y") debería realizarse en los Casos de Uso (Servicios de Aplicación) que orquestan estas operaciones.
  Justificación: Mantiene la entidad de dominio enfocada en la lógica de negocio pura.
  Impacto: El logging se mueve a la capa de aplicación.
]
[
  Mejora Propuesta 2 (Validación de PlanId con `PlanVO`): Similar a `TenantStatusVO`, `planId` (actualmente `Maybe<string>`) podría representarse con un `PlanIdVO` o `PlanVO` que encapsule su formato y validación (ej. si los planes deben existir en un sistema de facturación o tener una estructura específica).
  Justificación: Mayor robustez y semántica para la gestión de planes.
  Impacto: Creación de un nuevo VO, modificación de `TenantProps` y de la lógica de creación/actualización de `planId`.
]
[
  Mejora Propuesta 3 (Gestión de `TenantConfigurationEntity` como parte del Agregado): Si las `TenantConfigurationEntity` son intrínsecamente parte del ciclo de vida y las invariantes del `TenantEntity` (es decir, un Tenant "posee" sus configuraciones), entonces `TenantProps` debería incluir `configurations: TenantConfigurationEntity[]`. La entidad `TenantEntity` tendría métodos para añadir, actualizar o eliminar configuraciones, asegurando la consistencia del agregado completo.
  Justificación: Modelado DDD más preciso si existe una fuerte relación de agregación.
  Impacto: Cambios significativos en `TenantProps` y adición de métodos para gestionar la colección de configuraciones. `TenantConfigurationEntity` seguiría siendo una entidad, pero no un `AggregateRoot` si es parte de otro agregado.
]
[
  Mejora Propuesta 4 (Método `updateDetails` Genérico): (Igual que antes) Para múltiples actualizaciones.
  Justificación: API más flexible.
  Impacto: Diseño de una interfaz `UpdateableTenantProps` y lógica de actualización más compleja.
]
[
  Mejora Propuesta 5 (Uso de `Result` en métodos de cambio de estado): Los métodos `activate`, `suspend`, `setDatabaseConfiguration`, `updateName` ahora devuelven `Result<void, SpecificErrorType>`. Esto hace explícito que estas operaciones pueden fallar debido a reglas de negocio y permite a los llamadores (Casos de Uso) manejar estos errores de forma funcional.
  Justificación: Adopción del patrón `Result` para errores de negocio esperados, mejorando la robustez y claridad del flujo de control.
  Impacto: Los Casos de Uso que llamen a estos métodos necesitarán manejar el `Result`. Las excepciones por violación de invariantes fundamentales (en `validate()` o `create()`) siguen siendo lanzadas.
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
// (Mantener las mismas mejoras propuestas anteriormente para este archivo)
[
  Mejora Propuesta 1 (Inyección de Logger): La entidad actualmente tiene un `this.logger?.debug()`. Para que esto funcione, `EntityBase` o `AggregateRoot` necesitarían una forma de recibir una instancia de `ILoggerPort`. Esto podría hacerse a través del constructor (complicando la creación de entidades) o, de forma más pragmática para DDD, que las entidades no logueen directamente, sino que los servicios de aplicación/dominio que las usan se encarguen del logging contextual. Alternativamente, se podría usar un logger estático si se configura adecuadamente, pero la inyección es preferible para testabilidad.
  Justificación: Mejorar la observabilidad y testabilidad. El logging directo en entidades a veces se considera una violación de SRP, pero puede ser pragmático para ciertos debugs. **Decisión actual: Se eliminó el logging de la entidad.**
  Impacto: Modificación de `EntityBase`/`AggregateRoot` o eliminación del logging directo en la entidad.
]
[
  Mejora Propuesta 2 (Validación de PlanId): Actualmente `planId` es un `Maybe<string>`. Si los planes tienen una estructura o reglas de validación (ej. deben existir en una lista predefinida, o tener un formato específico), se podría crear un `PlanIdVO` o validar contra un servicio de dominio de planes.
  Justificación: Asegurar la validez de los `planId` asignados.
  Impacto: Creación de un nuevo VO o servicio de dominio, y modificación de la lógica de validación y creación.
]
[
  Mejora Propuesta 3 (Gestión de Configuraciones Múltiples): `TenantConfigurationEntity` se mencionó antes. La relación entre `TenantEntity` y sus múltiples `TenantConfigurationEntity` (si es una relación de composición dentro del agregado Tenant) necesitaría ser modelada aquí. Esto podría implicar que `TenantProps` tenga un `configurations: TenantConfigurationEntity[]` y métodos para añadir/actualizar/eliminar configuraciones.
  Justificación: Modelar completamente el agregado Tenant si las configuraciones son parte integral de él.
  Impacto: Modificaciones significativas en `TenantProps`, métodos de la entidad y su lógica de validación.
]
[
  Mejora Propuesta 4 (Método `updateDetails` Genérico): En lugar de métodos separados como `updateName`, se podría tener un método más genérico `updateDetails(props: Partial<UpdateableTenantProps>)` que maneje la actualización de varias propiedades a la vez, validando y emitiendo los eventos correspondientes.
  Justificación: API más flexible para actualizaciones.
  Impacto: Diseño de una interfaz `UpdateableTenantProps` y lógica de actualización más compleja.
]
*/
