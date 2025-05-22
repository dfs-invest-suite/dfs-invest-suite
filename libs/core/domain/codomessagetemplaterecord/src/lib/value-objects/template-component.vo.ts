// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/value-objects/template-component.vo.ts
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import {
  EWhatsAppTemplateComponentType,
  EWhatsAppTemplateButtonType,
  EWhatsAppTemplateHeaderFormat,
} from '@dfs-suite/codowhatsapp/enums'; // Asumiendo enums de codowhatsapp
import { Maybe, UrlString } from '@dfs-suite/shtypes';

// Este VO será más complejo, similar a TWhatsAppTemplateComponent pero como VO

export interface TemplateButtonProps {
  type: EWhatsAppTemplateButtonType; // URL, QUICK_REPLY, PHONE_NUMBER, etc.
  text?: Maybe<string>;
  url?: Maybe<UrlString>; // Podría ser UrlVO
  phoneNumber?: Maybe<string>; // Podría ser PhoneNumberVO
  payload?: Maybe<string>; // Para quick_reply
  example?: Maybe<string[]>; // Para variables en URL de botón
}
export class TemplateButtonVO extends ValueObject<TemplateButtonProps> {
  // ... constructor, getters, validate ...
  public static create(props: TemplateButtonProps): TemplateButtonVO {
    // Validación
    return new TemplateButtonVO(props);
  }
}

export interface TemplateComponentProps {
  type: EWhatsAppTemplateComponentType; // HEADER, BODY, FOOTER, BUTTONS
  format?: Maybe<EWhatsAppTemplateHeaderFormat>; // Solo para HEADER (TEXT, IMAGE, VIDEO, DOCUMENT)
  text?: Maybe<string>;
  exampleText?: Maybe<string[]>; // Para variables en texto de header/body
  mediaIdOrLink?: Maybe<string | UrlString>; // Para media en header
  buttons?: Maybe<TemplateButtonVO[]>;
}

export class TemplateComponentVO extends ValueObject<TemplateComponentProps> {
  // ... constructor, getters, validate ...
  public static create(props: TemplateComponentProps): TemplateComponentVO {
    // Validación, incluyendo que si type es BUTTONS, buttons debe existir.
    // Si type es HEADER y format es media, mediaIdOrLink debe existir.
    return new TemplateComponentVO(props);
  }
}
// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/value-objects/template-component.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Esqueleto para TemplateComponentVO y TemplateButtonVO.", "justificacion": "Define la estructura para representar los componentes de una plantilla como VOs, promoviendo la inmutabilidad y validación.", "impacto": "Permitirá una representación de dominio más rica para los componentes de plantilla." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Implementar completamente la lógica de validación y los getters en estos VOs."} ] */
