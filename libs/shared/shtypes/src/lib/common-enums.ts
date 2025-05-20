// RUTA: libs/shared/shtypes/src/lib/common-enums.ts
// TODO: [LIA Legacy - Implementar CommonEnums] - ¡REALIZADO!
// Propósito: Enums muy genéricos y transversales que no pertenecen a un dominio específico
//            y son utilizados en múltiples partes de la aplicación (ej. DTOs, queries).
// Relacionado con Casos de Uso: Varios (Paginación, Estados Genéricos, Opciones Comunes).

/**
 * Dirección de ordenamiento para listas y paginación.
 */
export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * Estados básicos comunes que pueden aplicar a diferentes entidades o procesos.
 * Usar con precaución y preferir enums de estado específicos del dominio cuando la semántica sea más rica.
 */
export enum BasicEntityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING', // Esperando alguna acción o validación
  DELETED = 'DELETED', // Marcado como borrado (soft delete)
  ARCHIVED = 'ARCHIVED',
}

/**
 * Tipos de canales de comunicación o interacción.
 */
export enum CommunicationChannel {
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PHONE_CALL = 'PHONE_CALL',
  PORTAL_WEB = 'PORTAL_WEB', // Interacción en portal-imoveis
  APP_PWA = 'APP_PWA', // Interacción dentro de pwa-supervisor/consultant
  APP_MOBILE = 'APP_MOBILE',
  SYSTEM = 'SYSTEM', // Interacción generada por el sistema (ej. nurturing automático)
  API = 'API', // Interacción vía API externa
  MANUAL_ENTRY = 'MANUAL_ENTRY', // Entrada manual por un usuario
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creación del archivo con enums base.", "justificacion": "Provee enums comunes solicitados, como `SortDirection` y un `BasicEntityStatus` (con advertencia sobre su uso). Se añadió `CommunicationChannel` como ejemplo útil.", "impacto": "Fundación para tipos enumerados globales." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Evaluar cuidadosamente si `BasicEntityStatus` es realmente necesario o si cada dominio debería definir siempre sus propios enums de estado más específicos para evitar generalizaciones excesivas." },
  { "nota": "Añadir más enums globales aquí solo si son verdaderamente transversales y no acoplan conceptos de dominio." }
]
*/
// RUTA: libs/shared/shtypes/src/lib/common-enums.ts
