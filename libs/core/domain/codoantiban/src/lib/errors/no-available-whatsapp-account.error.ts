// RUTA: libs/core/domain/codoantiban/src/lib/errors/no-available-whatsapp-account.error.ts
import { NotFoundException } from '@dfs-suite/sherrors';
import {
  CorrelationId,
  Maybe,
  ObjectLiteral,
  TenantId,
} from '@dfs-suite/shtypes'; // Añadido ObjectLiteral

export class NoAvailableWhatsAppAccountError extends NotFoundException {
  public readonly code = 'ANTIBAN.NO_AVAILABLE_ACCOUNT'; // Definir como propiedad readonly

  constructor(
    tenantId: TenantId,
    details?: string,
    cause?: Maybe<Error | unknown>, // Añadir cause y correlationId
    correlationId?: Maybe<CorrelationId>
  ) {
    const message = `No suitable WhatsApp account available for tenant ${String(
      tenantId
    )} to send message. ${details || ''}`;
    const metadata: ObjectLiteral = { tenantId: String(tenantId) }; // Tipar metadata
    if (details) metadata['details'] = details;

    super(message, cause, metadata, correlationId);
    // this.code ya está definido
  }
}
// FIN DEL ARCHIVO: libs/core/domain/codoantiban/src/lib/errors/no-available-whatsapp-account.error.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "`code` ahora se define como `public readonly code = ...;` a nivel de clase.",
    "justificacion": "Resuelve el error TS2540 (`Cannot assign to 'code' because it is a read-only property`). Las propiedades abstractas `readonly` de una clase base deben ser implementadas como propiedades `readonly` en la subclase, usualmente con una asignación directa en la declaración.",
    "impacto": "Clase de error correctamente definida."
  },
  {
    "mejora": "Constructor ahora acepta `cause` y `correlationId` opcionales y los pasa a `super()`.",
    "justificacion": "Alineación con `ExceptionBase` y permite propagar la causa raíz y el ID de correlación.",
    "impacto": "Errores más informativos y trazables."
  },
  {
    "mejora": "`metadata` ahora se inicializa como `ObjectLiteral` y se le añade `tenantId`.",
    "justificacion": "Consistencia y tipado.",
    "impacto": "Metadata de error más útil."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
