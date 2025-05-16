import React from 'react';
import './global.css';

export const metadata = {
  title: 'Aiper Assistance | DFS Invest Suite', // Título actualizado
  description: 'Interfaz de IA para asistencia en DFS Invest Suite.', // Descripción actualizada
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Con App Router, el RootLayout NO debe incluir <html> ni <body> directamente en su return.
  // Next.js los añade automáticamente.
  return <>{children}</>;
}
