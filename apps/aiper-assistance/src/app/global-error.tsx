'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Oops - Global Error!</h2>
        <p>{error.message || 'Something went very wrong.'}</p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
