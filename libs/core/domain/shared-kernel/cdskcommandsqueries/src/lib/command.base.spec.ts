// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/command.base.spec.ts
// Autor: L.I.A Legacy (IA Asistente)
import {
  CommandInstanceId,
  CorrelationId,
  IsoDateString,
  UserId,
  ObjectLiteral,
} from '@dfs-suite/shtypes';
// MOVIDO: @dfs-suite/shutils importado antes de imports locales
import {
  createOperationMetadata as importedMockCreateOperationMetadata,
  UuidUtils as ImportedMockUuidUtils,
} from '@dfs-suite/shutils';

import { CommandBase } from './command.base';
import { ICommandMetadata } from './command.interface';

// Mockear shutils ANTES de que CommandBase lo importe (ya está arriba)
const mockGeneratedCommandInstanceId =
  'cmd-instance-id-123' as CommandInstanceId;
const mockDefaultMetadata: Readonly<ICommandMetadata> = Object.freeze({
  correlationId: 'default-correlation-id' as CorrelationId,
  timestamp: '2025-01-01T00:00:00.000Z' as IsoDateString,
});

jest.mock('@dfs-suite/shutils', () => {
  const originalModule = jest.requireActual('@dfs-suite/shutils');
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

// Los mocks ya están definidos arriba
const mockedCreateOperationMetadata =
  importedMockCreateOperationMetadata as jest.MockedFunction<
    typeof importedMockCreateOperationMetadata
  >;
const mockedGenerateCommandInstanceId =
  ImportedMockUuidUtils.generateCommandInstanceId as jest.MockedFunction<
    typeof ImportedMockUuidUtils.generateCommandInstanceId
  >;

interface TestPayload extends ObjectLiteral {
  data: string;
}
class TestCommand extends CommandBase<TestPayload> {
  constructor(payload: TestPayload, metadataProps?: Partial<ICommandMetadata>) {
    super(payload, metadataProps);
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

  it('should correctly initialize payload', () => {
    const payload = { data: 'test-payload' };
    const command = new TestCommand(payload);
    expect(command.payload).toEqual(payload);
    expect(Object.isFrozen(command.payload)).toBe(true);
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
    expect(Object.isFrozen(command.metadata)).toBe(true);
  });

  it('should call createOperationMetadata with undefined if no metadataProps are provided, using factory defaults', () => {
    const command = new TestCommand({ data: 'test-payload' });
    expect(mockedCreateOperationMetadata).toHaveBeenCalledTimes(1);
    expect(mockedCreateOperationMetadata).toHaveBeenCalledWith(undefined);
    expect(command.metadata).toEqual(mockDefaultMetadata);
  });
});
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/command.base.spec.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Reordenada la importación de `@dfs-suite/shutils` para que preceda a las importaciones locales (`./command.base`, `./command.interface`).", "justificacion": "Cumple con la regla `import/order` de ESLint.", "impacto": "Elimina el warning de linting." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
