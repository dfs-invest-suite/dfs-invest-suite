// RUTA: libs/shared/shutils/src/lib/object.utils.ts
// TODO: [LIA Legacy - Implementar ObjectUtils]
// Propósito: Funciones utilitarias para manipulación de objetos (deepClone, isEmptyObject, pick, omit).
// Relacionado con Casos de Uso: Transformación de DTOs, manejo de datos.

export function isEmptyObject(obj: object): boolean {
  if (obj === null || obj === undefined) return true;
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

// Implementar deepClone, pick, omit según necesidad.

/* SECCIÓN DE MEJORAS FUTURAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
