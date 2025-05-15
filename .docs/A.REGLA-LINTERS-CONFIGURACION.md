## Librería: `nombre-de-la-libreria`

**Ruta:** `ruta/a/la/libreria`

**Propósito Principal:** (Breve descripción del rol de la librería)

**Tags Nx:** (Listar los tags de `project.json`)

### Configuración TypeScript (`tsconfig.json`, `tsconfig.lib.json`, `tsconfig.spec.json`)

- **`tsconfig.json` (Raíz de la Librería):**

  - **Hereda de:** (Ej: `../../../../../tsconfig.base.json`)
  - **Referencias:** Lista los `tsconfig.lib.json` y `tsconfig.spec.json` locales.
  - **`compilerOptions` Locales:** (Listar solo las opciones _definidas_ en este archivo, no las heredadas).
  - **`include`/`exclude`/`files` Locales:** (Listar solo las definidas aquí).
  - **Lógica/Propósito:** (Explicación breve de por qué está estructurado así).

- **`tsconfig.lib.json` (Código Fuente):**

  - **Hereda de:** `./tsconfig.json` (local de la librería).
  - **`compilerOptions` Clave:** `outDir`, `declaration`, `declarationMap`, `module`, `types`, `jsx` (si aplica).
  - **`include`:** Patrones para incluir archivos `src/**/[!index]*.ts` y `src/**/lib/**/*.ts` (excluyendo tests, index.ts de `src/`).
  - **`exclude`:** Patrones para excluir `node_modules`, `dist`, `jest.config.ts`, `*.spec.*`.
  - **Lógica/Propósito:** Configuración para el build de la librería y para el linting del código fuente con información de tipos (referenciado en `projectTsConfigsForSource` del ESLint raíz).

- **`tsconfig.spec.json` (Tests):**
  - **Hereda de:** `./tsconfig.json` (local de la librería).
  - **`compilerOptions` Clave:** `module` (`commonjs`), `types` (`jest`, `node`, `@testing-library/jest-dom`).
  - **`include`:** Patrones para incluir `jest.config.ts`, `src/**/*.spec.ts`, `src/test-setup.ts`.
  - **Lógica/Propósito:** Configuración para ejecutar tests con Jest y para el linting de los archivos de test con información de tipos (referenciado en `projectTsConfigsForTests` del ESLint raíz).

### Configuración ESLint (`eslint.config.mjs` Local)

- **Hereda de:** (Ej: `../../../../../eslint.config.mjs` - el raíz del monorepo).
- **Bloques de Configuración Específicos:**
  - **Para Código Fuente (`files: ['ruta/a/lib/src/...']`)**:
    - `languageOptions.parserOptions.project`: Lista de `tsconfig` que usa (ej. `tsconfig.lib.json` local y `tsconfig.base.json` raíz).
    - `plugins`: Lista de plugins activados para este bloque (ej. `@typescript-eslint`, `react`, etc.).
    - `rules`: Reglas específicas o activadas (ej. `recommended-type-checked`).
  - **Para Tests (`files: ['ruta/a/lib/src/**/_.spec._']`)\*\*:
    - `languageOptions.parserOptions.project`: Lista de `tsconfig` que usa (ej. `tsconfig.spec.json` local y `tsconfig.base.json` raíz).
    - `plugins`: Lista de plugins.
    - `rules`: Reglas específicas para tests (ej. desactivación de `no-explicit-any`).
  - **Para `index.ts` (si aplica, para desactivar reglas type-checked):**
    - `files`: Patrón para `index.ts`.
    - `languageOptions.parserOptions.project`: Usualmente solo `tsconfig.base.json` (para alias).
    - `rules`: Desactivación de reglas type-checked.
- **Lógica/Propósito:** (Explicación de por qué se necesita una config local y qué personaliza).

### Deuda Técnica / Mejoras Pendientes (Estándares y Linters)

