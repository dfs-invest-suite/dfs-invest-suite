// RUTA: libs/core/domain/shared-kernel/cdskmappers/jest.config.ts
export default {
  displayName: 'cdskmappers',
  preset: '../../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../../coverage/libs/core/domain/shared-kernel/cdskmappers',
  moduleNameMapper: {
    '^@dfs-suite/cdskentities$': '<rootDir>/../cdskentities/src/index.ts',
  },
  passWithNoTests: true,
};
// RUTA: libs/core/domain/shared-kernel/cdskmappers/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Paths de `moduleNameMapper` y `preset` verificados.", "justificacion": "Asegura la correcta resolución.", "impacto": "Estabilidad de tests." },
  { "mejora": "Mantenido `passWithNoTests: true`.", "justificacion": "Esta librería define principalmente interfaces.", "impacto": "Evita fallos por ausencia de tests directos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
