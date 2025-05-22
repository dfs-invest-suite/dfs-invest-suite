// apps/pwa-supervisor/src/app/layout.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import React from 'react'; // Importación explícita de React

import { Inter as FontSans } from 'next/font/google';

import { cn } from '@dfs-suite/ui-shared'; // Asumiendo que cn viene de ui-shared

import { AppProviders } from '@/components/providers'; // Asumiendo que tus providers están aquí

import type { Metadata, Viewport } from 'next';

import './globals.css'; // Estilos globales de la app pwa-supervisor

// NOTA: Asegúrate que los estilos de ui-shared que definen las variables CSS del tema
// (ej. --background, --foreground, --primary) se importen en `apps/pwa-supervisor/src/app/globals.css`
// o directamente aquí si fuera necesario. Usualmente, la importación en globals.css es suficiente.
// Ejemplo: @import '@dfs-suite/ui-shared/styles'; // (Verifica la ruta correcta)

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans', // Esta variable debe ser usada en tailwind.config.js
});

export const metadata: Metadata = {
  title: {
    default: 'Portal Supervisor | DFS Invest Suite',
    template: '%s | DFS Invest Suite',
  },
  description:
    'Portal de supervisión y administración para tenants de DFS Invest Suite.',
  icons: {
    icon: '/favicon.ico', // Asegúrate que favicon.ico exista en apps/pwa-supervisor/public/
  },
  // Considerar añadir más metadatos relevantes (Open Graph, Twitter Cards, etc.)
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' }, // Ajustar al color de fondo light real
    { media: '(prefers-color-scheme: dark)', color: '#09090b' }, // Ajustar al color de fondo dark real
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  // userScalable: false, // Considera esto para una experiencia más de "app"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
// apps/pwa-supervisor/src/app/layout.tsx
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Implementación completa de RootLayout",
    "justificacion": "Se proporciona una estructura funcional para el RootLayout que incluye importaciones necesarias, configuración de fuentes, metadatos, viewport y la envoltura de `children` con `AppProviders`.",
    "impacto": "Debería resolver el error `The default export is not a React Component` y permitir que la aplicación se sirva correctamente."
  },
  {
    "mejora": "Uso de alias `@/` para providers",
    "justificacion": "Se asume que el alias `@/components/providers` está configurado en `apps/pwa-supervisor/tsconfig.json` y apunta a `src/components/providers/`. Si la estructura es diferente, esta ruta de importación debe ajustarse.",
    "impacto": "Importaciones más limpias y consistentes con la estructura de la app."
  },
  {
    "mejora": "Comentarios y notas aclaratorias",
    "justificacion": "Se añadieron comentarios para guiar sobre la importación de estilos de `ui-shared`, la existencia del favicon y la configuración de la fuente en Tailwind.",
    "impacto": "Facilita la configuración y comprensión."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Es crucial que la ruta de importación de `AppProviders` (`@/components/providers`) sea correcta. Verifica tu `apps/pwa-supervisor/tsconfig.json` para asegurar que el alias `@/components/*` apunte a `src/components/*`."
  },
  {
    "nota": "Asegúrate de que el archivo `favicon.ico` exista en `apps/pwa-supervisor/public/`."
  },
  {
    "nota": "Verifica que `apps/pwa-supervisor/src/app/globals.css` esté importando los estilos de `libs/ui-shared/src/styles/globals.css` (donde se definen las variables CSS del tema como `--background`, `--foreground`, etc.). Si no, la aplicación podría no tener los estilos base correctos."
  },
  {
    "nota": "Asegúrate de que tu `apps/pwa-supervisor/tailwind.config.js` utilice la variable `--font-sans` en su `theme.extend.fontFamily.sans` para que la fuente Inter se aplique."
  }
]
*/
