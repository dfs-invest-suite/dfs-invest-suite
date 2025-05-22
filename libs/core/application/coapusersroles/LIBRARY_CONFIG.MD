// RUTA: libs/core/application/coapusersroles/LIBRARY_CONFIG.MD
# Configuración y Estándares de la Librería: `coapusersroles`

## 1. Propósito y Responsabilidad Principal
- **Descripción Concisa:** Contiene la lógica de aplicación (Casos de Uso, Comandos, Queries, DTOs) para la gestión de usuarios y roles dentro de un tenant. Orquesta las interacciones con el dominio `codousersroles` y los puertos de infraestructura necesarios (ej. hasheo de contraseñas).
- **Alias de Importación (importPath):** `@dfs-suite/coapusersroles`
- **Ubicación en el Monorepo:** `libs/core/application/coapusersroles`

## 2. Tags Nx y Rol Arquitectónico
- **`scope`:** `core`
- **`type`:** `application-logic`
- **`layer`:** `application`
- **`domain`:** `users-roles`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)
- Comandos: `CreateUserCommand`, `UpdateUserProfileCommand`, `UpdateUserRoleCommand`, etc.
- Casos de Uso (Tokens y/o Clases): `CREATE_USER_USE_CASE` (`ICreateUserUseCase`), etc.
- Queries (y Handlers): `GetUserByIdQuery`, `ListUsersByTenantQuery`, etc.
- DTOs: `UserCreationAppDto`, `UserDetailsDto`, `UserSummaryDto`, `UserAuthenticationRequestDto`, `AuthPayloadDto`.

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)
- `commands/`: Definiciones de Comandos.
- `dtos/`: Data Transfer Objects de aplicación.
- `queries/`: Definiciones de Queries y sus Handlers.
- `use-cases/`: Implementaciones de Command Handlers.
- `ports/` (Opcional): Puertos de aplicación específicos de esta librería si los hubiera (ej. `IJwtServicePortAppLayer`).

## 5. Configuración de TypeScript (`tsconfig.lib.json`, `tsconfig.spec.json`)
- Heredan de: `../../../../tsconfig.base.json`.
- `compilerOptions.declaration`: `true` en `tsconfig.lib.json`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)
- Hereda de: `../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Configurado para los `tsconfig` locales y el `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)
- **`jest.config.ts`:**
  - `displayName`: `coapusersroles`
  - `preset`: `../../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shtypes`, `@dfs-suite/shutils`, `@dfs-suite/sherrors`, `@dfs-suite/shresult`, `@dfs-suite/cdsk*`, `@dfs-suite/codousersroles`.
  - `passWithNoTests`: `true` (temporal).
- **`project.json` (Target `test`):**
  - `options.passWithNoTests`: `true`.

## 8. Dependencias Clave
- **Internas:** `@dfs-suite/shtypes`, `@dfs-suite/shutils`, `@dfs-suite/sherrors`, `@dfs-suite/shresult`, `@dfs-suite/cdsk*`, `@dfs-suite/codousersroles`.
- **Externas (NPM):** Ninguna directa.

## 9. Consideraciones Específicas y Deuda Técnica
- El `CreateUserUseCase` dependerá de `IPasswordHasherPort` (definido en `codousersroles`).
- El `AuthenticateUserUseCase` podría necesitar un `IJwtServicePort` o interactuar directamente con un adaptador de `infrasecurity`.
- (Deuda) Implementar tests unitarios para todos los casos de uso y query handlers.

## 10. Problemas Comunes y Soluciones Encontradas
- Violación de `depConstraint` al intentar importar `IPasswordHasherPort` de `infrasecurity` en `CreateUserUseCase`. Solución: Mover la definición del puerto a `codousersroles`.
// RUTA: libs/core/application/coapusersroles/LIBRARY_CONFIG.MD
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creación del `LIBRARY_CONFIG.MD` para `coapusersroles`.", "justificacion": "Documentación esencial de la librería.", "impacto": "Claridad y mantenibilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */