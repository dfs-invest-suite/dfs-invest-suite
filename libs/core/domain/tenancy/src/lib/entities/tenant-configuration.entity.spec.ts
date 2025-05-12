// libs/core/domain/tenancy/src/lib/entities/tenant-configuration.entity.spec.ts
import { ArgumentNotProvidedException } from '@dfs-suite/shared-errors'; // ArgumentInvalidException eliminado
import { TenantId } from '@dfs-suite/shared-types';
import { UuidUtils } from '@dfs-suite/shared-utils';
import { TenantConfigurationEntity } from './tenant-configuration.entity';

describe('TenantConfigurationEntity', () => {
  const mockTenantId = UuidUtils.generateTenantId();
  const mockConfigId = UuidUtils.generateAggregateId();

  const validProps = {
    tenantId: mockTenantId,
    key: 'API_KEY',
    value: 'some_secret_value',
    description: 'Main API Key',
  };

  describe('create (factory method)', () => {
    it('should create a TenantConfigurationEntity successfully with all props and provided ID', () => {
      const config = TenantConfigurationEntity.create(validProps, mockConfigId);
      expect(config).toBeInstanceOf(TenantConfigurationEntity);
      expect(config.id).toBe(mockConfigId);
      expect(config.tenantId).toBe(validProps.tenantId);
      expect(config.key).toBe(validProps.key);
      expect(config.value).toBe(validProps.value);
      expect(config.description).toBe(validProps.description);
      expect(config.createdAt).toBeDefined();
      expect(config.updatedAt).toBeDefined();
      expect(typeof config.createdAt).toBe('string');
      expect(typeof config.updatedAt).toBe('string');
    });

    it('should create with a generated ID if none is provided', () => {
      const config = TenantConfigurationEntity.create(validProps);
      expect(config.id).toBeDefined();
      expect(typeof config.id).toBe('string');
    });

    it('should allow an empty string as a valid value for "value" property', () => {
      const propsWithEmptyValue = { ...validProps, value: '' };
      const config = TenantConfigurationEntity.create(propsWithEmptyValue);
      expect(config.value).toBe('');
    });

    it('should trim "key" and "description" properties upon creation', () => {
      const propsWithSpaces = {
        tenantId: mockTenantId,
        key: '  SPACED_KEY  ',
        value: 'value_with_spaces_is_ok',
        description: '  spaced description  ',
      };
      const config = TenantConfigurationEntity.create(propsWithSpaces);
      expect(config.key).toBe('SPACED_KEY');
      expect(config.description).toBe('spaced description');
      expect(config.value).toBe('value_with_spaces_is_ok');
    });

    it('should set description to undefined if provided as null', () => {
      const propsWithNullDesc = { ...validProps, description: null as unknown as undefined };
      const config = TenantConfigurationEntity.create(propsWithNullDesc);
      expect(config.description).toBeUndefined();
    });

    it('should set description to undefined if provided as an empty or whitespace-only string', () => {
      let config = TenantConfigurationEntity.create({ ...validProps, description: '' });
      expect(config.description).toBeUndefined();
      config = TenantConfigurationEntity.create({ ...validProps, description: '   ' });
      expect(config.description).toBeUndefined();
    });

    it('should throw ArgumentNotProvidedException if tenantId is empty', () => {
      const invalidProps = { ...validProps, tenantId: '' as TenantId };
      expect(() => TenantConfigurationEntity.create(invalidProps)).toThrow(ArgumentNotProvidedException);
      expect(() => TenantConfigurationEntity.create(invalidProps)).toThrow('tenantId cannot be empty for TenantConfiguration.');
    });

    it('should throw ArgumentNotProvidedException if key is empty', () => {
      const invalidProps = { ...validProps, key: '' };
      expect(() => TenantConfigurationEntity.create(invalidProps)).toThrow(ArgumentNotProvidedException);
      expect(() => TenantConfigurationEntity.create(invalidProps)).toThrow('Configuration key cannot be empty.');
    });

    it('should throw ArgumentNotProvidedException if key is only whitespace', () => {
      const invalidProps = { ...validProps, key: '   ' };
      expect(() => TenantConfigurationEntity.create(invalidProps)).toThrow(ArgumentNotProvidedException);
    });

    it('should throw ArgumentNotProvidedException if value is null', () => {
      const propsWithNullValue = { ...validProps, value: null as unknown as string };
      expect(() => TenantConfigurationEntity.create(propsWithNullValue)).toThrow(ArgumentNotProvidedException);
      expect(() => TenantConfigurationEntity.create(propsWithNullValue)).toThrow('Configuration value cannot be null or undefined.');
    });

    it('should throw ArgumentNotProvidedException if value is undefined', () => {
      const propsWithUndefinedValue = { ...validProps, value: undefined as unknown as string };
      expect(() => TenantConfigurationEntity.create(propsWithUndefinedValue)).toThrow(ArgumentNotProvidedException);
      expect(() => TenantConfigurationEntity.create(propsWithUndefinedValue)).toThrow('Configuration value cannot be null or undefined.');
    });
  });

  describe('updateValue', () => {
    const _oldValue = validProps.value;

    it('should update the value and updatedAt timestamp when new value is different', () => {
      const config = TenantConfigurationEntity.create(validProps);
      const initialUpdatedAt = config.updatedAt;
      const newValue = 'new_secret_value_for_api_key';

      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAt).getTime() + 5000);
      config.updateValue(newValue);
      jest.useRealTimers();

      expect(config.value).toBe(newValue);
      expect(config.updatedAt).not.toBe(initialUpdatedAt);
      expect(new Date(config.updatedAt).getTime()).toBeGreaterThan(new Date(initialUpdatedAt).getTime());
    });

    it('should not update updatedAt timestamp if the new value is the same as the old value', () => {
        const config = TenantConfigurationEntity.create(validProps);
        const initialUpdatedAt = config.updatedAt;

        jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAt).getTime() + 5000);
        config.updateValue(validProps.value);
        jest.useRealTimers();

        expect(config.value).toBe(validProps.value);
        expect(config.updatedAt).toBe(initialUpdatedAt);
    });

    it('should allow updating value to an empty string', () => {
      const config = TenantConfigurationEntity.create(validProps);
      const initialUpdatedAt = config.updatedAt;
      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAt).getTime() + 5000);
      config.updateValue('');
      jest.useRealTimers();

      expect(config.value).toBe('');
      expect(config.updatedAt).not.toBe(initialUpdatedAt);
    });

    it('should throw ArgumentNotProvidedException if new value for update is null', () => {
      const config = TenantConfigurationEntity.create(validProps);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      expect(() => config.updateValue(null as any)).toThrow(ArgumentNotProvidedException);
    });

    it('should throw ArgumentNotProvidedException if new value for update is undefined', () => {
      const config = TenantConfigurationEntity.create(validProps);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      expect(() => config.updateValue(undefined as any)).toThrow(ArgumentNotProvidedException);
    });
  });

  describe('updateDescription', () => {
    it('should update the description and updatedAt timestamp when new description is different', () => {
      const config = TenantConfigurationEntity.create(validProps);
      const initialUpdatedAt = config.updatedAt;
      const newDescription = 'An updated description for the API Key';

      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAt).getTime() + 5000);
      config.updateDescription(newDescription);
      jest.useRealTimers();

      expect(config.description).toBe(newDescription);
      expect(config.updatedAt).not.toBe(initialUpdatedAt);
    });

     it('should set description to undefined and update timestamp if new description is null', () => {
      const config = TenantConfigurationEntity.create(validProps);
      const initialUpdatedAt = config.updatedAt;
      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAt).getTime() + 5000);
      config.updateDescription(null);
      jest.useRealTimers();
      expect(config.description).toBeUndefined();
      expect(config.updatedAt).not.toBe(initialUpdatedAt);
    });

    it('should set description to undefined and update timestamp if new description is an empty string', () => {
      const config = TenantConfigurationEntity.create(validProps);
      const initialUpdatedAt = config.updatedAt;
      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAt).getTime() + 5000);
      config.updateDescription('');
      jest.useRealTimers();
      expect(config.description).toBeUndefined();
      expect(config.updatedAt).not.toBe(initialUpdatedAt);
    });

    it('should set description to undefined and update timestamp if new description is only whitespace', () => {
      const config = TenantConfigurationEntity.create(validProps);
      const initialUpdatedAt = config.updatedAt;
      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAt).getTime() + 5000);
      config.updateDescription('   ');
      jest.useRealTimers();
      expect(config.description).toBeUndefined();
      expect(config.updatedAt).not.toBe(initialUpdatedAt);
    });

    it('should not update updatedAt if the new description is the same as the old one (both defined)', () => {
        const config = TenantConfigurationEntity.create(validProps);
        const initialUpdatedAt = config.updatedAt;
        config.updateDescription(validProps.description);
        expect(config.updatedAt).toBe(initialUpdatedAt);
    });

    it('should not update updatedAt if the new description is undefined and old was also undefined', () => {
        const configNoDesc = TenantConfigurationEntity.create({...validProps, description: undefined });
        const _initialUpdatedAtNoDesc = configNoDesc.updatedAt; // Prefijado
        configNoDesc.updateDescription(undefined);
        expect(configNoDesc.updatedAt).toBe(_initialUpdatedAtNoDesc);
    });
  });

  describe('validate (method of EntityBase, called by constructor)', () => {
    it('should have its specific validate method called by EntityBase constructor', () => {
        const validateSpy = jest.spyOn(TenantConfigurationEntity.prototype, 'validate');
        TenantConfigurationEntity.create(validProps);
        expect(validateSpy).toHaveBeenCalled();
        validateSpy.mockRestore();
    });

    it('validate method should throw if key is empty after direct props manipulation (hypothetical)', () => {
        expect(() => {
            const invalidConfig = TenantConfigurationEntity.create(validProps);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            (invalidConfig as any).props.key = '';
            invalidConfig.validate();
        }).toThrow('TenantConfigurationEntity: key is required.');
    });
  });

  describe('getters', () => {
    it('should return correct values through getters', () => {
        const config = TenantConfigurationEntity.create(validProps, mockConfigId);
        expect(config.id).toBe(mockConfigId);
        expect(config.tenantId).toBe(validProps.tenantId);
        expect(config.key).toBe(validProps.key);
        expect(config.value).toBe(validProps.value);
        expect(config.description).toBe(validProps.description);
        expect(config.createdAt).toEqual(expect.any(String));
        expect(config.updatedAt).toEqual(expect.any(String));
    });
  });
});

