// RUTA: apps/pwa-supervisor/src/components/auth/AuthGuard.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

'use client';

import {
  useAuthIsLoading,
  useIsAuthenticated,
  useIsAuthInitialized, // Importar el nuevo selector
} from '@/store/auth.store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useIsAuthenticated();
  const isAuthInitialized = useIsAuthInitialized(); // Usar el nuevo estado
  const isAuthLoading = useAuthIsLoading(); // Usar el selector renombrado

  useEffect(() => {
    // Esperar a que la autenticación se haya inicializado Y no esté actualmente cargando (ej. login en progreso)
    if (!isAuthInitialized || isAuthLoading) {
      return; // No tomar decisiones de redirección aún
    }

    if (!isAuthenticated) {
      if (pathname !== '/login') {
        const redirectUrl =
          pathname === '/' || pathname === '/dashboard'
            ? '/dashboard'
            : pathname;
        router.replace(`/login?redirectUrl=${encodeURIComponent(redirectUrl)}`);
      }
    }
    // Si está autenticado y la inicialización está completa, no se hace nada, se renderiza children.
    // Si está autenticado y llega a /login, el LoginForm se encargará de redirigir a /dashboard.
  }, [isAuthenticated, isAuthInitialized, isAuthLoading, pathname, router]);

  // Mostrar un loader mientras la autenticación no se haya inicializado
  // o si una operación de autenticación está en curso.
  if (!isAuthInitialized || isAuthLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        {/* Podríamos diferenciar el mensaje si isAuthLoading es true vs !isAuthInitialized */}
        <p className="text-lg text-foreground animate-pulse">
          {isAuthLoading
            ? 'Procesando autenticación...'
            : 'Inicializando aplicación...'}
        </p>
        {/* Aquí podría ir un spinner: <Spinner size="lg" /> */}
      </div>
    );
  }

  // Si la inicialización está completa y no está cargando, y el usuario está autenticado,
  // o si está en /login (ya que la redirección allí la maneja el useEffect), renderizar children.
  // La lógica del useEffect ya maneja la redirección si no está autenticado.
  return <>{children}</>;
}

/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Loader visualmente más atractivo",
    "justificacion": "Reemplazar el texto simple con un componente Spinner/Loader de `ui-shared` o uno personalizado.",
    "impacto": "Mejora la UX durante la carga inicial."
  },
  {
    "mejora": "Redirección basada en roles post-login",
    "justificacion": "Si diferentes roles deben aterrizar en diferentes páginas después del login, esa lógica podría centralizarse o ser manejada por el `AuthGuard` o un componente similar después de que `isAuthenticated` sea verdadero.",
    "impacto": "Flexibilidad en el flujo post-autenticación."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "`AuthGuard` ahora depende de `isAuthInitialized` del `auth.store.ts` para asegurar que no redirige prematuramente."
  },
  {
    "nota": "Se simplificó el estado `isAuthCheckComplete` local, ya que `isAuthInitialized` y `isAuthLoading` del store ahora cubren esos escenarios."
  },
  {
    "nota": "Si el usuario está autenticado y navega a `/login`, el `LoginForm` (que también usa `useIsAuthenticated`) debería manejar la redirección a `/dashboard`."
  }
]
_*/
// RUTA: apps/pwa-supervisor/src/components/auth/AuthGuard.tsx
