// libs/shared/validation-schemas/src/index.ts
export * from './lib/zod.instance';
export * from './lib/common.schemas';
export * from './lib/pagination.schemas';

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Agrupación de Schemas): Si la cantidad de archivos de schemas crece, considerar subdirectorios temáticos (ej. `src/lib/user-related/`, `src/lib/api-input/`) para mejorar la organización.
  Justificación: Mantenibilidad y navegabilidad a largo plazo.
  Impacto: Reestructuración de archivos y rutas de exportación.
]
[
  Mejora Propuesta 2 (Exportación de Tipos Inferidos): Como se mencionó en las mejoras del `project.json`, si se decide exportar tipos inferidos de Zod, se añadirían aquí.
  Ejemplo:
  `import { z } from './lib/zod.instance';`
  `import { EmailSchema } from './lib/common.schemas';`
  `export type Email = z.infer<typeof EmailSchema>;`
  Justificación: Conveniencia para los consumidores de la librería.
  Impacto: Modificaciones en este archivo y en los archivos de schemas para definir y exportar los tipos inferidos.
]

*/
