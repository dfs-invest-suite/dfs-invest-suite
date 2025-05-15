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
  useAuthActions,
  useAuthError,
  useAuthIsLoading,
  useIsAuthenticated,
} from '@/store/auth.store';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const loginMutation = useLoginMutation();

  const isAuthenticated = useIsAuthenticated();
  const authIsLoading = useAuthIsLoading();
  const authError = useAuthError();
  const { setError: setAuthErrorInStore } = useAuthActions();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectUrl = searchParams.get('redirectUrl') || '/dashboard';
      router.push(redirectUrl);
    }
  }, [isAuthenticated, router, searchParams]);

  useEffect(() => {
    return () => {
      if (authError) {
        setAuthErrorInStore(null);
      }
    };
  }, [authError, setAuthErrorInStore]);

  // MODIFICACIÓN: Eliminada la palabra clave 'async'
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setAuthErrorInStore('Por favor, ingresa correo y contraseña.');
      return;
    }
    const credentials: AuthCredentials = { email, password };
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
// RUTA: apps/pwa-supervisor/src/app/(auth)/login/components/login-form.tsx
/*_ SECCIÓN DE MEJORAS
[
  {
    "mejora": "Eliminación de `async` innecesario",
    "justificacion": "La función `handleSubmit` no utiliza `await`, por lo que la palabra clave `async` no es necesaria y causaba un warning de ESLint (`@typescript-eslint/require-await`). La función `mutate` de TanStack Query es síncrona en su invocación y maneja la asincronía internamente.",
    "impacto": "Resuelve la advertencia de linting. Ningún cambio funcional."
  }
]
*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Si en el futuro `handleSubmit` necesitara esperar alguna operación antes o después de llamar a `mutate` (ej. `await algunaOtraCosa()`), entonces `async` sería apropiado."
  }
]
*/
