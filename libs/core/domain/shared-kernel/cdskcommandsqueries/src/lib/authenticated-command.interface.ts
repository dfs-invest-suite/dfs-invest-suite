// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/authenticated-command.interface.ts
// TODO: [LIA Legacy - Implementar IAuthenticatedCommand y su Metadata] - ¡REALIZADO!
// Propósito: Extender ICommand y ICommandMetadata para comandos que DEBEN tener un userId.
// Relacionado con Casos de Uso: La mayoría de los casos de uso iniciados por un usuario autenticado.

import { UserId, ObjectLiteral } from '@dfs-suite/shtypes'; // REFACTORIZADO

import { ICommand, ICommandMetadata } from './command.interface'; // OK

export interface IAuthenticatedCommandMetadata extends ICommandMetadata {
  readonly userId: UserId; // userId es mandatorio aquí
}

export interface IAuthenticatedCommand<
  TPayload extends ObjectLiteral = Record<string, never>
> extends ICommand<TPayload> {
  // Hacer genérico sobre TPayload
  readonly metadata: Readonly<IAuthenticatedCommandMetadata>; // Usar Readonly
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "`IAuthenticatedCommand` ahora es genérico sobre `TPayload`.", "justificacion": "Consistencia con `ICommand`.", "impacto": "Flexibilidad." },
  { "mejora": "`metadata` en `IAuthenticatedCommand` es `Readonly`.", "justificacion": "Promueve inmutabilidad.", "impacto": "Seguridad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/authenticated-command.interface.ts
