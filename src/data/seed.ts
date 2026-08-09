import { createClient } from '@libsql/client';
import path from 'path';
import fs from 'fs';
// @ts-ignore
import { posts } from './posts.js'; 

const dataFolder = path.resolve(process.cwd(), 'src', 'data');
const dbFile = path.resolve(dataFolder, 'blog.db');

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder, { recursive: true });
}

const absoluteDbUrl = `file:${dbFile.replace(/\\/g, '/')}`;
console.log(`Conectando em: ${absoluteDbUrl}`);

const client = createClient({
  url: absoluteDbUrl,
});

async function main() {
  console.log('Iniciando inserção física de registros...');
  
  try {
    // 1. Força o SQLite a gravar tudo imediatamente no disco rígido
    await client.execute("PRAGMA synchronous = EXTRA;");
    await client.execute("PRAGMA journal_mode = DELETE;");

    await client.execute(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL
      );
    `);

    // 2. Abre uma Transação oficial. Se não fizer isso, o Windows pode ignorar a escrita física
    const transaction = await client.transaction("write");

    for (const post of posts) {
      await transaction.execute({
        sql: 'INSERT OR REPLACE INTO posts (id, title, description) VALUES (?, ?, ?)',
        args: [post.id, post.title, post.description],
      });
      console.log(`Na fila de gravação: ${post.title}`);
    }

    // 3. Dá o COMMIT (Salva e força a gravação física no arquivo blog.db)
    await transaction.commit();
    console.log('Sucesso! Todos os posts foram gravados fisicamente no arquivo.');

  } catch (error) {
    console.error('Erro crítico na inserção:', error);
  } finally {
    // 4. Encerra e limpa os ponteiros de memória do arquivo
    client.close();
  }
}

main();