'use client';

import { useState, useRef } from 'react';
import { createPost } from '@/data/createPost';
import { useRouter } from 'next/navigation';

export function NewPost() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null); 
  const [isMutating, setIsMutating] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); 
    setIsMutating(true);
    setStatus('idle');

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!title.trim() || !description.trim()) {
      setStatus('error');
      setIsMutating(false);
      return;
    }

    try {
      const result = await createPost(title, description);

      if (result && result.ok) {
        setStatus('success');
        formRef.current?.reset(); 
        
        // CORREÇÃO: Atualiza os dados e redireciona para a página de listagem diferente
        router.refresh(); 
        router.push('/posts'); 
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setStatus('error');
    } finally {
      setIsMutating(false);
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '20px 0', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Create New Post</h3>
      
      <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label htmlFor="title" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Enter post title"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label htmlFor="description" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Description:</label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            placeholder="Enter post description"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isMutating}
          style={{ padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {isMutating ? 'Creating...' : 'Publish Post'}
        </button>
      </form>

      {status === 'error' && (
        <p role="alert" style={{ color: 'red', marginTop: '10px', marginBottom: 0 }}>
          An error occurred. Please check if all fields are filled.
        </p>
      )}

      {status === 'success' && (
        <p role="alert" style={{ color: 'green', marginTop: '10px', marginBottom: 0 }}>
          Post successfully created!
        </p>
      )}
    </div>
  );
}
