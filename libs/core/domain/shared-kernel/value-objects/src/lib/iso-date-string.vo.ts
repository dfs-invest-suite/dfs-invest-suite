// libs/core/domain/shared-kernel/value-objects/src/lib/iso-date-string.vo.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import { ValueObject, IDomainPrimitive } from './value-object.base';
import { IsoDateString as IsoDateStringType } from '@dfs-suite/shared-types';
import { ArgumentInvalidException } from '@dfs-suite/shared-errors';
import { Guard } from '@dfs-suite/shared-utils';

const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}(:?\d{2})?))$/;

export type IsoDateStringVOProps = IDomainPrimitive<IsoDateStringType>

/**
 * @class IsoDateStringVO
 * @extends ValueObject<IsoDateStringType>
 * @description Value Object para representar y validar una cadena de fecha en formato ISO 8601.
 */
export class IsoDateStringVO extends ValueObject<IsoDateStringType> {
  protected constructor(props: IsoDateStringVOProps) {
    super(props);
  }

  /**
   * @getter value
   * @returns {IsoDateStringType} El valor string de la fecha ISO.
   */
  get value(): IsoDateStringType {
    return this.props.value;
  }

  /**
   * @override
   * @method validate
   * @param {IsoDateStringVOProps} props - Las propiedades a validar.
   * @throws {ArgumentInvalidException} Si el string no cumple el formato ISO 8601 básico
   *         o no representa una fecha válida (ej. resulta en NaN al ser parseado por `new Date()`).
   * @description Valida que el string proporcionado sea una fecha ISO 8601 válida.
   * La validación de fechas semánticamente imposibles (como "Feb 30") es limitada
   * por el comportamiento de `new Date()` de JavaScript.
   */
  protected validate(props: { value: IsoDateStringType }): void {
    if (Guard.isNil(props.value) || Guard.isEmpty(props.value)) { // isEmpty también trimea y verifica string vacío
      // Esta validación es redundante si ValueObjectBase.checkIfEmpty ya lo hace,
      // pero se mantiene aquí para claridad del contrato específico de IsoDateStringVO.
      // Si checkIfEmpty de la base lanza ArgumentNotProvidedException, esta no se alcanzaría.
      throw new ArgumentInvalidException('ISO date string cannot be empty or null/undefined.');
    }
    if (!ISO_8601_REGEX.test(props.value)) {
      throw new ArgumentInvalidException(
        `Value "${props.value}" is not a valid ISO 8601 date string format.`
      );
    }
    const date = new Date(props.value);
    if (isNaN(date.getTime())) {
      // Esta validación captura cosas como 'YYYY-MM-DDTHH:MM:SS.sssABC' que podrían pasar la regex
      // pero no son parseables a una fecha válida por el constructor de Date.
      throw new ArgumentInvalidException(
        `Value "${props.value}" does not represent a valid date (e.g., results in NaN).`
      );
    }
    // Nota: La validación de fechas como '2023-02-30T00:00:00Z' (Feb 30)
    // no se detectará aquí porque `new Date()` en JS "corrige" estas fechas
    // (ej. a Marzo 02). Una validación más estricta para esto requeriría una librería
    // o una lógica de comparación de "ida y vuelta" (new Date(str).toISOString() === str),
    // lo cual es complejo debido a la normalización de zona horaria y milisegundos.
    // Se asume que `z.string().datetime()` de Zod es el validador primario para entradas.
  }

  /**
   * @static
   * @method create
   * @param {string} isoDateString - El string de fecha a encapsular.
   * @returns {IsoDateStringVO} Una nueva instancia de IsoDateStringVO.
   */
  public static create(isoDateString: string): IsoDateStringVO {
    const brandedValue = isoDateString as IsoDateStringType;
    return new IsoDateStringVO({ value: brandedValue });
  }

