import { createClient } from '@libsql/client';
// Garanta que ambos os nomes estejam exatamente iguais aos exportados no seu schema.ts
import { postsSchema, postSchema } from './schema'; 
import path from 'path';

function getClient() {
  let dbUrl = process.env.DB_URL || 'file:src/data/blog.db';

  if (dbUrl.startsWith('file:')) {
    const rawPath = dbUrl.replace('file:', '');
    const normalizedPath = rawPath.replace(/\\/g, '/');
    const absolutePath = path.resolve(process.cwd(), normalizedPath);
    dbUrl = `file:${absolutePath}`;
  }

  const client = createClient({ url: dbUrl });

  // COMANDO SALVADOR: Cria a tabela automaticamente se ela sumir do Render
  // Executamos de forma assíncrona em background para não travar a inicialização
  client.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT
    );
  `).catch(err => console.error("Erro ao garantir existência da tabela:", err));

  return client;
}

export async function getAllPosts() {
  // Valida se estamos no servidor e tenta capturar o cliente
  const client = getClient();
  try {
    const data = await client.execute(
      'SELECT id, title, description FROM posts',
    );
    
    // Converte os dados do formato de linhas do LibSQL para objetos limpos antes do Zod ler
    const rows = data.rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description
    }));

    return postsSchema.parse(rows);
  } catch (error: any) {
    // Força o erro real a aparecer escrito por extenso no terminal do Render
    console.error('=== ERRO EM getAllPosts ===', error?.message || error);
    throw error;
  } finally {
    client.close(); // Garante o fechamento
  }
}

export async function getFilteredPosts(criteria: string) {
  const client = getClient();
  try {
    const data = await client.execute({
      sql: 'SELECT id, title, description FROM posts WHERE title LIKE ?',
      args: [`%${criteria}%`],
    });

    const rows = data.rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description
    }));

    return postsSchema.parse(rows);
  } catch (error: any) {
    console.error('=== ERRO EM getFilteredPosts ===', error?.message || error);
    throw error;
  } finally {
    client.close();
  }
}

export async function getPost(id: number | string) {
  const client = getClient();
  try {
    const data = await client.execute({
      sql: 'SELECT id, title, description FROM posts WHERE id = ?',
      args: [id],
    });
    
    if (data.rows.length === 0) {
      return undefined;
    }
    
    const row = data.rows[0];
    const cleanPost = {
      id: row.id,
      title: row.title,
      description: row.description
    };
    
    return postSchema.parse(cleanPost);
  } catch (error: any) {
    console.error('=== ERRO EM getPost ===', error?.message || error);
    throw error;
  } finally {
    client.close();
  }
}