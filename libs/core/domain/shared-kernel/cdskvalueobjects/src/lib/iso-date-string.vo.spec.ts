// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/iso-date-string.vo.spec.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from '@dfs-suite/sherrors';
import { IsoDateString as IsoDateStringType } from '@dfs-suite/shtypes'; // Renombrado para evitar colisión

import { IsoDateStringVO } from './iso-date-string.vo';

describe('IsoDateStringVO', () => {
  describe('create (from string)', () => {
    it('should create an IsoDateStringVO from a valid ISO string (UTC Zulu)', () => {
      const validIso = '2023-10-27T10:30:00.000Z';
      const vo = IsoDateStringVO.create(validIso);
      expect(vo).toBeInstanceOf(IsoDateStringVO);
      expect(vo.value).toBe(validIso as IsoDateStringType);
    });

    it('should create an IsoDateStringVO from a valid ISO string with offset', () => {
      const validIso = '2023-10-27T12:30:00.000+02:00';
      const vo = IsoDateStringVO.create(validIso);
      expect(vo.value).toBe(validIso as IsoDateStringType);
    });

    it('should create an IsoDateStringVO from a valid ISO string with milliseconds', () => {
      const validIso = '2023-10-27T10:30:00.123Z';
      const vo = IsoDateStringVO.create(validIso);
      expect(vo.value).toBe(validIso as IsoDateStringType);
    });

    it('should throw ArgumentInvalidException for an invalid format (no T)', () => {
      const invalidIso = '2023-10-27 10:30:00Z';
      expect(() => IsoDateStringVO.create(invalidIso)).toThrow(
        ArgumentInvalidException
      );
      expect(() => IsoDateStringVO.create(invalidIso)).toThrow(
        /Value "2023-10-27 10:30:00Z" is not a valid ISO 8601 date string/
      );
    });

    it('should throw ArgumentInvalidException for a semantically invalid date like "Feb 30"', () => {
      const invalidDayFeb = '2023-02-30T10:30:00Z';
      expect(() => IsoDateStringVO.create(invalidDayFeb)).toThrow(
        ArgumentInvalidException
      );
    });

    it('should throw ArgumentNotProvidedException for an empty string (caught by ValueObjectBase)', () => {
      expect(() => IsoDateStringVO.create('')).toThrow(
        ArgumentNotProvidedException
      );
      expect(() => IsoDateStringVO.create('')).toThrow(
        /IsoDateStringVO primitive value cannot be empty/
      );
    });
  });

  describe('fromDate (from Date object)', () => {
    it('should create an IsoDateStringVO from a valid Date object', () => {
      const date = new Date();
      const vo = IsoDateStringVO.fromDate(date);
      expect(vo).toBeInstanceOf(IsoDateStringVO);
      expect(vo.value).toBe(date.toISOString() as IsoDateStringType);
    });

    it('should throw ArgumentInvalidException if Date object is null', () => {
      expect(() => IsoDateStringVO.fromDate(null as unknown as Date)).toThrow(
        ArgumentInvalidException
      );
    });

    it('should throw ArgumentInvalidException if Date object is invalid (e.g., from new Date("invalid"))', () => {
      expect(() =>
        IsoDateStringVO.fromDate(new Date('invalid-date-string'))
      ).toThrow(ArgumentInvalidException);
    });
  });

  describe('toDate', () => {
    it('should convert back to a valid Date object', () => {
      const isoStr = '2023-10-27T10:30:00.000Z';
      const vo = IsoDateStringVO.create(isoStr);
      const dateObj = vo.toDate();
      expect(dateObj).toBeInstanceOf(Date);
      expect(dateObj.toISOString()).toBe(isoStr);
    });
  });

  describe('equals', () => {
    it('should be equal if values are identical', () => {
      const vo1 = IsoDateStringVO.create('2023-10-27T10:00:00.000Z');
      const vo2 = IsoDateStringVO.create('2023-10-27T10:00:00.000Z');
      expect(vo1.equals(vo2)).toBe(true);
    });

    it('should not be equal if values are different', () => {
      const vo1 = IsoDateStringVO.create('2023-10-27T10:00:00.000Z');
      const vo2 = IsoDateStringVO.create('2023-10-27T11:00:00.000Z');
      expect(vo1.equals(vo2)).toBe(false);
    });
  });

  describe('unpack', () => {
    it('should return the primitive string value', () => {
      const isoStr = '2023-10-27T10:30:00.000Z';
      const vo = IsoDateStringVO.create(isoStr);
      expect(vo.unpack()).toBe(isoStr as IsoDateStringType);
    });
  });
});
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/iso-date-string.vo.spec.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports a alias codificados.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "Renombrado de `IsoDateString` a `IsoDateStringType` en la importación de `@dfs-suite/shtypes`.", "justificacion": "Evita colisión de nombres con la clase `IsoDateStringVO` y es una práctica común para diferenciar el tipo Branded de la clase VO.", "impacto": "Claridad y prevención de errores de nombrado." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
