// apps/pwa-supervisor/tailwind.config.js
const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../libs/ui-shared/tailwind.config.js')], // <--- AÑADIR ESTA LÍNEA
  darkMode: 'class', // o lo que esté en ui-shared si se quiere consistencia
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    // Asegurar que los componentes de ui-shared sean escaneados
    join(
      __dirname,
      '../../libs/ui-shared/src/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ), // <--- AÑADIR ESTA LÍNEA EXPLÍCITAMENTE
    ...createGlobPatternsForDependencies(__dirname), // Esto debería ayudar, pero ser explícito no daña
  ],
  theme: {
    extend: {
      // Aquí puedes añadir o SOBREESCRIBIR variables/configuraciones de ui-shared si es necesario
      // para pwa-supervisor específicamente.
      // Por ejemplo, si quisieras un --font-sans diferente para pwa-supervisor:
      // fontFamily: {
      //   sans: ['var(--font-supervisor-specific)', ...defaultTheme.fontFamily.sans],
      // },
      // O si quisieras un color primario diferente:
      // colors: {
      //   primary: {
      //     DEFAULT: 'hsl(var(--tenant-primary-color, var(--primary)))', // Fallback a la primaria de ui-shared
      //     foreground: 'hsl(var(--tenant-primary-foreground, var(--primary-foreground)))',
      //   }
      // }
    },
  },
  plugins: [
    require('tailwindcss-animate'), // Asegúrate que también esté en ui-shared si usa animaciones
  ],
};
