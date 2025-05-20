// RUTA: libs/core/domain/shared-kernel/cdskports/jest.config.ts
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
    '^@dfs-suite/cdskentities$': '<rootDir>/../cdskentities/src/index.ts',
  },
  passWithNoTests: true,
};
// RUTA: libs/core/domain/shared-kernel/cdskports/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Paths de `moduleNameMapper` y `preset` verificados.", "justificacion": "Asegura la correcta resolución.", "impacto": "Estabilidad de tests." },
  { "mejora": "Mantenido `passWithNoTests: true`.", "justificacion": "Esta librería define principalmente interfaces.", "impacto": "Evita fallos por ausencia de tests directos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
