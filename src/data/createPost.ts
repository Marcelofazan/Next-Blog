'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@libsql/client';
import path from 'path'; // Adicionado para resolver o caminho do banco local no Linux/Render

export async function createPost(title: string, description: string) {
  // Configura a URL padrão idêntica à de consulta para funcionar no Windows e no Render
  let dbUrl = process.env.DB_URL || 'file:src/data/blog.db';

  if (dbUrl.startsWith('file:')) {
    const rawPath = dbUrl.replace('file:', '');
    const normalizedPath = rawPath.replace(/\\/g, '/');
    const absolutePath = path.resolve(process.cwd(), normalizedPath);
    dbUrl = `file:${absolutePath}`;
  }

  // Inicializa o cliente com a URL tratada e correta
  const client = createClient({
    url: dbUrl,
  });

  try {
    // Armazena o resultado da execução para obter o id gerado
    const result = await client.execute({
      sql: 'INSERT INTO posts (title, description) VALUES (?, ?)',
      args: [title, description],
    });

    // Revalida o cache da página de listagem para refletir o novo post imediatamente
    revalidatePath('/posts');

    return {
      ok: true,
      // Converte o BigInt retornado pelo LibSQL para number para evitar erros de serialização no Next.js
      id: result.lastInsertRowid ? Number(result.lastInsertRowid) : undefined,
    };

  } catch (error: any) {
    // Log detalhado que aparecerá no painel de Logs do Render caso a inserção falhe
    console.error('=== ERRO CRÍTICO EM createPost (SERVER) ===', error?.message || error);
    return { ok: false };
  } finally {
    // Garante que a conexão com o banco de dados seja fechada com segurança
    if (client) {
      client.close();
    }
  }
}