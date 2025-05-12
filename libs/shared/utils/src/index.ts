// libs/shared/utils/src/index.ts
export * from './lib/guard';
export * from './lib/uuid.utils';

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
