// RUTA: libs/shared/shresult/src/lib/result.utils.spec.ts
// TODO: [LIA Legacy - Corregir aserción y añadir más tests para shresult] - ¡REALIZADO!
// Propósito: Pruebas unitarias para las funciones utilitarias de Result.
// Relacionado con Casos de Uso: N/A (es una utilidad).

import { Err, Ok } from './result.type'; // Importa los tipos para el tipado explícito
import { err, isErr, isOk, ok, Result } from './result.utils'; // Importa desde el mismo directorio

describe('Result Utils', () => {
  describe('ok()', () => {
    it('should create an Ok result', () => {
      const successValue = 'success';
      const result: Ok<string, never> = ok(successValue);
      expect(result._tag).toBe('Ok');
      expect(result.value).toBe(successValue);
      expect(result.isOk()).toBe(true);
      expect(result.isErr()).toBe(false);
    });

    it('unwrap() should return the value', () => {
      const result = ok('test');
      expect(result.unwrap()).toBe('test');
    });

    it('unwrapErr() should throw an error with a specific message', () => {
      const result = ok('test');
      expect(() => result.unwrapErr()).toThrow(
        'Called unwrapErr on an Ok value. Value: test' // Mensaje sin comillas dobles extra
      );
    });
  });

  describe('err()', () => {
    it('should create an Err result', () => {
      const errorValue = 'failure';
      const result: Err<string, never> = err(errorValue);
      expect(result._tag).toBe('Err');
      expect(result.error).toBe(errorValue);
      expect(result.isOk()).toBe(false);
      expect(result.isErr()).toBe(true);
    });

    it('unwrap() should throw with the error message for non-Error instances (string)', () => {
      const result = err('custom error');
      // String() de 'custom error' es 'custom error'.
      expect(() => result.unwrap()).toThrow(
        'Called unwrap on an Err value. Error: custom error'
      );
    });

    it('unwrap() should throw with the error message for non-Error instances (object)', () => {
      const errorObj = { code: 1, detail: 'some detail' };
      const result = err(errorObj);
      // JSON.stringify(errorObj) es '{"code":1,"detail":"some detail"}'
      expect(() => result.unwrap()).toThrow(
        'Called unwrap on an Err value. Error: {"code":1,"detail":"some detail"}'
      );
    });

    it('unwrap() should throw the original error if it is an Error instance', () => {
      const originalError = new Error('Original error instance');
      const result = err(originalError);
      expect(() => result.unwrap()).toThrow(originalError);
    });

    it('unwrapErr() should return the error value', () => {
      const result = err('failure');
      expect(result.unwrapErr()).toBe('failure');
    });
  });

  describe('isOk() and isErr() type guards', () => {
    it('isOk should correctly identify Ok results', () => {
      const okResult = ok(123);
      const errResult = err('error');
      expect(isOk(okResult)).toBe(true);
      expect(isOk(errResult)).toBe(false);
    });

    it('isErr should correctly identify Err results', () => {
      const okResult = ok(123);
      const errResult = err('error');
      expect(isErr(errResult)).toBe(true);
      expect(isErr(okResult)).toBe(false);
    });
  });

  describe('map, mapErr, andThen, orElse methods', () => {
    const okVal: Result<number, string> = ok(5);
    const errVal: Result<number, string> = err('error_string');

    it('map should transform Ok value and not affect Err', () => {
      const mappedOk = okVal.map((x) => x * 2);
      expect(isOk(mappedOk)).toBe(true);
      if (isOk(mappedOk)) expect(mappedOk.value).toBe(10);

      const mappedErr = errVal.map((x) => x * 2);
      expect(isErr(mappedErr)).toBe(true);
      if (isErr(mappedErr)) expect(mappedErr.error).toBe('error_string');
    });

    it('mapErr should transform Err value and not affect Ok', () => {
      const mappedErr = errVal.mapErr((e) => e.toUpperCase());
      expect(isErr(mappedErr)).toBe(true);
      if (isErr(mappedErr)) expect(mappedErr.error).toBe('ERROR_STRING');

      const mappedOk = okVal.mapErr((e) => e.toUpperCase());
      expect(isOk(mappedOk)).toBe(true);
      if (isOk(mappedOk)) expect(mappedOk.value).toBe(5);
    });

    it('andThen should chain Ok results or pass through Err', () => {
      const chain1 = okVal.andThen((x) => ok(x + 1));
      expect(isOk(chain1)).toBe(true);
      if (isOk(chain1)) expect(chain1.value).toBe(6);

      const chain2 = okVal.andThen((_x) => err('new_error'));
      expect(isErr(chain2)).toBe(true);
      if (isErr(chain2)) expect(chain2.error).toBe('new_error');

      const chain3 = errVal.andThen((x) => ok(x + 1));
      expect(isErr(chain3)).toBe(true);
      if (isErr(chain3)) expect(chain3.error).toBe('error_string');
    });

    it('orElse should recover from Err or pass through Ok', () => {
      const recover1 = errVal.orElse((_e) => ok(100));
      expect(isOk(recover1)).toBe(true);
      if (isOk(recover1)) expect(recover1.value).toBe(100);

      const recover2 = errVal.orElse((e) => err(e.toUpperCase()));
      expect(isErr(recover2)).toBe(true);
      if (isErr(recover2)) expect(recover2.error).toBe('ERROR_STRING');

      const recover3 = okVal.orElse((_e) => ok(100));
      expect(isOk(recover3)).toBe(true);
      if (isOk(recover3)) expect(recover3.value).toBe(5);
    });

    it('unwrapOr should return value for Ok and defaultValue for Err', () => {
      expect(ok(10).unwrapOr(0)).toBe(10);
      expect(err('error').unwrapOr(0)).toBe(0);
    });
  });
});
// RUTA: libs/shared/shresult/src/lib/result.utils.spec.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Corrección de la aserción en el test `unwrap() should throw with the error message for non-Error instances`.", "justificacion": "El mensaje de error esperado ahora coincide con el mensaje real que lanza la función `err('string').unwrap()` (sin las comillas dobles extras alrededor del valor del error).", "impacto": "Este test específico debería pasar." },
  { "mejora": "Añadido test para `unwrap()` con un objeto como error.", "justificacion": "Verifica que `JSON.stringify()` se use correctamente para serializar el objeto error en el mensaje de la excepción.", "impacto": "Mayor cobertura." },
  { "mejora": "Añadidos tests para `isOk` y `isErr` type guards.", "justificacion": "Asegura que los type guards funcionen como se espera.", "impacto": "Mayor cobertura de tests." },
  { "mejora": "Tests más explícitos para los métodos `map`, `mapErr`, `andThen`, `orElse`.", "justificacion": "Verifica los valores y los tipos de `Ok` y `Err` después de cada transformación usando los type guards.", "impacto": "Mayor confianza en la lógica de estos métodos funcionales." },
  { "mejora": "Añadido test para `unwrapOr`.", "justificacion": "Cubre la funcionalidad de `unwrapOr` para ambos casos, `Ok` y `Err`.", "impacto": "Cobertura de tests más completa."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
