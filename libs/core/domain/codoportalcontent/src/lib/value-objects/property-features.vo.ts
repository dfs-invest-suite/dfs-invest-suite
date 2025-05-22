// RUTA: libs/core/domain/codoportalcontent/src/lib/value-objects/property-features.vo.ts
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';
import { Maybe } from '@dfs-suite/shtypes';
import { Guard } from '@dfs-suite/shutils';

export interface PropertyFeaturesProps {
  readonly areaTotalM2?: Maybe<number>; // Área total en metros cuadrados
  readonly areaPrivativaM2?: Maybe<number>; // Área privativa/útil
  readonly bedrooms?: Maybe<number>; // Número de dormitorios
  readonly suites?: Maybe<number>; // Número de suites
  readonly bathrooms?: Maybe<number>; // Número total de baños (incluyendo suites y lavabos)
  readonly parkingSpaces?: Maybe<number>; // Número de vagas de garagem
  readonly yearBuilt?: Maybe<number>;
  readonly otherFeatures?: Maybe<string[]>; // Lista de otras características (ej. "Piscina", "Churrasqueira", "Vista Mar")
}

export class PropertyFeaturesVO extends ValueObject<PropertyFeaturesProps> {
  protected constructor(props: PropertyFeaturesProps) {
    super(props);
  }

  // Getters para cada propiedad...
  get areaTotalM2(): Maybe<number> {
    return this.props.areaTotalM2;
  }
  // ...

  protected validate(props: PropertyFeaturesProps): void {
    const numericFields: (keyof Pick<
      PropertyFeaturesProps,
      | 'areaTotalM2'
      | 'areaPrivativaM2'
      | 'bedrooms'
      | 'suites'
      | 'bathrooms'
      | 'parkingSpaces'
      | 'yearBuilt'
    >)[] = [
      'areaTotalM2',
      'areaPrivativaM2',
      'bedrooms',
      'suites',
      'bathrooms',
      'parkingSpaces',
      'yearBuilt',
    ];
    for (const field of numericFields) {
      const value = props[field];
      if (!Guard.isNil(value) && (!Guard.isNumber(value) || value < 0)) {
        throw new ArgumentInvalidException(
          `${field} must be a non-negative number if provided.`
        );
      }
      if (
        !Guard.isNil(value) &&
        Guard.isNumber(value) &&
        !Number.isInteger(value) &&
        field !== 'areaTotalM2' &&
        field !== 'areaPrivativaM2'
      ) {
        // Permitir decimales solo para áreas
        // throw new ArgumentInvalidException(`${field} must be an integer if provided.`);
      }
    }
    if (props.otherFeatures && !Array.isArray(props.otherFeatures)) {
      throw new ArgumentInvalidException(
        'otherFeatures must be an array of strings if provided.'
      );
    }
  }

  public static create(props: PropertyFeaturesProps): PropertyFeaturesVO {
    return new PropertyFeaturesVO(props);
  }
}
// RUTA: libs/core/domain/codoportalcontent/src/lib/value-objects/property-features.vo.ts