  /**
   * @static
   * @method fromDate
   * @param {Date} dateObject - El objeto Date a convertir.
   * @returns {IsoDateStringVO} Una nueva instancia de IsoDateStringVO.
   */
  public static fromDate(dateObject: Date): IsoDateStringVO {
    if (Guard.isNil(dateObject) || !(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
        throw new ArgumentInvalidException('A valid Date object must be provided to create IsoDateStringVO from Date.');
    }
    const isoString = dateObject.toISOString() as IsoDateStringType;
    return new IsoDateStringVO({ value: isoString });
  }

  /**
   * @method toDate
   * @returns {Date} Un objeto Date representando esta fecha ISO.
   */
  public toDate(): Date {
    return new Date(this.props.value);
  }
}
// libs/core/domain/shared-kernel/value-objects/src/lib/iso-date-string.vo.ts
/* SECCIÓN DE MEJORAS
[
  Mejora 1 (Clarificación de Validación "Feb 30"): Se ha añadido un comentario en `validate` para explicar
            la limitación actual con respecto a fechas como "Feb 30". La solución robusta para esto
            es usar `IsoDateStringSchema` (con `z.datetime()`) en las capas de entrada.
]
[
  Mejora 2 (Redundancia de `Guard.isEmpty` en `validate`): `ValueObjectBase.checkIfEmpty` ya valida que `props`
            y `props.value` (para `IDomainPrimitive`) no sean vacíos. Si esa validación es suficiente,
            el `Guard.isEmpty(props.value)` aquí podría ser redundante. Sin embargo, mantenerlo
            hace más explícitas las precondiciones del VO específico.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: El test para "Feb 30" en `iso-date-string.vo.spec.ts` debe ajustarse para reflejar que este VO
          (con su validación actual) *no* lanzará un error para ese caso específico porque `new Date()` lo "corrige".
]
*/
// libs/core/domain/shared-kernel/value-objects/src/lib/iso-date-string.vo.ts
/* SECCIÓN DE MEJORAS
[
  Mejora 1: La validación de fechas inválidas como "Feb 30" sigue siendo un punto débil si solo se usa `new Date()`
            y `isNaN()`, porque JavaScript "corrige" esas fechas. Para una validación estricta, se necesitaría
            una librería de manejo de fechas o una lógica más compleja que compare el input con el output de `toISOString()`.
            La solución más pragmática es confiar en `z.string().datetime()` de Zod para la validación de entrada
            y que este VO asuma que el string ya ha pasado una validación más robusta si es crítico.
]
*/
// (Resto de mejoras y notas se mantienen)
/* SECCIÓN DE MEJORAS

[
  Mejora 1 (Regex de ISO 8601): La regex `ISO_8601_REGEX` es una simplificación. Una regex completa
             para ISO 8601 es muy compleja. La combinación de la regex actual y `new Date(props.value)`
             con `isNaN(date.getTime())` ofrece una buena validación pragmática.
             Considerar usar una librería de validación de fechas si se necesita precisión absoluta
             con todos los casos borde de ISO 8601, pero podría ser un exceso para un VO.
]
[
  Mejora 2 (Comparación Canónica en `validate`):
    La validación opcional `if (date.toISOString() !== props.value ...)` es difícil de hacer
    correctamente debido a las variaciones permitidas en ISO 8601 (ej. presencia/ausencia de
    milisegundos, 'Z' vs offset +00:00). La validación actual es un buen compromiso.
]
[
  Mejora 3 (Tests Unitarios): Crucial añadir `iso-date-string.vo.spec.ts` con casos válidos e inválidos.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA

[
  Nota 1 (Uso): Este VO se usaría en Entidades o donde se necesite una fecha ISO validada.
          Los DTOs de API podrían seguir usando `IsoDateString` (el Branded Type) y la validación
          del formato se haría con `IsoDateStringSchema` de Zod. El VO es para el modelo de dominio.
]
[
  Nota 2 (Timezones): `Date.toISOString()` siempre devuelve en UTC (con 'Z'). Si se necesita
            manejar o preservar timezones originales de los strings, la lógica sería más compleja.
            Este VO asume que el valor es una representación UTC o una con offset que `new Date()` puede parsear.
]
*/
