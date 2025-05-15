// RUTA: libs/shared/utils/src/lib/metadata.factory.spec.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import {
  // CommandInstanceId, // No se usa directamente en el test
  CorrelationId,
  IsoDateString,
  UserId,
} from '@dfs-suite/shared-types';
// import { UuidUtils } from '@dfs-suite/shared-utils'; // No es necesario importar la clase completa si solo se mockea
import { z } from 'zod';

import { ArgumentInvalidException } from '@dfs-suite/shared-errors';
import { IsoDateStringSchema } from '@dfs-suite/shared-validation-schemas';
import { createOperationMetadata } from './metadata.factory'; // Importar desde la nueva ubicación
import type { UuidUtils as OriginalUuidUtilsType } from './uuid.utils'; // Ajustar si es necesario

// Mockear UuidUtils específicamente para este test
jest.mock('./uuid.utils', () => {
  const originalActual = jest.requireActual('./uuid.utils');
  return {
    ...originalActual, // Mantener otras posibles exportaciones de uuid.utils si las hubiera
    UuidUtils: {
      ...originalActual.UuidUtils,
      generateCorrelationId: jest.fn(),
      // Mockear otros métodos de UuidUtils si son usados indirectamente por createOperationMetadata
    },
  };
});

// Mockear shared-validation-schemas
jest.mock('@dfs-suite/shared-validation-schemas', () => ({
  IsoDateStringSchema: {
    safeParse: jest.fn(),
  },
}));

// Necesitamos acceder a la propiedad mockeada en la clase UuidUtils
const MockedUuidUtils = jest.requireMock('./uuid.utils')
  .UuidUtils as jest.Mocked<typeof OriginalUuidUtilsType>;

type ZodSafeParseReturnType<Input, Output> = z.SafeParseReturnType<
  Input,
  Output
>;

const MockedIsoDateStringSchemaSafeParse =
  IsoDateStringSchema.safeParse as jest.Mock<
    ZodSafeParseReturnType<string, IsoDateString>,
    [unknown]
  >;

