// RUTA: apps/aiper-assistance/tailwind.config.js
const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const { join, resolve } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class', // Heredado del preset de ui-shared si está allí
  // Si ui-shared no define darkMode, lo activamos aquí.
  // Si ui-shared SÍ lo define, esta línea es redundante o puede causar conflictos.
  // Por convención, la raíz del tema (ui-shared) debería definir darkMode.
  // Si ui-shared no lo tiene, descomenta la siguiente línea:
  darkMode: 'class',

  presets: [
    // Hereda toda la configuración base de Tailwind de ui-shared
    // incluyendo su theme, plugins (como tailwindcss-animate), y darkMode si está definido allí.
    require(resolve(__dirname, '../../libs/ui-shared/tailwind.config.js')),
  ],
  content: [
    // Paths específicos para escanear clases en la app aiper-assistance
    join(
      __dirname,
      'src/{app,components,hooks,lib,store,layouts,pages}/**/*!(*.stories|*.spec).{ts,tsx,html,css,mdx}'
    ),
    // Path para escanear clases en ui-shared (si ui-shared tiene su propio `content`
    // y se usa como preset, a veces esto no es estrictamente necesario, pero es más seguro incluirlo).
    resolve(
      __dirname,
      '../../libs/ui-shared/src/{components,lib,styles}/**/*!(*.stories|*.spec).{ts,tsx,html,css,mdx}'
    ),
    // Permite a Nx añadir automáticamente paths de dependencias
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      // Aquí es donde Aiper Assistance puede AÑADIR o SOBREESCRIBIR
      // colores, fuentes, espaciados, etc., del tema base de ui-shared.
      // Por ejemplo, si Aiper necesita un color de acento específico que no está en la paleta L.I.A general:
      colors: {
        // 'aiper-accent': 'hsl(var(--aiper-accent-color))', // Define --aiper-accent-color en globals.css
        // 'aiper-chat-bg': 'hsl(var(--lia-deep-purple) / 0.8)', // Usar un color base con transparencia
        // 'aiper-user-bubble': 'hsl(var(--primary))',
        // 'aiper-lia-bubble': 'hsl(var(--card))',
      },
      // Ejemplo de fuentes si Aiper usa una diferente al sans por defecto:
      // fontFamily: {
      //   mono: ['var(--font-mono-aiper)', 'monospace'],
      // },
      // Ejemplo de animaciones o keyframes específicos para la UI de chat:
      // keyframes: {
      //   'lia-pulse': {
      //     '0%, 100%': { opacity: '1' },
      //     '50%': { opacity: '.7' },
      //   },
      // },
      // animation: {
      //   'lia-pulse': 'lia-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      // },
    },
  },
  plugins: [
    // Si ui-shared ya incluye tailwindcss-animate, no es necesario repetirlo aquí
    // a menos que quieras una configuración diferente del plugin para esta app.
    // Si no, puedes añadir otros plugins de Tailwind específicos para aiper-assistance.
    // require('tailwindcss-animate'), // Comentado asumiendo que está en el preset de ui-shared
  ],
};
