// app/posts/error.tsx
'use client';

import { useEffect } from 'react';
import { ErrorAlert } from '@/components/ErrorAlert';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Registra o erro no terminal/console para depuração
    console.error('Captured app error:', error);
  }, [error]);

  return <ErrorAlert error={error} reset={reset} />;
}