- (Listar aquí cualquier desviación de los estándares definidos en el "Documento Maestro de Convenciones", problemas de linting no resueltos, o mejoras específicas para esta librería).

---

Empecemos con las librerías `shared`. Asumiré que los `tsconfig` que te proporcioné en la respuesta anterior (la que tenía los 3 archivos por librería) son los que están aplicados o los que aplicaremos.

**Documentación de Configuración de Librerías**

---

## Librería: `shared-constants`

**Ruta:** `libs/shared/constants`

**Propósito Principal:** Proporcionar constantes globales y reutilizables para todo el sistema, como límites de paginación y expresiones regulares comunes.

**Tags Nx:** `["scope:shared", "type:constants", "layer:shared"]` (Según `project.json`)

### Configuración TypeScript (`tsconfig.json`, `tsconfig.lib.json`, `tsconfig.spec.json`)

- **`tsconfig.json` (Raíz de la Librería):**

  - **Hereda de:** `../../../tsconfig.base.json`
  - **Referencias:** `./tsconfig.lib.json`, `./tsconfig.spec.json`
  - **`compilerOptions` Locales:** Ninguna (hereda todo lo necesario).
  - **`include`/`exclude`/`files` Locales:** `files: []`, `include: []`.
  - **Lógica/Propósito:** Actúa como un punto de anclaje para la configuración de la librería, delegando a `tsconfig.lib.json` y `tsconfig.spec.json`.

- **`tsconfig.lib.json` (Código Fuente):**

  - **Hereda de:** `./tsconfig.json`
  - **`compilerOptions` Clave:** `outDir`, `declaration: true`, `declarationMap: true`, `module: "commonjs"`, `types: ["node"]`.
  - **`include`:** `["src/index.ts", "src/lib/**/*.ts"]`
  - **`exclude`:** `["node_modules", "dist", "jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts", "src/test-setup.ts"]`
  - **Lógica/Propósito:** Configuración para el build de la librería y para el linting del código fuente con información de tipos (referenciado en `projectTsConfigsForSource` del ESLint raíz).

- **`tsconfig.spec.json` (Tests):**
  - **Hereda de:** `./tsconfig.json`
  - **`compilerOptions` Clave:** `module: "commonjs"`, `moduleResolution: "node"`, `types: ["jest", "node"]`.
  - **`include`:** `["jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts", "src/test-setup.ts"]` (si `test-setup.ts` existe).
  - **Lógica/Propósito:** Configuración para ejecutar tests y para el linting de los archivos de test con información de tipos (referenciado en `projectTsConfigsForTests` del ESLint raíz).

### Configuración ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../eslint.config.mjs` (el raíz del monorepo).
- **Contenido (del snapshot):**
  ```javascript
  import baseConfig from '../../../eslint.config.mjs';
  export default [...baseConfig];
  ```
- **Lógica/Propósito:** Esta librería no tiene necesidades de linting que difieran significativamente de la configuración base, por lo que simplemente hereda. Las reglas type-checked se aplicarán a `src/lib/**/*.ts` y `src/**/*.spec.ts` a través de los bloques correspondientes en el `eslint.config.mjs` raíz, siempre que `parserOptions.project` en esos bloques referencie correctamente los `tsconfig.lib.json` y `tsconfig.spec.json` de esta librería.

### Deuda Técnica / Mejoras Pendientes (Estándares y Linters)

- **Tests Unitarios:** El `project.json` tiene `passWithNoTests: true`. Se deben añadir tests para las constantes si estas involucraran alguna lógica de generación o si se quisiera validar su formato (ej. con regex). Para constantes simples, los¡Excelente idea! Documentar la configuración específica de cada librería es fundamental para la mantenibilidad, el onboarding y para que cualquier IA (o desarrollador humano) pueda entender rápidamente cómo está estructurado y qué se espera de cada parte del monorepo.

