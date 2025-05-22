// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/value-objects/template-status-internal.vo.ts
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export enum ETemplateStatusInternal {
  DRAFT = 'DRAFT', // Creada localmente, no enviada a Meta o pendiente de primer envío
  SYNCED = 'SYNCED', // Sincronizada con Meta (aprobada y lista para usar)
  LOCALLY_DELETED = 'LOCALLY_DELETED', // Marcada para borrar, pero aún puede existir en Meta
  NEEDS_REVIEW = 'NEEDS_REVIEW', // Meta la rechazó/pausó, requiere acción del tenant
  ARCHIVED = 'ARCHIVED', // Ya no se usa activamente, pero se conserva el registro
}

export class TemplateStatusInternalVO extends ValueObject<ETemplateStatusInternal> {
  constructor(value: ETemplateStatusInternal) {
    super({ value });
  }

  public get value(): ETemplateStatusInternal {
    return this.props.value;
  }

  protected validate(props: { value: ETemplateStatusInternal }): void {
    if (!Object.values(ETemplateStatusInternal).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid internal template status: "${props.value}".`
      );
    }
  }

  public static newDraft(): TemplateStatusInternalVO {
    return new TemplateStatusInternalVO(ETemplateStatusInternal.DRAFT);
  }
  public static newSynced(): TemplateStatusInternalVO {
    return new TemplateStatusInternalVO(ETemplateStatusInternal.SYNCED);
  }
  public static newLocallyDeleted(): TemplateStatusInternalVO {
    return new TemplateStatusInternalVO(
      ETemplateStatusInternal.LOCALLY_DELETED
    );
  }
  public static newNeedsReview(): TemplateStatusInternalVO {
    return new TemplateStatusInternalVO(ETemplateStatusInternal.NEEDS_REVIEW);
  }
  public static newArchived(): TemplateStatusInternalVO {
    return new TemplateStatusInternalVO(ETemplateStatusInternal.ARCHIVED);
  }

  public isDraft(): boolean {
    return this.props.value === ETemplateStatusInternal.DRAFT;
  }
  public isSynced(): boolean {
    return this.props.value === ETemplateStatusInternal.SYNCED;
  }
  public isLocallyDeleted(): boolean {
    return this.props.value === ETemplateStatusInternal.LOCALLY_DELETED;
  }
  public isNeedsReview(): boolean {
    return this.props.value === ETemplateStatusInternal.NEEDS_REVIEW;
  }
}
// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/value-objects/template-status-internal.vo.ts
