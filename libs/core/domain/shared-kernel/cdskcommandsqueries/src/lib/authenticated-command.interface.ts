// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/authenticated-command.interface.ts
// Autor: L.I.A Legacy (IA Asistente)
import { UserId, ObjectLiteral } from '@dfs-suite/shtypes';

import { ICommand, ICommandMetadata } from './command.interface';

/**
 * Extiende `ICommandMetadata` para incluir `userId` como propiedad mandatoria.
 * Utilizada por comandos que requieren un usuario autenticado para su ejecución.
 */
export interface IAuthenticatedCommandMetadata extends ICommandMetadata {
  readonly userId: UserId; // userId es mandatorio aquí
}

/**
 * Extiende `ICommand` para asegurar que la metadata sea del tipo `IAuthenticatedCommandMetadata`.
 *
 * @template TPayload - El tipo del payload del comando.
 */
export interface IAuthenticatedCommand<
  TPayload extends ObjectLiteral = Record<string, never>
> extends ICommand<TPayload> {
  readonly metadata: Readonly<IAuthenticatedCommandMetadata>; // Sobrescribe para usar metadata autenticada
}
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/authenticated-command.interface.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports actualizados a alias codificados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "`IAuthenticatedCommand` ahora es genérico sobre `TPayload` y `metadata` es `Readonly`.", "justificacion": "Consistencia y buenas prácticas.", "impacto": "Flexibilidad y seguridad." },
  { "mejora": "JSDoc añadido.", "justificacion": "Claridad.", "impacto": "DX." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
