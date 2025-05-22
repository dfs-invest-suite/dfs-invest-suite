// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/money.vo.ts
// Autor: L.I.A Legacy (IA Asistente)
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from '@dfs-suite/sherrors';
import { Guard } from '@dfs-suite/shutils';

import { ValueObject } from './value-object.base';

export interface MoneyProps {
  readonly amountInCents: number; // Almacenar siempre en centavos para evitar problemas de punto flotante
  readonly currency: string; // Código de moneda ISO 4217, ej. "BRL", "USD"
}

const VALID_CURRENCY_REGEX = /^[A-Z]{3}$/; // Regex simple para códigos de moneda

export class MoneyVO extends ValueObject<MoneyProps> {
  protected constructor(props: MoneyProps) {
    super(props);
  }

  get amountInCents(): number {
    return this.props.amountInCents;
  }

  get currency(): string {
    return this.props.currency;
  }

  /**
   * Devuelve el monto como un número de punto flotante (ej. 100.50).
   * Cuidado con operaciones de punto flotante subsecuentes.
   */
  public getAmountAsFloat(): number {
    return this.props.amountInCents / 100;
  }

  protected validate(props: MoneyProps): void {
    if (
      Guard.isNil(props.amountInCents) ||
      !Number.isInteger(props.amountInCents)
    ) {
      throw new ArgumentInvalidException('Amount in cents must be an integer.');
    }
    if (Guard.isEmpty(props.currency?.trim())) {
      throw new ArgumentNotProvidedException('Currency code cannot be empty.');
    }
    if (!VALID_CURRENCY_REGEX.test(props.currency.trim().toUpperCase())) {
      throw new ArgumentInvalidException(
        `Invalid currency code format: "${props.currency}". Expected 3 uppercase letters.`
      );
    }
  }

  public static create(amountInCents: number, currency: string): MoneyVO {
    const normalizedCurrency = currency.trim().toUpperCase();
    return new MoneyVO({
      amountInCents,
      currency: normalizedCurrency,
    });
  }

  public static fromFloat(
    amountFloat: number,
    currency: string,
    precision = 2 // Número de decimales para la moneda
  ): MoneyVO {
    if (Guard.isNil(amountFloat) || !Guard.isNumber(amountFloat)) {
      throw new ArgumentNotProvidedException(
        'Amount float must be a valid number.'
      );
    }
    const factor = Math.pow(10, precision);
    const amountInCents = Math.round(amountFloat * factor);
    return MoneyVO.create(amountInCents, currency);
  }

  // Métodos para operaciones aritméticas (add, subtract, multiply, divide) deberían
  // crearse aquí, asegurando que operen sobre amountInCents y validen la igualdad de moneda.
  // Ejemplo:
  public add(other: MoneyVO): MoneyVO {
    if (this.currency !== other.currency) {
      throw new ArgumentInvalidException(
        'Cannot add MoneyVOs with different currencies.'
      );
    }
    return new MoneyVO({
      amountInCents: this.amountInCents + other.amountInCents,
      currency: this.currency,
    });
  }
}
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/money.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementación de `MoneyVO` con `amountInCents` y `currency`.", "justificacion": "Provee una representación segura para valores monetarios, evitando problemas de punto flotante. Incluye validación básica para el código de moneda.", "impacto": "VO funcional para dinero." },
  { "mejora": "Método `fromFloat` para crear `MoneyVO` desde un valor decimal.", "justificacion": "Facilita la creación desde formatos comunes.", "impacto": "Mejor DX." },
  { "mejora": "Ejemplo de método aritmético `add`.", "justificacion": "Demuestra cómo se podrían implementar operaciones seguras.", "impacto": "Extensibilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Considerar el uso de una librería especializada como `dinero.js` para operaciones monetarias más complejas y manejo de diferentes precisiones y redondeos si fuera necesario." },
  { "nota": "Implementar más métodos aritméticos (`subtract`, `multiply`, `allocate`, etc.) según se necesiten." }
]
*/
