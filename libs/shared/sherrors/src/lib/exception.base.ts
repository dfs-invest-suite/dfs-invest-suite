// RUTA: libs/shared/sherrors/src/lib/exception.base.ts
// TODO: [LIA Legacy - Añadir 'override' a la propiedad 'cause'] - ¡REALIZADO!
// Propósito: Clase base abstracta para todas las excepciones personalizadas del sistema.
//            Incluye código de error, correlationId, y metadata opcional.
// Relacionado con Casos de Uso: Manejo de errores en todas las capas.

import { CorrelationId, ObjectLiteral, Maybe } from '@dfs-suite/shtypes';

export interface SerializedException {
  readonly message: string;
  readonly code: string;
  readonly correlationId: CorrelationId;
  readonly stack?: string;
  readonly cause?: string; // Mensaje de la causa original
  readonly metadata?: Readonly<ObjectLiteral>;
}

export abstract class ExceptionBase extends Error {
  abstract readonly code: string;
  public readonly correlationId: CorrelationId;
  public readonly metadata?: Readonly<ObjectLiteral>;
  // La clase Error nativa (ES2022+) ya tiene una propiedad 'cause'.
  // Usamos 'override' para indicar que estamos proporcionando nuestra propia
  // declaración tipada y manejo para ella, aunque la funcionalidad subyacente
  // podría ser la misma.
  public override readonly cause?: Error; // CORREGIDO: Añadido 'override'

  constructor(
    message: string,
    cause?: Maybe<Error | unknown>,
    metadata?: Maybe<ObjectLiteral>,
    correlationId?: Maybe<CorrelationId>
  ) {
    // Pasar la causa al constructor de Error si es una instancia de Error
    // para que la propiedad 'cause' nativa se inicialice correctamente.
    super(message, cause instanceof Error ? { cause: cause } : undefined);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;

    if (metadata) {
      this.metadata = Object.freeze({ ...metadata });
    }

    this.correlationId = correlationId || ('NOT_SET_YET' as CorrelationId);

    // Asignar a nuestra propiedad 'cause' tipada si no fue manejada por super()
    // o si queremos un manejo específico.
    if (!(super.cause instanceof Error) && cause instanceof Error) {
      this.cause = cause;
    } else if (!(super.cause instanceof Error) && cause) {
      this.cause = new Error(String(cause));
    }
    // Si super() ya manejó la causa, this.cause podría ser redundante o
    // podríamos sincronizarlo. Por ahora, este manejo es para asegurar
    // que nuestra propiedad `this.cause` esté poblada.

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      stack:
        process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test'
          ? this.stack
          : undefined,
      correlationId: this.correlationId,
      // Usar this.cause (nuestra propiedad) o super.cause si this.cause fuera undefined
      cause:
        this.cause?.message ||
        (super.cause instanceof Error
          ? super.cause.message
          : String(super.cause)),
      metadata: this.metadata,
    };
  }
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadido modificador `override` a la propiedad `cause`.", "justificacion": "Resuelve el error de TypeScript TS4114 al indicar explícitamente que se está sobrescribiendo la propiedad `cause` de la clase base `Error`.", "impacto": "El código ahora compila sin este error de TypeScript." },
  { "mejora": "Pasar `cause` al constructor `super(message, { cause: cause })`.", "justificacion": "La forma estándar de pasar la causa al constructor de `Error` (ES2022+) es a través de un objeto de opciones. Esto asegura que la propiedad `cause` nativa también se establezca.", "impacto": "Mejor alineación con las características modernas de `Error`." },
  { "mejora": "Ajuste en `toJSON` para considerar `super.cause`.", "justificacion": "Asegura que si la causa fue establecida por `super()`, su mensaje se serialice.", "impacto": "Serialización más completa." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
// RUTA: libs/shared/sherrors/src/lib/exception.base.ts
