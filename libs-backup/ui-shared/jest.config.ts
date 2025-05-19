// RUTA: libs/ui-shared/jest.config.ts
export default {
  displayName: 'ui-shared',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',

  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/ui-shared',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],

  testMatch: [
    '<rootDir>/src/components/ui/**/*.spec.tsx',
    // Si tienes tests en lib/utils.spec.ts (por ejemplo):
    // '<rootDir>/src/lib/**/?(*.)+(spec|test).[tj]s?(x)',
  ],
};
// RUTA: libs/ui-shared/jest.config.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "`testMatch` explícito y correcto.",
    "justificacion": "Asegura que Jest busque los tests en `src/components/ui/` donde ahora residen.",
    "impacto": "Permite que los tests sean descubiertos y ejecutados."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: (Igual que antes, sobre moduleNameMapper para framer-motion si es necesario) */
