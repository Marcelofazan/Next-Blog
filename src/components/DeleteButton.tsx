'use client';

import { useState } from 'react';
import { deletePost } from '@/data/editDeletePost';
import { useRouter } from 'next/navigation';

export function DeleteButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setIsDeleting(true);
    const result = await deletePost(id);

    if (result.ok) {
      router.refresh();
    } else {
      alert('Failed to delete post.');
    }
    setIsDeleting(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      style={{ padding: '4px 8px', background: '#e00', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}