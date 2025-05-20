// RUTA: libs/core/domain/codotenancy/src/lib/services/tenant-validation.service.ts
// TODO: [LIA Legacy - Implementar TenantValidationService (Domain Service)]
// Propósito: Lógica de dominio compleja para validar un Tenant que no encaja en la entidad TenantEntity.
// Por ejemplo, validar si un nombre de tenant es globalmente único (requiere un puerto a un registro global),
// o si un plan es compatible con ciertas configuraciones.
// Relacionado con Casos de Uso: CreateTenantUseCase.
// export interface ITenantValidationService { canCreateTenant(name: string, ownerEmail: string): Promise<Result<boolean, Error>>; }
// export const TENANT_VALIDATION_SERVICE_PORT = Symbol('ITenantValidationService');
