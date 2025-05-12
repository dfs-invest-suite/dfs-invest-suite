// eslint.config.mjs
import nxPlugin from '@nx/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

/**
 * Configuración de ESLint "Flat Config" para el monorepo dfs-invest-suite.
 *
 * Principios:
 * 1. Utilizar las configuraciones base de Nx para TypeScript.
 * 2. Habilitar reglas que requieren información de tipos para un análisis más profundo.
 * 3. Definir reglas estrictas de límites de módulo (`@nx/enforce-module-boundaries`)
 *    para mantener la integridad de la arquitectura hexagonal.
 * 4. Integrar Prettier para el formateo de código.
 */
export default [
  // Sección 1: Ignorados Globales
  // Estos directorios no serán procesados por ESLint.
  {
    ignores: ['**/node_modules/**', '**/dist/**', '.nx/'],
  },

  // Sección 2: Configuración Base de Nx para TypeScript
  // Esta es la configuración recomendada por Nx y ya incluye:
  // - @typescript-eslint/parser
  // - @typescript-eslint/eslint-plugin
  // - Reglas fundamentales para TypeScript en un entorno Nx.
  ...nxPlugin.configs['flat/typescript'],

  // Sección 3: Configuración Detallada para Archivos TypeScript (.ts, .tsx)
  // Aquí refinamos y añadimos reglas específicas.
  {
    files: ['**/*.ts', '**/*.tsx'], // Aplicar solo a archivos TypeScript
    languageOptions: {
      parser: tsParser, // Confirmamos el parser
      parserOptions: {
        // Rutas a los tsconfig.json para reglas que necesitan información de tipos.
        // Es crucial incluir los tsconfig de las aplicaciones y todas las profundidades de librerías.
        project: [
          './tsconfig.base.json', // TSConfig base del workspace
          './apps/*/tsconfig.json', // TSConfig de proyectos en apps/ (nivel 1)
          './libs/*/tsconfig.json', // TSConfig de proyectos en libs/ (nivel 1)
          './libs/*/*/tsconfig.json', // TSConfig de proyectos en libs/ (nivel 2, ej. libs/core/domain)
          './libs/*/*/*/tsconfig.json', // TSConfig de proyectos en libs/ (nivel 3, ej. libs/core/domain/shared-kernel)
        ],
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin, // Plugin de TypeScript ESLint
      '@nx': nxPlugin, // Plugin de Nx (para enforce-module-boundaries, etc.)
    },
    rules: {
      // --- Reglas Heredadas de @typescript-eslint ---
      // Se activan las reglas recomendadas que usan información de tipos.
      // 'eslint-recommended' son reglas de ESLint base que @typescript-eslint puede querer sobrescribir.
      ...(tsPlugin.configs?.['eslint-recommended']?.overrides?.[0]?.rules || tsPlugin.configs?.['eslint-recommended']?.rules || {}), // Ajuste para flat config
      ...(tsPlugin.configs?.['recommended-type-checked']?.rules || {}),
      // Opcional: ...(tsPlugin.configs?.['stylistic-type-checked']?.rules || {}), // Para reglas de estilo con tipos

      // --- Reglas Personalizadas y Sobrescrituras ---
      'no-unused-vars': 'off', // Desactivar la regla base de ESLint
      '@typescript-eslint/no-unused-vars': [
        'warn', // Usar la versión de TypeScript, como warning
        {
          argsIgnorePattern: '^_', // Ignorar argumentos que comiencen con _
          varsIgnorePattern: '^_', // Ignorar variables que comiencen con _
          caughtErrorsIgnorePattern: '^_', // Ignorar errores capturados que comiencen con _
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // 'any' como warning, para fomentar el tipado progresivo
      '@typescript-eslint/no-inferrable-types': 'off', // Permitir inferencia donde sea obvio (preferencia)

      // Regla para retornos inseguros (ej. `any` donde se espera un tipo específico)
      // La configuramos como 'warn' porque hay casos legítimos (o difíciles de tipar sin `any`)
      // donde podríamos necesitar una desactivación local con justificación.
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // Regla para evitar stringificación implícita de objetos a '[object Object]'
      // La mantenemos como error porque es importante para la calidad de los logs/mensajes.
      // Los casos específicos donde esto es problemático se manejan con desactivaciones locales (ver `activate-tenant.use-case.ts`).
      '@typescript-eslint/no-base-to-string': 'error',

      // --- Regla de Límites de Módulo de Nx ---
      // Esta es la regla CRUCIAL para hacer cumplir nuestra arquitectura hexagonal.
      '@nx/enforce-module-boundaries': [
        'error', // Las violaciones de límites son errores
        {
          enforceBuildableLibDependency: true, // Buena práctica para librerías construibles
          allow: [
            // Permitir que los archivos de configuración de ESLint importen de cualquier sitio.
            // Usar expresiones regulares para mayor flexibilidad con los nombres de archivo.
            '^.*/eslint(?:\\.config|rc)\\.[mc]?[jt]s$'
          ],
          depConstraints: [
            // REGLA GENERAL: Las librerías pueden depender de otras con el mismo scope (ej. shared de shared, core-domain de core-domain)
            // Esto es una simplificación inicial, las reglas de capa son más específicas.
            // {
            //   sourceTag: "scope:*",
            //   onlyDependOnLibsWithTags: ["scope:*"]
            // },

            // --- CAPA SHARED ---
            // 'layer:shared' es la base de todo, solo puede depender de otras 'layer:shared'.
            {
              sourceTag: 'layer:shared',
              onlyDependOnLibsWithTags: ['layer:shared'],
              // Notas:
              // - `shared-types` (type:types, layer:shared)
              // - `shared-result` (type:functional, layer:shared)
              // - `shared-errors` (type:errors, layer:shared)
              // - `shared-utils` (type:utils, layer:shared)
              // - `shared-constants` (type:constants, layer:shared)
              // - `shared-validation-schemas` (type:validation, layer:shared)
            },

            // --- CAPA CORE: SHARED-KERNEL (Parte del Dominio) ---
            // 'type:shared-kernel' (que también tendrá 'layer:domain')
            // Puede depender de 'layer:shared' y de otras 'type:shared-kernel'.
            {
              sourceTag: 'type:shared-kernel', // Ej: core-domain-shared-kernel-entities
              onlyDependOnLibsWithTags: [
                'layer:shared',       // Dependencia permitida hacia la capa más externa.
                'type:shared-kernel', // Puede depender de otros componentes del shared-kernel.
              ],
              // Notas:
              // - `core-domain-shared-kernel-entities` (layer:domain, type:shared-kernel)
              // - `core-domain-shared-kernel-value-objects` (layer:domain, type:shared-kernel)
              // - `core-domain-shared-kernel-events` (layer:domain, type:shared-kernel)
              // - `core-domain-shared-kernel-ports` (layer:domain, type:shared-kernel)
              // - `core-domain-shared-kernel-commands-queries` (layer:domain, type:shared-kernel)
              // - `core-domain-shared-kernel-mappers` (layer:domain, type:shared-kernel)
            },

            // --- CAPA CORE: DOMAIN-LOGIC (Lógica de Dominio Específica) ---
            // 'type:domain-logic' (ej. 'core-domain-tenancy', que también tendrá 'layer:domain' y 'domain:tenancy')
            // Puede depender de 'layer:shared' y 'type:shared-kernel'.
            // La dependencia entre diferentes 'type:domain-logic' (diferentes 'domain:*') debe ser evitada o manejada con extrema cautela
            // (idealmente a través de eventos de aplicación o coordinación en la capa de aplicación).
            {
              sourceTag: 'type:domain-logic', // Ej: core-domain-tenancy
              onlyDependOnLibsWithTags: [
                'layer:shared',
                'type:shared-kernel',
                'type:domain-logic', // Permite que un dominio específico dependa de otro (ej. 'domain:tenancy' de 'domain:users' para VOs o IDs).
                                     // Esta es la regla más flexible. Si queremos ser más estrictos:
                                     // 1. Podríamos eliminar 'type:domain-logic' aquí.
                                     // 2. Y luego añadir reglas específicas por 'domain:<name>', ej:
                                     //    { sourceTag: 'domain:tenancy', onlyDependOnLibsWithTags: ['layer:shared', 'type:shared-kernel', 'domain:tenancy'] }
                                     //    Esto haría los dominios más aislados, forzando la comunicación indirecta.
                                     // POR AHORA: Mantenemos la flexibilidad, pero vigilaremos este punto.
              ],
            },

            // --- CAPA CORE: APPLICATION-LOGIC ---
            // 'type:application-logic' (ej. 'core-application-tenancy', que tendrá 'layer:application' y 'feature:tenancy')
            // Orquesta el dominio. Depende de 'layer:shared', 'type:shared-kernel', 'type:domain-logic' (generalmente el de su propio feature/dominio).
            // Puede depender de OTRA 'type:application-logic' (para composición de casos de uso, con precaución para evitar ciclos o acoplamiento excesivo).
            {
              sourceTag: 'type:application-logic', // Ej: core-application-tenancy
              onlyDependOnLibsWithTags: [
                'layer:shared',
                'type:shared-kernel',     // Para interfaces de comandos/queries, Result, etc.
                'type:domain-logic',      // Para interactuar con entidades y puertos de dominio.
                'type:application-logic', // Para llamar a otros casos de uso.
              ],
            },

            // --- CAPA INFRASTRUCTURE: ADAPTERS ---
            // 'type:adapter' (que tendrá 'layer:infrastructure' y 'technology:<nombre>')
            // Implementa puertos definidos en 'layer:domain' (shared-kernel o domain-logic) o 'layer:application'.
            // Puede depender de todo lo que está "más adentro" y de otros adaptadores.
            {
              sourceTag: 'type:adapter',
              onlyDependOnLibsWithTags: [
                'layer:shared',           // Para DTOs de infraestructura, utils, constantes.
                'type:shared-kernel',     // Para interfaces de puertos genéricos (ILoggerPort, IRepositoryPort), clases base.
                'type:domain-logic',      // Para tipos de entidades de dominio, puertos específicos de dominio que implementa.
                'type:application-logic', // Para puertos de servicios de aplicación que implementa.
                'type:adapter',           // Un adaptador puede usar otro (ej. repo usando logger).
              ],
            },

            // --- CAPA DE APLICACIONES (apps/*) ---
            // 'scope:app' (ej. 'api-main')
            // Actúa como la capa de "Presentación" o "Bootstrap" en la Arquitectura de 4 Capas.
            // Depende de 'layer:shared' (para DTOs de API), 'type:application-logic' (para invocar casos de uso),
            // y 'type:adapter' (para la inyección de dependencias de las implementaciones en su configuración de módulos NestJS).
            {
              sourceTag: 'scope:app', // Ej: api-main
              onlyDependOnLibsWithTags: [
                'layer:shared',           // Para DTOs de API, tipos básicos.
                'type:application-logic', // Flujo principal: App -> ApplicationLogic (Casos de Uso).
                'type:adapter',           // Para la Inyección de Dependencias de implementaciones concretas.
                                          // Es aceptable que la app conozca los adaptadores para el setup del DI.
                // 'type:shared-kernel',  // Permitir opcionalmente si algún tipo muy básico del kernel (como AggregateId)
                                          // no se re-exporta convenientemente por la capa de aplicación y es necesitado por un DTO de API.
                                          // Idealmente, las apps interactúan principalmente con `type:application-logic`.
              ],
            },
            /* SECCIÓN DE MEJORAS FUTURAS PARA depConstraints:
            [
              Mejora 1: Considerar `bannedExternalImports` para restringir aún más las dependencias entre diferentes `domain:<name>`
                         si se observa acoplamiento indebido. Por ejemplo, prohibir que `domain:tenancy` importe directamente de `domain:leads-flow`.
            ]
            [
              Mejora 2: A medida que se creen más librerías de infraestructura o UI, añadir reglas específicas para ellas,
                         por ejemplo, `layer:ui` (para `ui-shared`) o tags específicos para tipos de adaptadores
                         (ej. `technology:prisma`, `technology:bullmq`).
            ]
            [
              Mejora 3: Si se decide usar una capa de "Adaptadores de Aplicación" separada para `api-main` (ej. `libs/api-main-adapters`),
                         se necesitarán reglas para ella, permitiéndole depender de `layer:application` y siendo consumida por `scope:app`.
            ]
            */
          ],
        },
      ],
    },
  },

  // Sección 4: Configuración de Prettier
  // Asegura que ESLint no interfiera con las reglas de formato de Prettier.
  // Prettier se encarga del formateo del código.
  eslintConfigPrettier,
];
// eslint.config.mjs
/* SECCIÓN DE MEJORAS (Generales para el archivo ESLint)

[
  Mejora propuesta 1: Investigar el uso de `nxPlugin.configs['flat/mixed-esm-cjs']` si en algún momento el proyecto necesita
                     manejar una mezcla de módulos ES y CommonJS de forma más explícita, aunque la configuración actual
                     debería ser suficiente para un proyecto moderno basado en ESM o transpilado a CJS consistentemente.
]
[
  Mejora propuesta 2: A medida que el proyecto crezca, se podrían añadir configuraciones de ESLint específicas por proyecto
                     (en los `eslint.config.mjs` de cada app/lib) si necesitan reglas particulares que no aplican globalmente,
                     heredando de esta configuración base.
]
[
  Mejora propuesta 3: Para las rutas en `parserOptions.project`, si el número de niveles de anidamiento de librerías aumenta
                     más allá de 3 (ej. `libs/a/b/c/d/`), se necesitaría añadir el patrón correspondiente

]

*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Generales para el archivo ESLint)

[
  Nota estratégica 1: Mantener actualizadas las versiones de ESLint, plugins de Nx, y `@typescript-eslint`
                     es crucial, ya que nuevas versiones pueden traer mejores reglas, optimizaciones o requerir
                     ajustes en la configuración. Utilizar `pnpm nx migrate` para esto.
]
[
  Nota estratégica 2: La efectividad de `@nx/enforce-module-boundaries` depende críticamente de la correcta
                     y consistente asignación de `tags` en los archivos `project.json` de cada librería y aplicación.
                     Establecer una convención clara para los tags y auditarla regularmente es importante.
]
*/
