import { getPost } from '@/data/queries';

export async function PostDetail({ id }: { id: number }) {
  try {
    const post = await getPost(id);
    if (!post) {
      return <p>Post not found</p>;
    }
    return (
      <>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </>
    );
  } catch (error: any) {
    // ESTE LOG VAI APARECER NO PAINEL DO RENDER
    console.error('=== ERRO DETALHADO NO POST DETAIL ===', error?.message, error?.stack);
    throw error; // Repassa para o Next.js exibir o erro
  }
}