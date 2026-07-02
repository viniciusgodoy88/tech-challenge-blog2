# 🚀 Tech Challenge Blog API

API RESTful de um blog desenvolvida em Node.js com Prisma ORM, seguindo boas práticas de backend moderno com operações CRUD completas.

Repositório: https://github.com/viniciusgodoy88/tech-challenge-blog

---

## 🧰 Stack utilizada

### Backend

- Node.js
- Express.js
- Prisma ORM
- JavaScript (ES6+)
- dotenv
- nodemon

### Banco de Dados

- SQLite (ambiente de desenvolvimento)
- PostgreSQL (compatível para produção)

### Ferramentas

- Git & GitHub
- Swagger (documentação da API)
- Prisma Studio

---

## 📊 Badges

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![SQLite](https://img.shields.io/badge/SQLite-Dev-lightgrey)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prod-blue)
![Swagger](https://img.shields.io/badge/Swagger-Docs-green)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 📌 Funcionalidades

- Criar posts 📝
- Listar todos os posts 📄
- Buscar post por ID 🔍
- Atualizar post ✏️
- Deletar post 🗑️
- Documentação completa via Swagger 📚

---

## 📁 Estrutura do projeto

src/</br>
├── controllers/ </br>
│ └── postController.js</br>
│</br>
├── services/</br>
│ └── postService.js</br>
│</br>
├── routes/</br>
│ └── postRoutes.js</br>
│</br>
├── prisma/</br>
│ ├── schema.prisma</br>
│ └── client.js</br>
│</br>
├── swagger/</br>
│ └── swagger.js</br>
│</br>
├── config/</br>
│ └── database.js</br>
│</br>
├── middlewares/</br>
│ └── errorHandler.js</br>
│</br>
├── server.js</br>
└── app.js</br>

---

## ⚙️ Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/viniciusgodoy88/tech-challenge-blog.git

## 2. Acesse o projeto
cd tech-challenge-blog

## 3. Instale as Dependencias
npm install

🗄️ Configuração do banco de dados (Prisma)
4. Configure o arquivo .env

Crie um arquivo .env na raiz do projeto:

PORT=3000

# SQLite (desenvolvimento)
DATABASE_URL="file:./dev.db"

# PostgreSQL (produção opcional)
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/blog_db"

5. Rodar migrations
npx prisma migrate dev

6. Abrir Prisma Studio (visualizar banco)
npx prisma studio

Acesse:

http://localhost:5555

▶️ Executando o projeto
Modo desenvolvimento
npm run dev

Servidor rodando em:

http://localhost:3000

📚 Swagger (Documentação da API)

A documentação interativa da API está disponível em:

http://localhost:3000/api-docs
Configuração base do Swagger:
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Tech Challenge Blog API",
    version: "1.0.0",
    description: "API REST para gerenciamento de posts",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

🔐 Autenticação (se aplicável no projeto)
Login
POST /auth/login
Body
{
  "email": "admin@email.com",
  "password": "123456"
}
Resposta
{
  "token": "jwt_token_aqui"
}
Uso do token
Authorization: Bearer SEU_TOKEN

📌 Rotas principais da API
Posts
Método	Rota	Descrição
GET	/posts	Lista todos posts
GET	/posts/:id	Busca post por ID
POST	/posts	Cria novo post
PUT	/posts/:id	Atualiza post
DELETE	/posts/:id	Remove post

🧪 Scripts úteis
npm run dev              # inicia servidor com nodemon
npm start                # inicia servidor produção
npx prisma migrate dev   # cria migrations
npx prisma studio        # abre interface do banco

🧠 Boas práticas aplicadas
Separação por camadas (Controller / Service)
Uso de ORM (Prisma)
Variáveis de ambiente (.env)
Estrutura escalável
API REST bem definida
Documentação com Swagger
Código modular e organizado
```
