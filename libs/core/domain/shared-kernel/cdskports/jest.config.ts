// RUTA: libs/core/domain/shared-kernel/cdskports/jest.config.ts
// Autor: L.I.A Legacy (IA Asistente)
export default {
  displayName: 'cdskports',
  preset: '../../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../../coverage/libs/core/domain/shared-kernel/cdskports',
  moduleNameMapper: {
    '^@dfs-suite/shtypes$':
      '<rootDir>/../../../../../libs/shared/shtypes/src/index.ts',
    '^@dfs-suite/shresult$':
      '<rootDir>/../../../../../libs/shared/shresult/src/index.ts',
    '^@dfs-suite/sherrors$':
      '<rootDir>/../../../../../libs/shared/sherrors/src/index.ts',
    '^@dfs-suite/cdskentities$':
      '<rootDir>/../../../../../libs/core/domain/shared-kernel/cdskentities/src/index.ts',
  },
  passWithNoTests: true, // Esta librería solo define interfaces
};
// RUTA: libs/core/domain/shared-kernel/cdskports/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Configuración Jest para `cdskports` con `moduleNameMapper` para sus dependencias.", "justificacion": "Permite la resolución correcta de imports si se añadieran tests que usen tipos de estas dependencias.", "impacto": "Preparación para tests." },
  { "mejora": "Mantenido `passWithNoTests: true`.", "justificacion": "La librería consiste principalmente en interfaces, que no se testean directamente.", "impacto": "Evita fallos por ausencia de tests."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
