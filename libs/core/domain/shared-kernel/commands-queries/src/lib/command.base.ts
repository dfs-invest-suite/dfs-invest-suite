// libs/core/domain/shared-kernel/commands-queries/src/lib/command.base.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { UuidUtils } from '@dfs-suite/shared-utils'; // Guard ya no es necesario aquí directamente por la factoría
import { ICommand, ICommandMetadata } from './command.interface';
import {
  CommandInstanceId,
  // CorrelationId, Maybe, UserId, IsoDateString, DomainEventInstanceId // Estos son manejados por ICommandMetadata y la factoría
} from '@dfs-suite/shared-types';
// ArgumentInvalidException ya no se lanza desde aquí si la factoría lo hace
import { createOperationMetadata } from './metadata.factory'; // Importar la factoría

/**
 * @abstract
 * @class CommandBase
 * @implements ICommand
 * @description Clase base abstracta para todos los comandos del sistema.
 */
export abstract class CommandBase implements ICommand {
  readonly commandId: CommandInstanceId;
  readonly commandName: string;
  readonly metadata: ICommandMetadata;

  /**
   * @constructor
   * @param {Partial<ICommandMetadata>} [metadataProps] - Valores parciales para la metadata.
   */
  constructor(metadataProps?: Partial<ICommandMetadata>) {
    this.commandId = UuidUtils.generateCommandInstanceId();
    this.commandName = this.constructor.name;

    // Usar la factoría para crear la metadata
    this.metadata = createOperationMetadata(metadataProps);
    // Nota: createOperationMetadata devuelve Readonly<ICommandMetadata> (o el tipo OutputMetadata que definimos como ICommandMetadata)
    // por lo que el cast no es estrictamente necesario si los tipos coinciden.
  }
}
// libs/core/domain/shared-kernel/commands-queries/src/lib/command.base.ts
/* SECCIÓN DE MEJORAS (Actualizada)

[
  Mejora Aplicada: Utiliza `createOperationMetadata` para inicializar `metadata`, centralizando la lógica (DRY).
]
[
  Mejora Aplicada: Se eliminaron validaciones de metadata del constructor de CommandBase,
                  ya que ahora están en la factoría `createOperationMetadata`.
]
[
  Mejora Pendiente (Tests Unitarios): `command.base.spec.ts` necesitará ser ajustado.
    - En lugar de testear la lógica de creación de metadata aquí, se testeará que
      `createOperationMetadata` sea llamado con `metadataProps`.
    - Los tests detallados de la lógica de metadata ahora residirán en `metadata.factory.spec.ts`.
]
... (otras mejoras pendientes para CommandBase, como `RequestContextService`, se mantienen)
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Actualizada)

[
  Nota 1: `createOperationMetadata` es ahora responsable de la validación y generación
          de campos de metadata como `correlationId` y `timestamp`.
]
*/
/* SECCIÓN DE MEJORAS

[
  Mejora Aplicada: Lógica de `correlationId` corregida.
]
[
  Mejora Aplicada: `commandId` es `CommandInstanceId` y se genera con `UuidUtils.generateCommandInstanceId()`.
]
[
  Mejora Aplicada: `commandName` añadido y se inicializa con `this.constructor.name`.
]
[
  Mejora Aplicada: `metadata.timestamp` ahora espera y usa `IsoDateString`. Se genera si no se provee.
]
[
  Mejora Aplicada: Validación básica para `userId` y `causationId` (no vacíos si se proveen).
]
[
  Mejora Eliminada: `CommandProps<T>` eliminado por no usarse.
]
[
  Mejora Crítica Pendiente: Añadir tests unitarios exhaustivos en `command.base.spec.ts`.
]
[
  Mejora Pendiente (Avanzada): Integración con `RequestContextService` para `correlationId` y `userId` automáticos
                     (si se decide que es apropiado para una clase base del shared-kernel).
]
[
  Mejora Pendiente (Validación de `metadataProps.timestamp`): Si `metadataProps.timestamp` se permite como string,
                     validar su formato contra `IsoDateStringSchema` de `shared-validation-schemas` en el constructor.
                     Actualmente se confía en el tipado de `Partial<ICommandMetadata>`.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA

[
  Nota 1 (Inmutabilidad): `commandId`, `commandName` y `metadata` son `readonly` y `metadata` se congela.
]
[
  Nota 2 (Tipado de `causationId`): `ICommandMetadata.causationId` permite `CorrelationId | CommandInstanceId | DomainEventInstanceId`.
            `UuidUtils` debería tener métodos para generar estos tipos si no son simplemente UUIDs.
            Actualmente, todos son `Brand<string, ...>`, por lo que son compatibles estructuralmente si se basan en UUIDs.
]
*/