Vamos a crear una plantilla de documentación para la configuración de librerías y luego la aplicaremos a algunas de las librerías clave que hemos estado discutiendo, especialmente `ui-shared` y una de las `shared/*` como `shared-utils`, y una de `core/*` como `core-domain-tenancy`.

**Plantilla de Documentación de Configuración de Librería (`LIBRARY_CONFIG.md`)**

Este archivo (`LIBRARY_CONFIG.md` o un nombre similar) debería existir en la raíz de CADA librería.

````markdown
# Configuración y Estándares de la Librería: `[nombre-de-la-libreria]`

## 1. Propósito y Responsabilidad

- **Descripción Breve:** (Ej: Provee componentes UI reutilizables basados en Shadcn/UI para todas las PWAs.)
- **Capa Arquitectónica (Nx Tags):** `layer:[shared|domain|application|infrastructure|ui]`
- **Scope (Nx Tags):** `scope:[shared|core-domain|core-application|app|ui]`
- **Tipo/Feature (Nx Tags):** `type:[types|utils|ui|domain-logic|application-logic|adapter]`, `domain:[nombre-dominio]`, `feature:[nombre-feature]`

## 2. Estructura de Directorios Principal

- `src/`
  - `index.ts`: (Punto de entrada/API pública de la librería)
  - `lib/`: (Contiene la lógica principal, componentes, utilidades, etc.)
  - `assets/` (Opcional: si la librería tiene assets propios)
  - `styles/` (Opcional: para `ui-shared`, contiene `globals.css`)
  - `test-setup.ts` (Opcional: configuración específica para tests de esta librería)
- `eslint.config.mjs`: (Configuración de ESLint específica de la librería)
- `jest.config.ts`: (Configuración de Jest específica de la librería)
- `project.json`: (Configuración del proyecto Nx)
- `tsconfig.json`: (TSConfig raíz de la librería, referencia a .lib y .spec)
- `tsconfig.lib.json`: (TSConfig para el código fuente de la librería)
- `tsconfig.spec.json`: (TSConfig para los archivos de test de la librería)

## 3. Configuración de TypeScript (`tsconfig.lib.json` y `tsconfig.spec.json`)

- **Hereda de:** `[ruta/relativa/a/tsconfig.json]` que a tests pueden no ser críticos, pero la opción debería ser `false` si se espera algún test.

* **`eslint.config.mjs` Local Explícito (Opcional):** Si el `eslint.config.mjs` raíz no fuera suficiente o causara problemas, se podría adoptar el patrón más explícito (como el que usamos para `ui-shared`) donde esta librería define sus propios bloques `files` y `parserOptions.project`. Por ahora, la herencia simple es la más limpia si funciona.

---

## Librería: `shared-errors`

**Ruta:** `libs/shared/errors`

**Propósito Principal:** Definir clases base para excepciones, códigos de error comunes y excepciones genéricas reutilizables.

**Tags Nx:** `["scope:shared", "type:errors", "layer:shared"]`

### Configuración TypeScript

- **`tsconfig.json`:** Similar a `shared-constants`, hereda de raíz y referencia `lib` y `spec`.
- **`tsconfig.lib.json`:** Similar a `shared-constants`, incluye `src/index.ts`, `src/lib/**/*.ts`, excluye tests. `types: ["node"]`.
- **`tsconfig.spec.json`:** Similar a `shared-constants`, incluye `jest.config.ts`, `src/**/*.spec.ts`. `types: ["jest", "node"]`.

### Configuración ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../eslint.config.mjs`.
- **Contenido (del snapshot):**
  ```javascript
  import baseConfig from '../../../eslint.config.mjs';
  export default [...baseConfig];
  ```
- **Lógica/Propósito:** Similar a `shared-constants`, hereda la configuración global.

### Deuda Técnica / Mejoras Pendientes

