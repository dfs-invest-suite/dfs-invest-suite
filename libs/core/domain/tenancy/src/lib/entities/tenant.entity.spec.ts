// libs/core/domain/tenancy/src/lib/entities/tenant.entity.spec.ts
import { ArgumentInvalidException, ArgumentNotProvidedException } from '@dfs-suite/shared-errors';
import { TenantEntity } from './tenant.entity'; // Import relativo para la entidad bajo test está bien
import { TenantStatusVO, TenantStatusEnum } from '../value-objects/tenant-status.vo'; // Import relativo OK
import { DbConnectionConfigVO } from '../value-objects/db-connection-config.vo'; // Import relativo OK
import { UuidUtils } from '@dfs-suite/shared-utils';
import { UserId, AggregateId } from '@dfs-suite/shared-types';
// CORRECCIÓN: Usar el alias de la librería para importar otros artefactos del mismo dominio
import {
  TenantCreatedEvent,
  TenantActivatedEvent,
  TenantSuspendedEvent,
  InvalidTenantStatusTransitionError,
  // ITenantCreatedEventPayload, // No es necesario importar si se usa event.payload['property']
} from '@dfs-suite/core-domain-tenancy'; // Alias de la librería
import { isOk, isErr } from '@dfs-suite/shared-result';
// ITenantCreatedEventPayload se importa desde el evento mismo
import type { ITenantCreatedEventPayload } from '../events/tenant-created.event';


