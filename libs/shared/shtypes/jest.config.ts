// RUTA: libs/shared/shtypes/jest.config.ts
export default {
  displayName: 'shtypes',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/shared/shtypes',
  passWithNoTests: true, // Esta librería solo contiene definiciones de tipo.
  // moduleNameMapper: {}, // No tiene dependencias internas del workspace
};
// RUTA: libs/shared/shtypes/jest.config.ts
