// RUTA: libs/core/application/coapusersroles/src/index.ts
// // RUTA: libs/core/application/coapusersroles/src/index.ts

// // --- Commands ---
// export * from './lib/commands/authenticate-user.command';
// export * from './lib/commands/change-user-password.command';
// export * from './lib/commands/create-user.command';
// export * from './lib/commands/deactivate-user.command';
// export * from './lib/commands/reactivate-user.command';
// export * from './lib/commands/reset-user-password.command';
// export * from './lib/commands/update-user-profile.command';
// export * from './lib/commands/update-user-role.command';

// // --- Use Cases (Command & Query Handlers - Interfaces and Tokens) ---
// export {
//   AUTHENTICATE_USER_USE_CASE,
//   type IAuthenticateUserUseCase,
// } from './lib/use-cases/authenticate-user.use-case';
// export {
//   CHANGE_USER_PASSWORD_USE_CASE,
//   type IChangeUserPasswordUseCase,
// } from './lib/use-cases/change-user-password.use-case';
// export {
//   CREATE_USER_USE_CASE,
//   type ICreateUserUseCase,
// } from './lib/use-cases/create-user.use-case';
// export {
//   DEACTIVATE_USER_USE_CASE,
//   type IDeactivateUserUseCase,
// } from './lib/use-cases/deactivate-user.use-case';
// export {
//   REACTIVATE_USER_USE_CASE,
//   type IReactivateUserUseCase,
// } from './lib/use-cases/reactivate-user.use-case';
// export {
//   RESET_USER_PASSWORD_USE_CASE,
//   type IResetUserPasswordUseCase,
// } from './lib/use-cases/reset-user-password.use-case';
// export {
//   UPDATE_USER_PROFILE_USE_CASE,
//   type IUpdateUserProfileUseCase,
// } from './lib/use-cases/update-user-profile.use-case';
// export {
//   UPDATE_USER_ROLE_USE_CASE,
//   type IUpdateUserRoleUseCase,
// } from './lib/use-cases/update-user-role.use-case';

// export {
//   GET_USER_BY_ID_QUERY_HANDLER,
//   type IGetUserByIdQueryHandler,
// } from './lib/queries/get-user-by-id.query-handler';
// export {
//   LIST_USERS_BY_TENANT_QUERY_HANDLER,
//   type IListUsersByTenantQueryHandler,
// } from './lib/queries/list-users-by-tenant.query-handler';

// // --- Queries (Clases de Query) ---
// export * from './lib/queries/get-user-by-id.query';
// export * from './lib/queries/list-users-by-tenant.query';
// // export * from './lib/queries/get-user-permissions.query'; // Futuro

// // --- DTOs ---
// export * from './lib/dtos/user-authentication.dto';
// export * from './lib/dtos/user-creation.dto';
// export * from './lib/dtos/user-details.dto';
// export * from './lib/dtos/user-filter.dto';
// export * from './lib/dtos/user-summary.dto';
// export * from './lib/dtos/user-update.dto';
// // export * from './lib/dtos/role.dto'; // Si los roles necesitan un DTO más complejo

// // --- Application Service Ports ---
// export * from './lib/ports/jwt.service.port'; // Puerto para el servicio JWT de aplicación
// // RUTA: libs/core/application/coapusersroles/src/index.ts
// /* SECCIÓN DE MEJORAS REALIZADAS
// [
//   { "mejora": "Actualizado para exportar el nuevo `IJwtServicePortAppLayer` y su token.", "justificacion": "Completa la API pública de la librería con el puerto necesario para la generación/validación de JWTs, ahora definido dentro de esta capa de aplicación.", "impacto": "Consistencia y preparación para la implementación de la autenticación." }
// ]
// */
// /* NOTAS PARA IMPLEMENTACIÓN FUTURA
// [
//   { "nota": "Considerar si `IJwtServicePortAppLayer` debería moverse a una librería de puertos de aplicación compartidos (`coapsharedports` o similar) si otros módulos de aplicación también necesitan generar o validar JWTs con una lógica similar. Por ahora, mantenerlo en `coapusersroles` es aceptable si su uso principal es para la autenticación de usuarios del tenant." },
//   { "nota": "A medida que se implementen Casos de Uso y Query Handlers, sus clases de implementación (ej. `CreateUserUseCaseImpl`) también se exportarán desde este `index.ts` si se opta por no usar un bus de comandos/queries y se prefiere la inyección directa de las clases (aunque los tokens y las interfaces son preferibles para el desacoplamiento)." }
// ]
// consideraciones para el futuro:
// IJwtServicePortAppLayer a coapsharedports:
// Propuesta: Si otros módulos de aplicación (ej. coaptenancy para un posible login de admin de plataforma, o coapbilling para acceso seguro a APIs de pago) necesitan generar o validar JWTs con una lógica similar o compartida, el IJwtServicePortAppLayer podría ser más adecuado en una nueva librería libs/core/application/coapsharedports.
// Justificación: Promueve la reutilización y evita la duplicación de la definición del puerto. Centraliza los contratos de servicios de aplicación transversales.
// Impacto: Creación de una nueva librería y refactorización de imports. Si el uso de JWT es exclusivo de la autenticación de usuarios de coapusersroles, entonces mantenerlo aquí es adecuado.
// Puerto para Notificaciones de Usuario:
// Propuesta: coapusersroles podría definir un IUserNotificationServicePortAppLayer para abstraer el envío de notificaciones específicas de usuario (ej. "Contraseña cambiada", "Bienvenido nuevo usuario").
// Justificación: La librería coapnotificationsservice se encarga del envío técnico, pero coapusersroles podría definir qué notificaciones relacionadas con usuarios deben enviarse, delegando el cómo a coapnotificationsservice a través de este nuevo puerto.
// Impacto: Nuevo puerto y posible interacción entre coapusersroles y coapnotificationsservice.
// Gestión de Permisos Granulares (Post-MVP):
// Propuesta: Si se implementa un sistema de permisos más allá de los roles básicos (TENANT_ADMIN, SUPERVISOR, CONSULTANT), se necesitarían nuevos Comandos, Queries y DTOs para gestionar estos permisos (ej. AssignPermissionToRoleCommand, GetUserPermissionsQuery, PermissionDto).
// Justificación: Para un control de acceso más fino.
// Impacto: Expansión significativa de esta librería y del dominio codousersroles.
// Event Sourcing para Cambios de Usuario (Avanzado):
// Propuesta: En lugar de solo emitir eventos de dominio para cambios de estado (ej. UserRoleChangedEvent), se podría considerar un enfoque de Event Sourcing para la entidad UserEntity, donde todos los cambios se registran como una secuencia de eventos.
// Justificación: Auditoría completa, capacidad de reconstruir estado, y mayor flexibilidad para proyecciones.
// Impacto: Cambio fundamental en la persistencia y manejo de la entidad UserEntity. Es una consideración arquitectónica mayor para post-MVP.
// Estas son algunas ideas que surgen al pensar en la evolución y robustez de la gestión de usuarios y roles. Por ahora, el index.ts propuesto arriba es adecuado para la fase actual de estabilización estructural.
// */
export {};
// FIN DEL ARCHIVO: libs/core/application/coapusersroles/src/index.ts
