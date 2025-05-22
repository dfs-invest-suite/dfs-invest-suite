// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/query.interface.ts
// Autor: L.I.A Legacy (IA Asistente)
import {
  CorrelationId,
  Maybe,
  UserId,
  IsoDateString,
  QueryInstanceId,
  CommandInstanceId,
  DomainEventInstanceId,
  CausationId,
} from '@dfs-suite/shtypes';

export interface IQueryMetadata {
  readonly correlationId: CorrelationId;
  readonly causationId?: Maybe<
    CausationId | CommandInstanceId | DomainEventInstanceId | CorrelationId
  >;
  readonly userId?: Maybe<UserId>;
  readonly timestamp: IsoDateString;
}

export interface IQuery<_TResult = unknown> {
  // TResult prefijada con _
  readonly queryInstanceId: QueryInstanceId;
  readonly queryName: string;
  readonly metadata: Readonly<IQueryMetadata>;
}
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/query.interface.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "El parámetro genérico `TResult` en `IQuery` se ha renombrado a `_TResult`.", "justificacion": "Indica a ESLint que el tipo genérico está intencionalmente no usado directamente dentro de la definición de la interfaz `IQuery`, pero es necesario para la firma y la inferencia de tipos en los `IQueryHandler`. Esto resuelve el warning `@typescript-eslint/no-unused-vars`.", "impacto": "Código más limpio y semánticamente claro sobre la intención del genérico." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
