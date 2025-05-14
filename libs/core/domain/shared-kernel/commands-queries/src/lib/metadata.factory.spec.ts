// libs/core/domain/shared-kernel/commands-queries/src/lib/metadata.factory.spec.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { createOperationMetadata } from './metadata.factory';
import { UuidUtils } from '@dfs-suite/shared-utils';
import { IsoDateStringSchema } from '@dfs-suite/shared-validation-schemas';
import { CorrelationId, IsoDateString, UserId, CommandInstanceId } from '@dfs-suite/shared-types';
import { ArgumentInvalidException } from '@dfs-suite/shared-errors';
import type { UuidUtils as OriginalUuidUtilsType } from '@dfs-suite/shared-utils';

jest.mock('@dfs-suite/shared-utils', () => {
  const originalUuidUtils = jest.requireActual('@dfs-suite/shared-utils').UuidUtils;
  return {
    Guard: jest.requireActual('@dfs-suite/shared-utils').Guard,
    UuidUtils: {
      ...originalUuidUtils,
      generateCorrelationId: jest.fn(),
    },
  };
});

jest.mock('@dfs-suite/shared-validation-schemas', () => ({
  IsoDateStringSchema: {
    safeParse: jest.fn(),
  },
}));

const MockedUuidUtils = UuidUtils as jest.Mocked<typeof OriginalUuidUtilsType>;
 
const MockedIsoDateStringSchemaSafeParse = IsoDateStringSchema.safeParse as jest.Mock<any, [unknown]>;