describe('TenantEntity', () => {
  const mockOwnerId = UuidUtils.generateUserId();
  const mockTenantId: AggregateId = UuidUtils.generateAggregateId();

  const createValidTestProps = () => ({
    name: 'Valid Test Tenant Inc.',
    ownerUserId: mockOwnerId,
    planId: 'standard_monthly_v1',
  });

  describe('create (static factory method)', () => {
    it('should create a TenantEntity successfully with valid props and a provided ID', () => {
      const props = createValidTestProps();
      const tenant = TenantEntity.create(props, mockTenantId);

      expect(tenant).toBeInstanceOf(TenantEntity);
      expect(tenant.id).toBe(mockTenantId);
      expect(tenant.name).toBe(props.name);
      expect(tenant.ownerUserId).toBe(props.ownerUserId);
      expect(tenant.status).toBeInstanceOf(TenantStatusVO);
      expect(tenant.status.value).toBe(TenantStatusEnum.PENDING_SETUP);
      expect(tenant.planId).toBe(props.planId);
      expect(tenant.dbConnectionConfig).toBeNull();
      expect(tenant.createdAt).toEqual(expect.any(String));
      expect(tenant.updatedAt).toEqual(expect.any(String));
      expect(tenant.createdAt).toEqual(tenant.updatedAt);
    });

    it('should generate a new AggregateId if no ID is provided during creation', () => {
      const tenant = TenantEntity.create(createValidTestProps());
      expect(tenant.id).toBeDefined();
      expect(typeof tenant.id).toBe('string');
    });

    it('should trim the tenant name upon creation', () => {
      const tenant = TenantEntity.create({ ...createValidTestProps(), name: '  Spaced Test Name  ' });
      expect(tenant.name).toBe('Spaced Test Name');
    });

    it('should add a TenantCreatedEvent to domainEvents on creation', () => {
      const props = createValidTestProps();
      const tenant = TenantEntity.create(props);
      const domainEvents = tenant.domainEvents;

      expect(domainEvents).toHaveLength(1);
      const event = domainEvents[0];
      expect(event).toBeInstanceOf(TenantCreatedEvent);

      if (event instanceof TenantCreatedEvent) {
        // Acceder a propiedades del payload usando notación de corchetes si ITenantCreatedEventPayload tiene firma de índice
        // o directamente si no la tiene y los tipos son compatibles.
        // Con la firma de índice "[key: string]: unknown | string | UserId | TenantStatusEnum;" en ITenantCreatedEventPayload,
        // el acceso con punto debería funcionar si las propiedades están bien definidas.
        // Si persiste el error TS4111, se usa event.payload['propertyName']
        const payload = event.payload as ITenantCreatedEventPayload; // Cast para asegurar el tipo
        expect(event.aggregateId).toBe(tenant.id);
        expect(payload.name).toBe(props.name);
        expect(payload.ownerUserId).toBe(props.ownerUserId);
        expect(payload.status).toBe(TenantStatusEnum.PENDING_SETUP);
      } else {
        fail('Event was not an instance of TenantCreatedEvent');
      }
    });

    it.each([
      ['name', { ...createValidTestProps(), name: '' }, 'Tenant name cannot be empty.'],
      ['name with only whitespace', { ...createValidTestProps(), name: '   ' }, 'Tenant name cannot be empty.'],
      ['ownerUserId', { ...createValidTestProps(), ownerUserId: '' as UserId }, 'Tenant ownerUserId cannot be empty.'],
    ])('should throw ArgumentNotProvidedException if "%s" is invalid or empty', (_fieldName, propsToTest, expectedMessage) => {
      expect(() => TenantEntity.create(propsToTest)).toThrow(ArgumentNotProvidedException);
      expect(() => TenantEntity.create(propsToTest)).toThrow(expectedMessage);
    });

    it('should set planId to null if provided as undefined', () => {
      const props = { ...createValidTestProps(), planId: undefined };
      const tenant = TenantEntity.create(props);
      expect(tenant.planId).toBeNull();
    });
  });

  describe('activate method', () => {
    let tenant: TenantEntity;
    let initialUpdatedAtString: string; // Guardar como string para comparación directa

    beforeEach(() => {
      tenant = TenantEntity.create(createValidTestProps());
      initialUpdatedAtString = tenant.updatedAt;
      tenant.clearEvents();
       // Mover jest.useFakeTimers y setSystemTime dentro de cada 'it' donde sea necesario
    });

    afterEach(() => {
      jest.useRealTimers(); // Asegurar que los timers se restauran
    });

    it('should successfully activate a tenant from PENDING_SETUP status', () => {
      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAtString).getTime() + 1000);
      const result = tenant.activate();
      expect(isOk(result)).toBe(true);
      expect(tenant.status.isActive()).toBe(true);
      expect(tenant.updatedAt).not.toBe(initialUpdatedAtString);
      expect(tenant.domainEvents[0]).toBeInstanceOf(TenantActivatedEvent); // Era [tenant.domainEvents.length -1]
    });

    it('should successfully activate a tenant from SUSPENDED status', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any).props.status = TenantStatusVO.newSuspended();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any)._updatedAt = new Date(new Date(initialUpdatedAtString).getTime() - 2000); // Forzar updatedAt anterior
      initialUpdatedAtString = tenant.updatedAt; // Recapturar
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
      initialUpdatedAtString = tenant.updatedAt; // Recapturar por si acaso
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
      tenant = TenantEntity.create(createValidTestProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any).props.status = TenantStatusVO.newActive();
      initialUpdatedAtString = tenant.updatedAt;
      tenant.clearEvents();
    });

    afterEach(() => {
      jest.useRealTimers();
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
      const pendingTenant = TenantEntity.create(createValidTestProps());
      const result = pendingTenant.suspend();
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error).toBeInstanceOf(InvalidTenantStatusTransitionError);
      } else {
        fail('Expected result to be an Err');
      }
    });
  });

  // ... (Resto de los describe blocks se mantienen igual que la versión anterior, usando createValidTestProps)
  describe('setDatabaseConfiguration method', () => {
    it('should correctly set dbConnectionConfig and update updatedAt timestamp', () => {
      const tenant = TenantEntity.create(createValidTestProps());
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
      const tenant = TenantEntity.create(createValidTestProps());
      const result = tenant.setDatabaseConfiguration(null as unknown as DbConnectionConfigVO);
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error).toBeInstanceOf(ArgumentNotProvidedException);
      }
    });
  });

  describe('updateName method', () => {
    it('should update name and updatedAt timestamp if new name is different', () => {
      const tenant = TenantEntity.create(createValidTestProps());
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
      const props = createValidTestProps();
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
      const tenant = TenantEntity.create(createValidTestProps());
      const result = tenant.updateName(newName);
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error).toBeInstanceOf(ArgumentNotProvidedException);
      }
    });
  });

  describe('validate (Entity Invariants)', () => {
    it('should be called by the constructor of EntityBase', () => {
      const validateSpy = jest.spyOn(TenantEntity.prototype, 'validate');
      TenantEntity.create(createValidTestProps());
      expect(validateSpy).toHaveBeenCalled();
      validateSpy.mockRestore();
    });

    it('validate method should throw ArgumentNotProvidedException if name in props is empty', () => {
      const tenant = TenantEntity.create(createValidTestProps());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (tenant as any).props.name = '';
      expect(() => tenant.validate()).toThrow('TenantEntity: name is required.');
    });
    // ... (otros tests de validate)
  });

  describe('getters', () => {
    it('should return correct values through getters', () => {
        const currentTestProps = createValidTestProps();
        const tenant = TenantEntity.create(currentTestProps, mockTenantId);

        expect(tenant.id).toBe(mockTenantId);
        expect(tenant.name).toBe(currentTestProps.name);
        // ...
    });
  });
});

