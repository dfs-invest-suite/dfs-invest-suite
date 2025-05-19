// RUTA: libs/ui-shared/src/test-setup.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Mockeo global de APIs del navegador",
    "justificacion": "Si los componentes utilizan APIs del navegador como `localStorage`, `fetch`, `matchMedia` de forma extensiva, se podrían configurar mocks globales aquí para todos los tests de `ui-shared`.",
    "impacto": "Mantiene los tests de componentes más aislados y predecibles."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Por ahora, solo se importa `@testing-library/jest-dom`. Se pueden añadir otras configuraciones globales de test aquí si son necesarias."
  },
  {
    "nota": "Asegúrate de haber instalado `@testing-library/jest-dom` como dependencia de desarrollo en el `package.json` raíz: `pnpm add -D @testing-library/jest-dom`."
  }
]
_*/
// RUTA: libs/ui-shared/src/test-setup.ts
