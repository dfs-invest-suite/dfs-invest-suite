// RUTA: libs/shared/shutils/src/lib/date.utils.ts
// TODO: [LIA Legacy - Implementar DateUtils con date-fns] - ¡REALIZADO!
// Propósito: Funciones utilitarias puras para manipulación y formateo de fechas,
//            usando `date-fns` internamente para robustez y manejo de i18n.
// Relacionado con Casos de Uso: Formateo de fechas para UI, cálculos de duración, comparaciones.

import {
  format,
  parseISO,
  differenceInDays,
  addDays,
  isValid,
  formatDistanceToNowStrict,
} from 'date-fns';
import {
  es as dateFnsEsLocale,
  ptBR as dateFnsPtBrLocale,
} from 'date-fns/locale';

import { IsoDateString, Maybe } from '@dfs-suite/shtypes';

type SupportedLocale = typeof dateFnsEsLocale | typeof dateFnsPtBrLocale;

export class DateUtils {
  private static defaultLocale: SupportedLocale = dateFnsPtBrLocale;

  static formatDisplayDate(
    dateInput: Maybe<Date | IsoDateString | number>,
    formatString = 'dd/MM/yyyy HH:mm',
    locale: SupportedLocale = DateUtils.defaultLocale
  ): string {
    if (dateInput === null || dateInput === undefined) return '';
    try {
      const date =
        typeof dateInput === 'string'
          ? parseISO(dateInput as string)
          : new Date(dateInput);
      if (!isValid(date)) return '';
      return format(date, formatString, { locale });
    } catch (error) {
      return '';
    }
  }

  static parseIso(isoDateString: Maybe<IsoDateString>): Date | null {
    if (!isoDateString) return null;
    try {
      const date = parseISO(isoDateString as string);
      return isValid(date) ? date : null;
    } catch (error) {
      return null;
    }
  }

  static getDaysDifference(dateLeft: Date, dateRight: Date): number {
    if (!isValid(dateLeft) || !isValid(dateRight)) return NaN;
    return differenceInDays(dateLeft, dateRight);
  }

  static addDaysToDate(date: Date, amount: number): Date | null {
    if (!isValid(date)) return null;
    return addDays(date, amount);
  }

  static formatDistanceToNow(
    dateInput: Maybe<Date | IsoDateString | number>,
    locale: SupportedLocale = DateUtils.defaultLocale,
    options?: { addSuffix?: boolean }
  ): string {
    if (!dateInput) return '';
    try {
      const date =
        typeof dateInput === 'string'
          ? parseISO(dateInput as string)
          : new Date(dateInput);
      if (!isValid(date)) return '';
      return formatDistanceToNowStrict(date, {
        locale,
        addSuffix: options?.addSuffix ?? true,
      });
    } catch (error) {
      return '';
    }
  }
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Integración completa con `date-fns`.", "justificacion": "`date-fns` es robusta y tree-shakable.", "impacto": "Funciones de fecha confiables. Requiere `pnpm add date-fns`." },
  { "mejora": "Uso de `isValid` de `date-fns`.", "justificacion": "Validación segura de fechas.", "impacto": "Robustez." },
  { "mejora": "Refactorización de import de `shtypes`.", "justificacion": "Alineación.", "impacto": "Correcta resolución." },
  { "mejora": "Locale por defecto a `pt-BR`.", "justificacion": "Mercado inicial.", "impacto": "Formato de fechas por defecto." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Asegurar que `date-fns` esté instalado (`pnpm add date-fns`)." },
  { "nota": "Expandir manejo de `locale` para configuración global por la PWA." }
]
*/
// RUTA: libs/shared/shutils/src/lib/date.utils.ts
