// RUTA: libs/core/application/coapusersroles/jest.config.ts
import path from 'node:path';
const monorepoRoot = path.resolve(__dirname, '../../../../');

export default {
  displayName: 'coapusersroles',
  preset: '../../../../jest.preset.js', // Ajustar path al preset raíz
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../coverage/libs/core/application/coapusersroles',
  moduleNameMapper: {
    // Dependencias de shared
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
    // Dependencias de shared-kernel
    '^@dfs-suite/cdskcommandsqueries$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskcommandsqueries/src/index.ts'
    ),
    '^@dfs-suite/cdskevents$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskevents/src/index.ts'
    ),
    '^@dfs-suite/cdskports$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskports/src/index.ts'
    ),
    // Dependencia de su propio dominio
    '^@dfs-suite/codousersroles$': path.join(
      monorepoRoot,
      'libs/core/domain/codousersroles/src/index.ts'
    ),
    // (Si usara otros dominios o puertos de app, se añadirían aquí)
  },
  passWithNoTests: true, // Cambiar a false cuando se añadan tests
};
// RUTA: libs/core/application/coapusersroles/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Configuración Jest para `coapusersroles` con `moduleNameMapper` detallado.", "justificacion": "Asegura la correcta resolución de todos los alias de importación necesarios para los tests.", "impacto": "Preparación para tests robustos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
