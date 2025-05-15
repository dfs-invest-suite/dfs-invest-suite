// apps/pwa-supervisor/tailwind.config.js
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const { join, resolve } = require('path'); // Importar resolve

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require(resolve(__dirname, '../../libs/ui-shared/tailwind.config.js')), // Usar resolve para asegurar path absoluto al preset
  ],
  darkMode: 'class',
  content: [
    join(
      __dirname, // Directorio actual (apps/pwa-supervisor)
      'src/{app,pages,components,layouts}/**/*!(*.stories|*.spec).{ts,tsx,html,css}' // Patrones más comunes y explícitos
    ),
    // Path explícito y absoluto a ui-shared
    resolve(
      __dirname,
      '../../libs/ui-shared/src/**/*!(*.stories|*.spec).{ts,tsx,html,css}'
    ),
    ...createGlobPatternsForDependencies(__dirname), // Mantener por si acaso, pero el explícito es más fuerte
  ],
  theme: {
    extend: {
      // Extensiones específicas para pwa-supervisor pueden ir aquí
      // si necesitas sobrescribir o añadir algo al tema de ui-shared.
    },
  },
  plugins: [require('tailwindcss-animate')],
};
