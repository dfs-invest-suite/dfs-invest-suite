// RUTA: apps/pwa-supervisor/src/app/(auth)/login/components/login-form.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

'use client';

import { Terminal } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'; // useSearchParams para redirectUrl
import React, { useEffect, useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  Label,
} from '@dfs-suite/ui-shared';

import { useLoginMutation, type AuthCredentials } from '@/hooks/api/useAuth';
import {
  useAuthActions, // Selector renombrado
  useAuthError,
  useAuthIsLoading,
  useIsAuthenticated,
} from '@/store/auth.store';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams(); // Para obtener redirectUrl
  const loginMutation = useLoginMutation();

  const isAuthenticated = useIsAuthenticated();
  const authIsLoading = useAuthIsLoading(); // Usar el selector directamente
  const authError = useAuthError(); // Usar el selector directamente
  const { setError: setAuthErrorInStore } = useAuthActions(); // Obtener la acción específica

  useEffect(() => {
    if (isAuthenticated) {
      const redirectUrl = searchParams.get('redirectUrl') || '/dashboard';
      router.push(redirectUrl);
    }
  }, [isAuthenticated, router, searchParams]);

  useEffect(() => {
    // Limpiar error del store si el componente se desmonta o si el error cambia externamente
    // y ya no es relevante para este formulario.
    return () => {
      if (authError) {
        // Si había un error en el store al desmontar
        setAuthErrorInStore(null); // Limpiarlo
      }
    };
  }, [authError, setAuthErrorInStore]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setAuthErrorInStore('Por favor, ingresa correo y contraseña.');
      return;
    }
    const credentials: AuthCredentials = { email, password };
    // La mutación ya maneja setLoading y setError en el store a través de sus callbacks
    loginMutation.mutate(credentials);
  };

  const isSubmitting = loginMutation.isPending || authIsLoading;
  const displayError = loginMutation.error?.message || authError;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-slate-800/50 p-8 rounded-lg shadow-xl backdrop-blur-sm"
    >
      {displayError && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error de Acceso</AlertTitle>
          <AlertDescription>{displayError}</AlertDescription>
        </Alert>
      )}
      <div>
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-slate-300"
        >
          Correo Electrónico
        </Label>
        <div className="mt-1">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              if (displayError) setAuthErrorInStore(null);
            }}
            className="text-slate-900 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500"
            placeholder="tu@email.com"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-slate-300"
        >
          Contraseña
        </Label>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
              if (displayError) setAuthErrorInStore(null);
            }}
            className="text-slate-900 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500"
            placeholder="••••••••"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          {/* <Link href="/forgot-password" className="font-medium text-sky-500 hover:text-sky-400">
            ¿Olvidaste tu contraseña?
          </Link> */}
          <span
            className="font-medium text-sky-500 hover:text-sky-400 cursor-pointer"
            onClick={() =>
              alert('Funcionalidad "Olvidé contraseña" pendiente.')
            }
          >
            ¿Olvidaste tu contraseña?
          </span>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 focus-visible:outline-sky-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting && <span className="animate-spin mr-2">⏳</span>}
          Iniciar Sesión
        </Button>
      </div>
    </form>
  );
}
/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Implementación de página y flujo de 'Olvidé mi contraseña'",
    "justificacion": "Proporcionar una funcionalidad esencial para la recuperación de cuentas.",
    "impacto": "Nuevas páginas, componentes, hooks de mutación y lógica en `api-main`."
  },
  {
    "mejora": "Validación de formulario con Zod y React Hook Form",
    "justificacion": "Para una validación más robusta y un mejor manejo del estado del formulario, en lugar de `useState` individuales.",
    "impacto": "Refactorización del manejo del formulario."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Se utiliza `useSearchParams` para obtener el `redirectUrl` y redirigir al usuario a la página que intentaba acceder antes del login."
  },
  {
    "nota": "Se utiliza el hook `useAuthActions` para obtener la acción `setError` del store, ahora llamada `setAuthErrorInStore` en el componente para evitar colisión de nombres."
  },
  {
    "nota": "El enlace 'Olvidé mi contraseña' es un placeholder funcional que muestra una alerta, idealmente debería ser un `Link` a una ruta."
  }
]
_*/
// RUTA: apps/pwa-supervisor/src/app/(auth)/login/components/login-form.tsx
