// RUTA: apps/pwa-supervisor/src/app/(dashboard)/layout.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import React from 'react';

import { AppLayoutClient } from '../../components/layout/AppLayoutClient'; // CAMBIO: Importar AppLayoutClient directamente aquí
// import { redirect } from 'next/navigation'; // No se usa por ahora a nivel de servidor aquí

// Simulación de datos del usuario y tenant para pasar a AppLayoutClient
// Estos datos vendrían del `auth.store.ts` en el cliente o de la sesión del servidor.
const mockUser = {
  name: 'Supervisor Actual',
  email: 'supervisor@example.com',
  role: 'TENANT_SUPERVISOR',
  tenantId: 'tenant-dfs-001',
};

const mockTenantBranding = {
  logoUrl: '/img/placeholder-logo.svg', // Placeholder
  primaryColor: '#16a34a', // Ejemplo verde
};

// CAMBIO: Eliminada la palabra clave 'async'
export default function DashboardLayout({
  // Eliminado async
  children,
}: {
  children: React.ReactNode;
}) {
  // LÓGICA DE AUTENTICACIÓN DEL LADO DEL SERVIDOR (Placeholder para Sprint 0.2)
  // const session = await getServerSession(authOptions); // Ejemplo con NextAuth
  // if (!session || !session.user) {
  //   redirect('/login'); // O la ruta de login de (auth)
  // }

  // NOTA: AppLayoutClient es un Client Component y manejará la lógica de autenticación
  // del lado del cliente usando el store de Zustand y AuthGuard.
  // Este DashboardLayout (Server Component) solo pasa props iniciales si fuera necesario
  // o maneja lógica de servidor que no dependa del estado del cliente.

  return (
    <AppLayoutClient
      user={mockUser} // Se reemplazará con datos reales del auth.store o sesión
      tenantBranding={mockTenantBranding} // Se reemplazará con datos reales
    >
      {children}
    </AppLayoutClient>
  );
}

/*_ SECCIÓN DE MEJORAS
[
  {
    "mejora": "Eliminación de `async` innecesario",
    "justificacion": "La función `DashboardLayout` no contenía operaciones `await`, por lo que marcarla como `async` era innecesario y causaba la advertencia de ESLint. Se ha removido la palabra clave `async`.",
    "impacto": "Resuelve la advertencia de ESLint. Ningún cambio funcional."
  },
  {
    "mejora": "Clarificación del rol de `DashboardLayout` vs `AppLayoutClient`",
    "justificacion": "Se añadió un comentario para clarificar que `AppLayoutClient` es el responsable de la lógica de UI y autenticación del lado del cliente, mientras que `DashboardLayout` (Server Component) es para estructura y, potencialmente, fetching de datos iniciales del servidor o protección de rutas a nivel de servidor (post-MVP).",
    "impacto": "Mejora la comprensión del código."
  }
]
*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "La importación de `AppLayoutClient` se movió aquí, ya que es donde se usa. Anteriormente estaba implícito que se importaría en el archivo `AppLayout.tsx` (que es `AppLayoutClient`)."
  },
  {
    "nota": "La verificación de sesión del lado del servidor sigue siendo una mejora futura importante."
  }
]
_*/
// RUTA: apps/pwa-supervisor/src/app/(dashboard)/layout.tsx
