// RUTA: libs/shared/shvalidationschemas/jest.config.ts
// (Contenido del snapshot, ya es correcto con `passWithNoTests: true` y los mappers necesarios)
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
    '^@dfs-suite/shconstants$': '<rootDir>/../shconstants/src/index.ts',
    '^@dfs-suite/shtypes$': '<rootDir>/../shtypes/src/index.ts',
  },
  passWithNoTests: true,
};
// RUTA: libs/shared/shvalidationschemas/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmación del `jest.config.ts` para `shvalidationschemas`.", "justificacion": "El archivo del snapshot ya está alineado con las necesidades (mappers para shconstants y shtypes, passWithNoTests: true).", "impacto": "Listo." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
