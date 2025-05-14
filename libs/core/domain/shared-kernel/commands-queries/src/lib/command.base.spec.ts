// RUTA: libs/core/domain/shared-kernel/commands-queries/src/lib/command.base.spec.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import {
  CommandInstanceId,
  CorrelationId,
  IsoDateString, // Importar Maybe si se usa en ICommandMetadata para causationId o userId
  UserId,
} from '@dfs-suite/shared-types';
import { UuidUtils } from '@dfs-suite/shared-utils'; // Guard no es necesario aquí si no se usa directamente
import { CommandBase } from './command.base';
import { ICommandMetadata } from './command.interface';
import { createOperationMetadata } from './metadata.factory';
// No necesitamos GuardType, solo UuidUtilsType para el mock
import type { UuidUtils as UuidUtilsType } from '@dfs-suite/shared-utils';

// Mockear módulos completos
jest.mock('@dfs-suite/shared-utils', () => {
  // Guardamos una referencia al módulo real para poder mockear UuidUtils selectivamente
  const actualSharedUtils = jest.requireActual('@dfs-suite/shared-utils');
  return {
    ...actualSharedUtils, // Exportar todo lo demás del módulo real (como Guard)
    UuidUtils: {
      // Sobrescribir UuidUtils
      ...actualSharedUtils.UuidUtils,
      generateCommandInstanceId: jest.fn(),
      // No necesitamos mockear generateCorrelationId aquí si createOperationMetadata lo hace
    },
  };
});

jest.mock('./metadata.factory', () => ({
  createOperationMetadata: jest.fn(),
}));

// Tipar los mocks para mejor DX con Jest
const MockedUuidUtils_generateCommandInstanceId =
  UuidUtils.generateCommandInstanceId as jest.MockedFunction<
    typeof UuidUtilsType.generateCommandInstanceId
  >;
const mockedCreateOperationMetadata =
  createOperationMetadata as jest.MockedFunction<
    typeof createOperationMetadata
  >;

// Clase de prueba concreta que hereda de CommandBase
class TestCommand extends CommandBase {
  constructor(
    public readonly payload: { data: string }, // Payload de ejemplo
    metadataProps?: Partial<ICommandMetadata>
  ) {
    super(metadataProps);
  }
}

