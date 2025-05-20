// RUTA: libs/shared/shtypes/src/lib/common-enums.ts
// TODO: [LIA Legacy - Implementar CommonEnums]
// Propósito: Definir enums muy genéricos y transversales.
// Relacionado con Casos de Uso: Varios, para estandarizar estados o tipos comunes.

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum BasicStatus { // Ejemplo, podría no ser necesario si los dominios tienen sus propios status
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  DELETED = 'DELETED',
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora 1: Evaluar qué otros enums son verdaderamente globales y no específicos de un dominio.
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
