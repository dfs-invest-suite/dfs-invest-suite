// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/command.base.spec.ts
import {
  CommandInstanceId,
  CorrelationId,
  IsoDateString,
  UserId,
} from '@dfs-suite/shtypes'; // CORREGIDO

import { CommandBase } from './command.base';
import { ICommandMetadata } from './command.interface';

const mockGeneratedCommandInstanceId =
  'cmd-instance-id-123' as CommandInstanceId;
const mockDefaultMetadata: Readonly<ICommandMetadata> = Object.freeze({
  correlationId: 'default-correlation-id' as CorrelationId,
  timestamp: '2025-01-01T00:00:00.000Z' as IsoDateString,
});

jest.mock('@dfs-suite/shutils', () => {
  // CORREGIDO
  const originalModule = jest.requireActual('@dfs-suite/shutils'); // CORREGIDO
  return {
    __esModule: true,
    ...originalModule,
    createOperationMetadata: jest.fn(),
    UuidUtils: {
      ...originalModule.UuidUtils,
      generateCommandInstanceId: jest.fn(),
    },
  };
});

import {
  createOperationMetadata as importedMockCreateOperationMetadata,
  UuidUtils as ImportedMockUuidUtils,
} from '@dfs-suite/shutils'; // CORREGIDO

const mockedCreateOperationMetadata =
  importedMockCreateOperationMetadata as jest.MockedFunction<
    typeof importedMockCreateOperationMetadata
  >;
const mockedGenerateCommandInstanceId =
  ImportedMockUuidUtils.generateCommandInstanceId as jest.MockedFunction<
    typeof ImportedMockUuidUtils.generateCommandInstanceId
  >;

class TestCommand extends CommandBase {
  constructor(
    public readonly payload: { data: string },
    metadataProps?: Partial<ICommandMetadata>
  ) {
    super(metadataProps);
  }
}

describe('CommandBase', () => {
  beforeEach(() => {
    mockedGenerateCommandInstanceId.mockReturnValue(
      mockGeneratedCommandInstanceId
    );
    mockedCreateOperationMetadata.mockReturnValue(mockDefaultMetadata);
  });

  afterEach(() => {
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
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/command.base.spec.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Corrección de todos los imports y mocks para usar los alias codificados (`@dfs-suite/shtypes`, `@dfs-suite/shutils`).", "justificacion": "Resuelve errores de `Cannot find module`.", "impacto": "Permite que el test se ejecute y los mocks funcionen correctamente." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