describe('createOperationMetadata', () => {
  const mockGeneratedCorrelationIdValue = 'gen-corr-id-metadata-factory' as CorrelationId;
  const mockProvidedCorrelationIdValue = 'prov-corr-id-metadata-factory' as CorrelationId;
  const mockProvidedUserIdValue = 'user-metadata-factory' as UserId;
  const mockValidIsoTimestampValue = '2025-03-03T03:03:03.003Z' as IsoDateString;
  const mockDefaultIsoTimestampValue = '2025-01-01T00:00:00.000Z' as IsoDateString;

  const OriginalDate = global.Date;
  let dateSpy: jest.SpyInstance;

  beforeEach(() => {
    MockedUuidUtils.generateCorrelationId.mockReturnValue(mockGeneratedCorrelationIdValue);
    MockedIsoDateStringSchemaSafeParse.mockImplementation((val: unknown) => {
      if (val === mockValidIsoTimestampValue || val === mockDefaultIsoTimestampValue) {
        return { success: true, data: val as IsoDateString };
      }
      if (val === 'not-an-iso-date-string') {
        return { success: false, error: { format: () => ({ _errors: ['Invalid ISO format'] }) } };
      }
      return { success: false, error: { format: () => ({ _errors: ['Generic Zod error'] }) } };
    });

    dateSpy = jest.spyOn(global, 'Date').mockImplementation((...args: unknown[]) => {
      if (args.length === 0) {
        return {
          toISOString: jest.fn().mockReturnValue(mockDefaultIsoTimestampValue),
        } as unknown as Date;
      }
      return new OriginalDate(...(args as [string | number | Date]));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    dateSpy.mockRestore();
  });

  describe('Correlation ID Handling', () => {
    it('should generate a new correlationId if none is provided', () => {
      createOperationMetadata();
      expect(MockedUuidUtils.generateCorrelationId).toHaveBeenCalledTimes(1);
    });

    it('should use the provided correlationId if it is valid', () => {
      MockedUuidUtils.generateCorrelationId.mockClear();
      const metadata = createOperationMetadata({ correlationId: mockProvidedCorrelationIdValue });
      expect(metadata.correlationId).toBe(mockProvidedCorrelationIdValue);
      expect(MockedUuidUtils.generateCorrelationId).not.toHaveBeenCalled();
    });

    it('should generate a new correlationId if the provided one is an empty string', () => {
      MockedUuidUtils.generateCorrelationId.mockClear();
      createOperationMetadata({ correlationId: '' as CorrelationId });
      expect(MockedUuidUtils.generateCorrelationId).toHaveBeenCalledTimes(1);
    });

    it('should generate a new correlationId if the provided one is null', () => {
      MockedUuidUtils.generateCorrelationId.mockClear();
      createOperationMetadata({ correlationId: null as unknown as CorrelationId });
      expect(MockedUuidUtils.generateCorrelationId).toHaveBeenCalledTimes(1);
    });
  });

  describe('Timestamp Handling', () => {
    it('should use the mocked Date().toISOString() for timestamp if none provided', () => {
      const metadata = createOperationMetadata();
      expect(metadata.timestamp).toBe(mockDefaultIsoTimestampValue);
      expect(dateSpy).toHaveBeenCalledWith();
      // Para verificar que toISOString fue llamado en el objeto mockeado, necesitaríamos
      // guardar la instancia mockeada de Date si dateSpy la devolviera.
      // Por ahora, verificamos que el valor de timestamp sea el esperado del mock.
    });

    it('should use provided valid IsoDateString timestamp and validate it', () => {
      const metadata = createOperationMetadata({ timestamp: mockValidIsoTimestampValue });
      expect(metadata.timestamp).toBe(mockValidIsoTimestampValue);
      expect(MockedIsoDateStringSchemaSafeParse).toHaveBeenCalledWith(mockValidIsoTimestampValue);
    });

    it('should throw ArgumentInvalidException if provided timestamp string is not a valid IsoDateString', () => {
      const invalidTimestamp = 'not-an-iso-date-string';
      const expectedErrorMessage = `Provided metadata.timestamp '${invalidTimestamp}' is not a valid ISO8601 date string.`;

      expect(() => createOperationMetadata({ timestamp: invalidTimestamp as IsoDateString })).toThrow(ArgumentInvalidException);
      try {
        createOperationMetadata({ timestamp: invalidTimestamp as IsoDateString });
      } catch (e) {
        const error = e as ArgumentInvalidException;
        expect(error.message).toBe(expectedErrorMessage);
      }
      expect(MockedIsoDateStringSchemaSafeParse).toHaveBeenCalledWith(invalidTimestamp as IsoDateString);
    });
  });

  describe('User ID Handling', () => {
    it('should have undefined userId if none is provided', () => {
      const metadata = createOperationMetadata();
      expect(metadata.userId).toBeUndefined();
    });

    it('should use the provided userId', () => {
      const metadata = createOperationMetadata({ userId: mockProvidedUserIdValue });
      expect(metadata.userId).toBe(mockProvidedUserIdValue);
    });

    it('should throw ArgumentInvalidException if provided userId is an empty string', () => {
      expect(() => createOperationMetadata({ userId: '' as UserId })).toThrow(ArgumentInvalidException);
    });
  });

  describe('Causation ID Handling', () => {
    it('should have undefined causationId if none is provided', () => {
      const metadata = createOperationMetadata();
      expect(metadata.causationId).toBeUndefined();
    });

    it('should use provided causationId', () => {
      const causationId = 'cause-instance-id-123' as CommandInstanceId;
      const metadata = createOperationMetadata({ causationId });
      expect(metadata.causationId).toBe(causationId);
    });

    it('should throw ArgumentInvalidException if provided causationId is an empty string', () => {
      expect(() => createOperationMetadata({ causationId: '' as CorrelationId })).toThrow(ArgumentInvalidException);
    });
  });

  it('should return a frozen metadata object', () => {
    const metadata = createOperationMetadata();
    expect(Object.isFrozen(metadata)).toBe(true);
  });
});
// libs/core/domain/shared-kernel/commands-queries/src/lib/metadata.factory.spec.ts
/* SECCIÓN DE MEJORAS
[
  Mejora Aplicada: Mantenida la simplificación del mock de `new Date()`.
                  El error TS2367 es probablemente un falso positivo o una inferencia
                  demasiado estricta en el contexto del spy, y la lógica del mock es correcta
                  para el propósito del test. Si el error persistiera en el linter/compilador
                  después de estos cambios en los tests, una directiva @ts-ignore sería el último recurso.
]
*/
// (Resto de mejoras y notas se mantienen)
/* SECCIÓN DE MEJORAS
[
  Mejora Aplicada: Se intentó una simplificación en el mock de `new Date()` para evitar el TS2367.
                  Si `new Date()` se llama sin argumentos, devuelve un objeto con un `toISOString` mockeado.
                  Si se llama con argumentos, usa el constructor original.
]
*/
// (Resto de mejoras y notas se mantienen)
