// RUTA: apps/pwa-supervisor/src/components/layout/MobileNav.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

'use client';

import { cn } from '@dfs-suite/ui-shared'; // Corregido
import { LayoutDashboard, MessageSquare, Settings, Users } from 'lucide-react'; // Settings ya estaba importado
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface MobileNavItem {
  href: string;
  icon: React.ElementType;
  label: string;
}

const mobileNavItems: MobileNavItem[] = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/leads', icon: Users, label: 'Leads' },
  { href: '/dashboard/whatsapp', icon: MessageSquare, label: 'WhatsApp' },
  { href: '/dashboard/settings', icon: Settings, label: 'Ajustes' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 md:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {mobileNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center space-y-1 rounded-md p-2 text-xs font-medium',
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'text-sky-600 dark:text-sky-400'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            )}
          >
            <item.icon className="h-5 w-5" aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
// RUTA: apps/pwa-supervisor/src/components/layout/MobileNav.tsx
