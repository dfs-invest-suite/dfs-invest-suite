// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-import-result.dto.ts
// Autor: L.I.A Legacy (IA Asistente)

// Este DTO representa el resultado de una operación de importación de leads.

/**
 * Detalle de un error ocurrido durante la importación de una fila específica.
 */
export interface LeadImportErrorDetail {
  /**
   * El número de fila (basado en 1) en el archivo original que causó el error.
   * Puede ser 0 o no estar presente si el error es a nivel de archivo (ej. parseo).
   */
  rowNumber?: number;
  /**
   * Mensaje descriptivo del error.
   */
  errorMessage: string;
  /**
   * Los datos crudos de la fila que causaron el error, para referencia y depuración.
   * Se usa `any` aquí porque la estructura de la fila puede variar mucho según el archivo de origen.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowData?: any;
}

/**
 * DTO para el resultado agregado de una operación de importación de leads.
 */
export interface LeadImportResultDto {
  /**
   * Número total de filas procesadas o intentadas desde el archivo.
   */
  readonly totalRowsProcessed: number;
  /**
   * Número de leads que se importaron (crearon o actualizaron) exitosamente.
   */
  readonly successfullyImportedCount: number;
  /**
   * Número de filas que fallaron durante la importación.
   */
  readonly failedRowsCount: number;
  /**
   * Un array con los detalles de cada error ocurrido durante la importación.
   * Estará vacío si todas las filas se procesaron exitosamente.
   */
  readonly errorDetails: LeadImportErrorDetail[];
  /**
   * (Opcional) ID del job si la importación se procesó de forma asíncrona en una cola.
   */
  // readonly jobId?: string;
  /**
   * (Opcional) URL a un reporte más detallado de la importación, especialmente útil para
   * importaciones grandes con muchos errores.
   */
  // readonly reportUrl?: string;
  /**
   * (Opcional) Indica si la operación general de parseo e intento de importación fue exitosa,
   * incluso si algunas filas individuales fallaron. `false` si hubo un error fatal.
   */
  // readonly operationSuccess: boolean;
}
// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-import-result.dto.ts