- **Tests Unitarios:** `project.json` tiene `passWithNoTests: true`. Se deberían testear las clases de excepción (ej. que `toJSON()` funcione, que `code` y `message` se asignen).
- **`no-undef` para `process` en `exception.base.ts`:**
  - El log que me mostraste: `libs\shared\errors\src\lib\exception.base.ts 43:14 error 'process' is not defined no-undef`
  - **Esto indica que el bloque en `eslint.config.mjs` raíz que define `globals: { ...globals.node }` no se está aplicando correctamente a este archivo, o que `process` no está en `globals.node` (lo cual sería raro).**
  - **Solución Inmediata (a nivel de este archivo si el problema es aislado):**
    ```typescript
    // RUTA: libs/shared/errors/src/lib/exception.base.ts
    // ... (imports) ...
    /* eslint-disable no-undef */ // Desactivar temporalmente para process
    // o definirlo específicamente en el eslint.config.mjs de esta librería si fuera necesario.
    export abstract class ExceptionBase extends Error {
      // ...
      public toJSON(): SerializedException {
        return {
          message: this.message,
          code: this.code,
          // Verificar si 'process' está disponible en el entorno donde se ejecuta esta lib
          // Si es solo para Node.js, está bien. Si es para navegador, process.env no existe.
          stack:
            typeof process !== 'undefined' &&
            process.env &&
            process.env['NODE_ENV'] === 'development'
              ? this.stack
              : undefined,
          correlationId: this.correlationId,
          cause: this.cause?.toString(),
          metadata: this.metadata,
        };
      }
    }
    /* eslint-enable no-undef */
    ```
  - **Solución Holística:** Asegurar que el `eslint.config.mjs` raíz, en su bloque principal, aplique `globals: { ...globals.node }` a todos los archivos `.ts` de las librerías `shared` y `core`. El que te di en la penúltima respuesta ya lo hace.

---

## Librería: `shared-result`

**Ruta:** `libs/shared/result`

**Propósito Principal:** Implementar el patrón `Result<T, E>` para manejo explícito de errores funcionales.

**Tags Nx:** `["scope:shared", "type:functional", "layer:shared"]`

### Configuración TypeScript

- **`tsconfig.json`:** Similar a `shared-constants`.
- **`tsconfig.lib.json`:** Similar a `shared-constants`.
- **`tsconfig.spec.json`:** Similar a `shared-constants`.

### Configuración ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../eslint.config.mjs`.
- **Contenido (del snapshot):**
  ```javascript
  import baseConfig from '../../../eslint.config.mjs';
  export default [...baseConfig];
  ```

### Deuda Técnica / Mejoras Pendientes

- **Tests Unitarios para `result.utils.ts`:** `project.json` tiene `passWithNoTests: true`. Es crucial testear `ok()`, `err()`, `isOk()`, `isErr()` y los métodos funcionales (`map`, `andThen`, etc.) de los objetos `Ok` y `Err`.
- **Tipado en `result.utils.ts` para `unwrapErr` y `unwrap` en `Err`:**
  - `unwrapErr(): E; // Debería lanzar un error si se llama en Ok` -> En `ok()` debe lanzar. Correcto.
  - `unwrap(): T; // Debería lanzar un error si se llama en Err` -> En `err()` debe lanzar. Correcto.
  - La lógica actual de `err().unwrap()` lanza `errorValue` si es `Error`, o `new Error(JSON.stringify(errorValue))`. Esto está bien.

---

## Librería: `shared-types`

**Ruta:** `libs/shared/types`

**Propósito Principal:** Definir tipos TypeScript globales, interfaces y "Branded Types" para todo el proyecto.

**Tags Nx:** `["scope:shared", "type:types", "layer:shared"]`

### Configuración TypeScript