/* SECCIÓN DE MEJORAS FUTURAS
// (Mismas que antes)
*/
// libs/core/domain/tenancy/src/lib/entities/tenant.entity.spec.ts
/* SECCIÓN DE MEJORAS FUTURAS
// (Mismas que antes)
*/
// libs/core/domain/tenancy/src/lib/entities/tenant.entity.spec.ts
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Tests Detallados de Payloads de Eventos):
    Descripción: Expandir las aserciones para los eventos de dominio emitidos (`TenantCreatedEvent`, `TenantActivatedEvent`, `TenantSuspendedEvent`) para verificar no solo la instancia del evento, sino también la exactitud e integridad de cada propiedad dentro del `payload` del evento. Por ejemplo, para `TenantCreatedEvent`, asegurar que `event.payload['name']`, `event.payload['ownerUserId']`, y `event.payload['status']` coincidan con los datos usados para crear la entidad.
    Justificación: Garantiza que los eventos, que son contratos cruciales para la comunicación desacoplada y la lógica reactiva, transporten la información correcta y completa. Esto es vital para la fiabilidad de los manejadores de eventos.
    Impacto: Incremento en el número de aserciones dentro de los tests que verifican la emisión de eventos. Puede requerir un manejo más detallado de los datos de prueba para cubrir diferentes escenarios de payload.
]
[
  Mejora Propuesta 2 (Mocking Avanzado de Dependencias para Determinismo en Tests):
    Descripción: Implementar mocking para `UuidUtils.generateAggregateId()` (y otros generadores de ID si se usan) y para el constructor `new Date()` utilizando las capacidades de Jest (`jest.spyOn`, `jest.mock`, `jest.setSystemTime` para control granular sobre `Date.now()` y `new Date()`).
    Justificación: Elimina la variabilidad de IDs generados aleatoriamente y de los timestamps del sistema, haciendo los tests unitarios completamente deterministas, puros y repetibles. Permite aserciones exactas sobre los valores de `id`, `createdAt`, y `updatedAt`.
    Impacto: Requiere configurar mocks de Jest, usualmente en bloques `beforeEach` o `beforeAll`. Los tests necesitarán ser ajustados para hacer aserciones contra los valores mockeados (UUIDs y timestamps predefinidos).
]
[
  Mejora Propuesta 3 (Uso Extensivo de `it.each` para Parametrización de Casos de Prueba):
    Descripción: Para los bloques de tests que evalúan múltiples variaciones de entradas (especialmente validaciones en `create` o métodos de actualización) o diferentes transiciones de estado, refactorizar para usar `it.each` de Jest. Esto permite definir una tabla de casos de prueba (entradas y salidas esperadas) y ejecutar la misma lógica de test para cada caso.
    Justificación: Resulta en tests más concisos (DRY), legibles y fáciles de mantener y extender con nuevos escenarios de validación sin duplicar la lógica del test.
    Impacto: Refactorización de los tests de validación existentes.
]
[
  Mejora Propuesta 4 (Pruebas Exhaustivas y Aisladas para el Método `validate()`):
    Descripción: Mantener y expandir los tests dedicados a probar la lógica de `validate()` de forma aislada. Esto implica crear instancias de la entidad, luego manipular sus propiedades internas (usando `(entity as any).props.propertyName = ...` exclusivamente para fines de test) para simular estados que violarían un invariante, y finalmente llamar explícitamente a `entity.validate()` para asegurar que detecte la inconsistencia y lance la excepción apropiada.
    Justificación: Permite probar la lógica de validación de invariantes de forma directa, cubriendo estados que podrían no ser alcanzables a través de la API pública de la entidad pero que `validate()` debe proteger.
    Impacto: Continuar el desarrollo de tests en el `describe('validate (Entity Invariants)', ...)` para cubrir cada regla de invariante definida en `TenantEntity.validate()`.
]
[
  Mejora Propuesta 5 (Pruebas para Mecánica de Eventos de `AggregateRoot`):
    Descripción: Añadir tests específicos para los métodos `clearEvents()` y `getAndClearDomainEvents()` heredados de `AggregateRoot`. Estos tests deben verificar que `clearEvents()` vacía la cola de eventos y que `getAndClearDomainEvents()` retorna los eventos correctamente y luego limpia la cola.
    Justificación: Valida la correcta operación de la gestión de eventos de dominio, que es fundamental para la capa de persistencia y para la comunicación reactiva.
    Impacto: Creación de nuevos casos de test que involucren añadir múltiples eventos, llamar a estos métodos y verificar el estado y contenido de `tenant.domainEvents`.
]
[
  Mejora Propuesta 6 (Tests para Lógica de Negocio en VOs):
    Si los Value Objects como `TenantStatusVO` o `DbConnectionConfigVO` evolucionan para tener lógica de negocio más compleja (ej. `TenantStatusVO.canTransitionTo(newState)`) más allá de la validación en el constructor, se deberán añadir tests unitarios para cubrir esa nueva lógica.
    Justificación: Asegurar la corrección de toda la lógica encapsulada en los VOs.
    Impacto: Expansión de los archivos `.spec.ts` de los VOs correspondientes.
]

*/
// libs/core/domain/tenancy/src/lib/entities/tenant.entity.spec.ts
/* SECCIÓN DE MEJORAS FUTURAS
// (Mismas que antes)
*/
// libs/core/domain/tenancy/src/lib/entities/tenant.entity.spec.ts


