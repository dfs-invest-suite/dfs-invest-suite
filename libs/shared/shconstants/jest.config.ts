// RUTA: libs/shared/shconstants/jest.config.ts
// (Contenido del snapshot, que ya está correcto con passWithNoTests: true)
export default {
  displayName: 'shconstants',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/shared/shconstants',
  passWithNoTests: true,
};
// RUTA: libs/shared/shconstants/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmación del `jest.config.ts` para `shconstants`.", "justificacion": "El archivo del snapshot ya está alineado con las necesidades (sin mappers, passWithNoTests: true).", "impacto": "Listo." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
