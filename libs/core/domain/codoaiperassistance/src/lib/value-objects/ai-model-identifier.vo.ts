// RUTA: libs/core/domain/codoaiperassistance/src/lib/value-objects/ai-model-identifier.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import {
  ArgumentNotProvidedException,
  // ArgumentInvalidException, // No se usa actualmente en la lógica de validación
} from '@dfs-suite/sherrors';
import { Maybe } from '@dfs-suite/shtypes';
import { Guard } from '@dfs-suite/shutils';

export interface AiModelIdentifierProps {
  readonly modelId: string;
  readonly provider?: Maybe<string>;
  readonly version?: Maybe<string>;
}

export class AiModelIdentifierVO extends ValueObject<AiModelIdentifierProps> {
  // El constructor ahora toma directamente AiModelIdentifierProps
  constructor(props: AiModelIdentifierProps) {
    super(props); // ValueObject ahora espera el objeto props directamente
  }

  get modelId(): string {
    return this.props.modelId;
  }
  get provider(): Maybe<string> {
    return this.props.provider;
  }
  get version(): Maybe<string> {
    return this.props.version;
  }

  // El método validate ahora recibe el objeto props completo
  protected validate(props: AiModelIdentifierProps): void {
    if (Guard.isEmpty(props.modelId)) {
      throw new ArgumentNotProvidedException(
        'AiModelIdentifierVO: modelId cannot be empty.'
      );
    }
    // Aquí irían otras validaciones si fueran necesarias
  }

  public static create(props: AiModelIdentifierProps): AiModelIdentifierVO {
    // La validación se hace en el constructor
    return new AiModelIdentifierVO(props);
  }

  public toString(): string {
    let identifier = this.props.provider
      ? `${this.props.provider}/${this.props.modelId}`
      : this.props.modelId;
    if (this.props.version) {
      identifier += `@${this.props.version}`;
    }
    return identifier;
  }
}
// RUTA: libs/core/domain/codoaiperassistance/src/lib/value-objects/ai-model-identifier.vo.ts
