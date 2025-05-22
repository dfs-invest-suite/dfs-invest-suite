// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/command-handler.interface.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';

import { ICommand } from './command.interface';

/**
 * Interfaz para los Manejadores de Comandos (Command Handlers).
 * Cada handler es responsable de ejecutar la lógica asociada a un tipo específico de Comando.
 *
 * @template C - El tipo del Comando que este handler puede procesar. Debe extender `ICommand`.
 * @template R - El tipo del resultado en caso de éxito. Por defecto es `void` si el comando
 *               no produce un valor de retorno directo (lo cual es común para comandos).
 */
export interface ICommandHandler<
  C extends ICommand,
  R = void // Los comandos a menudo no devuelven datos en el Result.Ok, solo indican éxito
> {
  /**
   * Ejecuta el comando dado.
   * @param command - La instancia del comando a ejecutar.
   * @returns Una Promesa que resuelve a un `Result`.
   *          - `Ok<R>`: Si el comando se ejecutó exitosamente (R es void por defecto).
   *          - `Err<ExceptionBase | Error>`: Si ocurrió un error de negocio (dominio o aplicación)
   *                                         o un error inesperado durante la ejecución.
   */
  execute(command: C): Promise<Result<R, ExceptionBase | Error>>;
}
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/command-handler.interface.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports actualizados a alias codificados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "JSDoc añadido.", "justificacion": "Claridad sobre el rol y los tipos genéricos.", "impacto": "DX." },
  { "mejora": "Tipo de error en `Result` es `ExceptionBase | Error`.", "justificacion": "Permite errores de dominio/aplicación (ExceptionBase) o errores genéricos.", "impacto": "Flexibilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
