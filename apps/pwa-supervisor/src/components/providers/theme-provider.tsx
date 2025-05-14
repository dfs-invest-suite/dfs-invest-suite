// RUTA: apps/pwa-supervisor/src/components/providers/theme-provider.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes'; // Corregido
import { type ThemeProviderProps } from 'next-themes/dist/types'; // Corregido

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
// RUTA: apps/pwa-supervisor/src/components/providers/theme-provider.tsx
