// RUTA: libs/core/domain/shared-kernel/commands-queries/src/lib/command.base.spec.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import {
  CommandInstanceId,
  CorrelationId,
  IsoDateString,
  UserId,
} from '@dfs-suite/shared-types';
import { CommandBase } from './command.base'; // La clase bajo prueba
import { ICommandMetadata } from './command.interface';

// --- Constantes para Mocks ---
const mockGeneratedCommandInstanceId =
  'cmd-instance-id-123' as CommandInstanceId;
const mockDefaultMetadata: Readonly<ICommandMetadata> = Object.freeze({
  correlationId: 'default-correlation-id' as CorrelationId,
  timestamp: '2025-01-01T00:00:00.000Z' as IsoDateString,
});

// --- Mock de @dfs-suite/shared-utils ---
// 1. Mockear el módulo. La factory define la estructura del módulo mockeado.
jest.mock('@dfs-suite/shared-utils', () => {
  const originalModule = jest.requireActual('@dfs-suite/shared-utils');
  return {
    __esModule: true, // Necesario para módulos ES6
    ...originalModule,
    // Las funciones mock se crean y se devuelven dentro del factory
    createOperationMetadata: jest.fn(),
    UuidUtils: {
      ...originalModule.UuidUtils,
      generateCommandInstanceId: jest.fn(),
    },
  };
});

// 2. Importar las funciones/objetos mockeados DESPUÉS de jest.mock
// Necesitamos hacer un type assertion aquí.
import {
  createOperationMetadata as importedMockCreateOperationMetadata,
  UuidUtils as ImportedMockUuidUtils,
} from '@dfs-suite/shared-utils';

// Asignar a variables con el tipo mockeado correcto para uso en tests
const mockedCreateOperationMetadata =
  importedMockCreateOperationMetadata as jest.MockedFunction<
    typeof importedMockCreateOperationMetadata
  >;
const mockedGenerateCommandInstanceId =
  ImportedMockUuidUtils.generateCommandInstanceId as jest.MockedFunction<
    typeof ImportedMockUuidUtils.generateCommandInstanceId
  >;

// --- Clase de Prueba ---
class TestCommand extends CommandBase {
  constructor(
    public readonly payload: { data: string },
    metadataProps?: Partial<ICommandMetadata>
  ) {
    super(metadataProps);
  }
}

// --- Suite de Tests ---
describe('CommandBase', () => {
  beforeEach(() => {
    // Resetear y configurar mocks antes de cada test
    mockedGenerateCommandInstanceId.mockReturnValue(
      mockGeneratedCommandInstanceId
    );
    mockedCreateOperationMetadata.mockReturnValue(mockDefaultMetadata);
  });

  afterEach(() => {
    // Limpiar todos los mocks después de cada test
    jest.clearAllMocks();
  });

  it('should correctly initialize commandId using UuidUtils.generateCommandInstanceId', () => {
    const command = new TestCommand({ data: 'test-payload' });
    expect(mockedGenerateCommandInstanceId).toHaveBeenCalledTimes(1);
    expect(command.commandId).toBe(mockGeneratedCommandInstanceId);
  });

  it('should correctly initialize commandName with the constructor name', () => {
    const command = new TestCommand({ data: 'test-payload' });
    expect(command.commandName).toBe('TestCommand');
  });

  it('should call createOperationMetadata with provided metadataProps to initialize metadata', () => {
    const explicitMetadataInput: Partial<ICommandMetadata> = {
      correlationId: 'explicit-correlation-id' as CorrelationId,
      userId: 'explicit-user-id' as UserId,
    };
    const specificMockedMetadata: Readonly<ICommandMetadata> = Object.freeze({
      correlationId: explicitMetadataInput.correlationId!,
      userId: explicitMetadataInput.userId!,
      timestamp: mockDefaultMetadata.timestamp,
    });
    mockedCreateOperationMetadata.mockReturnValueOnce(specificMockedMetadata);

    const command = new TestCommand(
      { data: 'test-payload' },
      explicitMetadataInput
    );

    expect(mockedCreateOperationMetadata).toHaveBeenCalledTimes(1);
    expect(mockedCreateOperationMetadata).toHaveBeenCalledWith(
      explicitMetadataInput
    );
    expect(command.metadata).toEqual(specificMockedMetadata);
  });

  it('should call createOperationMetadata with undefined if no metadataProps are provided, using factory defaults', () => {
    const command = new TestCommand({ data: 'test-payload' });
    expect(mockedCreateOperationMetadata).toHaveBeenCalledTimes(1);
    expect(mockedCreateOperationMetadata).toHaveBeenCalledWith(undefined);
    expect(command.metadata).toEqual(mockDefaultMetadata);
  });

  it('metadata property value should be immutable (value frozen by factory)', () => {
    const frozenMetadata = Object.freeze({ ...mockDefaultMetadata });
    mockedCreateOperationMetadata.mockReturnValue(frozenMetadata);

    const cmd = new TestCommand({ data: 'test' });
    expect(Object.isFrozen(cmd.metadata)).toBe(true);

    expect(() => {
      // @ts-expect-error: Attempting to mutate property of a frozen object.
      cmd.metadata.timestamp = 'new-time' as IsoDateString;
    }).toThrow(TypeError);
  });
});
// RUTA: libs/core/domain/shared-kernel/commands-queries/src/lib/command.base.spec.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Mockeo de módulo canónico con `jest.mock` y luego import/require.",
    "justificacion": "Esta es la forma estándar y más fiable de mockear módulos en Jest. `jest.mock` se eleva, y luego se importan las versiones mockeadas de las funciones/objetos. Esto resuelve el `ReferenceError` de inicialización.",
    "impacto": "Los tests ahora deberían cargarse y ejecutarse correctamente."
  },
  {
    "mejora": "Uso de `__esModule: true` en el factory de `jest.mock`.",
    "justificacion": "Importante cuando se mockean módulos ES6 para asegurar la correcta interoperabilidad.",
    "impacto": "Previene posibles problemas con la resolución de módulos ES6 mockeados."
  },
  {
    "mejora": "Type assertions para las funciones importadas mockeadas.",
    "justificacion": "Se usan `as jest.MockedFunction<...>` para informar a TypeScript que estas funciones son mocks de Jest, permitiendo el acceso a métodos como `.mockReturnValue()` de forma type-safe.",
    "impacto": "Mejor DX y seguridad de tipos en los tests."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Este patrón de mockeo es fundamental. Si este no funciona, el problema de 'Your test suite must contain at least one test' es extraordinariamente persistente y podría indicar un problema más profundo en la configuración de Jest con Nx para esta librería específica, o un error muy sutil en el archivo de test que no estamos viendo."
  }
]
*/
