// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/email.vo.ts
// TODO: [LIA Legacy - Implementar EmailVO]
// Propósito: Un Value Object para emails, encapsulando su validación de formato.
// Usaría EmailSchema de shvalidationschemas internamente para la validación.
// import { ValueObject } from './value-object.base';
// import { EmailSchema, z } from '@dfs-suite/shvalidationschemas';
// import { ArgumentInvalidException } from '@dfs-suite/sherrors';
//
// export class EmailVO extends ValueObject<string> {
//   protected constructor(props: { value: string }) {
//     super(props);
//   }
//   protected validate(props: { value: string }): void {
//     const result = EmailSchema.safeParse(props.value);
//     if (!result.success) {
//       throw new ArgumentInvalidException(`Invalid email format: ${props.value}`);
//     }
//   }
//   public static create(email: string): EmailVO {
//     return new EmailVO({ value: email.trim().toLowerCase() });
//   }
//   get value(): string { return this.props.value; }
// }
