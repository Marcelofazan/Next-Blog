import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Loading } from '@/components/Loading';
import { PostDetail } from '@/components/PostDetail';

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  
  if (!Number.isInteger(id)) {
    notFound();
  }

  return (
    <main>
      {/* O Next.js usará automaticamente o arquivo error.tsx da pasta se o PostDetail falhar */}
      <Suspense fallback={<Loading />}>
        <PostDetail id={id} />
      </Suspense>
    </main>
  );
}