import { getPost } from '@/data/queries';
import { notFound } from 'next/navigation';
import { EditPostForm } from '@/components/EditPostForm';
import Link from 'next/link';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  
  if (!Number.isInteger(id)) notFound();

  const post = await getPost(id);
  if (!post) notFound();

  return (
    <main style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Link href="/admin/posts" style={{ color: '#0070f3', textDecoration: 'none' }}>← Back</Link>
      <h2>Edit Post</h2>
      {/* Passa o post encontrado como valor inicial para o formulário */}
      <EditPostForm post={{ id, title: post.title, description: post.description ?? '' }} />
    </main>
  );
}