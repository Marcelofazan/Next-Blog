import { Suspense } from 'react';
import { Loading } from '@/components/Loading';
import { PostListAdmin } from '@/components/PostListAdmin';
import Link from 'next/link'; // Importado para fazer o vínculo com a nova tela

export default async function Posts({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const criteria = (await searchParams).criteria;
  const resolvedHeading =
    typeof criteria === 'string'
      ? `Posts for ${criteria}`
      : 'Posts';

  return (
    <main style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>{resolvedHeading}</h2>
        
        {/* Link elegante que aponta para a sua nova rota de criação */}
        <Link 
          href="/admin/posts/new" 
          style={{ 
            padding: '10px 15px', 
            background: '#0070f3', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px', 
            fontWeight: 'bold' 
          }}
        >
          + Create New Post
        </Link>
      </div>

      <Suspense fallback={<Loading />}>
        <PostListAdmin criteria={criteria} />
      </Suspense>
    </main>
  );
}