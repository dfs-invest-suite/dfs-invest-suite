// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/authenticated-command.interface.ts
// TODO: [LIA Legacy - Implementar IAuthenticatedCommand & IAuthenticatedCommandMetadata]
// Propósito: Extender ICommand y ICommandMetadata para comandos que DEBEN tener un userId.
// Relacionado con Casos de Uso: La mayoría de los casos de uso iniciados por un usuario autenticado.
import { ICommand, ICommandMetadata } from './command.interface';
import { UserId } from '@dfs-suite/shtypes'; // Usando el nuevo importPath

export interface IAuthenticatedCommandMetadata extends ICommandMetadata {
  readonly userId: UserId; // userId es mandatorio aquí
}

export interface IAuthenticatedCommand extends ICommand {
  readonly metadata: IAuthenticatedCommandMetadata;
}
