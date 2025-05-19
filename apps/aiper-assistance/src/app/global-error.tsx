// RUTA: apps/aiper-assistance/src/app/global-error.tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Oops - ¡Algo salió mal en Aiper Assistance!
      </h2>
      <p className="mb-4">
        {error.message ||
          'Ocurrió un error inesperado. Por favor, intenta de nuevo.'}
      </p>
      {/* Mostrar el digest solo si realmente existe en el objeto error, sin depender de NODE_ENV aquí */}
      {error.digest && (
        <p className="text-xs text-gray-500 mb-4">
          Error Digest: {error.digest}
        </p>
      )}
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
