// libs/core/domain/shared-kernel/commands-queries/src/lib/command.interface.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import {
  CorrelationId,
  Maybe,
  UserId,
  CommandInstanceId,
  IsoDateString,
  DomainEventInstanceId,
} from '@dfs-suite/shared-types';

export interface ICommandMetadata {
  readonly correlationId: CorrelationId;
   
  // Temporalmente deshabilitado si el linter sigue dando problemas con la unión de Branded Types.
  // Investigar si es un falso positivo o si la configuración de ESLint/TypeScript necesita ajuste
  // para entender mejor estas uniones nominales.
  readonly causationId?: Maybe<
    CorrelationId | CommandInstanceId | DomainEventInstanceId
  >;
  readonly userId?: Maybe<UserId>;
  readonly timestamp: IsoDateString;
}

export interface ICommand {
  readonly commandId: CommandInstanceId;
  readonly commandName: string;
  readonly metadata: ICommandMetadata;
}
// libs/core/domain/shared-kernel/commands-queries/src/lib/command.interface.ts
/* SECCIÓN DE MEJORAS (Mantenidas) */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Mantenidas) */
/* SECCIÓN DE MEJORAS (Actualizada)

[
  Mejora Aplicada: `commandId` es `CommandInstanceId`.
]
[
  Mejora Aplicada: `commandName` añadido.
]
[
  Mejora Aplicada: `metadata.timestamp` es `IsoDateString`.
]
[
  Mejora Pendiente (`userId` en `ICommandMetadata`): Evaluar `IAuthenticatedCommandMetadata`.
]
[
  Mejora Sugerida (`causationId`): Tipado más específico para `causationId` como unión de posibles IDs causales.
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Mantenidas) */

/* SECCIÓN DE MEJORAS (Refleja cambios y mejoras pendientes)

[
  Mejora Aplicada: `commandId` ahora es `CommandInstanceId`.
]
[
  Mejora Aplicada: Se añadió `commandName`.
]
[
  Mejora Aplicada: `metadata.timestamp` ahora es `IsoDateString`.
]
[
  Mejora Pendiente (`userId` en `ICommandMetadata`): Evaluar si debe ser obligatorio o usar `IAuthenticatedCommandMetadata`.
]
[
  Mejora Pendiente (`causationId`): El tipo `CorrelationId` para `causationId` es genérico.
    Podría ser una unión de `CommandInstanceId | DomainEventInstanceId` si se quiere ser más preciso.
    Por ahora, `CorrelationId` (que es un string brandeado) puede servir si los IDs de comando/evento son UUIDs.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: La clase `CommandBase` deberá actualizarse para implementar `commandName` y usar
          `IsoDateString` para `metadata.timestamp`.
]
*/
