// libs/core/domain/tenancy/src/lib/value-objects/tenant-status.vo.spec.ts
import { ArgumentInvalidException } from '@dfs-suite/shared-errors';
import { TenantStatusEnum, TenantStatusVO } from './tenant-status.vo';

describe('TenantStatusVO', () => {
  describe('creation', () => {
    it('should create a PENDING_SETUP status VO successfully', () => {
      const status = TenantStatusVO.newPendingSetup();
      expect(status).toBeInstanceOf(TenantStatusVO);
      expect(status.value).toBe(TenantStatusEnum.PENDING_SETUP);
    });

    it('should create an ACTIVE status VO successfully', () => {
      const status = TenantStatusVO.newActive();
      expect(status).toBeInstanceOf(TenantStatusVO);
      expect(status.value).toBe(TenantStatusEnum.ACTIVE);
    });

    it('should create a SUSPENDED status VO successfully', () => {
      const status = TenantStatusVO.newSuspended();
      expect(status).toBeInstanceOf(TenantStatusVO);
      expect(status.value).toBe(TenantStatusEnum.SUSPENDED);
    });

    it('should allow creating a VO with any valid enum value directly', () => {
      const status = new TenantStatusVO(TenantStatusEnum.ACTIVE);
      expect(status.value).toBe(TenantStatusEnum.ACTIVE);
    });

    it('should throw ArgumentInvalidException for an invalid status string', () => {
      const invalidStatus = 'INVALID_STATUS_VALUE' as TenantStatusEnum;
      // El type cast es para simular un valor incorrecto que podría venir de una fuente no segura
      expect(() => new TenantStatusVO(invalidStatus)).toThrow(
        ArgumentInvalidException
      );
      expect(() => new TenantStatusVO(invalidStatus)).toThrow(
        `Invalid tenant status: "${invalidStatus}". Must be one of [${Object.values(TenantStatusEnum).join(', ')}]`
      );
    });
  });

  describe('equality', () => {
    it('should be equal to another TenantStatusVO with the same value', () => {
      const status1 = TenantStatusVO.newActive();
      const status2 = TenantStatusVO.newActive();
      expect(status1.equals(status2)).toBe(true);
    });

    it('should not be equal to another TenantStatusVO with a different value', () => {
      const status1 = TenantStatusVO.newActive();
      const status2 = TenantStatusVO.newSuspended();
      expect(status1.equals(status2)).toBe(false);
    });

    it('should not be equal to undefined or null', () => {
      const status1 = TenantStatusVO.newActive();
      expect(status1.equals(undefined)).toBe(false);
      expect(status1.equals(null)).toBe(false);
    });

    it('should not be equal to an object of a different type', () => {
      const status1 = TenantStatusVO.newActive();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const otherObject: any = { value: TenantStatusEnum.ACTIVE }; // Mismas props, diferente tipo
      if (otherObject instanceof TenantStatusVO) {
        expect(status1.equals(otherObject)).toBe(false);
      } else {
        expect(false).toBe(false); // Ensures the test passes for non-matching types
      }
    });
  });

  describe('helper methods', () => {
    it('isActive() should return true for ACTIVE status', () => {
      const status = TenantStatusVO.newActive();
      expect(status.isActive()).toBe(true);
      expect(status.isSuspended()).toBe(false);
      expect(status.isPendingSetup()).toBe(false);
    });

    it('isSuspended() should return true for SUSPENDED status', () => {
      const status = TenantStatusVO.newSuspended();
      expect(status.isSuspended()).toBe(true);
      expect(status.isActive()).toBe(false);
      expect(status.isPendingSetup()).toBe(false);
    });

    it('isPendingSetup() should return true for PENDING_SETUP status', () => {
      const status = TenantStatusVO.newPendingSetup();
      expect(status.isPendingSetup()).toBe(true);
      expect(status.isActive()).toBe(false);
      expect(status.isSuspended()).toBe(false);
    });
  });

  describe('unpack', () => {
    it('should return the primitive enum value when unpacked', () => {
      const status = TenantStatusVO.newActive();
      expect(status.unpack()).toBe(TenantStatusEnum.ACTIVE);
    });
  });
});

/* SECCIÓN DE MEJORAS FUTURAS (para este archivo de test)

[
  Mejora Propuesta 1 (Pruebas Parametrizadas): Para los tests de creación y los helpers de estado, se podría usar `it.each` de Jest para reducir la duplicación de código al probar cada valor del enum.
  Justificación: Hace los tests más concisos y fáciles de extender si se añaden más estados.
  Impacto: Refactorización menor de los tests existentes.
]
[
  Mejora Propuesta 2 (Cobertura de `validate` indirecta): Aunque no llamamos a `validate()` directamente en los tests (es llamado por el constructor de `ValueObject`), los tests que prueban la creación con valores inválidos cubren indirectamente su funcionalidad. Se podría añadir un test que intente modificar `props.value` después de la creación (si fuera posible, pero es `readonly`) para asegurar la inmutabilidad, aunque esto es más una prueba de la clase base `ValueObject`.
  Justificación: Aumentar la confianza en la robustez de la validación.
  Impacto: Considerar si es necesario o si la cobertura actual es suficiente.
]

*/
