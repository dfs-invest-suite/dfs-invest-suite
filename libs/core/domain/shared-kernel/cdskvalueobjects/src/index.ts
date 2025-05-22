// libs/core/domain/shared-kernel/cdskvalueobjects/src/index.ts
export * from './lib/email.vo';
export * from './lib/iso-date-string.vo';
export * from './lib/money.vo';
export * from './lib/phone-number.vo';
export * from './lib/url.vo';
export * from './lib/value-object.base'; // Asegura que IDomainPrimitive y Primitives también se exporten
// FIN DEL ARCHIVO: libs/core/domain/shared-kernel/cdskvalueobjects/src/index.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmada la exportación de `value-object.base` desde `index.ts`.", "justificacion": "Asegura que `ValueObject`, `IDomainPrimitive` y `Primitives` estén disponibles para las librerías que dependen de `@dfs-suite/cdskvalueobjects`.", "impacto": "Resuelve errores `TS2305` (Module has no exported member) para estos tipos base." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
