// RUTA: libs/shared/shresult/jest.config.ts
export default {
  displayName: 'shresult',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/shared/shresult',
  // No necesita moduleNameMapper a otras libs del workspace
  passWithNoTests: false, // CAMBIADO A FALSE AHORA QUE TENEMOS TESTS
};
// RUTA: libs/shared/shresult/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Cambiado `passWithNoTests` a `false`.", "justificacion": "Se han añadido tests en `result.utils.spec.ts`.", "impacto": "Los tests ahora se ejecutarán y se reportarán sus resultados." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