describe('createOperationMetadata (in shared-utils)', () => {
  const mockGeneratedCorrelationIdValue =
    'gen-corr-id-metadata-factory' as CorrelationId;
  const mockProvidedCorrelationIdValue =
    'prov-corr-id-metadata-factory' as CorrelationId;
  const mockProvidedUserIdValue = 'user-metadata-factory' as UserId;
  const mockValidIsoTimestampValue =
    '2025-03-03T03:03:03.003Z' as IsoDateString;
  const mockDefaultIsoTimestampValue =
    '2025-01-01T00:00:00.000Z' as IsoDateString;

  const OriginalDate = global.Date;
  let dateSpy: jest.SpyInstance;

  beforeEach(() => {
    // Acceder a la función mockeada a través de la instancia mockeada de la clase
    MockedUuidUtils.generateCorrelationId.mockReturnValue(
      mockGeneratedCorrelationIdValue
    );

    MockedIsoDateStringSchemaSafeParse.mockImplementation((val: unknown) => {
      if (
        val === mockValidIsoTimestampValue ||
        val === mockDefaultIsoTimestampValue
      ) {
        return { success: true, data: val as IsoDateString };
      }
      if (val === 'not-an-iso-date-string') {
        return {
          success: false,
          error: { format: () => ({ _errors: ['Invalid ISO format'] }) },
        } as unknown as z.SafeParseError<IsoDateString>;
      }
      return {
        success: false,
        error: { format: () => ({ _errors: ['Generic Zod error'] }) },
      } as unknown as z.SafeParseError<IsoDateString>;
    });

    dateSpy = jest
      .spyOn(global, 'Date')
      .mockImplementation((...args: unknown[]) => {
        if (args.length === 0) {
          const mockDateInstance = {
            toISOString: jest
              .fn()
              .mockReturnValue(mockDefaultIsoTimestampValue),
          };
          return mockDateInstance as unknown as Date;
        }
        return new OriginalDate(...(args as [string | number | Date]));
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
    dateSpy.mockRestore();
  });

  // ... (Resto de los tests 'it' son idénticos al snapshot anterior, solo cambia el contexto de describe)
  describe('Correlation ID Handling', () => {
    it('should generate a new correlationId if none is provided', () => {
      createOperationMetadata();
      expect(MockedUuidUtils.generateCorrelationId).toHaveBeenCalledTimes(1);
    });

    it('should use the provided correlationId if it is valid', () => {
      MockedUuidUtils.generateCorrelationId.mockClear();
      const metadata = createOperationMetadata({
        correlationId: mockProvidedCorrelationIdValue,
      });
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
      createOperationMetadata({
        correlationId: null as unknown as CorrelationId,
      });
      expect(MockedUuidUtils.generateCorrelationId).toHaveBeenCalledTimes(1);
    });
  });

  describe('Timestamp Handling', () => {
    it('should use the mocked Date().toISOString() for timestamp if none provided', () => {
      const metadata = createOperationMetadata();
      expect(metadata.timestamp).toBe(mockDefaultIsoTimestampValue);
      expect(dateSpy).toHaveBeenCalledWith();
    });

    it('should use provided valid IsoDateString timestamp and validate it', () => {
      const metadata = createOperationMetadata({
        timestamp: mockValidIsoTimestampValue,
      });
      expect(metadata.timestamp).toBe(mockValidIsoTimestampValue);
      expect(MockedIsoDateStringSchemaSafeParse).toHaveBeenCalledWith(
        mockValidIsoTimestampValue
      );
    });

    it('should throw ArgumentInvalidException if provided timestamp string is not a valid IsoDateString', () => {
      const invalidTimestamp = 'not-an-iso-date-string';
      const expectedErrorMessage = `Provided metadata.timestamp '${invalidTimestamp}' is not a valid ISO8601 date string.`;

      expect(() =>
        createOperationMetadata({
          timestamp: invalidTimestamp as IsoDateString,
        })
      ).toThrow(ArgumentInvalidException);
      try {
        createOperationMetadata({
          timestamp: invalidTimestamp as IsoDateString,
        });
      } catch (e) {
        const error = e as ArgumentInvalidException;
        expect(error.message).toBe(expectedErrorMessage);
      }
      expect(MockedIsoDateStringSchemaSafeParse).toHaveBeenCalledWith(
        invalidTimestamp as IsoDateString
      );
    });
  });

  describe('User ID Handling', () => {
    it('should have undefined userId if none is provided', () => {
      const metadata = createOperationMetadata();
      expect(metadata.userId).toBeUndefined();
    });

    it('should use the provided userId', () => {
      const metadata = createOperationMetadata({
        userId: mockProvidedUserIdValue,
      });
      expect(metadata.userId).toBe(mockProvidedUserIdValue);
    });

    it('should throw ArgumentInvalidException if provided userId is an empty string', () => {
      expect(() => createOperationMetadata({ userId: '' as UserId })).toThrow(
        ArgumentInvalidException
      );
    });
  });

  describe('Causation ID Handling', () => {
    it('should have undefined causationId if none is provided', () => {
      const metadata = createOperationMetadata();
      expect(metadata.causationId).toBeUndefined();
    });

    it('should use provided causationId', () => {
      const causationId = 'cause-instance-id-123' as CommandInstanceId; // Usar un tipo válido para causationId
      const metadata = createOperationMetadata({ causationId });
      expect(metadata.causationId).toBe(causationId);
    });

    it('should throw ArgumentInvalidException if provided causationId is an empty string', () => {
      expect(() =>
        createOperationMetadata({ causationId: '' as CorrelationId })
      ).toThrow(ArgumentInvalidException);
    });
  });

  it('should return a frozen metadata object', () => {
    const metadata = createOperationMetadata();
    expect(Object.isFrozen(metadata)).toBe(true);
  });
});
// RUTA: libs/shared/utils/src/lib/metadata.factory.spec.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Ajuste de mocks para `UuidUtils`",
    "justificacion": "El mock de `UuidUtils` ahora se hace directamente sobre el módulo local (`./uuid.utils`) y se accede a la función mockeada a través de `MockedUuidUtils.generateCorrelationId`. Esto es más robusto que mockear un alias de path (`@dfs-suite/shared-utils`) dentro de la propia librería.",
    "impacto": "Mocks más precisos y aislados para el test."
  },
  {
    "mejora": "Eliminada importación no utilizada de `CommandInstanceId`",
    "justificacion": "No se usaba directamente en las variables de test.",
    "impacto": "Limpieza de imports."
  },
  {
    "mejora": "Asegurar que `causationId` en el test use un tipo válido.",
    "justificacion": "El test `should use provided causationId` ahora usa `CommandInstanceId` como ejemplo, que es uno de los tipos válidos para `causationId`.",
    "impacto": "Test más preciso."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
