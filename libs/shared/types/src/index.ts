// libs/shared/types/src/index.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
// website: www.metashark.tech
// email: developers@metashark.tech

/**
 * @file index.ts
 * @description
 * Punto de entrada principal (barrel file) para la librería `@dfs-suite/shared-types`.
 * Esta librería consolida y exporta todas las interfaces y tipos TypeScript
 * fundamentales, reutilizables y agnósticos al dominio que se utilizan a lo largo
 * de todo el proyecto DFS-Invest-Suite. Su objetivo es proporcionar un vocabulario
 * de tipos común, consistente y seguro para todas las capas de la aplicación.
 *
 * Principales categorías de tipos exportados:
 * - Estructuras de datos comunes para API y paginación.
 * - Tipos primitivos "brandeados" para mejorar la seguridad semántica de los IDs y otros valores.
 * - Tipos de utilidad como `Maybe<T>` y `ObjectLiteral<V>`.
 * - El tipo `Brand<K,T>` para la creación de tipos nominales.
 */

// Estructuras de datos comunes para API y paginación
export { type IApiResponse } from './lib/api-response.interface';
export { type IPaginatedQueryParams, type IPaginated } from './lib/paginated.interface';

// Tipos primitivos "brandeados"
export {
  type AggregateId,
  type TenantId,
  type UserId,
  type CorrelationId, // Fuente canónica ahora es primitive-types.ts
  type IsoDateString,
  type CommandInstanceId,
  type QueryInstanceId,
  type DomainEventInstanceId,
  // Futuro: Añadir más IDs brandeados comunes aquí (LeadId, WhatsAppAccountId, etc.)
} from './lib/primitive-types';

// Tipos de utilidad
export { type Maybe } from './lib/maybe.type';
export { type ObjectLiteral } from './lib/object-literal.type';
export { type Brand } from './lib/brand.type';

// Nota: Se asume que el archivo 'correlation-id.type.ts' ha sido eliminado o su contenido
// movido a 'primitive-types.ts' para evitar la duplicación y asegurar una única fuente de verdad
// para el tipo `CorrelationId`. Si `correlation-id.type.ts` se mantuviera por alguna razón
// y solo re-exportara `CorrelationId` de `primitive-types.ts`, esta exportación aquí sería redundante.
// La mejor práctica es tener una única definición y exportarla desde el módulo apropiado.

// libs/shared/types/src/index.ts
/* SECCIÓN DE MEJORAS (Estado de implementación)

[
  Mejora Aplicada: Uso de exportaciones nombradas explícitas para todos los artefactos.
    Esto proporciona un control más fino sobre la API pública de la librería.
]
[
  Mejora Aplicada: Resuelta la duplicación de `CorrelationId`. Se exporta desde `primitive-types.ts`
                  y se asume que `correlation-id.type.ts` ha sido eliminado o su contenido integrado.
]
[
  Mejora Aplicada: Se exportan los nuevos Branded Types para IDs de mensajería
                  (`CommandInstanceId`, `QueryInstanceId`, `DomainEventInstanceId`).
]
[
  Mejora Aplicada: Se ha añadido un comentario JSDoc a nivel de módulo más detallado.
]
[
  Mejora Pendiente (Organización por Sub-módulos de Tipos):
    Si la cantidad de archivos de tipos individuales en `./lib/` crece mucho (ej. >7-10 archivos),
    se podría considerar agruparlos en subdirectorios temáticos (ej. `./lib/api/`, `./lib/ids/`, `./lib/utils/`)
    y ajustar las exportaciones aquí para reflejar esa estructura.
  Justificación: Mantenibilidad y navegabilidad a largo plazo.
  Impacto: Reestructuración de archivos internos de la librería.
]
[
  Mejora Pendiente (Tests de Tipos con `tsd`):
    Para una librería que es exclusivamente de tipos, añadir "tests de tipos" con `tsd`
    validaría aserciones sobre la asignabilidad y estructura de los tipos en tiempo de compilación.
  Justificación: Mayor confianza en la corrección de definiciones de tipos complejos o brandeados.
  Impacto: Nueva dependencia de desarrollo, creación de archivos de test `*.test-d.ts`.
]
[
  Mejora Pendiente (Generación Automática de Documentación de Tipos):
    Utilizar TypeDoc para generar documentación HTML a partir de los comentarios TSDoc.
  Justificación: Referencia de API navegable.
  Impacto: Dependencia de desarrollo (`typedoc`), script/target Nx para generación.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA

[
  Nota estratégica 1 (API Pública Única): Este archivo sigue siendo el único punto de entrada
  para todos los tipos compartidos. Los consumidores importan desde `@dfs-suite/shared-types`.
]
[
  Nota estratégica 2 (Eliminación de `correlation-id.type.ts`):
    Confirmar que el archivo `libs/shared/types/src/lib/correlation-id.type.ts` ha sido eliminado
    para evitar cualquier confusión o importación accidental de una definición duplicada.
]
[
  Nota estratégica 3 (Anomalía de Directorio `libs/shared/types/src/lib/libs/shared/`):
    Re-confirmar que esta estructura anómala (vista en snapshots anteriores) ha sido completamente
    eliminada del proyecto y que todos los archivos de tipo residen directamente bajo `libs/shared/types/src/lib/`.
]
*/
// La línea `export * from './lib/correlation-id.type';` se elimina si ese archivo se borró.

// libs/shared/types/src/index.ts
/* SECCIÓN DE MEJORAS (Mantenidas o aplicadas)

[
  Mejora Aplicada: Se usan exportaciones nombradas explícitas.
]
[
  Mejora Aplicada: Se resolvió la duplicación de `CorrelationId` al definirlo canónicamente en `primitive-types.ts` y exportarlo desde allí.
]
[
  Mejora Pendiente (Organización por Sub-módulos): Si la cantidad de tipos crece mucho.
]
[
  Mejora Pendiente (Tests de Tipos con `tsd`): Para validación avanzada de tipos.
]
[
  Mejora Pendiente (Generación de Documentación de Tipos): Con TypeDoc.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA

[
  Nota 1: Este archivo es la única API pública para los tipos compartidos.
]
[
  Nota 2 (Anomalía de Directorio `libs/shared/types/src/lib/libs/shared/`):
    Reconfirmar que esta estructura anómala del snapshot original ha sido eliminada.
    Si no, debe corregirse moviendo los archivos de tipo directamente a `libs/shared/types/src/lib/`.
]
*/
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Exportaciones Nombradas Explícitas): Similar a `shared-result`, considerar exportaciones nombradas en lugar de `export *` para mayor claridad de la API pública.
    `export type { IApiResponse } from './lib/api-response.interface';`
    `export type { IPaginatedQueryParams, IPaginated } from './lib/paginated.interface';`
    // ... y así sucesivamente para los demás.
  Justificación: Mejor control y visibilidad de la API de la librería.
  Impacto: Refactorización menor para listar todas las exportaciones.
]
[
  Mejora Propuesta 2 (Sub-módulos de Tipos): Si la cantidad de tipos crece mucho, considerar agruparlos en sub-archivos o subdirectorios dentro de `src/lib/` por temática (ej. `src/lib/api-types/`, `src/lib/domain-primitive-types/`) y luego re-exportarlos desde este `index.ts` principal.
  Justificación: Mejora la organización si la librería se vuelve muy extensa.
  Impacto: Reestructuración de archivos y rutas de exportación.
]

*/