describe('CommandBase', () => {
  const mockGeneratedCommandInstanceId =
    'cmd-instance-id-123' as CommandInstanceId;
  const mockDefaultMetadata: Readonly<ICommandMetadata> = Object.freeze({
    correlationId: 'default-correlation-id' as CorrelationId,
    timestamp: '2025-01-01T00:00:00.000Z' as IsoDateString,
    // causationId y userId pueden ser undefined
  });

  beforeEach(() => {
    // Configurar los mocks antes de cada test
    MockedUuidUtils_generateCommandInstanceId.mockReturnValue(
      mockGeneratedCommandInstanceId
    );
    mockedCreateOperationMetadata.mockReturnValue(mockDefaultMetadata); // Retorna un valor por defecto
  });

  afterEach(() => {
    // Limpiar todos los mocks después de cada test
    jest.clearAllMocks();
  });

  it('should correctly initialize commandId using UuidUtils.generateCommandInstanceId', () => {
    const command = new TestCommand({ data: 'test-payload' });
    expect(MockedUuidUtils_generateCommandInstanceId).toHaveBeenCalledTimes(1);
    expect(command.commandId).toBe(mockGeneratedCommandInstanceId);
  });

  it('should correctly initialize commandName with the constructor name of the concrete class', () => {
    const command = new TestCommand({ data: 'test-payload' });
    expect(command.commandName).toBe('TestCommand');
  });

  it('should call createOperationMetadata with provided metadataProps to initialize metadata', () => {
    const explicitMetadataInput: Partial<ICommandMetadata> = {
      correlationId: 'explicit-correlation-id' as CorrelationId,
      userId: 'explicit-user-id' as UserId,
      // timestamp y causationId se pueden omitir para que la factoría use defaults o los genere
    };
    const specificMockedMetadata: Readonly<ICommandMetadata> = Object.freeze({
      ...mockDefaultMetadata, // Empezar con los defaults
      ...explicitMetadataInput, // Sobrescribir con los explícitos
      // Asegurarse de que si la factoría genera timestamp, este mock también lo haga consistentemente
      timestamp:
        explicitMetadataInput.timestamp || mockDefaultMetadata.timestamp,
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
    expect(command.metadata).toEqual(specificMockedMetadata); // Usar toEqual para comparación de objetos
  });

  it('should call createOperationMetadata with undefined if no metadataProps are provided, using factory defaults', () => {
    const command = new TestCommand({ data: 'test-payload' });

    expect(mockedCreateOperationMetadata).toHaveBeenCalledTimes(1);
    expect(mockedCreateOperationMetadata).toHaveBeenCalledWith(undefined);
    expect(command.metadata).toEqual(mockDefaultMetadata); // Debe ser igual al default de la factoría
  });

  it('should have readonly commandId, commandName, and metadata properties', () => {
    const command = new TestCommand({ data: 'test-payload' });

    // Intentar modificar las propiedades readonly debería fallar o no tener efecto
    // (TypeScript lo previene en tiempo de compilación, pero podemos simular un intento en JS)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore // Permitir el intento de asignación para el test
    expect(() => {
      command.commandId = 'new-id' as CommandInstanceId;
    }).toThrow(TypeError);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => {
      command.commandName = 'NewName';
    }).toThrow(TypeError);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => {
      command.metadata = { ...mockDefaultMetadata };
    }).toThrow(TypeError);

    // Verificar que los valores no cambiaron
    expect(command.commandId).toBe(mockGeneratedCommandInstanceId);
    expect(command.commandName).toBe('TestCommand');
    expect(command.metadata).toEqual(mockDefaultMetadata);
  });

  it('metadata object itself should be frozen and its properties immutable', () => {
    const command = new TestCommand({ data: 'test-payload' });
    expect(Object.isFrozen(command.metadata)).toBe(true);

    // Intentar modificar una propiedad de la metadata (si no fuera readonly en la interfaz)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore // Permitir el intento de asignación
    expect(() => {
      command.metadata.correlationId = 'changed-corr-id' as CorrelationId;
    }).toThrow(TypeError);
  });
});
/* SECCIÓN DE MEJORAS

[
  Mejora Aplicada (Linting):
    - Se eliminó la importación no utilizada de `GuardType`.
    - Se añadió un cast explícito `as { Guard: typeof GuardType; UuidUtils: typeof UuidUtilsType }`
      a `jest.requireActual('@dfs-suite/shared-utils')` para ayudar al linter a inferir
      los tipos y reducir los warnings de `no-unsafe-assignment` y `no-unsafe-member-access`
      dentro de la factory de `jest.mock`.
]

*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Se mantienen) */
/* SECCIÓN DE MEJORAS

[
  Mejora Aplicada (Linting):
    - Se importan los tipos `Guard as GuardType` y `UuidUtils as UuidUtilsType` de `@dfs-suite/shared-utils`.
    - Se castea el resultado de `jest.requireActual('@dfs-suite/shared-utils')` al tipo
      `{ Guard: typeof GuardType; UuidUtils: typeof UuidUtilsType }` dentro de la factory de `jest.mock`.
      Esto debería eliminar los warnings de `no-unsafe-assignment` y `no-unsafe-member-access` en esa sección.
    - El import de `UuidUtils` a nivel de módulo ya no es necesario si no se usa fuera del mock.
      (Revisión: se mantiene para `const MockedUuidUtils = UuidUtils as ...`, lo cual es correcto).
    - El warning de `ActualGuard` no usado debería desaparecer al no importarlo así.
]

*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Se mantienen) */
/* SECCIÓN DE MEJORAS

[
  Mejora Aplicada (Linting):
    - Se importan los tipos originales `ActualUuidUtils` y `ActualGuard` para ayudar con el tipado
      de `jest.requireActual`.
    - `MockedUuidUtils` ahora se castea desde el `UuidUtils` importado (que es el mock).
    - Se añadieron `eslint-disable-next-line @typescript-eslint/unbound-method` a las aserciones
      `toHaveBeenCalledTimes` y `toHaveBeenCalledWith` para los mocks de funciones puras/estáticas,
      ya que el problema de `this` no aplica aquí y la regla es demasiado estricta.
]
[
  Mejora Pendiente: Los warnings de `no-unsafe-assignment` y `no-unsafe-member-access` en la
                  definición de `jest.mock('@dfs-suite/shared-utils', ...)` persisten porque
                  `jest.requireActual` devuelve `unknown`. Aunque funcional, el tipado aquí
                  podría ser más estricto si importamos los tipos de `Guard` y `UuidUtils`
                  y los usamos para castear las partes de `jest.requireActual`.
]

*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA

[
  Nota 1: Las desactivaciones de `unbound-method` son un compromiso pragmático para los tests
          de mocks de funciones que no son métodos de instancia.
]
*/
/* SECCIÓN DE MEJORAS

[
  Mejora Aplicada (Corrección ReferenceError):
    - La función `jest.fn()` para mockear `generateCommandInstanceId` y `createOperationMetadata`
      ahora se define *directamente dentro* de la factory de `jest.mock`.
    - Se accede a estos mocks en los tests a través de la importación del módulo `UuidUtils`
      (que ahora está mockeado por Jest) y `createOperationMetadata`, usando un cast
      a `jest.Mocked<...>` para el tipado correcto con los matchers de Jest.
]

*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA

[
  Nota 1: Este enfoque asegura que los mocks estén disponibles cuando la factory de `jest.mock`
          se ejecute debido al hoisting.
]
*/
/* SECCIÓN DE MEJORAS

[
  Mejora Aplicada (Corrección ReferenceError):
    - La función `jest.fn()` para mockear `generateCommandInstanceId` y `createOperationMetadata`
      ahora se define *directamente dentro* de la factory de `jest.mock`.
    - Se accede a estos mocks en los tests a través de la importación del módulo `UuidUtils`
      (que ahora está mockeado por Jest) y `createOperationMetadata`, usando un cast
      a `jest.Mocked<...>` para el tipado correcto con los matchers de Jest.
]

*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA

[
  Nota 1: Este enfoque asegura que los mocks estén disponibles cuando la factory de `jest.mock`
          se ejecute debido al hoisting.
]
*/
/* SECCIÓN DE MEJORAS

[
  Mejora Aplicada: Se corrigió el ReferenceError al definir el mock de `UuidUtils` directamente
                  dentro de la factory de `jest.mock`. Se mockea solo el método `generateCommandInstanceId`.
]
[
  Mejora 1 (Claridad del Mock): El mock de `UuidUtils` ahora mockea un método específico (`generateCommandInstanceId`)
                               en lugar de todo el objeto `UuidUtils`. Esto es más preciso.
]

*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA

[
  Nota 1: Este test sigue asumiendo que `CommandInstanceId` existe en `shared-types`.
]
[
  Nota 2: La prueba exhaustiva de la creación de metadata ahora reside en `metadata.factory.spec.ts`.
]
*/
/* SECCIÓN DE MEJORAS (Actualizada)
[
  Mejora Aplicada: Se usa `jest.mocked()` para envolver las llamadas a los mocks estáticos,
                  lo que debería ayudar con la regla `unbound-method` y el tipado.
]
[
  Mejora Aplicada: Se ajustó el mock de `UuidUtils` para ser más explícito y evitar
                  warnings de `no-unsafe-*`.
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Mantenidas) */
/* SECCIÓN DE MEJORAS
[
  Mejora Aplicada: Tests desacoplados de la lógica interna de `createOperationMetadata`.
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: La prueba exhaustiva de la creación de metadata ahora reside en `metadata.factory.spec.ts`.
]
*/
/* SECCIÓN DE MEJORAS
[
  Mejora Aplicada: Los tests ahora se centran en la interacción de `CommandBase` con sus dependencias
                  (UuidUtils, createOperationMetadata) y la correcta inicialización de sus
                  propiedades directas (`commandId`, `commandName`).
]
[
  Mejora Aplicada: Se mockea `createOperationMetadata` para aislar `CommandBase` de la lógica
                  interna de creación de metadata, la cual se prueba en `metadata.factory.spec.ts`.
]
[
  Mejora Crítica Pendiente: Implementar `metadata.factory.spec.ts` para probar exhaustivamente
                         `createOperationMetadata`.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: Este test asume que `CommandInstanceId` existe en `shared-types` y que
          `UuidUtils.generateCommandInstanceId` existe y está mockeado.
]
[
  Nota 2: La validación de los contenidos de `metadata` (como `correlationId` y `timestamp`)
          ahora es responsabilidad de los tests para `createOperationMetadata`.
]
*/
/* SECCIÓN DE MEJORAS
[
  Mejora 1: Añadir tests para la validación del formato de `timestamp` si se implementa
            directamente en `QueryBase` (actualmente se confía en el tipado de `IQueryMetadata`).
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: Este test asume la existencia de `QueryInstanceId` en `shared-types` y
          `UuidUtils.generateQueryInstanceId()`.
]
*/
// libs/core/domain/shared-kernel/commands-queries/src/lib/command.base.spec.ts
/* SECCIÓN DE MEJORAS (para este archivo de test)

[
  Mejora 1 (Branded Type para `commandId`):
    Si se implementa `CommandInstanceId` y `UuidUtils.generateCommandInstanceId()`,
    los tests deberían actualizarse para usar y verificar este tipo y método.
    Ejemplo: `(UuidUtils.generateCommandInstanceId as jest.Mock).mockReturnValue(mockGeneratedCommandInstanceId);`
             `expect(command.commandId).toBe(mockGeneratedCommandInstanceId);`
  Justificación: Mantener los tests alineados con las mejoras de tipado.
]
[
  Mejora 2 (Mock de `Guard`):
    Si `Guard.isNil` o `Guard.isEmpty` tuvieran una lógica más compleja o se quisiera
    probar cómo `CommandBase` reacciona a diferentes retornos de `Guard` (aunque su
    lógica actual es simple), se podría mockear `Guard` también. Por ahora, usar
    la implementación real de `Guard` es aceptable ya que sus métodos son simples.
  Justificación: Aislamiento extremo, útil si `Guard` fuera complejo o tuviera efectos secundarios.
]
[
  Mejora 3 (Test para `CommandProps<T>`):
    Si se decide mantener y usar el tipo `CommandProps<T>`, se deberían añadir tests
    o ejemplos que demuestren su uso correcto en una clase de comando hija, aunque
    testear un `type alias` directamente no es común. La prueba sería sobre su uso.
  Justificación: Asegurar que todos los artefactos exportados sean útiles y correctos.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA (para este archivo de test)

[
  Nota 1 (Dependencia de `shared-types`): Este test asume que `CommandInstanceId` se definirá en `shared-types`.
]
[
  Nota 2 (Completitud de Pruebas de Metadata): La suite cubre los principales escenarios de inicialización
            de metadata. Se podrían añadir más casos borde para `timestamp` o `causationId` si se
            identifican lógicas complejas alrededor de ellos en el futuro.
]
*/
