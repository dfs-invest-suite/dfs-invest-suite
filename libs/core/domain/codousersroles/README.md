// RUTA: libs/core/domain/codousersroles/LIBRARY_CONFIG.MD

# Configuración y Estándares de la Librería: `codousersroles`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Contiene la lógica de dominio pura para la gestión de usuarios y roles dentro de un tenant (Consultores, Supervisores, Administradores del Tenant). Define la entidad `UserEntity`, sus Value Objects (`UserRoleVO`, `HashedPasswordVO`), puertos de repositorio, servicios de dominio para autenticación/autorización, y eventos de dominio relacionados.
- **Alias de Importación (importPath):** `@dfs-suite/codousersroles`
- **Ubicación en el Monorepo:** `libs/core/domain/codousersroles`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `domain-logic`
- **`layer`:** `domain`
- **`domain`:** `users-roles`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- Entidades: `UserEntity`
- Value Objects: `UserRoleVO`, `EUserRole`, `HashedPasswordVO`
- Puertos: `IUserRepositoryPort`, `USER_REPOSITORY_PORT`
- Servicios de Dominio (Puertos): `IUserAuthenticationDomainServicePort`, `USER_AUTHENTICATION_DOMAIN_SERVICE_PORT`, `IUserAuthorizationDomainServicePort`, `USER_AUTHORIZATION_DOMAIN_SERVICE_PORT`
- Eventos de Dominio: `UserCreatedEvent`, `UserRoleChangedEvent`, `UserPasswordChangedEvent`, `UserActivatedEvent`, `UserDeactivatedEvent`
- Errores de Dominio: `UserNotFoundError`, `InvalidCredentialsError`, `PermissionDeniedError`

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `entities/`: `user.entity.ts`
- `value-objects/`: `user-role.vo.ts`, `hashed-password.vo.ts`
- `ports/`: `user.repository.port.ts`
- `services/`: `user-authentication.domain-service.ts`, `user-authorization.domain-service.ts`
- `events/`: Contiene los eventos de dominio específicos de usuario.
- `errors/`: Contiene las clases de error específicas de usuario.

## 5. Configuración de TypeScript (`tsconfig.lib.json`, `tsconfig.spec.json`)

- Heredan de: `../../../../tsconfig.base.json`.
- `compilerOptions.declaration`: `true` en `tsconfig.lib.json`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- Hereda de: `../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Configurado para los `tsconfig` locales y el `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `codousersroles`
  - `preset`: `../../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shtypes`, `@dfs-suite/shutils`, `@dfs-suite/sherrors`, `@dfs-suite/shresult`, `@dfs-suite/cdskentities`, `@dfs-suite/cdskvalueobjects`, `@dfs-suite/cdskevents`.
  - `passWithNoTests`: `true` (temporal).
- **`project.json` (Target `test`):**
  - `options.passWithNoTests`: `true`.

## 8. Dependencias Clave

- **Internas (Shared Kernel):** `@dfs-suite/cdskentities`, `@dfs-suite/cdskvalueobjects`, `@dfs-suite/cdskevents`.
- **Internas (Shared Global):** `@dfs-suite/shtypes`, `@dfs-suite/shutils`, `@dfs-suite/sherrors`.
- **Externas (NPM):** `uuid` (indirectamente).

## 9. Consideraciones Específicas y Deuda Técnica

- (Deuda) Implementar tests unitarios exhaustivos para `UserEntity` y los servicios de dominio.
- La implementación de `IUserAuthenticationDomainService` y `IUserAuthorizationDomainService` se realizará en la capa de aplicación o infraestructura, inyectando los puertos necesarios (ej. `IPasswordHasherPort`).

## 10. Problemas Comunes y Soluciones Encontradas

- (Mantener actualizado).
  // RUTA: libs/core/domain/codousersroles/LIBRARY*CONFIG.MD
  /* SECCIÓN DE MEJORAS REALIZADAS
  [
  { "mejora": "Creación del `LIBRARY_CONFIG.MD` para `codousersroles`.", "justificacion": "Documentación esencial de la librería.", "impacto": "Claridad y mantenibilidad." }
  ]
  _/
  /_ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] \_/
