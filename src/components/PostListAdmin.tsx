// src/components/PostListAdmin.tsx
import Link from 'next/link';
import { getAllPosts, getFilteredPosts } from '@/data/queries';
import { DeleteButton } from '@/components/DeleteButton'; // Usando o caminho absoluto seguro

interface PostListProps {
  criteria: string | string[] | undefined;
}

export async function PostListAdmin({ criteria }: PostListProps) {
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
          
          {/* ONDE FICAM OS LINKS: Container de ações do post */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {/* Link para a página de edição (Passo 4 anterior) */}
            <Link 
              href={`/admin/posts/${post.id}/edit`} 
              style={{ 
                fontSize: '14px', 
                padding: '5px 10px', 
                background: '#f0f0f0', 
                color: '#333', 
                textDecoration: 'none', 
                borderRadius: '4px',
                fontWeight: '500'
              }}
            >
              Edit
            </Link>
            
            {/* Componente Client-side com a lógica de exclusão (Passo 2 anterior) */}
            <DeleteButton id={Number(post.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
}