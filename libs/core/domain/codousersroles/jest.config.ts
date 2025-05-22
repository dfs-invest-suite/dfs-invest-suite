// RUTA: libs/core/domain/codousersroles/jest.config.ts
// Autor: L.I.A Legacy (IA Asistente)
import path from 'node:path';
const monorepoRoot = path.resolve(__dirname, '../../../../');

export default {
  displayName: 'codousersroles',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/core/domain/codousersroles',
  moduleNameMapper: {
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
    // '^@dfs-suite/infrasecurity$': path.join(monorepoRoot, 'libs/infrastructure/infrasecurity/src/index.ts'), // Si UserAuthenticationDomainService se implementa aquí y usa IPasswordHasherPort
  },
  passWithNoTests: true, // Cambiar a false cuando se añadan tests
};
// RUTA: libs/core/domain/codousersroles/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Configuración Jest para `codousersroles` con `moduleNameMapper` usando paths absolutos.", "justificacion": "Asegura la correcta resolución de módulos para los tests.", "impacto": "Preparación para tests." },
  { "mejora": "Establecido `passWithNoTests: true` temporalmente.", "justificacion": "Permite que el pipeline de test general avance mientras no se implementan los tests específicos para esta librería.", "impacto": "Flexibilidad en el desarrollo inicial."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
