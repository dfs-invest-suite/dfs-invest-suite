// libs/shared/constants/src/index.ts
export * from './lib/pagination.constants';
export * from './lib/regex.constants';

/* SECCIÓN DE MEJORAS FUTURAS (para este archivo index.ts)

[
  Mejora Propuesta 1 (Organización): Si la cantidad de archivos de constantes dentro de `src/lib/` crece significativamente (ej. más de 5-7 archivos), se podría considerar agruparlos en subdirectorios temáticos dentro de `src/lib/` (ej. `src/lib/api/`, `src/lib/security/`) y luego re-exportarlos desde este `index.ts` principal, o tener `index.ts` en cada subdirectorio y re-exportarlos aquí.
  Justificación: Mejoraría la navegabilidad y la organización lógica a medida que la librería se expande.
  Impacto: Mínimo, principalmente refactorización de rutas de exportación.
]
[
  Mejora Propuesta 2 (Documentación): Añadir comentarios JSDoc a cada exportación para clarificar el propósito de los módulos de constantes que se están exportando, especialmente si los nombres de archivo no son auto-explicativos.
  Justificación: Mejora la auto-documentación del código y facilita la comprensión para otros desarrolladores (o para la IA).
  Impacto: Esfuerzo de documentación.
]

*/
