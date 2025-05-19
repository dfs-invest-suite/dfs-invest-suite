// libs/shared/result/src/index.ts
export * from './lib/result.type';
export * from './lib/result.utils';

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Exportaciones Nombradas Explícitas): En lugar de `export *`, considerar exportar explícitamente cada tipo o función:
    `export { Ok, Err, Result } from './lib/result.type';`
    `export { ok, err, isOk, isErr } from './lib/result.utils';`
  Justificación: Mejora la claridad sobre la API pública de la librería, facilita el tree-shaking por parte de los bundlers y hace más evidentes los cambios en la API pública al revisar los diffs de Git. Para librerías pequeñas y cohesivas como esta, el beneficio puede ser marginal pero es una buena práctica general.
  Impacto: Cambio menor, solo requiere listar las exportaciones.
]
[
  Mejora Propuesta 2 (Documentación JSDoc/TSDoc): Añadir comentarios TSDoc a las interfaces y funciones exportadas para que aparezcan en el autocompletado de los IDEs y sirvan como documentación en línea.
  Justificación: Mejora la experiencia del desarrollador y la auto-documentación de la librería.
  Impacto: Esfuerzo de documentación en los archivos fuente (`result.type.ts`, `result.utils.ts`).
]

*/
