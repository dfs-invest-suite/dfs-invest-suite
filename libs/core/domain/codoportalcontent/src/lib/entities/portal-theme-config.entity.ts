// RUTA: libs/core/domain/codoportalcontent/src/lib/entities/portal-theme-config.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import {
  PortalAppearanceConfigId,
  TenantId,
  Maybe,
  CorrelationId,
  UserId,
  UrlString,
  AssetId,
} from '@dfs-suite/shtypes';
import { UuidUtils } from '@dfs-suite/shutils';

import { PortalThemeColorsVO } from '../value-objects/portal-theme-colors.vo'; // A crear

export interface PortalThemeConfigProps {
  // tenantId: TenantId; // Implícito
  themeName: string; // ej. "Default Theme", "Tema Moderno del Tenant X"
  colors: PortalThemeColorsVO;
  logoAssetId?: Maybe<AssetId>; // ID del PortalAssetEntity para el logo
  bannerImageUrl?: Maybe<UrlString>; // O AssetId si se gestiona como activo
  fontPairing?: Maybe<{ headingFont: string; bodyFont: string }>;
  // ... otras configuraciones de apariencia
  isActive: boolean; // Si este tema es el actualmente activo para el portal del tenant
}

export interface CreatePortalThemeConfigProps {
  tenantId: TenantId;
  correlationId: CorrelationId;
  themeName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  }; // Props para PortalThemeColorsVO
  uploadedByUserId: UserId;
}

export class PortalThemeConfigEntity extends AggregateRoot<
  PortalThemeConfigProps,
  PortalAppearanceConfigId
> {
  constructor(
    createEntityProps: CreateEntityProps<
      PortalThemeConfigProps,
      PortalAppearanceConfigId
    >
  ) {
    super(createEntityProps);
  }

  public static create(
    props: CreatePortalThemeConfigProps,
    id?: PortalAppearanceConfigId
  ): PortalThemeConfigEntity {
    const configId = id || UuidUtils.generatePortalAppearanceConfigId();
    const entityProps: PortalThemeConfigProps = {
      themeName: props.themeName,
      colors: PortalThemeColorsVO.create(props.colors),
      isActive: false, // Por defecto no activo hasta que se seleccione
    };
    const theme = new PortalThemeConfigEntity({
      id: configId,
      props: entityProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Emitir evento
    return theme;
  }

  // ... Getters y Métodos (activate, updateColors, etc.) ...
  public validate(): void {
    /* ... */
  }
}
// RUTA: libs/core/domain/codoportalcontent/src/lib/entities/portal-theme-config.entity.ts