- **`tsconfig.json`:** Similar a `shared-constants`.
- **`tsconfig.lib.json`:** Similar a `shared-constants`.
- **`tsconfig.spec.json`:** Similar a `shared-constants`. (Aunque esta librería podría no tener tests Jest su vez hereda de `[ruta/relativa/a/tsconfig.base.json]`

* **`tsconfig.lib.json`:**
  - `compilerOptions.module`: (Ej: `commonjs` para libs backend/agnósticas, `esnext` para libs frontend)
  - `compilerOptions.types`: (Ej: `["node"]` o `["node", "@nx/react/typings/cssmodule.d.ts"]`)
  - `include`: (Patrones que definen el código fuente, ej: `["src/index.ts", "src/lib/**/*.ts"]`)
  - `exclude`: (Patrones que excluyen tests, configs, etc. ej: `["**/*.spec.ts", "jest.config.ts"]`)
* **`tsconfig.spec.json`:**
  - `compilerOptions.module`: (Generalmente `commonjs` para Jest)
  - `compilerOptions.types`: (Ej: `["jest", "node", "@testing-library/jest-dom"]`)
  - `include`: (Patrones que definen los archivos de test, ej: `["jest.config.ts", "src/**/*.spec.ts", "src/test-setup.ts"]`)

## 4. Configuración de ESLint (`eslint.config.mjs` local)

- **Hereda de:** `[ruta/relativa/al/eslint.config.mjs]` raíz.
- **Propósito Principal de la Configuración Local:**
  - Definir `languageOptions.parserOptions.project` para que apunte a los `tsconfig.lib.json` y `tsconfig.spec.json` (y al `tsconfig.base.json` raíz) relevantes para ESTA librería.
  - Activar y configurar reglas específicas que dependen de la información de tipos (ej. `@typescript-eslint/recommended-type-checked`).
  - Aplicar configuraciones de plugins específicos del framework si es una librería de UI (ej. `eslint-plugin-react`, `eslint-plugin-jsx-a11y`).
  - Sobrescribir reglas de la configuración base si es estrictamente necesario.
- **Bloques de Configuración Típicos:**
  - Bloque para código fuente (`src/lib/**/*` excluyendo tests e index) con `parserOptions.project` apuntando a `tsconfig.lib.json`.
  - Bloque para archivos de test (`src/**/*.spec.*`) con `parserOptions.project` apuntando a `tsconfig.spec.json` y globales de Jest.
  - Bloque para `src/index.ts` (si solo re-exporta) con `parserOptions.project` simplificado o sin él, y reglas type-checked desactivadas.

## 5. Configuración de Pruebas (`jest.config.ts` y `project.json`)

- **`jest.config.ts`:**
  - `displayName`: `[nombre-de-la-libreria]`
  - `preset`: `../../jest.preset.js` (o ruta relativa correcta)
  - `transform`: (Configuración para `babel-jest` o `ts-jest`)
  - `setupFilesAfterEnv`: (Ej: `['<rootDir>/src/test-setup.ts']` si existe)
- **`project.json` (target `test`):**
  - `executor`: `@nx/jest:jest`
    si solo son tipos, `passWithNoTests: true` sería aceptable).

### Configuración ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../eslint.config.mjs`.
- **Contenido (del snapshot):**
  ```javascript
  import baseConfig from '../../../eslint.config.mjs';
  export default [...baseConfig];
  ```

### Deuda Técnica / Mejoras Pendientes

- **Tests de Tipos (`tsd`):** Como se mencionó en el `project.json.md` del snapshot, para una librería de tipos, los tests de tipos con `tsd` serían la forma ideal de asegurar la corrección.
- **`passWithNoTests: true`**: Aceptable para una librería de solo tipos si no se añaden tests `tsd`.

---

## Librería: `shared-validation-schemas`

**Ruta:** `libs/shared/validation-schemas`

**Propósito Principal:** Definir esquemas de validación reutilizables con Zod.

**Tags Nx:** `["scope:shared", "type:validation", "layer:shared"]`

### Configuración TypeScript

- **`tsconfig.json`:** Similar a `shared-constants`.
- **`tsconfig.lib.json`:** Similar a `shared-constants`.
- **`tsconfig.spec.json`:** Similar a `shared-constants`.

