// RUTA: libs/ui-shared/src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
// RUTA: libs/ui-shared/src/lib/utils.ts
/* SECCIÓN DE MEJORAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
