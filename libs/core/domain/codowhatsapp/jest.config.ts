// RUTA: libs/core/domain/codowhatsapp/jest.config.ts
import path from 'node:path';
const monorepoRoot = path.resolve(__dirname, '../../../../');

export default {
  displayName: 'codowhatsapp',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/core/domain/codowhatsapp',
  moduleNameMapper: {
    '^@dfs-suite/shtypes$': path.join(
      monorepoRoot,
      'libs/shared/shtypes/src/index.ts'
    ),
    '^@dfs-suite/sherrors$': path.join(
      monorepoRoot,
      'libs/shared/sherrors/src/index.ts'
    ),
    '^@dfs-suite/shresult$': path.join(
      monorepoRoot,
      'libs/shared/shresult/src/index.ts'
    ),
    '^@dfs-suite/cdskevents$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskevents/src/index.ts'
    ),
  },
  passWithNoTests: true, // Temporal
};
// RUTA: libs/core/domain/codowhatsapp/jest.config.ts
