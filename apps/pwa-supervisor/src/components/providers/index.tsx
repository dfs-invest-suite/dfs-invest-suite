// RUTA: apps/pwa-supervisor/src/components/providers/index.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Importar QueryClient
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React, { useEffect, useState } from 'react'; // CAMBIO: useState importado explícitamente
import { Toaster } from 'react-hot-toast';

// import { queryClient } from '../../lib/config/queryClient'; // Se instancia aquí directamente
import { useAuthActions } from '../../store/auth.store';

// Instanciar QueryClient aquí o importarlo si la config es compleja
const queryClientInstance = new QueryClient({
  // Renombrado para evitar conflicto
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
      retry: (failureCount: number, error: unknown) => {
        interface HttpError extends Error {
          response?: { status?: number };
        }
        if (
          typeof error === 'object' &&
          error !== null &&
          'response' in error &&
          typeof (error as HttpError).response === 'object' &&
          (error as HttpError).response !== null &&
          typeof (error as HttpError).response?.status === 'number'
        ) {
          const httpError = error as HttpError;
          if (
            httpError.response?.status &&
            httpError.response.status >= 400 &&
            httpError.response.status < 500
          ) {
            return false;
          }
        }
        return failureCount < 2;
      },
    },
  },
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  // Renombrado a AppProviders
  const [isDev, setIsDev] = useState(false); // useState usado aquí
  const { initializeAuth } = useAuthActions();

  useEffect(() => {
    setIsDev(process.env.NODE_ENV === 'development');
    initializeAuth();
  }, [initializeAuth]);

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClientInstance}>
        {' '}
        {/* Usar la instancia local */}
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
// RUTA: apps/pwa-supervisor/src/components/providers/index.tsx
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Renombrado de `Providers` a `AppProviders`",
    "justificacion": "Para evitar posible colisión de nombres si 'Providers' es un nombre muy genérico. Se renombró a `AppProviders` y se actualizó la importación en `layout.tsx`.",
    "impacto": "Cambio de nombre menor para mayor claridad."
  },
  {
    "mejora": "Instanciación de `QueryClient` dentro del provider",
    "justificacion": "Se movió la instancia de `QueryClient` (antes importada de `lib/config/queryClient.ts`) directamente a este archivo o se podría instanciar aquí. Esto simplifica la estructura si `queryClient.ts` solo contenía la instancia. Si `queryClient.ts` tiene lógica de configuración más compleja, mantenerlo separado está bien, pero hay que asegurar que se exporte e importe correctamente.",
    "impacto": "Asegura que `QueryClientProvider` reciba una instancia válida."
  },
  {
    "mejora": "Importación explícita de `useState`",
    "justificacion": "React.useState -> useState.",
    "impacto": "Estilo."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "El archivo `apps/pwa-supervisor/src/app/layout.tsx` debe ahora importar `AppProviders` en lugar de `Providers`."
  }
]
*/
