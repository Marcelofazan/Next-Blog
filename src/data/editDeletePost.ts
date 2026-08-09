'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@libsql/client';
import path from 'path';

function getClient() {
  let dbUrl = process.env.DB_URL || 'file:src/data/blog.db';
  if (dbUrl.startsWith('file:')) {
    const rawPath = dbUrl.replace('file:', '');
    const normalizedPath = rawPath.replace(/\\/g, '/');
    const absolutePath = path.resolve(process.cwd(), normalizedPath);
    dbUrl = `file:${absolutePath}`;
  }
  return createClient({ url: dbUrl });
}

// 1. AÇÃO DE EDITAR
export async function updatePost(id: number, title: string, description: string) {
  const client = getClient();
  try {
    await client.execute({
      sql: 'UPDATE posts SET title = ?, description = ? WHERE id = ?',
      args: [title, description, id],
    });

    revalidatePath('/admin/posts');
    revalidatePath(`/admin/posts/${id}`);
    return { ok: true };
  } catch (error) {
    console.error('=== ERRO EM updatePost ===', error);
    return { ok: false };
  } finally {
    client.close();
  }
}

// 2. AÇÃO DE DELETAR
export async function deletePost(id: number) {
  const client = getClient();
  try {
    await client.execute({
      sql: 'DELETE FROM posts WHERE id = ?',
      args: [id],
    });

    revalidatePath('/admin/posts');
    return { ok: true };
  } catch (error) {
    console.error('=== ERRO EM deletePost ===', error);
    return { ok: false };
  } finally {
    client.close();
  }
}