// libs/shared/shtypes/src/lib/domains/user/user.types.ts
import {
  EnhancedBrand,
  type BrandMetadata,
} from '../../core/enhanced-brand.type';

// --- UserId ---
export const USER_ID_METADATA: BrandMetadata = {
  description:
    'Unique identifier for a User (can be a tenant user or a platform administrator).',
  example: 'usr_123e4567-e89b-12d3-a456-426614174000',
  since: '1.0.0',
};
export type UserId = EnhancedBrand<string, 'UserId', typeof USER_ID_METADATA>;

// UserEmail ya está definido como tipo semántico en core-primitives.ts
// Si se necesitara una marca específica de dominio para UserEmail, se definiría aquí.

// --- UserRoleId (Si se decide brandear IDs para roles específicos del dominio users-roles) ---
// export const USER_ROLE_ID_METADATA: BrandMetadata = {
//   description: 'Unique identifier for a User Role definition.',
//   example: 'role_01H9ZCN0E8B6Q4YJ2P5A7XW3RV', // Podría ser un ULID o UUID
//   since: '1.0.0',
// };
// export type UserRoleId = EnhancedBrand<string, 'UserRoleId', typeof USER_ROLE_ID_METADATA>;
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/domains/user/user.types.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmada la definición de `UserId` con `EnhancedBrand` y `BrandMetadata`.", "justificacion": "Establece el tipo Branded para identificadores de usuario.", "impacto": "Claridad y seguridad de tipos." },
  { "mejora": "Comentado `UserRoleId` como placeholder.", "justificacion": "Los roles actualmente se manejan con enums; un ID brandeado para entidades de rol se considerará si la gestión de roles se vuelve más compleja.", "impacto": "Mantiene el foco en los IDs esenciales para el sprint actual." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
