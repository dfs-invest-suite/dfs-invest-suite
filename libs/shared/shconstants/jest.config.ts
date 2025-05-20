// RUTA: libs/shared/shconstants/jest.config.ts
export default {
  displayName: 'shconstants',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }], // Necesita tsconfig.spec.json aunque no haya tests
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/shared/shconstants',
  passWithNoTests: true, // Establecer si no tendrá tests
  // No necesita moduleNameMapper a otras libs del workspace
};
// RUTA: libs/shared/shconstants/jest.config.ts
