import { NewPost } from '@/components/NewPost';
import Link from 'next/link';

export default function NewPostPage() {
  return (
    <main style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/admin/posts" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Back to All Posts
        </Link>
      </div>
      
      <h2>Write a New Article</h2>
      <p style={{ color: '#666' }}>Fill out the form below to publish a new post to the SQLite database.</p>
      
      {/* Renderiza o formulário completo */}
      <NewPost />
    </main>
  );
}