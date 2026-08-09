'use client';

// Tipagem oficial do Next.js para a fronteira de erro
interface ErrorAlertProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorAlert({ error, reset }: ErrorAlertProps) {
  // Garante uma mensagem amigável caso a propriedade venha vazia
  const errorMessage = error?.message || 'An unexpected error occurred.';

  return (
    <div role="alert" style={{ padding: '20px', border: '1px solid red', borderRadius: '5px' }}>
      <h3>Something went wrong</h3>
      <p style={{ color: 'red' }}>{errorMessage}</p>
      
      {/* Exibe o código hash do erro gerado no servidor, útil para olhar os logs no Render */}
      {error?.digest && (
        <small style={{ display: 'block', marginBottom: '10px', color: '#666' }}>
          Error Code: {error.digest}
        </small>
      )}

      <button onClick={reset}>Retry</button>
    </div>
  );
}