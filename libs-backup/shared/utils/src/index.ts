// RUTA: libs/shared/utils/src/index.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

export * from './lib/guard';
export {
  createOperationMetadata,
  type IOperationMetadataInput, // Exportar tipos si son útiles para los consumidores
  type IOperationMetadataOutput,
} from './lib/metadata.factory'; // Exportar la nueva factoría
export * from './lib/uuid.utils';
// RUTA: libs/shared/utils/src/index.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Exportación de `createOperationMetadata` y sus tipos asociados.",
    "justificacion": "La factoría de metadata ahora reside en `shared-utils` y necesita ser exportada para que las clases base de Comandos, Queries y Eventos puedan consumirla. Se exportan también los tipos de input/output de la factoría por si fueran útiles.",
    "impacto": "Permite el uso centralizado de la lógica de creación de metadata."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Confirmar si `IOperationMetadataInput` e `IOperationMetadataOutput` deben ser parte de la API pública de `shared-utils` o si solo `createOperationMetadata` es suficiente y los tipos de metadata se infieren en los consumidores."
  }
]
*/

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Modularidad Interna): Si la cantidad de utilidades crece mucho, considerar agruparlas en archivos temáticos (ej. `string.utils.ts`, `object.utils.ts`, `date.utils.ts`) dentro de `src/lib/` y exportarlas desde aquí.
  Justificación: Mejora la organización y mantenibilidad de la librería de utilidades.
  Impacto: Reestructuración interna de archivos.
]
[
  Mejora Propuesta 2 (Documentación JSDoc/TSDoc): Añadir documentación TSDoc detallada a cada función y clase utilitaria, explicando su propósito, parámetros, valor de retorno y ejemplos de uso.
  Justificación: Facilita el uso y la comprensión de las utilidades por parte de otros desarrolladores.
  Impacto: Esfuerzo de documentación.
]

*/
