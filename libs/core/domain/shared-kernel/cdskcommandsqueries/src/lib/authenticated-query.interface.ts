// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/authenticated-query.interface.ts
// TODO: [LIA Legacy - Implementar IAuthenticatedQuery & IAuthenticatedQueryMetadata]
// Propósito: Extender IQuery y IQueryMetadata para queries que DEBEN tener un userId.
// Relacionado con Casos de Uso: Queries que filtran datos por el usuario actual o sus permisos.
import { IQuery, IQueryMetadata } from './query.interface';
// UserId ya importado arriba

export interface IAuthenticatedQueryMetadata extends IQueryMetadata {
  readonly userId: UserId; // userId es mandatorio aquí
}

export interface IAuthenticatedQuery extends IQuery {
  readonly metadata: IAuthenticatedQueryMetadata;
}
