// RUTA: libs/ui-shared/tailwind.config.js
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
// No se necesita 'tailwindcss/defaultTheme' en Tailwind v4

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'], // Estrategia de modo oscuro basada en clase en <html>
  content: [
    // Escanea archivos dentro de esta librería ui-shared
    join(
      __dirname,
      'src/{components,lib,styles}/**/*!(*.stories|*.spec).{ts,tsx,html,css}'
    ),
    // Permite a Nx incluir paths de dependencias si es necesario
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    // El plugin container ahora es parte del core de Tailwind v4.
    // Si se necesita centrar y padding por defecto para container, se puede añadir aquí,
    // o aplicar `mx-auto px-4 sm:px-6 lg:px-8` donde se use la clase `container`.
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        // Usa la variable CSS --font-sans definida en globals.css
        // Los fallbacks estándar de Tailwind se aplicarán si la variable no está disponible.
        sans: [
          'var(--font-sans)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
      colors: {
        // Referencia a las variables CSS definidas en globals.css
        // Esto asegura que los componentes de Shadcn/UI usen nuestro tema.
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Colores específicos L.I.A Legacy (para uso directo con clases como bg-lia-magenta-neon)
        // Es mejor usar las variables CSS como arriba para los componentes Shadcn,
        // pero estos pueden ser útiles para elementos muy específicos.
        'lia-deep-purple-bg': 'hsl(var(--lia-deep-purple-bg-val))',
        'lia-magenta-neon': 'hsl(var(--lia-magenta-neon-val))',
        'lia-cyan-neon': 'hsl(var(--lia-cyan-neon-val))',
        'lia-light-text': 'hsl(var(--lia-light-text))', // Ya cubierto por --foreground en .dark
        'lia-muted-text': 'hsl(var(--lia-muted-text))', // Ya cubierto por --muted-foreground en .dark
        'lia-border': 'hsl(var(--lia-border))', // Ya cubierto por --border en .dark
        'lia-advert-bg': 'hsl(var(--lia-advert-bg-val))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
        'lia-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.7' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'lia-pulse': 'lia-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Considerar si se necesitan otros plugins como @tailwindcss/typography o @tailwindcss/forms
    // y cómo se integran con Tailwind v4 si es el caso.
  ],
};
// FIN DEL ARCHIVO: libs/ui-shared/tailwind.config.js
