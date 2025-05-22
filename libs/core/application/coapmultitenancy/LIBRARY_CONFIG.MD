// libs/core/application/coapmultitenancy/LIBRARY_CONFIG.MD

# Configuración y Estándares de la Librería: `core-application-multitenancy`

## 1. Propósito y Responsabilidad Principal

- **Descripción Concisa:** Provee el servicio de contexto de tenant (`TenantContextService`) y su puerto (`ITenantContextServicePort`), utilizando `AsyncLocalStorage` para gestionar el `tenantId`, `userId` y `correlationId` actual para cada solicitud o job asíncrono. Es fundamental para la arquitectura multi-tenant.
- **Alias de Importación (importPath):** `@dfs-suite/core-application-multitenancy`
- **Ubicación en el Monorepo:** `libs/core/application/coapmultitenancy`

## 2. Tags Nx y Rol Arquitectónico

- **`scope`:** `core`
- **`type`:** `application-logic`
- **`layer`:** `application`
- **`feature`:** `multi-tenancy`

## 3. API Pública Principal (Exportaciones de `src/index.ts`)

- `ITenantContextService`, `ITenantContextData`, `TENANT_CONTEXT_SERVICE_PORT` (de `./lib/ports/tenant-context.service.port`)
- `TenantContextServiceImpl` (de `./lib/services/tenant-context.service`)
- `CoapMultiTenancyModule` (de `./lib/coap-multi-tenancy.module`)

## 4. Estructura de Directorios Interna Clave (dentro de `src/lib/`)

- `ports/tenant-context.service.port.ts`: Define la interfaz y el token de inyección para el servicio.
- `services/tenant-context.service.ts`: Implementación del servicio usando `AsyncLocalStorage`.
- `coap-multi-tenancy.module.ts`: Módulo NestJS que provee el servicio.

## 5. Configuración de TypeScript (`tsconfig.lib.json`)

- Hereda de: `../../../../tsconfig.base.json`.
- `compilerOptions.declaration`: `true`.
- `compilerOptions.types`: `["node"]`.

## 6. Configuración de ESLint (`eslint.config.mjs` Local)

- Hereda de: `../../../../eslint.config.mjs`.
- **`languageOptions.parserOptions.project`:** Apunta a `tsconfig.lib.json` local y `tsconfig.base.json` raíz.

## 7. Configuración de Pruebas (Jest)

- **`jest.config.ts`:**
  - `displayName`: `core-application-multitenancy`
  - `preset`: `../../../../jest.preset.js`
  - `moduleNameMapper`: Mapea a `@dfs-suite/shtypes`.
- **`project.json` (Target `test`):**
  - `executor`: `@nx/jest:jest`
  - `options.jestConfig`: `libs/core/application/coapmultitenancy/jest.config.ts`
  - `options.passWithNoTests`: `false` (debe tener tests).

## 8. Dependencias Clave

- **Internas:** `@dfs-suite/shtypes`.
- **Externas (NPM):** `@nestjs/common`, `@nestjs/core`.

## 9. Consideraciones Específicas y Deuda Técnica

- El servicio es `Scope.REQUEST` en NestJS para asegurar un contexto por solicitud.
- El método `setStore` debe usarse con precaución; `run` es preferible.
- (Deuda) Implementar tests unitarios exhaustivos para `TenantContextServiceImpl`, especialmente el comportamiento con `AsyncLocalStorage`.

## 10. Problemas Comunes y Soluciones Encontradas

- (Mantener actualizado).
  // FIN DEL ARCHIVO: libs/core/application/coapmultitenancy/LIBRARY_CONFIG.MD
