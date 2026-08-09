'use client';

import { useState } from 'react';
import { updatePost } from '@/data/editDeletePost';
import { useRouter } from 'next/navigation';

interface EditFormProps {
  post: { id: number; title: string; description: string };
}

export function EditPostForm({ post }: EditFormProps) {
  const router = useRouter();
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsMutating(true);
    setError(false);

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    const result = await updatePost(post.id, title, description);

    if (result.ok) {
      router.push('/admin/posts'); // Redireciona de volta após o sucesso
    } else {
      setError(true);
      setIsMutating(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div>
        <label htmlFor="title" style={{ display: 'block', fontWeight: 'bold' }}>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={post.title}
          required
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div>
        <label htmlFor="description" style={{ display: 'block', fontWeight: 'bold' }}>Description:</label>
        <textarea
          id="description"
          name="description"
          defaultValue={post.description}
          required
          rows={4}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <button type="submit" disabled={isMutating} style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        {isMutating ? 'Saving...' : 'Save Changes'}
      </button>

      {error && <p style={{ color: 'red' }}>Failed to update post.</p>}
    </form>
  );
}