## Next-Blog-mvp
Exemplo de site Blog Pessoal em Next 16 com banco de dados SQLite.

#### 🎨 Aqui está uma demonstração do projeto
https://next-blog-mvp.onrender.com/

#### 📋 O que voçê vai ver nesse Projeto
| Tecnologia | Descrição |
|-----------|-----------|
| **Dynamic Route**  | Rota Dinâmica é o caminho completo de um endereço que aceita partes variáveis |
| **libSQL**  | Driver de banco de dados SQLite usado para conectar, inserir, atualizar e consultar dados SQL. |


#### 🔄 Executar a aplicação
- Recuperar as dependencias do projeto node_modules .
```bash
npm install 
```

- Executar criação do banco
```bash
node src/scripts/createDatabase.mjs
npx tsx src/data/seed.ts
```

- Executar o Build do Projeto
```bash
npm run dev
```
