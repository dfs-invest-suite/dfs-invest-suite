// RUTA: apps/pwa-supervisor/src/components/providers/index.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { queryClient } from '../../lib/config/queryClient';
import { useAuthActions } from '../../store/auth.store'; // Importar el hook de acciones

export function Providers({ children }: { children: React.ReactNode }) {
  const [isDev, setIsDev] = React.useState(false);
  const { initializeAuth } = useAuthActions(); // Obtener la acción

  useEffect(() => {
    setIsDev(process.env.NODE_ENV === 'development');
    // Llamar a initializeAuth solo una vez cuando el provider se monta
    initializeAuth();
  }, [initializeAuth]); // initializeAuth es estable y no causará re-ejecuciones innecesarias

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
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

/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Componente AuthInitializer dedicado",
    "justificacion": "Para una separación de concerns más clara, la lógica de `initializeAuth` podría moverse a un componente hijo de `Providers` que solo se renderice una vez y no tenga otra UI, solo el `useEffect`.",
    "impacto": "Pequeña refactorización para mayor claridad."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "La llamada a `initializeAuth()` ahora se realiza aquí. Esto asegura que el store de autenticación intente inicializarse lo antes posible en el ciclo de vida de la aplicación."
  }
]
_*/
// RUTA: apps/pwa-supervisor/src/components/providers/index.tsx