/* SECCIÓN DE MEJORAS FUTURAS (para este archivo de test)

[
  Mejora Propuesta 1 (Tests para Formato de Clave): Si la propiedad `key` tuviera restricciones de formato más allá de no estar vacía (ej. solo alfanuméricos y underscores, longitud específica, sin espacios), se deberían añadir tests explícitos para validar estas restricciones durante la creación y cualquier método de actualización de la clave (si existiera).
  Justificación: Asegurar que las claves de configuración sigan un formato esperado, lo que puede ser importante para su uso como identificadores o para el parsing en otros sistemas.
  Impacto: Añadir más casos de test en la sección `creation` y potencialmente en un (hipotético) método `updateKey`.
]
[
  Mejora Propuesta 2 (Tests para Emisión de Eventos): Si se decide que `TenantConfigurationEntity` debe emitir eventos de dominio (ver mejoras futuras de la propia entidad, cambiando de `Entity` a `AggregateRoot`), se necesitarían tests para verificar que los eventos correctos (ej. `TenantConfigurationValueUpdatedEvent`) se añaden al array `_domainEvents` (accesible vía `config.domainEvents`) después de operaciones como `updateValue` o `updateDescription`.
  Justificación: Validar el comportamiento de la arquitectura reactiva basada en eventos si se implementa para esta entidad.
  Impacto: Modificar la entidad para que extienda `AggregateRoot`, añadir lógica de emisión de eventos y los tests correspondientes para verificar la lista de eventos.
]
[
  Mejora Propuesta 3 (Pruebas de Inmutabilidad de Props): Aunque las props se congelan en `ValueObject` y `EntityBase` intenta hacerlas readonly, se podrían añadir tests más explícitos para intentar modificar las props directamente después de la creación y verificar que fallen o no tengan efecto, para asegurar la inmutabilidad.
  Justificación: Reforzar la confianza en la inmutabilidad de las entidades y VOs.
  Impacto: Tests adicionales que intenten mutaciones directas de `config.props.key = 'otro'`, esperando que no cambie o lance error.
]

*/
/* SECCIÓN DE MEJORAS FUTURAS (para este archivo de test)

[
  Mejora Propuesta 1 (Tests para Formato de Clave): Si la propiedad `key` tuviera restricciones de formato (ej. solo alfanuméricos y underscores, longitud específica), se deberían añadir tests para validar estas restricciones.
  Justificación: Asegurar que las claves de configuración sigan un formato esperado, lo que puede ser importante para su uso o parsing.
  Impacto: Añadir más casos de test en la sección `creation` y potencialmente en un método `updateKey` si se implementara.
]
[
  Mejora Propuesta 2 (Tests para Emisión de Eventos): Si se decide que `TenantConfigurationEntity` debe emitir eventos (ver mejoras futuras de la entidad), se necesitarían tests para verificar que los eventos correctos se añaden al array `_domainEvents` después de operaciones como `updateValue` o `updateDescription`.
  Justificación: Validar el comportamiento de la arquitectura reactiva basada en eventos.
  Impacto: Modificar la entidad para que extienda `AggregateRoot`, añadir lógica de emisión de eventos y los tests correspondientes.
]

*/
