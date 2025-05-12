// libs/core/domain/tenancy/src/lib/value-objects/db-connection-config.vo.ts
import { ValueObject } from '@dfs-suite/core-domain-shared-kernel-value-objects';
import { ArgumentNotProvidedException, ArgumentInvalidException } from '@dfs-suite/shared-errors';
import { Guard } from '@dfs-suite/shared-utils';

export interface DbConnectionConfigProps {
  readonly connectionString: string; // Podría descomponerse en host, port, user, pass, dbname
  // readonly type: 'postgres' | 'mysql'; // Ejemplo si soportáramos múltiples tipos
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
      throw new ArgumentNotProvidedException('Connection string cannot be empty.');
    }
    // Aquí podrían ir validaciones más específicas del formato de la connection string
    if (props.connectionString.length < 10) { // Ejemplo de validación muy simple
        throw new ArgumentInvalidException('Connection string seems too short.');
    }
  }

  public static create(connectionString: string): DbConnectionConfigVO {
    return new DbConnectionConfigVO({ connectionString });
  }
}
