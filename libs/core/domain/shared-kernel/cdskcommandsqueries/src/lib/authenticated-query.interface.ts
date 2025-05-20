// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/authenticated-query.interface.ts
// TODO: [LIA Legacy - Implementar IAuthenticatedQuery y su Metadata] - ¡REALIZADO!
// Propósito: Extender IQuery y IQueryMetadata para queries que DEBEN tener un userId.
// Relacionado con Casos de Uso: Queries que filtran datos por el usuario actual o sus permisos.

import { UserId } from '@dfs-suite/shtypes'; // REFACTORIZADO

import { IQuery, IQueryMetadata } from './query.interface'; // OK

export interface IAuthenticatedQueryMetadata extends IQueryMetadata {
  readonly userId: UserId; // userId es mandatorio aquí
}

export interface IAuthenticatedQuery<TResult = unknown>
  extends IQuery<TResult> {
  // Hacer genérico sobre TResult
  readonly metadata: Readonly<IAuthenticatedQueryMetadata>; // Usar Readonly
}
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "`IAuthenticatedQuery` ahora es genérico sobre `TResult`.", "justificacion": "Consistencia con `IQuery`.", "impacto": "Flexibilidad." },
  { "mejora": "`metadata` en `IAuthenticatedQuery` es `Readonly`.", "justificacion": "Promueve inmutabilidad.", "impacto": "Seguridad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/authenticated-query.interface.ts
