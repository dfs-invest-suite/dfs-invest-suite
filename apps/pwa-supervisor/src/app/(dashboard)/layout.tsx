// RUTA: apps/pwa-supervisor/src/app/(dashboard)/layout.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import React from 'react';
import { AppLayoutClient } from '../../components/layout/AppLayoutClient';
// En un futuro, aquí se importaría la lógica para verificar la sesión del servidor
// import { getServerSession } from 'next-auth'; // Ejemplo si se usa NextAuth
// import { authOptions } from '../api/auth/[...nextauth]/route'; // Ejemplo
// import { redirect } from 'next/navigation';

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

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // LÓGICA DE AUTENTICACIÓN DEL LADO DEL SERVIDOR (Placeholder para Sprint 0.2)
  // const session = await getServerSession(authOptions); // Ejemplo con NextAuth
  // if (!session || !session.user) {
  //   redirect('/login'); // O la ruta de login de (auth)
  // }
  // Por ahora, asumimos que el usuario está autenticado para el layout.
  // La protección de rutas real se implementará con el `auth.store.ts` en AppLayoutClient
  // y/o con middleware de Next.js.

  // En un escenario real, aquí se podrían obtener datos iniciales del servidor
  // para el tenant (ej. configuraciones de branding) si son necesarios antes del renderizado del cliente.
  // Por ahora, pasaremos datos mockeados a AppLayoutClient.

  return (
    <AppLayoutClient
      user={mockUser} // Se reemplazará con datos reales del auth.store
      tenantBranding={mockTenantBranding} // Se reemplazará con datos reales
    >
      {children}
    </AppLayoutClient>
  );
}

/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Verificación de Sesión del Lado del Servidor",
    "justificacion": "Implementar una verificación de sesión real aquí (ej. usando NextAuth.js o una cookie de sesión validada) para proteger las rutas del dashboard a nivel de servidor antes de que se envíe cualquier HTML/JS al cliente.",
    "impacto": "Seguridad mejorada. Evita el parpadeo de la UI si la redirección se hace solo en el cliente."
  },
  {
    "mejora": "Carga de Datos Iniciales del Tenant",
    "justificacion": "Si hay datos globales del tenant (como configuraciones de branding o permisos) que se necesitan en todas las páginas del dashboard y pueden ser cargados por el servidor, se podrían obtener aquí y pasarlos a `AppLayoutClient` o a un contexto.",
    "impacto": "Reduce la carga inicial en el cliente y puede mejorar el LCP."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "`AppLayoutClient` aún no existe, se creará en la Tarea 0.1.6."
  },
  {
    "nota": "La redirección a `/login` si no está autenticado se manejará inicialmente en `AppLayoutClient` usando el estado de `auth.store.ts`. La protección a nivel de servidor es una mejora."
  },
  {
    "nota": "Los datos `mockUser` y `mockTenantBranding` son temporales y se reemplazarán por datos dinámicos obtenidos del estado global (Zustand) y/o API."
  }
]
_*/
// RUTA: apps/pwa-supervisor/src/app/(dashboard)/layout.tsx
