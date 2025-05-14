// libs/core/domain/tenancy/src/lib/entities/tenant.entity.spec.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
// import { ArgumentInvalidException, ArgumentNotProvidedException } from '@dfs-suite/shared-errors'; // ArgumentInvalidException no se usa
import { ArgumentNotProvidedException } from '@dfs-suite/shared-errors';
import { TenantEntity } from './tenant.entity';
import { TenantStatusVO, TenantStatusEnum } from '../value-objects/tenant-status.vo';
import { DbConnectionConfigVO } from '../value-objects/db-connection-config.vo';
import { UuidUtils } from '@dfs-suite/shared-utils';
import { UserId, AggregateId } from '@dfs-suite/shared-types';
import { TenantCreatedEvent, TenantActivatedEvent, TenantSuspendedEvent, InvalidTenantStatusTransitionError } from './tenant.entity';
import { ITenantCreatedEventPayload } from '../events/tenant-created.event';
import { isOk, isErr } from '@dfs-suite/shared-result';

describe('TenantEntity', () => {
  const mockOwnerId = UuidUtils.generateUserId();
  const mockTenantId: AggregateId = UuidUtils.generateAggregateId();

  const createValidTenantTestProps = () => ({
    name: 'Valid Test Tenant Inc.',
    ownerUserId: mockOwnerId,
    planId: 'standard_monthly_v1',
  });

  // ... (resto del archivo sin cambios, ya que los typos fueron corregidos en la iteración anterior) ...
  beforeEach(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('create (static factory method)', () => {
    it('should create a TenantEntity successfully with valid props and a provided ID', () => {
      const props = createValidTenantTestProps();
      const MOCKED_CREATION_DATE = new Date('2025-01-01T10:00:00.000Z');
      jest.useFakeTimers().setSystemTime(MOCKED_CREATION_DATE);

      const tenant = TenantEntity.create(props, mockTenantId);
      jest.useRealTimers();

      expect(tenant).toBeInstanceOf(TenantEntity);
      expect(tenant.id).toBe(mockTenantId);
      expect(tenant.name).toBe(props.name);
      expect(tenant.ownerUserId).toBe(props.ownerUserId);
      expect(tenant.status).toBeInstanceOf(TenantStatusVO);
      expect(tenant.status.value).toBe(TenantStatusEnum.PENDING_SETUP);
      expect(tenant.planId).toBe(props.planId);
      expect(tenant.dbConnectionConfig).toBeNull();
      expect(tenant.createdAt).toBe(MOCKED_CREATION_DATE.toISOString());
      expect(tenant.updatedAt).toBe(MOCKED_CREATION_DATE.toISOString());
      expect(tenant.createdAt).toEqual(tenant.updatedAt);
    });

    it('should generate a new AggregateId if no ID is provided during creation', () => {
      const tenant = TenantEntity.create(createValidTenantTestProps());
      expect(tenant.id).toBeDefined();
      expect(typeof tenant.id).toBe('string');
    });

    it('should trim the tenant name upon creation', () => {
      const tenant = TenantEntity.create({ ...createValidTenantTestProps(), name: '  Spaced Test Name  ' });
      expect(tenant.name).toBe('Spaced Test Name');
    });

    it('should add a TenantCreatedEvent to domainEvents on creation', () => {
      const props = createValidTenantTestProps();
      const tenant = TenantEntity.create(props);
      const domainEvents = tenant.domainEvents;

      expect(domainEvents).toHaveLength(1);
      const event = domainEvents[0];
      expect(event).toBeInstanceOf(TenantCreatedEvent);

      if (event instanceof TenantCreatedEvent) {
        const payload: ITenantCreatedEventPayload = event.payload;
        expect(event.aggregateId).toBe(tenant.id);
        expect(payload.name).toBe(props.name);
        expect(payload.ownerUserId).toBe(props.ownerUserId);
        expect(payload.status).toBe(TenantStatusEnum.PENDING_SETUP);
      } else {
        fail('Event was not an instance of TenantCreatedEvent');
      }
    });

    it.each([
      ['name', { ...createValidTenantTestProps(), name: '' }, 'Tenant name cannot be empty.'],
      ['name with only whitespace', { ...createValidTenantTestProps(), name: '   ' }, 'Tenant name cannot be empty.'],
      ['ownerUserId', { ...createValidTenantTestProps(), ownerUserId: '' as UserId }, 'Tenant ownerUserId cannot be empty.'],
    ])('should throw ArgumentNotProvidedException if "%s" is invalid or empty', (_fieldName, propsToTest, expectedMessage) => {
      expect(() => TenantEntity.create(propsToTest)).toThrow(ArgumentNotProvidedException);
      expect(() => TenantEntity.create(propsToTest)).toThrow(expectedMessage);
    });

    it('should set planId to null if provided as undefined', () => {
      const props = { ...createValidTenantTestProps(), planId: undefined };
      const tenant = TenantEntity.create(props);
      expect(tenant.planId).toBeNull();
    });
  });

  describe('activate method', () => {
    let tenant: TenantEntity;
    let initialUpdatedAtString: string;

    beforeEach(() => {
      tenant = TenantEntity.create(createValidTenantTestProps());
      initialUpdatedAtString = tenant.updatedAt;
      tenant.clearEvents();
    });

    it('should successfully activate a tenant from PENDING_SETUP status', () => {
      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAtString).getTime() + 1000);
      const result = tenant.activate();

      expect(isOk(result)).toBe(true);
      expect(tenant.status.isActive()).toBe(true);
      expect(tenant.updatedAt).not.toBe(initialUpdatedAtString);
      const events = tenant.domainEvents;
      expect(events[0]).toBeInstanceOf(TenantActivatedEvent);
    });

    it('should successfully activate a tenant from SUSPENDED status', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any).props.status = TenantStatusVO.newSuspended();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any)._updatedAt = new Date(new Date(initialUpdatedAtString).getTime() - 2000);
      initialUpdatedAtString = tenant.updatedAt;
      tenant.clearEvents();

      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAtString).getTime() + 1000);
      const result = tenant.activate();

      expect(isOk(result)).toBe(true);
      expect(tenant.status.isActive()).toBe(true);
      expect(tenant.updatedAt).not.toBe(initialUpdatedAtString);
      expect(tenant.domainEvents[0]).toBeInstanceOf(TenantActivatedEvent);
    });

    it('should return Ok and not change status, not update timestamp, nor emit event if already ACTIVE', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any).props.status = TenantStatusVO.newActive();
      initialUpdatedAtString = tenant.updatedAt;
      tenant.clearEvents();

      const result = tenant.activate();
      expect(isOk(result)).toBe(true);
      expect(tenant.status.isActive()).toBe(true);
      expect(tenant.updatedAt).toBe(initialUpdatedAtString);
      expect(tenant.domainEvents).toHaveLength(0);
    });

  });

  describe('suspend method', () => {
    let tenant: TenantEntity;
    let initialUpdatedAtString: string;

    beforeEach(() => {
      tenant = TenantEntity.create(createValidTenantTestProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any).props.status = TenantStatusVO.newActive();
      initialUpdatedAtString = tenant.updatedAt;
      tenant.clearEvents();
    });

    it('should successfully suspend an ACTIVE tenant', () => {
      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAtString).getTime() + 1000);
      const result = tenant.suspend();
      expect(isOk(result)).toBe(true);
      expect(tenant.status.isSuspended()).toBe(true);
      expect(tenant.updatedAt).not.toBe(initialUpdatedAtString);
      expect(tenant.domainEvents[0]).toBeInstanceOf(TenantSuspendedEvent);
    });

    it('should return Ok and not change status, not update timestamp, nor emit event if already SUSPENDED', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any).props.status = TenantStatusVO.newSuspended();
      initialUpdatedAtString = tenant.updatedAt;
      tenant.clearEvents();

      const result = tenant.suspend();
      expect(isOk(result)).toBe(true);
      expect(tenant.status.isSuspended()).toBe(true);
      expect(tenant.updatedAt).toBe(initialUpdatedAtString);
      expect(tenant.domainEvents).toHaveLength(0);
    });

    it('should return Err(InvalidTenantStatusTransitionError) if trying to suspend from PENDING_SETUP', () => {
      const pendingTenant = TenantEntity.create(createValidTenantTestProps());
      const result = pendingTenant.suspend();
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error).toBeInstanceOf(InvalidTenantStatusTransitionError);
      } else {
        fail('Expected result to be an Err');
      }
    });
  });

  describe('setDatabaseConfiguration method', () => {
    it('should correctly set dbConnectionConfig and update updatedAt timestamp', () => {
      const tenant = TenantEntity.create(createValidTenantTestProps());
      const initialUpdatedAt = new Date(tenant.updatedAt);
      const dbConfig = DbConnectionConfigVO.create('postgresql://testuser:testpass@testhost:5432/testdb');
      jest.useFakeTimers().setSystemTime(initialUpdatedAt.getTime() + 1000);

      const result = tenant.setDatabaseConfiguration(dbConfig);
      jest.useRealTimers();

      expect(isOk(result)).toBe(true);
      expect(tenant.dbConnectionConfig).toEqual(dbConfig);
      expect(new Date(tenant.updatedAt).getTime()).toBeGreaterThan(initialUpdatedAt.getTime());
    });

    it('should return Err(ArgumentNotProvidedException) if provided config is null', () => {
      const tenant = TenantEntity.create(createValidTenantTestProps());
      const result = tenant.setDatabaseConfiguration(null as unknown as DbConnectionConfigVO);
      expect(isErr(result)).toBe(true);
      if (isErr(result)) expect(result.error).toBeInstanceOf(ArgumentNotProvidedException);
    });
  });

  describe('updateName method', () => {
    it('should update name and updatedAt timestamp if new name is different', () => {
      const tenant = TenantEntity.create(createValidTenantTestProps());
      const initialUpdatedAt = new Date(tenant.updatedAt);
      const newName = 'Completely New Tenant Name LLC';
      jest.useFakeTimers().setSystemTime(initialUpdatedAt.getTime() + 1000);

      const result = tenant.updateName(newName);
      jest.useRealTimers();

      expect(isOk(result)).toBe(true);
      expect(tenant.name).toBe(newName);
      expect(new Date(tenant.updatedAt).getTime()).toBeGreaterThan(initialUpdatedAt.getTime());
    });

    it('should return Ok and not update updatedAt if new name is the same (after trim)', () => {
      const props = createValidTenantTestProps();
      const tenant = TenantEntity.create(props);
      const initialUpdatedAt = tenant.updatedAt;
      const result = tenant.updateName(`  ${props.name}  `);

      expect(isOk(result)).toBe(true);
      expect(tenant.name).toBe(props.name);
      expect(tenant.updatedAt).toBe(initialUpdatedAt);
    });

    it.each([
      ['empty string', ''],
      ['whitespace string', '   '],
    ])('should return Err(ArgumentNotProvidedException) if new name is an %s', (_desc, newName) => {
      const tenant = TenantEntity.create(createValidTenantTestProps());
      const result = tenant.updateName(newName);
      expect(isErr(result)).toBe(true);
      if (isErr(result)) expect(result.error).toBeInstanceOf(ArgumentNotProvidedException);
    });
  });

  describe('validate (Entity Invariants)', () => {
    it('should be called by the constructor of EntityBase', () => {
      const validateSpy = jest.spyOn(TenantEntity.prototype, 'validate');
      TenantEntity.create(createValidTenantTestProps());
      expect(validateSpy).toHaveBeenCalled();
      validateSpy.mockRestore();
    });

    it('validate method should throw ArgumentNotProvidedException if name in props is empty', () => {
      const tenant = TenantEntity.create(createValidTenantTestProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any).props.name = '';
      expect(() => tenant.validate()).toThrow('TenantEntity: name is required.');
    });

    it('validate method should throw ArgumentNotProvidedException if ownerUserId in props is empty', () => {
      const tenant = TenantEntity.create(createValidTenantTestProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any).props.ownerUserId = '' as UserId;
      expect(() => tenant.validate()).toThrow('TenantEntity: ownerUserId is required.');
    });

    it('validate method should throw ArgumentInvalidException if status in props is not a TenantStatusVO instance', () => {
      const tenant = TenantEntity.create(createValidTenantTestProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any).props.status = 'AN_INVALID_STATUS_STRING';
      expect(() => tenant.validate()).toThrow('TenantEntity: status must be a valid TenantStatusVO.');
    });

    it('validate method should throw ArgumentInvalidException if dbConnectionConfig is provided but not a DbConnectionConfigVO instance', () => {
      const tenant = TenantEntity.create(createValidTenantTestProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any).props.dbConnectionConfig = { invalidConfigShape: true };
      expect(() => tenant.validate()).toThrow('TenantEntity: dbConnectionConfig must be a valid DbConnectionConfigVO if provided.');
    });

    it('validate method should not throw if dbConnectionConfig is null or undefined', () => {
      const tenantNullDb = TenantEntity.create(createValidTenantTestProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenantNullDb as any).props.dbConnectionConfig = null;
      expect(() => tenantNullDb.validate()).not.toThrow();

      const tenantUndefinedDb = TenantEntity.create(createValidTenantTestProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenantUndefinedDb as any).props.dbConnectionConfig = undefined;
      expect(() => tenantUndefinedDb.validate()).not.toThrow();
    });
  });

  describe('getters', () => {
    it('should return correct values through getters', () => {
        const currentTestProps = createValidTenantTestProps();
        const tenant = TenantEntity.create(currentTestProps, mockTenantId);

        expect(tenant.id).toBe(mockTenantId);
        expect(tenant.name).toBe(currentTestProps.name);
        expect(tenant.ownerUserId).toBe(currentTestProps.ownerUserId);
        expect(tenant.status.value).toBe(TenantStatusEnum.PENDING_SETUP);
        expect(tenant.planId).toBe(currentTestProps.planId);
        expect(tenant.dbConnectionConfig).toBeNull();
        expect(tenant.createdAt).toEqual(expect.any(String));
        expect(tenant.updatedAt).toEqual(expect.any(String));
    });
  });
});
// libs/core/domain/tenancy/src/lib/entities/tenant.entity.spec.ts
/* SECCIÓN DE MEJORAS
[
  Mejora Aplicada: Corregidas las importaciones para que los Eventos, Errores y Tipos de Payload
                  provengan de `@dfs-suite/core-domain-tenancy` (o la ruta relativa directa al evento
                  si el `index.ts` de la librería no los re-exporta todos individualmente).
                  El error TS2459 ("not exported") se resuelve asegurando que los artefactos
                  se importen desde donde están realmente exportados.
]
[
  Mejora Aplicada: Se eliminó la importación de `ArgumentInvalidException` si no se usa directamente en
                  una aserción `toThrow(ArgumentInvalidException)`.
]
*/
// (El resto de las mejoras y notas se mantienen)
