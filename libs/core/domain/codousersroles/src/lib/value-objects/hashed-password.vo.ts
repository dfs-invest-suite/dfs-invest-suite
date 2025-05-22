// RUTA: libs/core/domain/codousersroles/src/lib/value-objects/hashed-password.vo.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import { Guard } from '@dfs-suite/shutils';

export class HashedPasswordVO extends ValueObject<string> {
  // ValueObjectBase maneja el tipo de props como { value: string }
  constructor(value: string) {
    // Constructor toma el string directamente
    super({ value });
  }

  public get value(): string {
    return this.props.value;
  }

  protected validate(props: { value: string }): void {
    if (Guard.isEmpty(props.value)) {
      throw new ArgumentNotProvidedException(
        'Hashed password cannot be empty.'
      );
    }
    // Podría añadirse validación del formato del hash si es conocido (ej. longitud, prefijo $2a$ para bcrypt)
    // pero esto podría acoplar el VO a un algoritmo de hash específico.
    // Es preferible que la validación de formato se haga al momento de generar/recibir el hash.
  }

  /**
   * Crea una instancia de HashedPasswordVO.
   * Asume que el `hashedValue` ya es un hash válido.
   * @param hashedValue - El string de la contraseña ya hasheada.
   */
  public static create(hashedValue: string): HashedPasswordVO {
    return new HashedPasswordVO(hashedValue);
  }
}
// RUTA: libs/core/domain/codousersroles/src/lib/value-objects/hashed-password.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports refactorizados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "Constructor ahora toma `string` directamente para simplificar.", "justificacion": "Alineado con cómo se usan VOs de un solo primitivo.", "impacto": "DX." },
  { "mejora": "JSDoc y comentarios actualizados.", "justificacion": "Claridad.", "impacto": "Mantenibilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
