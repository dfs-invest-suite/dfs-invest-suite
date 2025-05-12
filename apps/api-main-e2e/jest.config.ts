// apps/api-main-e2e/jest.config.ts
export default {
  displayName: 'api-main-e2e',
  preset: '../../jest.preset.js',
  globalSetup: '<rootDir>/src/support/global-setup.ts',
  globalTeardown: '<rootDir>/src/support/global-teardown.ts',
  setupFiles: ['<rootDir>/src/support/test-setup.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api-main-e2e',
  testMatch: ['<rootDir>/src/api-main/api-main.e2e-spec.ts'], // Mantenido por ahora para asegurar que los tests corran
};
// apps/api-main-e2e/jest.config.ts
/* SECCIÓN DE MEJORAS
// No hay mejoras directas en este archivo en este momento, la adición de testMatch fue para diagnóstico y ahora se mantiene temporalmente.
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA

[
  Nota estratégica 1: Se ha añadido `testMatch` explícitamente para asegurar que los tests E2E se ejecuten. Investigar en el futuro si es posible eliminar esta línea y depender de los patrones de descubrimiento de tests por defecto de Jest, lo cual podría implicar revisar `jest.preset.js` o la forma en que Nx resuelve las rutas para los proyectos E2E con Jest. El objetivo sería entender por qué el archivo `.e2e-spec.ts` no era detectado automáticamente.
]

[
  Nota estratégica 2: Revisar el mensaje "NX Process exited with code 1, waiting for changes to restart..." que aparece después de que los tests E2E pasan. Aunque los tests son exitosos, este código de salida del proceso de `serve` podría indicar un cierre no del todo limpio. Podría estar relacionado con el `globalTeardown` o cómo Nx maneja la finalización del servidor que levanta para los tests E2E. No es bloqueante, pero es bueno para la estabilidad a largo plazo.
]

*/
