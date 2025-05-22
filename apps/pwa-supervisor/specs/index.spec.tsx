// RUTA: apps/pwa-supervisor/specs/index.spec.tsx
import * as Navigation from 'next/navigation'; // Importar todo el módulo

import { render } from '@testing-library/react';

import Page from '../src/app/page';

describe('Page (RootPage)', () => {
  let redirectSpy: jest.SpyInstance;

  beforeEach(() => {
    // Crear el spy ANTES de cada test y mockear su implementación
    redirectSpy = jest
      .spyOn(Navigation, 'redirect')
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    // Restaurar el spy después de cada test
    redirectSpy.mockRestore();
  });

  it('should call redirect with /dashboard', () => {
    render(<Page />);
    expect(redirectSpy).toHaveBeenCalledTimes(1);
    expect(redirectSpy).toHaveBeenCalledWith('/dashboard');
  });
});
// RUTA: apps/pwa-supervisor/specs/index.spec.tsx
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Uso de `jest.spyOn` para mockear `redirect`",
    "justificacion": "Este enfoque mockea la función `redirect` directamente en el módulo importado `next/navigation`. A veces es más efectivo que `jest.mock` a nivel de módulo para ciertos casos de transpilación o resolución de módulos en Jest. Se importa todo el módulo como `Navigation` y luego se espía su método `redirect`.",
    "impacto": "Podría resolver el `TypeError` al asegurar que la implementación de `redirect` sea reemplazada por el mock de Jest antes de que el componente `Page` la llame."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Si esto funciona, indica que `jest.mock` a nivel de módulo tenía problemas para interceptar correctamente la exportación de `redirect` en este entorno específico."
  }
]
*/
