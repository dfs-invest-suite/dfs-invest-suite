// RUTA: jest.preset.js (Raíz del Monorepo)
// Autor: L.I.A Legacy (IA Asistente)
const { getJestProjects } = require('@nx/jest'); // Nx < 17 usa esto, Nx >= 17 usa getJestProjectsAsync
// El tuyo usa getJestProjectsAsync en jest.config.ts raíz, pero el preset es más simple
// y no necesita ser async.
const path = require('node:path'); // Necesario para construir paths

// La raíz del monorepo es donde está este archivo
const monorepoRoot = __dirname; // O path.resolve(__dirname) si se necesita el path absoluto explícito

module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json', // <rootDir> se resolverá al tsconfig.spec.json de cada proyecto
        isolatedModules: true, // Puede ayudar con la resolución de paths y velocidad
      },
    ],
  },
  resolver: '@nx/jest/plugins/resolver', // Usar el resolver de Nx
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
  passWithNoTests: true, // Default global, los proyectos pueden sobreescribirlo

  // Mapeo Global de Módulos para TODO el Workspace
  moduleNameMapper: {
    // --- libs/shared ---
    '^@dfs-suite/shtypes$': path.join(
      monorepoRoot,
      'libs/shared/shtypes/src/index.ts'
    ),
    '^@dfs-suite/shutils$': path.join(
      monorepoRoot,
      'libs/shared/shutils/src/index.ts'
    ),
    '^@dfs-suite/sherrors$': path.join(
      monorepoRoot,
      'libs/shared/sherrors/src/index.ts'
    ),
    '^@dfs-suite/shresult$': path.join(
      monorepoRoot,
      'libs/shared/shresult/src/index.ts'
    ),
    '^@dfs-suite/shconstants$': path.join(
      monorepoRoot,
      'libs/shared/shconstants/src/index.ts'
    ),
    '^@dfs-suite/shvalidationschemas$': path.join(
      monorepoRoot,
      'libs/shared/shvalidationschemas/src/index.ts'
    ),

    // --- libs/core/domain/shared-kernel ---
    '^@dfs-suite/cdskentities$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskentities/src/index.ts'
    ),
    '^@dfs-suite/cdskvalueobjects$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskvalueobjects/src/index.ts'
    ),
    '^@dfs-suite/cdskevents$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskevents/src/index.ts'
    ),
    '^@dfs-suite/cdskports$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskports/src/index.ts'
    ),
    '^@dfs-suite/cdskcommandsqueries$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskcommandsqueries/src/index.ts'
    ),
    '^@dfs-suite/cdskmappers$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskmappers/src/index.ts'
    ),

    // --- libs/core/domain/<contexto> ---
    '^@dfs-suite/codotenancy$': path.join(
      monorepoRoot,
      'libs/core/domain/codotenancy/src/index.ts'
    ),
    '^@dfs-suite/codousersroles$': path.join(
      monorepoRoot,
      'libs/core/domain/codousersroles/src/index.ts'
    ),
    '^@dfs-suite/codowhatsapp$': path.join(
      monorepoRoot,
      'libs/core/domain/codowhatsapp/src/index.ts'
    ),
    '^@dfs-suite/codomessagetemplaterecord$': path.join(
      monorepoRoot,
      'libs/core/domain/codomessagetemplaterecord/src/index.ts'
    ),
    '^@dfs-suite/codomessagelog$': path.join(
      monorepoRoot,
      'libs/core/domain/codomessagelog/src/index.ts'
    ),
    '^@dfs-suite/codoantiban$': path.join(
      monorepoRoot,
      'libs/core/domain/codoantiban/src/index.ts'
    ),
    '^@dfs-suite/codoleadsflow$': path.join(
      monorepoRoot,
      'libs/core/domain/codoleadsflow/src/index.ts'
    ),
    '^@dfs-suite/codoaiperassistance$': path.join(
      monorepoRoot,
      'libs/core/domain/codoaiperassistance/src/index.ts'
    ),
    '^@dfs-suite/codocampaigns$': path.join(
      monorepoRoot,
      'libs/core/domain/codocampaigns/src/index.ts'
    ),
    '^@dfs-suite/codoportalcontent$': path.join(
      monorepoRoot,
      'libs/core/domain/codoportalcontent/src/index.ts'
    ),
    '^@dfs-suite/codoeducacontent$': path.join(
      monorepoRoot,
      'libs/core/domain/codoeducacontent/src/index.ts'
    ),
    '^@dfs-suite/codobilling$': path.join(
      monorepoRoot,
      'libs/core/domain/codobilling/src/index.ts'
    ),
    '^@dfs-suite/codoanalyticscore$': path.join(
      monorepoRoot,
      'libs/core/domain/codoanalyticscore/src/index.ts'
    ),
    '^@dfs-suite/codonotificationscore$': path.join(
      monorepoRoot,
      'libs/core/domain/codonotificationscore/src/index.ts'
    ),
    // Añadir aquí el resto de librerías `codo*` y `coap*` cuando se definan.

    // --- libs/ui-shared ---
    '^@dfs-suite/ui-shared$': path.join(
      monorepoRoot,
      'libs/ui-shared/src/index.ts'
    ),
    // Añadir ui-mobile-shared cuando exista
  },
};
// RUTA: jest.preset.js
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Centralización del `moduleNameMapper` en `jest.preset.js`.", "justificacion": "Proporciona una configuración de resolución de módulos única y consistente para todos los proyectos Jest en el monorepo, utilizando paths absolutos desde la raíz del monorepo. Esto reduce la duplicación y la probabilidad de errores en los `jest.config.ts` locales.", "impacto": "Configuración de Jest más limpia y robusta. Los `jest.config.ts` locales ahora solo necesitarán `displayName` y configuraciones muy específicas del proyecto, heredando el `moduleNameMapper` del preset." },
  { "mejora": "Añadido `isolatedModules: true` a la configuración de `ts-jest`.", "justificacion": "Puede acelerar la transpilación de tests y a veces ayuda a resolver problemas de paths con `ts-jest`, aunque puede reducir algunas verificaciones de tipo durante la transpilación de tests. Es una opción común en setups de Nx.", "impacto": "Potencial mejora de rendimiento y resolución de paths en tests." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
