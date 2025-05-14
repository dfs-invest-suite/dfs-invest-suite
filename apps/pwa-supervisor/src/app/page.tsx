// RUTA: apps/pwa-supervisor/src/app/page.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { redirect } from 'next/navigation';

// Esta página raíz ahora redirigirá al dashboard por defecto.
// El (dashboard)/layout.tsx, a través del AuthGuard, se encargará de
// verificar la autenticación y redirigir a /login si es necesario.
export default function RootPage() {
  // En el futuro, esta página podría tener una lógica más sofisticada
  // o ser una landing page si pwa-supervisor tuviera una parte pública.
  // Por ahora, la suposición es que cualquier acceso a la raíz de la app
  // debe intentar llevar al usuario al dashboard.
  redirect('/dashboard');

  // No es necesario retornar JSX explícitamente después de una llamada a redirect()
  // en un Server Component, ya que interrumpe el renderizado.
}

/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Redirección Condicional Basada en Sesión del Servidor",
    "justificacion": "Para una UX óptima sin parpadeos, se podría verificar la sesión de autenticación aquí mismo en el servidor (Server Component). Si está autenticado, `redirect('/dashboard')`. Si no, `redirect('/login')`. Esto evitaría que el usuario llegue a `/dashboard` solo para ser redirigido por `AuthGuard` en el cliente.",
    "impacto": "Requiere una forma de acceder al estado de sesión en Server Components (ej. NextAuth.js getServerSession, o una cookie validada)."
  },
  {
    "mejora": "Página de Carga o Splash Screen",
    "justificacion": "Si la verificación de sesión del servidor o la carga inicial de la app toma tiempo, esta página podría mostrar un loader o splash screen en lugar de una redirección inmediata.",
    "impacto": "Mejora la percepción de carga de la aplicación."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Esta implementación simplifica el flujo de entrada asumiendo que el `AuthGuard` dentro del layout del dashboard manejará la redirección a login si el usuario no está autenticado."
  },
  {
    "nota": "El contenido anterior de esta página (que era el dashboard) ahora reside exclusivamente en `apps/pwa-supervisor/src/app/(dashboard)/page.tsx`."
  }
]
_*/
// RUTA: apps/pwa-supervisor/src/app/page.tsx
