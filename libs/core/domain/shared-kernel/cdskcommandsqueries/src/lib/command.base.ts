// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/command.base.ts
// Autor: L.I.A Legacy (IA Asistente)
import { CommandInstanceId, ObjectLiteral } from '@dfs-suite/shtypes';
import { createOperationMetadata, UuidUtils } from '@dfs-suite/shutils';

import { ICommand, ICommandMetadata } from './command.interface';

/**
 * Clase base abstracta para todos los comandos del sistema.
 * Implementa la interfaz `ICommand` y se encarga de inicializar
 * el `commandId`, `commandName`, y `metadata` de forma consistente.
 *
 * @template TPayload - El tipo del objeto de datos (payload) específico del comando.
 */
export abstract class CommandBase<
  TPayload extends ObjectLiteral = Record<string, never> // Asegurar que payload sea ObjectLiteral
> implements ICommand<TPayload>
{
  readonly commandId: CommandInstanceId;
  readonly commandName: string;
  readonly metadata: Readonly<ICommandMetadata>; // metadata es readonly
  readonly payload: Readonly<TPayload>; // payload es readonly

  /**
   * @param payload - Los datos específicos del comando.
   * @param metadataProps - Valores parciales para la metadata. `correlationId` y `timestamp`
   *                        se generarán automáticamente si no se proveen.
   */
  protected constructor(
    payload: TPayload,
    metadataProps?: Partial<ICommandMetadata>
  ) {
    this.commandId = UuidUtils.generateCommandInstanceId();
    this.commandName = this.constructor.name;
    this.metadata = Object.freeze(
      createOperationMetadata(metadataProps) as ICommandMetadata
    );
    this.payload = Object.freeze({ ...payload }); // Congelar una copia del payload
  }
}
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/command.base.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports actualizados a alias codificados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "Constructor ahora toma `payload` como primer argumento.", "justificacion": "Es más común y lógico que los datos específicos del comando sean el primer argumento.", "impacto": "Cambio en la firma, las clases que heredan deben ajustarse." },
  { "mejora": "`payload` ahora es `readonly` y se congela en el constructor.", "justificacion": "Asegura la inmutabilidad del comando después de su creación.", "impacto": "Robustez." },
  { "mejora": "`metadata` ahora es `Readonly<ICommandMetadata>` y se congela.", "justificacion": "Inmutabilidad.", "impacto": "Seguridad." },
  { "mejora": "JSDoc añadido.", "justificacion": "Claridad.", "impacto": "DX." },
  { "mejora": "`TPayload` ahora extiende `ObjectLiteral`.", "justificacion": "Asegura que el payload sea un objeto.", "impacto": "Seguridad de tipos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
