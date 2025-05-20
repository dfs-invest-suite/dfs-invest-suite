import React from 'react';
import './globals.css'; // Importa los estilos con el tema L.I.A Legacy
import { AppProviders } from '@/components/providers';
import { LiaLayoutClient } from '@/components/layout/LiaLayoutClient'; // El layout principal
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@dfs-suite/ui-shared';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans', // Esta variable debe ser usada en el tailwind.config.js de ui-shared
});

export const metadata = {
  title: 'Aiper Assistance | DFS Invest Suite L.I.A Legacy',
  description: 'Interfaz de IA conversacional avanzada.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head /> {/* Next.js gestiona los metadatos de `metadata` aquí */}
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased text-foreground', // Clases base del tema
          fontSans.variable
        )}
      >
        <AppProviders>
          {' '}
          {/* Para ThemeProvider (next-themes), QueryClient, etc. */}
          <LiaLayoutClient>{children}</LiaLayoutClient>
        </AppProviders>
      </body>
    </html>
  );
}
