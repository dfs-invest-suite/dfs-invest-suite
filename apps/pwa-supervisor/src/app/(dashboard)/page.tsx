// RUTA: apps/pwa-supervisor/src/app/(dashboard)/page.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

'use client';

import {
  Activity,
  BarChart3,
  DownloadCloud,
  MessageSquare,
  Settings,
  TrendingUp,
  Users,
  Zap,
  type LucideProps, // Importar LucideProps para tipar Icon
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from '@dfs-suite/ui-shared';

// --- Tipos para los Sub-componentes del Dashboard ---
interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<LucideProps>; // Usar ComponentType para iconos Lucide
  trend?: string;
  description?: string;
  unit?: string;
  className?: string;
}

interface ActivityFeedItemProps {
  icon: React.ComponentType<LucideProps>;
  text: string;
  time: string;
  highlight?: boolean;
}

interface QuickActionButtonProps {
  label: string;
  icon: React.ComponentType<LucideProps>;
  href?: string;
  className?: string;
  action?: () => void;
}

// --- Sub-componentes del Dashboard ---

const WelcomeHeader = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      );
      const hours = now.getHours();
      if (hours < 12) setGreeting('Buenos días');
      else if (hours < 18) setGreeting('Buenas tardes');
      else setGreeting('Buenas noches');
    };
    updateDateTime();
    const timerId = setInterval(updateDateTime, 60000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-xl transition-all hover:shadow-2xl transform hover:-translate-y-1">
      <h1 className="text-4xl font-bold">{greeting}, Supervisor!</h1>
      <p className="text-lg opacity-90">
        Hoy es{' '}
        {new Date().toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}{' '}
        - {currentTime}
      </p>
      <p className="mt-2 text-sm opacity-80">
        Aquí tienes un resumen de la actividad de tu tenant.
      </p>
    </div>
  );
};

const KpiCard: React.FC<KpiCardProps> = ({
  // Tipado explícito con React.FC
  title,
  value,
  icon: Icon,
  trend,
  description,
  unit,
  className,
}) => (
  <Card
    className={cn(
      'shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105',
      className
    )}
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-5 w-5 text-sky-500" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-foreground">
        {value}
        {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
      </div>
      {trend && (
        <p
          className={cn(
            'text-xs',
            trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
          )}
        >
          {trend}
        </p>
      )}
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </CardContent>
  </Card>
);

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({
  // Tipado explícito
  icon: Icon,
  text,
  time,
  highlight,
}) => (
  <li
    className={cn(
      'flex items-start space-x-3 py-3 px-1 hover:bg-accent/50 dark:hover:bg-accent/20 rounded-md transition-colors',
      highlight && 'bg-primary/10 dark:bg-primary/20'
    )}
  >
    <div
      className={cn(
        'p-1.5 rounded-full mt-0.5',
        highlight
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground'
      )}
    >
      <Icon className="h-4 w-4" />
    </div>
    <div>
      <p className="text-sm text-foreground">{text}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  </li>
);

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  // Tipado explícito
  label,
  icon: Icon,
  href,
  className,
  action,
}) => {
  const buttonContent = (
    <>
      <Icon className="mr-3 h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
      <span className="text-foreground group-hover:text-primary/90">
        {label}
      </span>
    </>
  );

  const commonButtonClasses = cn(
    'w-full justify-start text-left h-auto p-4 group transform transition-all hover:scale-105 hover:shadow-md',
    'hover:bg-accent/50 dark:hover:bg-accent/20 hover:border-primary/50',
    className
  );

  if (href) {
    return (
      <Button asChild variant="outline" className={commonButtonClasses}>
        <Link href={href}>{buttonContent}</Link>
      </Button>
    );
  }

  return (
    <Button variant="outline" className={commonButtonClasses} onClick={action}>
      {buttonContent}
    </Button>
  );
};