### Configuración ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../eslint.config.mjs`.
- **Contenido (del snapshot):**
  ```javascript
  import baseConfig from '../../../eslint.config.mjs';
  export default [...baseConfig];
  ```

### Deuda Técnica / Mejoras Pendientes

- **Tests para Schemas:** `project.json` tiene `passWithNoTests: true`. Se deben añadir tests para los schemas Zod, verificando que validan y rechazan datos como se espera.
- **Exportación de Tipos Inferidos:** Considerar exportar tipos inferidos por Zod para conveniencia.

---

## Librería: `core-domain-shared-kernel-commands-queries`

**Ruta:** `libs/core/domain/shared-kernel/commands-queries`

**Propósito Principal:** Clases base e interfaces para el patrón CQRS (CommandBase, QueryBase, ICommandHandler, etc.).

**Tags Nx:** `["scope:core-domain", "type:shared-kernel", "layer:domain"]`

### Configuración TypeScript

- **`tsconfig.json`:** Similar a `shared-constants`.
- **`tsconfig.lib.json`:** Similar a `shared-constants`. Su `include` debe ser `["src/index.ts", "src/lib/**/*.ts"]` y `exclude` los tests.
- **`tsconfig.spec.json`:** Similar a `shared-constants`. Su `include` debe ser `["jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts"]`.

### Configuración ESLint (`eslint.config.mjs` Local)

- **Hereda de:** `../../../../../eslint.config.mjs`.
- **Contenido (del snapshot):**
  ```javascript
  import baseConfig from '../../../../../eslint.config.mjs';
  export default [...baseConfig];
  ```
- **Acción de Mejora:** Para este, y para las otras librerías `core` que estaban fallando, se recomienda aplicar el patrón de `eslint.config.mjs` local más explícito (similar al que hicimos para `ui-shared` y `shared-utils` en la iteración anterior) para asegurar que `parserOptions.project` se configure correctamente.

  ```javascript
  // EJEMPLO PARA: libs/core/domain/shared-kernel/commands-queries/eslint.config.mjs
  // Aplicar estructura similar a las otras librerías core.
  import baseConfig from '../../../../../eslint.config.mjs'; // Ajustar ruta
  import tsPlugin from '@typescript-eslint/eslint-plugin';
  import { dirname } from 'path';
  import { fileURLToPath } from 'url';

  const monorepoRoot = dirname(
    dirname(dirname(dirname(dirname(fileURLToPath(import.meta.url)))))
  ); // Ajustar profundidad

  const libConfig = [
    ...baseConfig,
    {
      // Código Fuente
      files: [
        'libs/core/domain/shared-kernel/commands-queries/src/lib/**/*.ts',
      ], // Más específico
      ignores: [
        /* ... tests, index.ts, configs ... */ '**/node_modules/**',
        '**/dist/**',
        'libs/core/domain/shared-kernel/commands-queries/jest.config.ts',
        'libs/core/domain/shared-kernel/commands-queries/src/**/*.spec.ts',
        'libs/core/domain/shared-kernel/commands-queries/src/index.ts',
      ],
      languageOptions: {
        parserOptions: {
          project: [
            `${monorepoRoot}/libs/core/domain/shared-kernel/commands-queries/tsconfig.lib.json`,
            `${monorepoRoot}/tsconfig.base.json`,
          ],
          tsconfigRootDir: monorepoRoot,
        },
      },
      plugins: { '@typescript-eslint': tsPlugin },
      rules: {
        ...tsPlugin.configs['recommended-type-checked']
          .rules /* ... otras reglas ... */,
      },
    },
    {
      // Tests
      files: [
        'libs/core/domain/shared-kernel/commands-queries/src/lib/**/*.spec.ts',
      ],
      ignores: ['**/node_modules/**', '**/dist/**'],
      languageOptions: {
        parserOptions: {
          project: [
            `${monorepoRoot}/libs/core/domain/shared-kernel/commands-queries/tsconfig.spec.json`,
            `${monorepoRoot}/tsconfig.base.json`,
          ],
          tsconfigRootDir: monorepoRoot,
        },
      },
      plugins: { '@typescript-eslint': tsPlugin },
      rules: {
        ...tsPlugin.configs['recommended-type-checked'].rules,
        '@typescript-eslint/no-explicit-any': 'off' /* ... */,
      },
    },
    {
      // index.ts
      files: ['libs/core/domain/shared-kernel/commands-queries/src/index.ts'],
      ignores: ['**/node_modules/**', '**/dist/**'],
      languageOptions: {
        parserOptions: {
          project: [`${monorepoRoot}/tsconfig.base.json`],
          tsconfigRootDir: monorepoRoot,
        },
      },
      rules: {
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
  ];
  export default libConfig;
  ```

