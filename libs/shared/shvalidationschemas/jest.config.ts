// RUTA: libs/shared/shvalidationschemas/jest.config.ts
export default {
  displayName: 'shvalidationschemas',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/shared/shvalidationschemas',
  moduleNameMapper: {
    '^@dfs-suite/shconstants$': '<rootDir>/../shconstants/src/index.ts', // Corregido a 1 nivel ../
    '^@dfs-suite/shtypes$': '<rootDir>/../shtypes/src/index.ts', // Corregido a 1 nivel ../
  },
  passWithNoTests: true,
};
// RUTA: libs/shared/shvalidationschemas/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Paths de `moduleNameMapper` corregidos.", "justificacion": "Alineación con la estructura de `libs/shared/`.", "impacto": "Correcta resolución." },
  { "mejora": "Añadido `passWithNoTests: true`.", "justificacion": "Temporal hasta que se implementen tests para los schemas Zod.", "impacto": "Evita fallos por 'No tests found'." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {"nota": "Revertir `passWithNoTests` a `false` al añadir tests."}
]
*/
