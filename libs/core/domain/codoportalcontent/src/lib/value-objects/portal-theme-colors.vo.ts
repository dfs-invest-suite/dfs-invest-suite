// RUTA: libs/core/domain/codoportalcontent/src/lib/value-objects/portal-theme-colors.vo.ts
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';
import { HexColorString, Maybe } from '@dfs-suite/shtypes';
import { HexColorStringSchema } from '@dfs-suite/shvalidationschemas';

export interface PortalThemeColorsProps {
  readonly primary: HexColorString;
  readonly secondary: HexColorString;
  readonly accent?: Maybe<HexColorString>;
  readonly background: HexColorString;
  readonly textOnPrimary: HexColorString; // Para contraste con primario
  readonly textOnBackground: HexColorString; // Para contraste con fondo
}

export class PortalThemeColorsVO extends ValueObject<PortalThemeColorsProps> {
  protected constructor(props: PortalThemeColorsProps) {
    super(props);
  }
  // Getters...

  protected validate(props: PortalThemeColorsProps): void {
    const colorFields: (keyof PortalThemeColorsProps)[] = [
      'primary',
      'secondary',
      'accent',
      'background',
      'textOnPrimary',
      'textOnBackground',
    ];
    for (const field of colorFields) {
      const colorValue = props[field];
      if (colorValue !== undefined && colorValue !== null) {
        // `accent` es opcional
        const parseResult = HexColorStringSchema.safeParse(colorValue);
        if (!parseResult.success) {
          throw new ArgumentInvalidException(
            `Invalid hex color for ${field}: "${String(colorValue)}".`
          );
        }
      }
    }
  }

  public static create(props: PortalThemeColorsProps): PortalThemeColorsVO {
    return new PortalThemeColorsVO(props);
  }
}
// RUTA: libs/core/domain/codoportalcontent/src/lib/value-objects/portal-theme-colors.vo.ts
