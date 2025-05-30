// RUTA: apps/pwa-supervisor/jest.config.ts
export default {
  displayName: 'pwa-supervisor',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/pwa-supervisor',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'], // <--- AÑADIR ESTO
};
// RUTA: apps/pwa-supervisor/jest.config.ts
