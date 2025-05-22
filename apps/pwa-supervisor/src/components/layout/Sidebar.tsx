// RUTA: apps/pwa-supervisor/src/components/layout/Sidebar.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  BarChart3,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

import { Button, cn } from '@dfs-suite/ui-shared'; // Corregido

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  disabled?: boolean;
  exact?: boolean;
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
    exact: true,
  },
  { href: '/dashboard/leads', icon: Users, label: 'Leads' },
  { href: '/dashboard/whatsapp', icon: MessageSquare, label: 'WhatsApp' },
  { href: '/dashboard/consultants', icon: Users, label: 'Consultores' },
  { href: '/dashboard/aiper', icon: Sparkles, label: 'Aiper Asistente' },
  {
    href: '/dashboard/portal-content',
    icon: FileText,
    label: 'Contenido Portal',
  },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analíticas' },
  { href: '/dashboard/settings', icon: Settings, label: 'Configuración' },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <div className="flex h-16 flex-shrink-0 items-center border-b border-slate-200 px-4 dark:border-slate-700">
            <Link href="/dashboard" className="text-2xl font-bold">
              <span className="text-sky-600 dark:text-sky-400">PWA</span>
              <span className="text-slate-700 dark:text-slate-300">Sup</span>
            </Link>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2.5 text-sm font-medium',
                  isActive(item.href, item.exact)
                    ? 'bg-sky-100 text-sky-700 dark:bg-sky-700/30 dark:text-sky-300'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-50',
                  item.disabled && 'cursor-not-allowed opacity-50'
                )}
                aria-disabled={item.disabled}
                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive(item.href, item.exact)
                      ? 'text-sky-600 dark:text-sky-400'
                      : 'text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-300'
                  )}
                  aria-hidden="true"
                />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <div
        className={cn(
          'fixed inset-0 z-40 flex transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-slate-800">
          <div className="absolute right-0 top-0 -mr-12 pt-2">
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white text-slate-300 hover:bg-slate-700"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Cerrar sidebar</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>

          <div className="flex h-16 flex-shrink-0 items-center border-b border-slate-200 px-4 dark:border-slate-700">
            <Link href="/dashboard" className="text-2xl font-bold">
              <span className="text-sky-600 dark:text-sky-400">PWA</span>
              <span className="text-slate-700 dark:text-slate-300">Sup</span>
            </Link>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2.5 text-sm font-medium',
                  isActive(item.href, item.exact)
                    ? 'bg-sky-100 text-sky-700 dark:bg-sky-700/30 dark:text-sky-300'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-50',
                  item.disabled && 'cursor-not-allowed opacity-50'
                )}
                aria-disabled={item.disabled}
                onClick={(e) => {
                  if (item.disabled) {
                    e.preventDefault();
                  } else {
                    setIsOpen(false);
                  }
                }}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive(item.href, item.exact)
                      ? 'text-sky-600 dark:text-sky-400'
                      : 'text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-300'
                  )}
                  aria-hidden="true"
                />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
// RUTA: apps/pwa-supervisor/src/components/layout/Sidebar.tsx
