export default {
  displayName: 'infraobservability',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/infrastructure/infraobservability',
  // Si esta lib depende de otras (ej. @dfs-suite/shared-types), necesitará moduleNameMapper
  moduleNameMapper: {
    '^@dfs-suite/shared-types$':
      '<rootDir>/../../../shared/shtypes/src/index.ts',
    '^@dfs-suite/core-domain-shared-kernel-ports$':
      '<rootDir>/../../../core/domain/shared-kernel/cdskports/src/index.ts',
    // Añadir más mapeos según sea necesario
  },
};
