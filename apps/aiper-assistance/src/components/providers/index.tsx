// RUTA: apps/aiper-assistance/src/components/providers/index.tsx
'use client';
import React, { useEffect, useState } from 'react'; // Importar useEffect y useState

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Importar directamente
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
// Si Aiper tiene su propio auth.store y acciones:
// import { useAuthActions } from '@/store/auth.store'; // Necesitará su propio auth.store

const aiperQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      // Otras opciones por defecto para Aiper
    },
  },
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  // const { initializeAuth } = useAuthActions(); // Si tiene su propio auth

  useEffect(
    () => {
      setIsMounted(true);
      // initializeAuth?.(); // Si tiene su propio auth
    },
    [
      /* initializeAuth */
    ]
  );

  if (!isMounted) {
    // Evita renderizar en servidor para componentes que dependen de window (como next-themes)
    // o hasta que la inicialización del cliente (ej. auth) esté completa.
    return null; // O un loader esqueleto muy simple
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={aiperQueryClient}>
        {children}
        <Toaster position="top-right" />
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
