// RUTA: libs/core/domain/codousersroles/src/lib/value-objects/hashed-password.vo.ts
// TODO: [LIA Legacy - Implementar HashedPasswordVO]
// Propósito: Value Object para contraseñas hasheadas, asegurando que no se manejen en texto plano en el dominio.
// Relacionado con Casos de Uso: Autenticación, Creación/Actualización de Usuario.
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import { Guard } from '@dfs-suite/shutils';

export class HashedPasswordVO extends ValueObject<string> {
  constructor(value: string) {
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
    // Podría añadirse validación del formato del hash si es conocido (ej. prefijo $2a$ para bcrypt)
  }

  public static create(hashedValue: string): HashedPasswordVO {
    return new HashedPasswordVO(hashedValue);
  }
}
