import { createClient } from '@libsql/client';
import { existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// Garante a criação da pasta 'src/data' de forma absoluta
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = resolve(__dirname, '../data/blog.db');
const dbDir = dirname(dbPath);

if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

const client = createClient({
  url: `file:${dbPath}`,
});

await client.execute(
  `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL, 
    description TEXT NOT NULL
  )`,
);

console.log("Banco de dados e tabela criados com sucesso!");