### Deuda Técnica / Mejoras Pendientes

- **Error de Código:** `'GuardType' is defined but never used` en `command.base.spec.ts`.
  - **Solución:** Ya te la proporcioné. Eliminar la importación `Guard as GuardType`.
- **Tests:** `passWithNoTests` está en `false` en `project.json`, lo cual es bueno. Los tests para `command.base.spec.ts => evalúalas tu ia.
````

Prompt: Desarrollo con Estricta Adherencia a Configuración ESLint Flat
Compromiso con la Calidad de Código
Como desarrolladora senior experta en React 15, arquitecturas monorepo NX, DDD y hexagonal, me comprometo a adherirme rigurosamente a las reglas de ESLint configuradas en este proyecto, siguiendo estos principios fundamentales:

Estricta conformidad con la configuración flat de ESLint:

Nunca modificaré ni flexibilizaré las reglas existentes
No implementaré excepciones mediante comentarios // eslint-disable
No introduciré configuraciones particulares a nivel de archivo
Respetaré la configuración global tal como está definida

Adaptación del código a las reglas, no las reglas al código:

Refactorizaré código existente para cumplir con las reglas establecidas
Desarrollaré nuevo código siguiendo estrictamente las convenciones definidas
Implementaré soluciones que sean técnicamente óptimas dentro del marco de las reglas

Enfoque Técnico para Adherencia a ESLint
Prácticas de Codificación

Estructuración de componentes según los patrones aprobados por las reglas
Organización consistente de imports siguiendo el orden establecido
Implementación de propTypes/TypeScript según las convenciones definidas
Espaciado, indentación y formateo según reglas preestablecidas

Proceso de Desarrollo

Verificación constante de adherencia a reglas durante el desarrollo
Refactorización proactiva de código que no cumpla con las reglas
Documentación de patrones aprobados para mantener consistencia
Integración de verificación de linting en el proceso de revisión de código

Resolución de Conflictos

En caso de conflicto entre prácticas de arquitectura y reglas de ESLint, siempre prevalecerán las reglas
Buscaré implementaciones alternativas que mantengan la calidad técnica respetando las reglas
Documentaré cualquier desafío encontrado y la solución implementada respetando las reglas

Compromiso Específico para PWA-Supervisor
Todo el código desarrollado para el proyecto PWA-Supervisor y la nivelación algorítmica:

Pasará la validación de ESLint sin errores ni advertencias
Mantendrá consistencia estilística con el resto del proyecto
No introducirá excepciones o flexibilizaciones a las reglas
Será un ejemplo de código limpio y conforme a estándares

Beneficios Esperados

Consistencia absoluta en todo el codebase
Facilidad de mantenimiento a largo plazo
Reducción de deuda técnica
Facilidad para la incorporación de nuevos desarrolladores
Mejora en la calidad general del código

Solicitud de Información
Para garantizar una perfecta adherencia a las reglas, necesitaré:

Acceso a la configuración flat completa de ESLint del proyecto
Ejemplos de código existente que cumpla perfectamente con las reglas
Documentación sobre cualquier convención específica del proyecto que complemente las reglas de ESLint
