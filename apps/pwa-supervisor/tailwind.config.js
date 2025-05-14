// apps/pwa-supervisor/tailwind.config.js
const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const { join } = require('path');
// const defaultTheme = require('tailwindcss/defaultTheme'); // No es necesario aquí si ui-shared define la fuente

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Consistente
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      // NO definas fontFamily.sans aquí si ui-shared ya lo hace
      // usando 'var(--font-inter)' y pwa-supervisor/layout.tsx aplica la variable.
      // Si pwa-supervisor necesitara una fuente diferente, la definirías aquí.
      // Para heredar, esta sección de fontFamily puede estar vacía.
    },
  },
  plugins: [require('tailwindcss-animate')],
};
