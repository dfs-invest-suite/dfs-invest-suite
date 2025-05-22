// RUTA: libs/core/domain/codotenancy/src/lib/value-objects/db-connection-config.vo.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import {
  ArgumentNotProvidedException,
  ArgumentInvalidException,
} from '@dfs-suite/sherrors';
import { Guard } from '@dfs-suite/shutils';

export interface DbConnectionConfigProps {
  readonly connectionString: string;
}

export class DbConnectionConfigVO extends ValueObject<DbConnectionConfigProps> {
  constructor(props: DbConnectionConfigProps) {
    super(props);
  }

  get connectionString(): string {
    return this.props.connectionString;
  }

  protected validate(props: DbConnectionConfigProps): void {
    if (Guard.isEmpty(props.connectionString)) {
      throw new ArgumentNotProvidedException(
        'Connection string cannot be empty.'
      );
    }
    if (props.connectionString.length < 10) {
      throw new ArgumentInvalidException(
        'Connection string seems too short to be valid.'
      );
    }
  }

  public static create(connectionString: string): DbConnectionConfigVO {
    return new DbConnectionConfigVO({ connectionString });
  }
}
// RUTA: libs/core/domain/codotenancy/src/lib/value-objects/db-connection-config.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmación de imports y lógica.", "justificacion": "El VO del snapshot ya estaba bien estructurado y refactorizado.", "impacto": "Estabilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
