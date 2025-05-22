// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/authenticated-query.interface.ts
// Autor: L.I.A Legacy (IA Asistente)
import { UserId } from '@dfs-suite/shtypes';

import { IQuery, IQueryMetadata } from './query.interface';

/**
 * Extiende `IQueryMetadata` para incluir `userId` como propiedad mandatoria.
 * Utilizada por queries que requieren un usuario autenticado para filtrar datos o verificar permisos.
 */
export interface IAuthenticatedQueryMetadata extends IQueryMetadata {
  readonly userId: UserId; // userId es mandatorio aquí
}

/**
 * Extiende `IQuery` para asegurar que la metadata sea del tipo `IAuthenticatedQueryMetadata`.
 *
 * @template TResult - El tipo del resultado de la query.
 */
export interface IAuthenticatedQuery<TResult = unknown>
  extends IQuery<TResult> {
  readonly metadata: Readonly<IAuthenticatedQueryMetadata>; // Sobrescribe para usar metadata autenticada
}
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/authenticated-query.interface.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports actualizados a alias codificados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "`IAuthenticatedQuery` ahora es genérico sobre `TResult` y `metadata` es `Readonly`.", "justificacion": "Consistencia y buenas prácticas.", "impacto": "Flexibilidad y seguridad." },
  { "mejora": "JSDoc añadido.", "justificacion": "Claridad.", "impacto": "DX." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
