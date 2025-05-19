// libs/shared/errors/src/index.ts
export * from './lib/exception.base';
export * from './lib/exception.codes';
export * from './lib/generic.exceptions';

/* SECCIÓN DE MEJORAS FUTURAS (para este archivo index.ts)

[
  Mejora Propuesta 1 (Especificidad de Exportación): Si en el futuro se añaden muchos tipos de errores o códigos específicos que no deberían ser parte de la API pública de esta librería 'shared-errors' (quizás porque son muy internos a un sub-módulo de errores), se podría ser más selectivo en las exportaciones en lugar de usar `export *`. Sin embargo, para una librería de errores base, `export *` suele ser adecuado.
  Justificación: Mayor control sobre la API pública de la librería.
  Impacto: Requeriría listar explícitamente cada exportación.
]

*/
