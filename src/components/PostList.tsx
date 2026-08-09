// src/components/PostList.tsx
import Link from 'next/link';
import { getAllPosts, getFilteredPosts } from '@/data/queries';

interface PostListProps {
  criteria: string | string[] | undefined;
}

export async function PostList({ criteria }: PostListProps) {
  // Busca os posts filtrados ou todos os posts no banco de dados SQLite
  const resolvedPosts =
    typeof criteria === 'string'
      ? await getFilteredPosts(criteria)
      : await getAllPosts();

  // Caso não existam posts cadastrados ainda
  if (!resolvedPosts || resolvedPosts.length === 0) {
    return <p style={{ color: '#666', fontStyle: 'italic' }}>No posts found.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {resolvedPosts.map((post) => (
        <li 
          key={post.id} 
          style={{ 
            marginBottom: '20px', 
            paddingBottom: '15px', 
            borderBottom: '1px solid #eee' 
          }}
        >
          {/* Título do Post linkado para a página de detalhes */}
          <Link 
            href={`/posts/${post.id}`} 
            style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: '#0070f3' }}
          >
            {post.title}
          </Link>
          
          {/* Descrição do Post */}
          <p style={{ margin: '8px 0', color: '#333' }}>{post.description}</p>
          
        </li>
      ))}
    </ul>
  );
}