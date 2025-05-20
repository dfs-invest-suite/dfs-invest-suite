// RUTA: apps/aiper-assistance/src/components/layout/LiaTopNav.tsx
// ...
export function LiaTopNav({ onMenuButtonClick }: LiaTopNavProps) {
  const currentUserFromStore = useAuthStore((state) => state.user); // Ejemplo si usas store
  // ...
  return (
    <header /* ... */>
      {/* ... */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* ... otros botones ... */}
        <Button variant="ghost" /* ... */ aria-label="Perfil de Usuario">
          <UserCircle className="h-7 w-7" />
          <span className="hidden md:inline ml-2 text-sm">
            {currentUserFromStore?.name || 'Usuario'} {/* USAR LA VARIABLE */}
          </span>
        </Button>
      </div>
    </header>
  );
}
