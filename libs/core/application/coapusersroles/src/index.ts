// RUTA: libs/core/application/coapusersroles/src/index.ts

// --- Commands & Use Cases ---
export * from './lib/use-cases/create-user.use-case'; // Para crear consultores, supervisores por un TenantAdmin
export * from './lib/commands/create-user.command';

export * from './lib/use-cases/update-user-profile.use-case';
export * from './lib/commands/update-user-profile.command';

export * from './lib/use-cases/update-user-role.use-case';
export * from './lib/commands/update-user-role.command';

export * from './lib/use-cases/deactivate-user.use-case';
export * from './lib/commands/deactivate-user.command';
export * from './lib/use-cases/reactivate-user.use-case'; // Nuevo
export * from './lib/commands/reactivate-user.command'; // Nuevo

export * from './lib/use-cases/change-user-password.use-case'; // Para el propio usuario
export * from './lib/commands/change-user-password.command';
export * from './lib/use-cases/reset-user-password.use-case'; // Para un admin reseteando la de otro usuario
export * from './lib/commands/reset-user-password.command';

export * from './lib/use-cases/authenticate-user.use-case'; // Valida credenciales y genera token/sesión info
export * from './lib/commands/authenticate-user.command';

// --- Queries & Handlers ---
export * from './lib/queries/get-user-by-id.query';
export * from './lib/queries/get-user-by-id.query-handler';
export * from './lib/queries/list-users-by-tenant.query'; // Con filtros por rol, estado
export * from './lib/queries/list-users-by-tenant.query-handler';
// export * from './lib/queries/get-user-permissions.query'; // Futuro, si hay permisos granulares

// --- DTOs ---
export * from './lib/dtos/user-creation.dto';
export * from './lib/dtos/user-update.dto';
export * from './lib/dtos/user-details.dto';
export * from './lib/dtos/user-summary.dto';
export * from './lib/dtos/user-authentication.dto'; // (login-request.dto, auth-payload.dto)
// export * from './lib/dtos/role.dto'; // Si los roles tienen más propiedades

// --- Application Service Ports ---
// export * from './lib/ports/i-password-hasher.port'; // Si el hasheo es un servicio de app y no solo del VO
// export * from './lib/ports/i-jwt.service.port'; // Para generar y validar JWTs
