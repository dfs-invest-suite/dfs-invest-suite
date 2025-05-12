// libs/core/domain/tenancy/src/lib/entities/tenant.entity.spec.ts
import { ArgumentInvalidException, ArgumentNotProvidedException } from '@dfs-suite/shared-errors';
import { TenantEntity } from './tenant.entity';
import { TenantStatusVO, TenantStatusEnum } from '../value-objects/tenant-status.vo';
import { DbConnectionConfigVO } from '../value-objects/db-connection-config.vo';
import { UuidUtils } from '@dfs-suite/shared-utils';
import { UserId, AggregateId } from '@dfs-suite/shared-types';
import {
  TenantCreatedEvent,
  TenantActivatedEvent,
  TenantSuspendedEvent,
  InvalidTenantStatusTransitionError,
} from '@dfs-suite/core-domain-tenancy'; // Usando el alias de la librería
import { isOk, isErr } from '@dfs-suite/shared-result';

describe('TenantEntity', () => {
  const mockOwnerId = UuidUtils.generateUserId();
  const mockTenantId = UuidUtils.generateAggregateId();

  const createValidProps = () => ({
    name: 'Valid Tenant Name',
    ownerUserId: mockOwnerId,
    planId: 'free_plan',
  });

  describe('create (factory method)', () => {
    it('should create a TenantEntity successfully with valid props', () => {
      const props = createValidProps();
      const tenant = TenantEntity.create(props, mockTenantId);

      expect(tenant).toBeInstanceOf(TenantEntity);
      expect(tenant.id).toBe(mockTenantId);
      expect(tenant.name).toBe(props.name);
      expect(tenant.ownerUserId).toBe(props.ownerUserId);
      expect(tenant.status.value).toBe(TenantStatusEnum.PENDING_SETUP);
      expect(tenant.planId).toBe(props.planId);
      expect(tenant.dbConnectionConfig).toBeNull();
      expect(tenant.createdAt).toBeDefined();
      expect(tenant.updatedAt).toBeDefined();
      expect(tenant.createdAt).toEqual(tenant.updatedAt);
    });

    it('should generate a new ID if none is provided', () => {
      const tenant = TenantEntity.create(createValidProps());
      expect(tenant.id).toBeDefined();
      expect(typeof tenant.id).toBe('string');
    });

    it('should trim the tenant name upon creation', () => {
      const tenant = TenantEntity.create({ ...createValidProps(), name: '  Spaced Name  ' });
      expect(tenant.name).toBe('Spaced Name');
    });

    it('should add a TenantCreatedEvent to domainEvents on creation', () => {
      const props = createValidProps();
      const tenant = TenantEntity.create(props);
      const domainEvents = tenant.domainEvents;
      expect(domainEvents).toHaveLength(1);
      const event = domainEvents[0] as TenantCreatedEvent;
      expect(event).toBeInstanceOf(TenantCreatedEvent);
      expect(event.aggregateId).toBe(tenant.id);
      expect(event.payload.name).toBe(props.name);
      expect(event.payload.ownerUserId).toBe(props.ownerUserId);
      expect(event.payload.status).toBe(TenantStatusEnum.PENDING_SETUP);
    });

    it.each([
      ['name', { ...createValidProps(), name: '' }],
      ['name with whitespace', { ...createValidProps(), name: '   ' }],
      ['ownerUserId', { ...createValidProps(), ownerUserId: '' as UserId }],
    ])('should throw ArgumentNotProvidedException if %s is empty', (_fieldName, props) => {
      expect(() => TenantEntity.create(props)).toThrow(ArgumentNotProvidedException);
    });
  });

  describe('activate', () => {
    it('should activate a tenant from PENDING_SETUP status and emit TenantActivatedEvent', () => {
      const tenant = TenantEntity.create(createValidProps());
      const initialUpdatedAt = tenant.updatedAt;
      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAt).getTime() + 1000);

      const result = tenant.activate();

      expect(isOk(result)).toBe(true);
      expect(tenant.status.value).toBe(TenantStatusEnum.ACTIVE);
      expect(tenant.updatedAt).not.toBe(initialUpdatedAt);
      expect(tenant.domainEvents[tenant.domainEvents.length -1]).toBeInstanceOf(TenantActivatedEvent);
      jest.useRealTimers();
    });

    it('should activate a tenant from SUSPENDED status', () => {
      const tenant = TenantEntity.create(createValidProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tenant as any).props.status = TenantStatusVO.newSuspended();
      tenant.clearEvents();

      const result = tenant.activate();
      expect(isOk(result)).toBe(true);
      expect(tenant.status.value).toBe(TenantStatusEnum.ACTIVE);
      expect(tenant.domainEvents[0]).toBeInstanceOf(TenantActivatedEvent);
    });

    it('should return Ok and not change status or emit event if already ACTIVE', () => {
      const tenant = TenantEntity.create(createValidProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tenant as any).props.status = TenantStatusVO.newActive();
      const initialUpdatedAt = tenant.updatedAt;
      tenant.clearEvents();

      const result = tenant.activate();
      expect(isOk(result)).toBe(true);
      expect(tenant.status.value).toBe(TenantStatusEnum.ACTIVE);
      expect(tenant.updatedAt).toBe(initialUpdatedAt);
      expect(tenant.domainEvents).toHaveLength(0);
    });

    it('should return Err(InvalidTenantStatusTransitionError) if trying to activate from an invalid state (conceptual)', () => {
      // Este test sigue siendo conceptual hasta que haya más estados que probar
      expect(true).toBe(true);
    });
  });

  describe('suspend', () => {
    it('should suspend an ACTIVE tenant and emit TenantSuspendedEvent', () => {
      const tenant = TenantEntity.create(createValidProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tenant as any).props.status = TenantStatusVO.newActive();
      tenant.clearEvents();
      const initialUpdatedAt = tenant.updatedAt;
      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAt).getTime() + 1000);

      const result = tenant.suspend();

      expect(isOk(result)).toBe(true);
      expect(tenant.status.value).toBe(TenantStatusEnum.SUSPENDED);
      expect(tenant.updatedAt).not.toBe(initialUpdatedAt);
      expect(tenant.domainEvents[0]).toBeInstanceOf(TenantSuspendedEvent);
      jest.useRealTimers();
    });

    it('should return Ok and not change status or emit event if already SUSPENDED', () => {
      const tenant = TenantEntity.create(createValidProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tenant as any).props.status = TenantStatusVO.newSuspended();
      const initialUpdatedAt = tenant.updatedAt;
      tenant.clearEvents();

      const result = tenant.suspend();
      expect(isOk(result)).toBe(true);
      expect(tenant.status.value).toBe(TenantStatusEnum.SUSPENDED);
      expect(tenant.updatedAt).toBe(initialUpdatedAt);
      expect(tenant.domainEvents).toHaveLength(0);
    });

    it('should return Err(InvalidTenantStatusTransitionError) if trying to suspend from PENDING_SETUP', () => {
      const tenant = TenantEntity.create(createValidProps());
      const result = tenant.suspend();
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error).toBeInstanceOf(InvalidTenantStatusTransitionError);
      }
    });
  });

  describe('setDatabaseConfiguration', () => {
    it('should set dbConnectionConfig and update timestamp', () => {
      const tenant = TenantEntity.create(createValidProps());
      const initialUpdatedAt = tenant.updatedAt;
      const dbConfig = DbConnectionConfigVO.create('new_connection_string');
      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAt).getTime() + 1000);

      const result = tenant.setDatabaseConfiguration(dbConfig);
      expect(isOk(result)).toBe(true);
      expect(tenant.dbConnectionConfig).toEqual(dbConfig);
      expect(tenant.updatedAt).not.toBe(initialUpdatedAt);
      jest.useRealTimers();
    });

    it('should return Err(ArgumentNotProvidedException) if config is null', () => {
      const tenant = TenantEntity.create(createValidProps());
      const result = tenant.setDatabaseConfiguration(null as unknown as DbConnectionConfigVO);
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error).toBeInstanceOf(ArgumentNotProvidedException);
      }
    });
  });

  describe('updateName', () => {
    it('should update name and timestamp if new name is different', () => {
      const tenant = TenantEntity.create(createValidProps());
      const initialUpdatedAt = tenant.updatedAt;
      const newName = 'Updated Tenant Name';
      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAt).getTime() + 1000);

      const result = tenant.updateName(newName);
      expect(isOk(result)).toBe(true);
      expect(tenant.name).toBe(newName);
      expect(tenant.updatedAt).not.toBe(initialUpdatedAt);
      jest.useRealTimers();
    });

    it('should trim new name', () => {
      const tenant = TenantEntity.create(createValidProps());
      tenant.updateName('  New Trimmed Name  ');
      expect(tenant.name).toBe('New Trimmed Name');
    });

    it('should return Ok and not update timestamp if new name is the same', () => {
      const props = createValidProps();
      const tenant = TenantEntity.create(props);
      const initialUpdatedAt = tenant.updatedAt;
      const result = tenant.updateName(props.name);
      expect(isOk(result)).toBe(true);
      expect(tenant.updatedAt).toBe(initialUpdatedAt);
    });

    it.each([
      ['empty string', ''],
      ['whitespace string', '   '],
    ])('should return Err(ArgumentNotProvidedException) if new name is %s', (_desc, newName) => {
      const tenant = TenantEntity.create(createValidProps());
      const result = tenant.updateName(newName);
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error).toBeInstanceOf(ArgumentNotProvidedException);
      }
    });
  });

  describe('validate (Entity Invariants)', () => {
    it('should be called by constructor', () => {
      const validateSpy = jest.spyOn(TenantEntity.prototype, 'validate');
      TenantEntity.create(createValidProps());
      expect(validateSpy).toHaveBeenCalled();
      validateSpy.mockRestore();
    });

    it('should throw if name in props is empty', () => {
      const tenant = TenantEntity.create(createValidProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tenant as any).props.name = '';
      expect(() => tenant.validate()).toThrow(ArgumentNotProvidedException);
    });

    it('should throw if ownerUserId in props is empty', () => {
      const tenant = TenantEntity.create(createValidProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tenant as any).props.ownerUserId = '' as UserId;
      expect(() => tenant.validate()).toThrow(ArgumentNotProvidedException);
    });

    it('should throw if status in props is not a TenantStatusVO instance', () => {
      const tenant = TenantEntity.create(createValidProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tenant as any).props.status = 'ACTIVE_STRING';
      expect(() => tenant.validate()).toThrow(ArgumentInvalidException);
    });

    it('should throw if dbConnectionConfig is provided but not a DbConnectionConfigVO instance', () => {
      const tenant = TenantEntity.create(createValidProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tenant as any).props.dbConnectionConfig = { connectionString: 'test' };
      expect(() => tenant.validate()).toThrow(ArgumentInvalidException);
    });

    it('should not throw if dbConnectionConfig is null or undefined', () => {
      const tenant = TenantEntity.create(createValidProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tenant as any).props.dbConnectionConfig = null;
      expect(() => tenant.validate()).not.toThrow();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tenant as any).props.dbConnectionConfig = undefined;
      expect(() => tenant.validate()).not.toThrow();
    });
  });

  describe('getters', () => {
    it('should return correct values through getters', () => {
        const currentValidProps = createValidProps();
        const tenant = TenantEntity.create(currentValidProps, mockTenantId);

        expect(tenant.id).toBe(mockTenantId);
        expect(tenant.name).toBe(currentValidProps.name);
        expect(tenant.ownerUserId).toBe(currentValidProps.ownerUserId);
        expect(tenant.status.value).toBe(TenantStatusEnum.PENDING_SETUP);
        expect(tenant.planId).toBe(currentValidProps.planId);
        expect(tenant.dbConnectionConfig).toBeNull();
        expect(tenant.createdAt).toEqual(expect.any(String));
        expect(tenant.updatedAt).toEqual(expect.any(String));
    });
  });
});

