// RUTA: apps/pwa-supervisor/src/test-setup.ts
import '@testing-library/jest-dom'; // Mantener esto

// Mock global para next/navigation
const mockRedirectActualFnGlobal = jest.fn();
jest.mock('next/navigation', () => {
  const originalModule = jest.requireActual('next/navigation');
  return {
    __esModule: true,
    ...originalModule,
    redirect: mockRedirectActualFnGlobal,
    usePathname: jest.fn(() => '/mocked-path-global'),
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    })),
    useSearchParams: jest.fn(() => new URLSearchParams()),
  };
});

// Para acceder al mock en los tests, podrías necesitar exportarlo desde aquí o re-importarlo
// en cada test (lo cual es más complicado con mocks globales en setup).
// Una forma sería adjuntarlo a `global` si es absolutamente necesario, pero no es ideal.
// Por ahora, el test en index.spec.tsx tendría que redefinir su acceso al mock o
// podríamos intentar no verificar la llamada sino el efecto (si el componente no crashea).

// global.mockedNextNavigationRedirect = mockRedirectActualFnGlobal; // No muy limpio
