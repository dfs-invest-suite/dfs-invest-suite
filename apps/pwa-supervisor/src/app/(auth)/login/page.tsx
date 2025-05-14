// apps/pwa-supervisor/src/app/(auth)/login/page.tsx
import LoginForm from './components/login-form';
// Podrías importar un componente de Layout específico para páginas de autenticación si es necesario
// import AuthLayout from '@/components/layouts/auth-layout'; // Suponiendo que lo creas en ui-shared

export default function LoginPage() {
  return (
    // <AuthLayout> // Envolvería el contenido para un layout de auth consistente
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          {/* Placeholder para el Logo */}
          <div className="mx-auto h-16 w-auto text-center text-6xl mb-6">
            <span className="text-sky-400">DFS</span>
            <span className="text-slate-300">Invest</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-100">
            Bienvenido, Supervisor
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Accede a tu panel de control del tenant.
          </p>
        </div>
        <LoginForm />
        <p className="mt-10 text-center text-sm text-slate-500">
          ¿No tienes acceso? Contacta al administrador de tu plataforma.
        </p>
      </div>
    </div>
    // </AuthLayout>
  );
}