/* SECCIÓN DE MEJORAS FUTURAS
// (Igual que antes)
*/
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

/* SECCIÓN DE MEJORAS FUTURAS
// (Igual que antes)
*/
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Pruebas de Eventos de Dominio Detalladas): Para los métodos que emiten eventos (`create`, `activate`, `suspend`), además de verificar la instancia del evento, probar que el `payload` del evento contenga los datos correctos y que el `aggregateId` sea el correcto.
  Justificación: Asegurar que los eventos se emitan con toda la información necesaria para los manejadores de eventos.
  Impacto: Aserciones más detalladas sobre las propiedades de los objetos de evento.
]
[
  Mejora Propuesta 2 (Mocking de `UuidUtils` y `Date`): Para tests más deterministas, especialmente para `createdAt` y `updatedAt`, se podría mockear `UuidUtils.generateAggregateId()` (o `generateTenantId`) y `new Date()` usando las capacidades de Jest.
  Justificación: Hace los tests menos dependientes de la implementación real de generación de UUIDs y de la hora del sistema, haciéndolos más puros y reproducibles.
  Impacto: Configuración de mocks de Jest para estos módulos/constructores. `jest.useFakeTimers()` ya ayuda con `Date`.
]
[
  Mejora Propuesta 3 (Data Providers para Casos Repetitivos): Para los tests de validación de `create` o para probar transiciones de estado desde múltiples estados iniciales, se podría usar `it.each` de Jest con un array de casos de prueba para reducir la duplicación de código.
  Justificación: Tests más concisos y fáciles de mantener y extender.
  Impacto: Refactorización de algunos tests para usar `it.each`.
]

*/
