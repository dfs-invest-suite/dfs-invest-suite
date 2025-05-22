// RUTA: libs/core/domain/codoanalyticscore/jest.config.ts
import path from 'node:path';
const monorepoRoot = path.resolve(__dirname, '../../../../');

export default {
  displayName: 'codoanalyticscore',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/core/domain/codoanalyticscore',
  moduleNameMapper: {
    '^@dfs-suite/shtypes$': path.join(
      monorepoRoot,
      'libs/shared/shtypes/src/index.ts'
    ),
    '^@dfs-suite/shutils$': path.join(
      monorepoRoot,
      'libs/shared/shutils/src/index.ts'
    ),
    '^@dfs-suite/sherrors$': path.join(
      monorepoRoot,
      'libs/shared/sherrors/src/index.ts'
    ),
    '^@dfs-suite/cdskvalueobjects$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskvalueobjects/src/index.ts'
    ),
  },
  passWithNoTests: true, // Temporalmente, hasta que se añadan tests para los VOs
};
// RUTA: libs/core/domain/codoanalyticscore/jest.config.ts
