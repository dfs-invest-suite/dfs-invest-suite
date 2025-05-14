// libs/core/domain/tenancy/src/lib/entities/tenant-configuration.entity.spec.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import { ArgumentNotProvidedException } from '@dfs-suite/shared-errors';
import { TenantId /*, AggregateId -> No usado directamente */ } from '@dfs-suite/shared-types';
import { UuidUtils } from '@dfs-suite/shared-utils';
import { TenantConfigurationEntity } from './tenant-configuration.entity';

describe('TenantConfigurationEntity', () => {
  const mockTenantId = UuidUtils.generateTenantId();
  const mockConfigId = UuidUtils.generateAggregateId(); // Tipo inferido como AggregateId

  const validProps = {
    tenantId: mockTenantId,
    key: 'API_KEY',
    value: 'some_secret_value',
    description: 'Main API Key',
  };

  // ... (resto de los tests create sin cambios)
  describe('create (factory method)', () => {
    it('should create a TenantConfigurationEntity successfully with all props and provided ID', () => {
      const config = TenantConfigurationEntity.create(validProps, mockConfigId);
      expect(config).toBeInstanceOf(TenantConfigurationEntity);
      expect(config.id).toBe(mockConfigId);
      expect(config.tenantId).toBe(validProps.tenantId);
      expect(config.key).toBe(validProps.key);
      expect(config.value).toBe(validProps.value);
      expect(config.description).toBe(validProps.description);
      expect(config.createdAt).toEqual(expect.any(String));
      expect(config.updatedAt).toEqual(expect.any(String));
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
    });

    it('should throw ArgumentNotProvidedException if key is empty', () => {
      const invalidProps = { ...validProps, key: '' };
      expect(() => TenantConfigurationEntity.create(invalidProps)).toThrow(ArgumentNotProvidedException);
    });

    it('should throw ArgumentNotProvidedException if key is only whitespace', () => {
      const invalidProps = { ...validProps, key: '   ' };
      expect(() => TenantConfigurationEntity.create(invalidProps)).toThrow(ArgumentNotProvidedException);
    });

    it('should throw ArgumentNotProvidedException if value is null', () => {
      const propsWithNullValue = { ...validProps, value: null as unknown as string };
      expect(() => TenantConfigurationEntity.create(propsWithNullValue)).toThrow(ArgumentNotProvidedException);
    });

    it('should throw ArgumentNotProvidedException if value is undefined', () => {
      const propsWithUndefinedValue = { ...validProps, value: undefined as unknown as string };
      expect(() => TenantConfigurationEntity.create(propsWithUndefinedValue)).toThrow(ArgumentNotProvidedException);
    });
  });


  describe('updateValue', () => {
    it('should update the value and updatedAt timestamp when new value is different', () => {
      const config = TenantConfigurationEntity.create(validProps);
      const initialUpdatedAt = config.updatedAt;
      const newValue = 'new_secret_value_for_api_key';

      jest.useFakeTimers().setSystemTime(new Date(initialUpdatedAt).getTime() + 5000);
      config.updateValue(newValue);
      jest.useRealTimers();

      expect(config.value).toBe(newValue);
      expect(config.updatedAt).not.toBe(initialUpdatedAt);
    });

    it('should not update updatedAt timestamp if the new value is the same as the old value', () => {
        const config = TenantConfigurationEntity.create(validProps);
        const initialUpdatedAt = config.updatedAt;
        config.updateValue(validProps.value);
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
      // Usar un cast más específico que `any` si es posible, o mantener `any` si es la única forma
      // de probar la lógica de validación interna que espera un string.
      expect(() => config.updateValue(null as unknown as string)).toThrow(ArgumentNotProvidedException);
    });

    it('should throw ArgumentNotProvidedException if new value for update is undefined', () => {
      const config = TenantConfigurationEntity.create(validProps);
      expect(() => config.updateValue(undefined as unknown as string)).toThrow(ArgumentNotProvidedException);
    });
  });

  // ... (resto de los tests sin cambios)
  describe('updateDescription', () => {
    it('should not update updatedAt if the new description is undefined and old was also undefined', () => {
        const configNoDesc = TenantConfigurationEntity.create({...validProps, description: undefined });
        const initialUpdatedAtNoDesc = configNoDesc.updatedAt;
        configNoDesc.updateDescription(undefined);
        expect(configNoDesc.updatedAt).toBe(initialUpdatedAtNoDesc);
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
    });
  });
});
// libs/core/domain/tenancy/src/lib/entities/tenant-configuration.entity.spec.ts
/* SECCIÓN DE MEJORAS
[
  Mejora Aplicada: Eliminada la importación no utilizada de `AggregateId`.
]
[
  Mejora Aplicada: Cambiado el cast de `null as any` y `undefined as any` a
                  `null as unknown as string` y `undefined as unknown as string`
                  en los tests de `updateValue`. Esto es ligeramente más seguro que `any`
                  y puede satisfacer algunas reglas de linting, aunque el objetivo
                  es probar un camino de error.
]
*/
// (El resto de las mejoras y notas se mantienen)
