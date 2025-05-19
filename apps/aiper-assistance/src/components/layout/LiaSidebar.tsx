// RUTA: apps/aiper-assistance/src/components/layout/LiaSidebar.tsx
'use client';
import { Button, cn } from '@dfs-suite/ui-shared';
import {
  Bot,
  History,
  MessageSquareText,
  Settings,
  UploadCloud,
  X,
} from 'lucide-react'; // Ajustar iconos
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const aiperNavigation = [
  { name: 'Nuevo Chat', href: '/chat', icon: MessageSquareText, exact: true },
  { name: 'Historial', href: '/history', icon: History },
  { name: 'Knowledge Base', href: '/knowledge', icon: UploadCloud }, // Para RAG
  { name: 'Identidades Aiper', href: '/identities', icon: Bot },
  { name: 'Configuración Aiper', href: '/settings/aiper', icon: Settings },
];

interface LiaSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function LiaSidebar({ isOpen, setIsOpen }: LiaSidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Sidebar Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col fixed md:sticky inset-y-0 z-50">
        {' '}
        {/* Fixed para móvil si se usa */}
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-lia-border bg-lia-deep-purple-bg pt-5 shadow-lg">
          {' '}
          {/* Color L.I.A */}
          <div className="flex flex-shrink-0 items-center px-4 mb-6">
            {/* <img className="h-10 w-auto filter brightness-0 invert" src="/img/logo-lia-light.svg" alt="Aiper Suite" /> */}
            <Bot size={40} className="text-lia-magenta-neon mr-2" />
            <span className="text-2xl font-bold text-lia-light-text">
              Aiper<span className="text-lia-cyan-neon">Assist</span>
            </span>
          </div>
          <nav className="mt-5 flex-1 space-y-1.5 px-3">
            {aiperNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (isOpen) setIsOpen(false);
                }}
                className={cn(
                  isActive(item.href, item.exact)
                    ? 'bg-lia-magenta-neon/20 text-lia-magenta-neon border-lia-magenta-neon shadow-inner'
                    : 'text-lia-muted-text hover:bg-lia-magenta-neon/10 hover:text-lia-light-text border-transparent',
                  'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md border-l-4 transition-all duration-150 ease-in-out'
                )}
              >
                <item.icon
                  className={cn(
                    isActive(item.href, item.exact)
                      ? 'text-lia-magenta-neon'
                      : 'text-lia-muted-text group-hover:text-lia-cyan-neon',
                    'mr-3 h-5 w-5 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Sidebar Móvil (Overlay) */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex md:hidden transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-lia-deep-purple-bg pt-5 pb-4">
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-lia-light-text hover:bg-lia-magenta-neon/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Cerrar sidebar</span>
            </Button>
          </div>
          <div className="flex flex-shrink-0 items-center px-4 mb-5">
            <Bot size={32} className="text-lia-magenta-neon mr-2" />
            <span className="text-xl font-bold text-lia-light-text">
              Aiper<span className="text-lia-cyan-neon">Assist</span>
            </span>
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-3">
            {aiperNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  isActive(item.href, item.exact)
                    ? 'bg-lia-magenta-neon/20 text-lia-magenta-neon border-lia-magenta-neon'
                    : 'text-lia-muted-text hover:bg-lia-magenta-neon/10 hover:text-lia-light-text border-transparent',
                  'group flex items-center px-3 py-3 text-base font-medium rounded-md border-l-4'
                )}
              >
                <item.icon
                  className={cn(
                    isActive(item.href, item.exact)
                      ? 'text-lia-magenta-neon'
                      : 'text-lia-muted-text group-hover:text-lia-cyan-neon',
                    'mr-4 h-5 w-5 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div
          className="w-14 flex-shrink-0"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />{' '}
        {/* Para cerrar al hacer clic fuera */}
      </div>
    </>
  );
}