/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Pruebas Detalladas de Payloads de Eventos de Dominio):
    Actualmente, los tests verifican la instancia del evento emitido (ej. `toBeInstanceOf(TenantCreatedEvent)`). Una mejora sería expandir estas aserciones para verificar que el `payload` de cada evento contenga exactamente los datos esperados (nombre, ownerUserId, status, etc.) y que el `aggregateId` del evento coincida con el `id` de la entidad.
    Justificación: Asegura que los eventos no solo se emitan, sino que lleven la información correcta y completa, lo cual es crucial para los manejadores de eventos que consumirán esta información.
    Impacto: Adición de más aserciones `expect(event.payload.propertyName).toBe(...)` en los tests de los métodos que emiten eventos.
]
[
  Mejora Propuesta 2 (Mocking de Dependencias Externas en Tests: `UuidUtils` y `Date`):
    Para lograr tests unitarios más puros y deterministas, especialmente al verificar la generación de IDs y los timestamps `createdAt`/`updatedAt`, se podría mockear `UuidUtils.generateAggregateId()` (y otros generadores de ID) y el constructor `new Date()` usando las capacidades de Jest (`jest.spyOn`, `jest.mock`, `jest.setSystemTime`).
    Justificación: Desacopla los tests de la implementación específica de `uuid` y de la hora real del sistema, permitiendo aserciones exactas sobre los valores generados y los timestamps, haciendo los tests más robustos y repetibles independientemente del entorno.
    Impacto: Requeriría configurar mocks de Jest, usualmente en un bloque `beforeEach` o al inicio del archivo de test. Los tests necesitarían ser ajustados para hacer aserciones contra los valores mockeados (ej. `expect(UuidUtils.generateAggregateId).toHaveBeenCalled()`).
]
[
  Mejora Propuesta 3 (Uso Extensivo de `it.each` para Casos de Prueba Parametrizados):
    Para los bloques `describe` que prueban múltiples variaciones de entradas inválidas (ej. en `create` para `name` y `ownerUserId`, o en `updateName`), se puede usar `it.each` de Jest para definir una tabla de casos de prueba. Esto reduce la duplicación de código y hace más fácil añadir nuevos casos de validación.
    Justificación: Conduce a tests más concisos, legibles y fáciles de mantener (DRY - Don't Repeat Yourself).
    Impacto: Refactorización de los tests de validación para utilizar la sintaxis de `it.each`.
]
[
  Mejora Propuesta 4 (Pruebas Específicas para Invariantes Complejos en `validate()`):
    Si el método `validate()` de `TenantEntity` evoluciona para incluir invariantes más complejos que dependan de la combinación de múltiples propiedades (ej. "si el plan es X, entonces la configuración Y debe existir"), se deberían añadir tests específicos que fuercen esos estados inválidos (usando el acceso a `props` con `as any` como ya se hace) y verifiquen que `validate()` los detecta correctamente.
    Justificación: Asegurar que todos los invariantes del dominio sean correctamente protegidos por la entidad.
    Impacto: Adición de nuevos casos de test en el `describe('validate (Entity Invariants)', ...)` que exploren estas combinaciones de propiedades.
]
[
  Mejora Propuesta 5 (Pruebas para `clearEvents()` y `getAndClearDomainEvents()`):
    Añadir tests específicos para verificar que `clearEvents()` efectivamente vacía la cola de eventos y que `getAndClearDomainEvents()` retorna los eventos correctamente y luego limpia la cola.
    Justificación: Validar la mecánica de la gestión de eventos del `AggregateRoot`, que es crucial para la correcta publicación de eventos por la capa de persistencia.
    Impacto: Creación de nuevos tests que involucren añadir eventos, llamar a estos métodos y verificar el estado de `tenant.domainEvents`.
]
*/
// libs/core/domain/tenancy/src/lib/entities/tenant.entity.spec.ts
// SECCIÓN DE MEJORAS CONSOLIDADAS Y NOTAS PARA IMPLEMENTACIÓN FUTURA
/*
Este bloque consolida las mejoras propuestas para la entidad `TenantEntity` y sus pruebas asociadas.
El objetivo es tener una visión unificada de las optimizaciones y refactorizaciones pendientes
para elevar la calidad, mantenibilidad y robustez del código.

Consideraciones Generales para la Implementación de Mejoras:
1.  Priorización: Evaluar el impacto y el esfuerzo de cada mejora para priorizar su implementación.
2.  Incrementalidad: Aplicar mejoras de forma incremental, verificando con tests en cada paso.
3.  Consistencia: Mantener la consistencia con los patrones y convenciones del proyecto.
4.  Documentación: Actualizar la documentación y comentarios relevantes al implementar cambios.
5.  Testing: Asegurar que todas las mejoras estén cubiertas por tests unitarios y de integración robustos.

--- INICIO DE MEJORAS PROPUESTAS CONSOLIDADAS ---

[
  Mejora Propuesta 1: Pruebas de Eventos de Dominio Detalladas y Rigurosas
    Descripción:
      Para todos los métodos de la entidad `TenantEntity` que emiten eventos de dominio (por ejemplo, `create`, `activate`, `suspend`, `updateName`, `setDatabaseConfiguration`), es crucial no solo verificar la instancia del evento emitido (usando `toBeInstanceOf`), sino también probar rigurosamente el contenido completo del `payload` del evento. Esto incluye:
        1.  Que el `aggregateId` del evento coincida exactamente con el ID de la entidad que lo emitió.
        2.  Que todas las propiedades esperadas dentro del `payload` del evento estén presentes y contengan los valores correctos y actualizados según la operación realizada.
        3.  Verificar que no se incluyan propiedades inesperadas en el `payload`.
    Justificación Técnica:
      Los eventos de dominio son contratos fundamentales dentro de una arquitectura DDD. Los manejadores de eventos (event handlers) dependen completamente de la exactitud e integridad de la información contenida en estos eventos para realizar sus propias lógicas (actualizar otras proyecciones, enviar notificaciones, ejecutar sagas, etc.). Si un evento se emite con información incorrecta o incompleta, puede llevar a inconsistencias de datos, fallos en procesos aguas abajo y comportamientos erróneos del sistema que son difíciles de rastrear. Pruebas detalladas del payload mitigan este riesgo significativamente.
    Impacto en el Proyecto:
      -   Expansión considerable de las aserciones en los tests unitarios que verifican la emisión de eventos.
      -   Necesidad de comparar cada propiedad relevante del payload del evento.
      -   Puede requerir la creación de datos de prueba más específicos para verificar diferentes escenarios de payload.
      -   Incremento en el tiempo de mantenimiento de los tests si la estructura del payload de los eventos cambia frecuentemente, aunque esto también sirve como una señal para estabilizar dichos contratos.
    Ejemplo de Implementación (Conceptual):
      ```typescript
      // En tenant.entity.spec.ts
      const events = tenant.getAndClearDomainEvents();
      expect(events[0]).toBeInstanceOf(TenantCreatedEvent);
      const createdEventPayload = (events[0] as TenantCreatedEvent).payload;
      expect(createdEventPayload.id).toEqual(tenant.id.value);
      expect(createdEventPayload.name).toEqual(props.name);
      // ... más aserciones para otras propiedades del payload
      ```
]

[
  Mejora Propuesta 2: Mocking Avanzado para Determinismo en Tests (UUIDs y Timestamps)
    Descripción:
      Para lograr tests unitarios más deterministas, controlados y puros, se debe implementar el mocking de:
        1.  Generadores de Identificadores Únicos: Específicamente, `UuidUtils.generate()` (o cualquier método específico como `generateAggregateId`, `generateTenantId`).
        2.  Constructores de Fechas y Timestamps: El constructor `new Date()`.
      Esto se puede lograr utilizando las capacidades de mocking de Jest, como `jest.spyOn` para interceptar y reemplazar la implementación de estos métodos/constructores, o `jest.mock` para reemplazar módulos completos. `jest.useFakeTimers()` ya está en uso y es útil para controlar el flujo del tiempo (ej. `Date.now()`, `setTimeout`), pero mockear `new Date()` directamente proporciona control sobre el timestamp exacto devuelto por cada nueva instancia de `Date`.
    Justificación Técnica:
      -   Independencia de Implementación: Los tests se vuelven independientes de la implementación real de la generación de UUIDs (ej. algoritmo, librería subyacente) y de la hora del sistema.
      -   Repetibilidad Absoluta: Elimina cualquier variabilidad introducida por la generación aleatoria de IDs o por la hora actual del sistema, asegurando que los tests produzcan el mismo resultado cada vez que se ejecutan.
      -   Aserciones Exactas: Permite realizar aserciones precisas sobre los valores de `id`, `createdAt`, y `updatedAt`, ya que se conocerán los valores mockeados de antemano.
      -   Pureza de Tests: Contribuye a que los tests unitarios sean más "puros", enfocándose únicamente en la lógica de la unidad bajo prueba sin efectos secundarios de dependencias externas no controladas.
    Impacto en el Proyecto:
      -   Requiere configuración adicional de mocks en los archivos de test, típicamente en bloques `beforeEach` o `beforeAll`, o por caso de test individual si es necesario.
      -   Los tests necesitarán ser actualizados para realizar aserciones contra los valores mockeados (UUIDs y timestamps predefinidos).
      -   Puede implicar una ligera curva de aprendizaje para configurar y gestionar estos mocks correctamente.
    Ejemplo de Implementación (Conceptual):
      ```typescript
      // En tenant.entity.spec.ts
      import * as UuidUtils from '@dfs-suite/shared-utils'; // Asumiendo exportación nombrada

      jest.mock('@dfs-suite/shared-utils', () => ({
        ...jest.requireActual('@dfs-suite/shared-utils'), // Mantiene otras utilidades
        UuidUtils: {
          ...jest.requireActual('@dfs-suite/shared-utils').UuidUtils,
          generate: jest.fn(() => 'mocked-uuid-123'), // Mockea solo generate
        },
      }));

      const MOCKED_DATE = new Date('2025-01-01T00:00:00.000Z');
      jest.spyOn(global, 'Date').mockImplementation(() => MOCKED_DATE as any);
      // ... luego en los tests:
      // expect(tenant.id.value).toBe('mocked-uuid-123');
      // expect(tenant.createdAt).toEqual(MOCKED_DATE);
      ```
]

[
  Mejora Propuesta 3: Uso Extensivo de Data Providers (`it.each`) para Casos de Prueba Repetitivos
    Descripción:
      Para los escenarios de prueba que involucran la validación de múltiples condiciones o la prueba de transiciones de estado desde varios estados iniciales, se debe adoptar de forma más generalizada la funcionalidad `it.each` de Jest. Esto es particularmente útil para:
        1.  Tests de validación en el método `create` o constructores, donde se prueban diferentes conjuntos de propiedades inválidas.
        2.  Tests de métodos que cambian el estado de la entidad (ej. `activate`, `suspend`), donde se necesita probar cómo responde la entidad desde diferentes estados iniciales válidos o inválidos.
        3.  Tests de lógica de `validate()` que verifican múltiples invariantes.
    Justificación Técnica:
      -   DRY (Don't Repeat Yourself): Reduce significativamente la duplicación de código en los tests, ya que la lógica de prueba se escribe una vez y se parametriza con diferentes conjuntos de datos de entrada/salida.
      -   Concisión y Legibilidad: Hace que los archivos de test sean más cortos y fáciles de leer, ya que los casos de prueba se definen de manera tabular o como un array de objetos.
      -   Mantenibilidad y Extensibilidad: Es más fácil añadir, modificar o eliminar casos de prueba individuales sin afectar la lógica de prueba principal. Extender con nuevos escenarios se vuelve trivial.
    Impacto en el Proyecto:
      -   Refactorización de los tests existentes que prueban múltiples variaciones de una misma lógica para utilizar la sintaxis de `it.each`.
      -   Puede requerir una reestructuración de cómo se definen los datos de prueba.
      -   Mejora la calidad general y la eficiencia del conjunto de pruebas.
    Ejemplo de Implementación (Conceptual):
      ```typescript
      // En tenant.entity.spec.ts
      describe('create validation with it.each', () => {
        const invalidPropsTestCases = [
          { props: { name: '' }, expectedErrorFragment: 'name should not be empty' },
          { props: { ownerUserId: null }, expectedErrorFragment: 'ownerUserId is required' },
          // ... más casos
        ];
        it.each(invalidPropsTestCases)('should throw if props are invalid: $expectedErrorFragment', ({ props, expectedErrorFragment }) => {
          const creationAttempt = () => TenantEntity.create({ ...validTenantProps, ...props });
          expect(creationAttempt).toThrow(expectedErrorFragment);
        });
      });
      ```
]

[
  Mejora Propuesta 4: Pruebas Aisladas y Exhaustivas para el Método `validate()`
    Descripción:
      Si bien el método `validate()` es invocado internamente por el constructor (o el método `create`) y por otros métodos que modifican el estado de la entidad, es beneficioso tener un conjunto de pruebas dedicadas que aíslen y prueben exhaustivamente la lógica de validación de invariantes de la entidad. Esto implica:
        1.  Mantener y refinar los tests que crean una instancia válida de la entidad.
        2.  Posteriormente, modificar las propiedades internas de esta instancia de forma controlada (incluso si esto implica acceder a propiedades privadas o protegidas, típicamente usando `(entity as any).props.propertyName = ...` solo para fines de prueba) para llevarla a un estado que viole una invariante específica.
        3.  Llamar explícitamente al método `entity.validate()` y asegurar que detecta la inconsistencia y lanza la excepción apropiada o devuelve el `Result.Err` esperado.
      Los tests actualmente existentes en la sección `describe('validate (Entity Invariants)', ...)` o `describe('hypothetical invalid states')` ya siguen esta filosofía y deben ser mantenidos y expandidos.
    Justificación Técnica:
      -   Aislamiento de Lógica: Permite probar la lógica de validación de invariantes de forma directa y aislada, sin depender del flujo completo del constructor o de otros métodos.
      -   Cobertura de Casos Límite: Facilita la prueba de estados internamente inválidos que podrían no ser fácilmente alcanzables a través de la API pública de la entidad, pero que la lógica de `validate()` debería ser capaz de manejar.
      -   Claridad: Hace más explícito qué invariantes se están probando.
    Impacto en el Proyecto:
      -   Continuar desarrollando y refinando los tests unitarios bajo la descripción `validate (Entity Invariants)`.
      -   Asegurar que cada invariante definida en la entidad tenga al menos un caso de prueba correspondiente en esta sección.
]

[
  Mejora Propuesta 5: Pruebas Específicas para la Mecánica de Gestión de Eventos del `AggregateRoot`
    Descripción:
      Añadir tests unitarios específicos para los métodos `clearEvents()` y `getAndClearDomainEvents()` heredados de la clase base `AggregateRoot` (y accesibles a través de `TenantEntity`). Estas pruebas deben verificar:
        1.  `getAndClearDomainEvents()`: Que devuelve correctamente todos los eventos de dominio registrados desde la última limpieza y que, después de la llamada, la lista interna de eventos está vacía.
        2.  `clearEvents()`: Que después de su invocación, la lista interna de eventos está vacía, incluso si había eventos registrados previamente.
        3.  Interacción entre ambos: Por ejemplo, registrar eventos, llamar a `getAndClearDomainEvents`, y luego verificar que una segunda llamada a `getAndClearDomainEvents` (o a `getDomainEvents()`) devuelve una lista vacía.
    Justificación Técnica:
      La correcta gestión de la cola de eventos de dominio es fundamental para el patrón `AggregateRoot`. Estos eventos son la forma en que el agregado comunica cambios a otras partes del sistema. Asegurar que la mecánica de añadir, obtener y limpiar eventos funcione como se espera es crucial para la fiabilidad del sistema de eventos de dominio.
    Impacto en el Proyecto:
      -   Creación de nuevos casos de test específicos para estos métodos dentro de `tenant.entity.spec.ts` (o en un test para `aggregate-root.base.spec.ts` si se prefiere probar la clase base directamente, aunque probarlo a través de una implementación concreta como `TenantEntity` también es válido).
]

[
  Mejora Propuesta 6: Refactorización de Logging (Traslado a la Capa de Aplicación)
    Descripción:
      La lógica de logging directo ha sido eliminada de la entidad `TenantEntity`, lo cual es una buena práctica. Para asegurar una observabilidad adecuada, el logging contextual relacionado con las operaciones de la entidad (por ejemplo, "Tenant con ID 'xyz' fue activado por el Usuario 'abc'") debe ser implementado consistentemente en los Casos de Uso (Servicios de Aplicación) que orquestan estas operaciones. Estos Casos de Uso deberían utilizar el `ILoggerPort` para registrar esta información.
    Justificación Técnica:
      -   Separación de Responsabilidades (SRP): Mantiene la entidad de dominio enfocada exclusivamente en la lógica de negocio pura y la gestión de su estado. El logging es una preocupación transversal que se maneja mejor en capas superiores.
      -   Contexto Enriquecido: Los Casos de Uso tienen acceso a más contexto (como el `UserId` del actor, `CorrelationId`, etc.) que puede ser incluido en los logs, haciéndolos más útiles para la depuración y auditoría.
    Impacto en el Proyecto:
      -   No hay cambios directos en `TenantEntity`.
      -   Requiere que los Casos de Uso que interactúan con `TenantEntity` (ej. `ActivateTenantUseCase`, `CreateTenantUseCase`) inyecten `ILoggerPort` y registren logs informativos antes y después de invocar métodos de la entidad.
]

[
  Mejora Propuesta 7: Introducción de Value Objects para Identificadores y Conceptos Clave
    Descripción:
      Identificadores como `planId` (actualmente `Maybe<string>`) y otros conceptos que tienen reglas de validación o un significado semántico específico deberían ser representados mediante Value Objects (VOs) dedicados. Por ejemplo:
        -   `PlanIdVO`: Podría encapsular el formato y la validación de un `planId` (ej. si debe ser un UUID, una cadena con un prefijo específico, o si debe existir en un sistema de facturación).
        -   (Otros VOs podrían surgir para propiedades como `settings` si tienen una estructura compleja y reglas propias).
    Justificación Técnica:
      -   Robustez y Type Safety: Los VOs aseguran que solo se puedan asignar valores válidos a estas propiedades, moviendo la validación al punto de creación del VO.
      -   Semántica Enriquecida: Aumenta la expresividad del modelo de dominio. `PlanIdVO` es más significativo que `string`.
      -   Inmutabilidad y Comparación por Valor: Los VOs son inmutables y se comparan por su valor, lo que simplifica la lógica y reduce errores.
    Impacto en el Proyecto:
      -   Creación de nuevas clases de Value Objects (ej. `plan-id.vo.ts`).
      -   Modificación de `TenantProps` para usar estos nuevos VOs en lugar de tipos primitivos.
      -   Ajustes en la lógica de creación/actualización de `TenantEntity` para instanciar y manejar estos VOs.
      -   Actualización de mappers y DTOs para convertir entre VOs y representaciones primitivas cuando sea necesario (ej. para persistencia o API).
]

[
  Mejora Propuesta 8: Gestión de `TenantConfigurationEntity` como Parte Integral del Agregado `TenantEntity`
    Descripción:
      Si las `TenantConfigurationEntity` se consideran intrínsecamente ligadas al ciclo de vida y a las invariantes del `TenantEntity` (es decir, un `TenantEntity` "posee" y es responsable de la consistencia de sus configuraciones), entonces el modelo de dominio debería reflejar esto tratando a `TenantEntity` como la raíz de un agregado que incluye sus configuraciones. Esto implicaría:
        1.  Modificar `TenantProps` para incluir una colección de configuraciones: `configurations: TenantConfigurationEntity[]`.
        2.  `TenantEntity` tendría métodos públicos para añadir, actualizar o eliminar configuraciones (ej. `addConfiguration(configProps: TenantConfigurationProps): Result<void, Error>`, `updateConfiguration(configId: TenantConfigurationId, newValues: Partial<TenantConfigurationProps>): Result<void, Error>`).
        3.  Estos métodos asegurarían que cualquier cambio en las configuraciones mantenga la consistencia del agregado `TenantEntity` completo, aplicando validaciones que podrían involucrar tanto el estado del `Tenant` como el de sus configuraciones.
        4.  `TenantConfigurationEntity` seguiría siendo una entidad (con su propio ID), pero no sería un `AggregateRoot` independiente si forma parte del agregado `Tenant`. Su ciclo de vida estaría gestionado por `TenantEntity`.
    Justificación Técnica:
      -   Modelado DDD Preciso: Refleja con mayor precisión una fuerte relación de composición y responsabilidad transaccional si las configuraciones no pueden existir o no tienen sentido fuera del contexto de un `Tenant` y si sus invariantes dependen del estado del `Tenant`.
      -   Consistencia Transaccional: Facilita el mantenimiento de la consistencia, ya que todas las operaciones sobre el `Tenant` y sus configuraciones se manejarían a través de la raíz del agregado.
    Impacto en el Proyecto:
      -   Cambios significativos en la definición de `TenantProps`.
      -   Adición de nuevos métodos públicos en `TenantEntity` para gestionar la colección de `TenantConfigurationEntity`.
      -   Posible refactorización de `TenantConfigurationEntity` para que no sea un `AggregateRoot`.
      -   Ajustes en los repositorios y casos de uso para interactuar con las configuraciones a través de `TenantEntity`.
]

[
  Mejora Propuesta 9: Implementación de un Método Genérico para Actualización de Detalles
    Descripción:
      En lugar de tener múltiples métodos específicos para actualizar propiedades individuales de `TenantEntity` (ej. `updateName(name: string)`, `updateSomeOtherDetail(detail: string)`), se podría implementar un método más genérico y flexible como `updateDetails(props: Partial<UpdateableTenantProps>): Result<void, Error>`.
      Este método:
        1.  Aceptaría un objeto con un subconjunto de las propiedades actualizables de la entidad.
        2.  Internamente, validaría cada propiedad proporcionada.
        3.  Actualizaría las propiedades correspondientes de la entidad.
        4.  Validaría las invariantes del agregado después de las actualizaciones.
        5.  Emitiría un evento de dominio apropiado (ej. `TenantDetailsUpdatedEvent`) que contenga información sobre los campos que cambiaron.
    Justificación Técnica:
      -   Flexibilidad de API: Proporciona una API más flexible y extensible para las actualizaciones, permitiendo modificar múltiples propiedades en una sola operación.
      -   Reducción de Boilerplate: Evita la necesidad de crear un nuevo método en la entidad para cada nueva propiedad actualizable.
      -   Atomicidad Conceptual: Permite tratar un conjunto de cambios de detalles como una única operación.
    Impacto en el Proyecto:
      -   Diseño y definición de una interfaz `UpdateableTenantProps` que especifique qué propiedades de `TenantEntity` son actualizables a través de este método.
      -   Implementación de una lógica de actualización más compleja dentro de `updateDetails` que maneje las diferentes propiedades y sus validaciones.
      -   Diseño de un evento de dominio como `TenantDetailsUpdatedEvent` que pueda comunicar eficazmente los cambios realizados.
      -   Refactorización de los Casos de Uso para utilizar este nuevo método.
]

[
  Mejora Propuesta 10: Consolidación del Uso del Patrón `Result` para Operaciones de Negocio
    Descripción:
      Los métodos de `TenantEntity` que realizan cambios de estado o ejecutan lógica de negocio que puede fallar debido a reglas de negocio específicas (y no solo por errores de programación o datos fundamentalmente inválidos) ya están utilizando el patrón `Result<SuccessType, ErrorType>`. Esta práctica debe ser mantenida y reforzada.
      Ejemplos: `activate()`, `suspend()`, `setDatabaseConfiguration()`, `updateName()`.
      Las excepciones tradicionales (lanzar `Error`) deben reservarse principalmente para:
        -   Violaciones de invariantes fundamentales detectadas en el constructor (`create()`) o en el método `validate()`, donde la entidad no puede existir en un estado válido.
        -   Errores de programación inesperados.
    Justificación Técnica:
      -   Manejo Explícito de Errores de Negocio: Hace explícito en la firma del método que una operación puede resultar en un error de negocio esperado.
      -   Flujo de Control Funcional: Permite a los llamadores (Casos de Uso) manejar estos errores de forma funcional (ej. `match`, `mapErr`) sin recurrir a bloques `try-catch` para la lógica de negocio esperada.
      -   Claridad y Robustez: Distingue claramente entre errores de negocio (manejados con `Result`) y excepciones por errores de sistema/programación.
    Impacto en el Proyecto:
      -   Asegurar que todos los Casos de Uso que llaman a estos métodos de la entidad manejen adecuadamente el `Result` devuelto (tanto el caso `Ok` como el `Err`).
      -   Definición de tipos de error específicos y semánticos (ej. `TenantAlreadyActiveError`, `InvalidDatabaseConfigError`) para ser usados en la parte `Err` del `Result`.
      -   Refuerza la distinción entre errores recuperables de negocio y excepciones irrecuperables.
]

--- FIN DE MEJORAS PROPUESTAS CONSOLIDADAS ---
*/
