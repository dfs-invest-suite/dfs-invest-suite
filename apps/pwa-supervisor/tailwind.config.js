// apps/pwa-supervisor/tailwind.config.js
const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const { join, resolve } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    // Ruta absoluta al preset de ui-shared para asegurar la correcta carga
    require(resolve(__dirname, '../../libs/ui-shared/tailwind.config.js')),
  ],
  darkMode: 'class', // O 'media' si prefieres basado en OS
  content: [
    // Paths explícitos y más amplios para el contenido de pwa-supervisor
    join(
      __dirname,
      'src/{app,components,hooks,lib,store,layouts,pages}/**/*!(*.stories|*.spec).{ts,tsx,html,css,mdx}'
    ),
    // Path explícito y absoluto a los componentes y utilidades de ui-shared
    // Es crucial incluir el directorio 'lib' si 'cn' u otras utilidades de ui-shared se usan en clases
    resolve(
      __dirname,
      '../../libs/ui-shared/src/{components,lib}/**/*!(*.stories|*.spec).{ts,tsx,html,css,mdx}'
    ),
    // createGlobPatternsForDependencies es un fallback útil, pero los paths explícitos son más robustos
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      // Aquí puedes añadir extensiones o sobreescrituras específicas para pwa-supervisor
      // que se aplicarán SOBRE el tema heredado de ui-shared.
      // Ejemplo:
      // colors: {
      //   'supervisor-accent': 'hsl(var(--supervisor-accent-custom))',
      // },
      // fontFamily: {
      //   display: ['var(--font-specific-for-supervisor)', 'sans-serif'],
      // },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Otros plugins específicos de pwa-supervisor podrían ir aquí
  ],
};