// --- Componente Principal de la Página del Dashboard ---
export default function DashboardPage() {
  // Datos mock para los KPIs - Ahora usan los tipos definidos
  const kpis: KpiCardProps[] = [
    // Tipado explícito del array
    {
      title: 'Leads Nuevos Hoy',
      value: 12,
      icon: Users,
      trend: '+2 vs ayer',
      description: 'Asignados automáticamente',
    },
    {
      title: 'Mensajes WA Recibidos',
      value: 87,
      icon: MessageSquare,
      trend: '+15%',
      description: 'Últimas 24h',
    },
    {
      title: 'Tareas Pendientes',
      value: 5,
      icon: Activity,
      trend: '2 Vencen Hoy',
      description: 'Para todos los consultores',
    },
    {
      title: 'Salud Cuenta WA Principal',
      value: 'Buena', // Podría ser un enum o tipo más específico
      icon: Zap,
      trend: '98%',
      description: 'Rating: VERDE',
    },
  ];

  const activityFeed: ActivityFeedItemProps[] = [
    // Tipado explícito del array
    {
      icon: Users,
      text: 'Nuevo lead "Ana Silva" asignado a Consultor X.',
      time: 'Hace 5 min',
      highlight: true,
    },
    {
      icon: MessageSquare,
      text: 'Mensaje de "Pedro Costa": "Tengo una pregunta sobre la SPE Alfa".',
      time: 'Hace 23 min',
    },
    {
      icon: TrendingUp,
      text: 'Lead "Carlos Paz" movido a "Contactado".',
      time: 'Hace 1 hora',
    },
    {
      icon: Zap,
      text: 'Calidad del número (XX) XXXX-8888 mejoró a AMARILLO.',
      time: 'Hace 2 horas',
    },
  ];

  const quickActions: QuickActionButtonProps[] = [
    // Tipado explícito del array
    { label: 'Gestionar Leads', icon: Users, href: '/dashboard/leads' },
    {
      label: 'Cuentas WhatsApp',
      icon: MessageSquare,
      href: '/dashboard/whatsapp/accounts',
    },
    {
      label: 'Importar Leads',
      icon: DownloadCloud,
      href: '/dashboard/leads/import',
    },
    { label: 'Ver Analíticas', icon: BarChart3, href: '/dashboard/analytics' },
    {
      label: 'Configuración del Tenant',
      icon: Settings,
      href: '/dashboard/settings',
    },
  ];

  return (
    <div className="space-y-8">
      <WelcomeHeader />

      <section aria-labelledby="kpi-title">
        <h2
          id="kpi-title"
          className="text-2xl font-semibold text-foreground mb-4"
        >
          Indicadores Clave
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.title} {...kpi} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section aria-labelledby="activity-title" className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-foreground">
                Actividad Reciente
              </CardTitle>
              <CardDescription>
                Últimos eventos y comunicaciones importantes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {activityFeed.map((item, index) => (
                  <ActivityFeedItem key={index} {...item} />
                ))}
              </ul>
              <Button
                variant="link"
                className="mt-4 text-primary"
                onClick={() => alert('Ir a toda la actividad (pendiente)')}
              >
                Ver toda la actividad...
              </Button>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="actions-title">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-foreground">Accesos Rápidos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((actionItem) => (
                <QuickActionButton key={actionItem.label} {...actionItem} />
              ))}
            </CardContent>
          </Card>
        </section>
      </div>

      <section>
        <Alert
          variant="destructive"
          className="hover:shadow-lg transition-shadow"
        >
          <Zap className="h-4 w-4" />
          <AlertTitle>¡Atención!</AlertTitle>
          <AlertDescription>
            El número +55 XX XXXX-YYYY tiene una calificación de calidad BAJA.
            Se recomienda pausar envíos masivos.
          </AlertDescription>
        </Alert>
      </section>

      <section aria-labelledby="chart-title">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground">
              Rendimiento de Leads (Últimos 7 días)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/50 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">
                (Espacio para Gráfico - ej. Recharts o Chart.js)
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
// RUTA: apps/pwa-supervisor/src/app/(dashboard)/page.tsx
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Tipado explícito para subcomponentes y datos mock",
    "justificacion": "Se definieron interfaces (`KpiCardProps`, `ActivityFeedItemProps`, `QuickActionButtonProps`) para las props de los subcomponentes y se tiparon los arrays de datos mock (`kpis`, `activityFeed`, `quickActions`). Los subcomponentes ahora usan `React.FC<PropsInterface>`. Esto ayuda a TypeScript a inferir mejor los tipos y debería reducir o eliminar las advertencias `no-unsafe-*` relacionadas con la propagación de props.",
    "impacto": "Código más robusto y type-safe. Mejor DX al trabajar con estos componentes."
  },
  {
    "mejora": "Importación de `LucideProps` para iconos",
    "justificacion": "Se importó `LucideProps` para tipar correctamente la prop `icon` en los subcomponentes, asegurando que solo se pasen componentes de icono válidos.",
    "impacto": "Mejora la seguridad de tipos para los iconos."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Los datos mock seguirán siendo reemplazados por datos reales de la API. El tipado explícito facilitará esta transición."
  },
  {
    "nota": "Mover los subcomponentes a archivos dedicados sigue siendo una mejora recomendada para la organización."
  }
]
*/
