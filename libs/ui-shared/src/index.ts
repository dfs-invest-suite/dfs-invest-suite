// RUTA: libs/ui-shared/src/index.ts

// --- Utils ---
export * from './lib/utils'; // cn, y otras utilidades específicas de UI

// --- Hooks UI Compartidos (no data-fetching) ---
// export * from './lib/hooks/use-media-query'; // Ejemplo
// export * from './lib/hooks/use-toast-notifications'; // Si el sistema de Toast se gestiona aquí

// --- Componentes UI (organizados por subdirectorios si es necesario) ---
// Primitivos / Base (Shadcn/UI)
export * from './components/ui/alert';
export * from './components/ui/button'; // Asegúrate que buttonVariants también se exporte si es necesario fuera
export * from './components/ui/card';
export * from './components/ui/card-hover';
export * from './components/ui/input';
export * from './components/ui/label';
// ... exportar todos los demás componentes base de Shadcn/UI que se añadan
// ejemplo: dropdown-menu, dialog, select, table, toast, etc.

// Componentes Compuestos Reutilizables (si los creamos aquí)
// export * from './components/composed/data-table';
// export * from './components/composed/page-header';
// export * from './components/composed/confirmation-modal';

// --- Tipos y Enums Específicos de UI Compartida (si los hay) ---
// export * from './lib/types/ui-specific.types';
// export * from './lib/enums/ui-variants.enum';

// --- Configuración de Tema (si se exporta algo para los consumidores) ---
// export * from './theme/theme-provider-config'; // Ejemplo
