// apps/pwa-supervisor/tailwind.config.js
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../libs/ui-shared/tailwind.config.js')],
  darkMode: 'class',
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    join(
      __dirname,
      '../../libs/ui-shared/src/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      // Extensiones específicas para pwa-supervisor pueden ir aquí
    },
  },
  plugins: [require('tailwindcss-animate')],
};
// apps/pwa-supervisor/tailwind.config.js
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Uso de `presets` de Tailwind CSS para heredar de `ui-shared`.",
    "justificacion": "Asegura que `pwa-supervisor` herede toda la configuración de `theme` y `plugins` de `ui-shared`, haciendo disponibles las variables CSS y definiciones de tema.",
    "impacto": "Debería resolver clases desconocidas si están definidas en `ui-shared`."
  },
  {
    "mejora": "Inclusión explícita de `ui-shared` en `content`.",
    "justificacion": "Garantiza que Tailwind escanee los archivos de `ui-shared` en busca de clases utilizadas.",
    "impacto": "Mejora la detección de clases de `ui-shared` para la purga de CSS."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "El archivo `libs/ui-shared/tailwind.config.js` debe existir y estar correctamente configurado."
  },
  {
    "nota": "El archivo `libs/ui-shared/src/styles/globals.css` (que define las variables CSS como `--background`, `--border`) debe ser importado correctamente en `apps/pwa-supervisor/src/app/globals.css`."
  }
]
*/
