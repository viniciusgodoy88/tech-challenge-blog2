# 🚀 Tech Challenge Blog API

![Node.js](https://img.shields.io/badge/Node.js-22+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1.0-black?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-6.19.3-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## 📖 Sobre o Projeto

A **Tech Challenge Blog API** é uma API RESTful desenvolvida em **Node.js**, utilizando **Express** e **Prisma ORM**, responsável pelo gerenciamento de posts de um blog.

O projeto foi desenvolvido com foco em boas práticas de arquitetura, organização em camadas, persistência em banco de dados PostgreSQL e documentação da API através do Swagger.

---

# 📌 Funcionalidades

- Criar posts
- Listar todos os posts
- Buscar post por ID
- Atualizar posts
- Excluir posts
- Persistência em PostgreSQL
- ORM Prisma
- Documentação Swagger
- Seed para popular banco
- Testes automatizados com Jest
- Cobertura de testes
- Arquitetura em camadas

---

# 🛠 Tecnologias Utilizadas

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Swagger
- Jest
- Supertest
- Dotenv
- JWT
- Redis
- Faker
- Nodemon

---

# 📁 Estrutura do Projeto

```
tech-challenge-blog
│
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.js
│
├── src
│   ├── controllers
│   ├── database
│   ├── docs
│   ├── middlewares
│   ├── repositories
│   ├── routes
│   ├── services
│   ├── validations
│   ├── app.js
│   └── server.js
│
├── tests
│   ├── integration
│   ├── unit
│   └── e2e
│
├── package.json
├── README.md
└── .env
```

---

# 📂 Explicação das Pastas

## 📦 prisma

Responsável pelo banco de dados.

Contém:

- Schema do Prisma
- Migrations
- Seed

---

## 📦 src/controllers

Recebe as requisições HTTP.

Responsável por:

- Receber Request
- Chamar Services
- Retornar Response

---

## 📦 src/services

Onde fica toda a regra de negócio.

Exemplo:

- Criar post
- Atualizar post
- Validar dados

---

## 📦 src/repositories

Responsável pela comunicação com o banco utilizando Prisma.

---

## 📦 src/routes

Define todas as rotas da API.

Exemplo:

```
GET /posts

POST /posts

PUT /posts/:id

DELETE /posts/:id
```

---

## 📦 src/database

Configuração do Prisma Client.

---

## 📦 src/middlewares

Middlewares da aplicação.

Exemplo:

- Autenticação
- Tratamento de erros

---

## 📦 src/docs

Documentação Swagger.

---

## 📦 tests

Testes automatizados.

Separados em:

- Unitários
- Integração
- End-to-End

---

# ✅ Pré-requisitos

Antes de iniciar, instale:

- Git
- Node.js 22 ou superior
- PostgreSQL
- VS Code
- Postman

---

# 1️⃣ Instalando o Git

Windows

https://git-scm.com/downloads

Verificar instalação

```bash
git --version
```

---

# 2️⃣ Instalando Node.js

Download

https://nodejs.org/

Verificar

```bash
node -v

npm -v
```

---

# 3️⃣ Instalando PostgreSQL

Download

https://www.postgresql.org/download/

Durante a instalação:

- Defina usuário

```
postgres
```

- Defina senha

```
postgres
```

- Porta

```
5432
```

---

# 4️⃣ Clonando o Projeto

```bash
git clone https://github.com/viniciusgodoy88/tech-challenge-blog2.git
```

Entrar na pasta

```bash
cd tech-challenge-blog2
```

---

# 5️⃣ Instalando Dependências

Basta executar:

```bash
npm install
```

Esse comando instalará automaticamente:

- Express
- Prisma
- Prisma Client
- Dotenv
- JWT
- Redis
- Swagger
- Faker
- Jest
- Supertest
- Nodemon

---

# Caso queira instalar manualmente

## Express

```bash
npm install express
```

## Prisma

```bash
npm install prisma --save-dev
```

## Prisma Client

```bash
npm install @prisma/client
```

## Dotenv

```bash
npm install dotenv
```

## JWT

```bash
npm install jsonwebtoken
```

## Redis

```bash
npm install redis
```

## Swagger

```bash
npm install swagger-jsdoc swagger-ui-express
```

## Faker

```bash
npm install @faker-js/faker
```

## Nodemon

```bash
npm install --save-dev nodemon
```

## Jest

```bash
npm install --save-dev jest
```

## Supertest

```bash
npm install --save-dev supertest
```

---

# 6️⃣ Configurando Variáveis de Ambiente

Crie um arquivo

```
.env
```

Exemplo

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tech_challenge_blog"

PORT=3000

JWT_SECRET=sua_chave_secreta
```

---

# 7️⃣ Criando o Banco

Entre no PostgreSQL.

Execute:

```sql
CREATE DATABASE tech_challenge_blog;
```

---

# 8️⃣ Gerando Prisma Client

```bash
npx prisma generate
```

ou

```bash
npm run prisma:generate
```

---

# 9️⃣ Executando as Migrations

```bash
npx prisma migrate dev
```

ou

```bash
npm run prisma:migrate
```

---

# 🔟 Popular Banco

```bash
npm run seed
```

---

# 1️⃣1️⃣ Abrindo Prisma Studio

```bash
npm run prisma:studio
```

---

# 1️⃣2️⃣ Executando Projeto

Modo desenvolvimento

```bash
npm run dev
```

Modo produção

```bash
npm start
```

Servidor

```
http://localhost:3000
```

---

# 📘 Swagger

Após iniciar o servidor

Acesse

```
http://localhost:3000/api-docs
```

---

# 🧪 Executando Testes

Todos os testes

```bash
npm test
```

ou

```bash
npx jest
```

Cobertura

```bash
npm test -- --coverage
```

---

# 📬 Rotas da API

## Criar Post

POST

```
/posts
```

Body

```json
{
    "title":"Meu Post",
    "author":"Vinicius",
    "content":"Conteúdo do post"
}
```

---

## Buscar Todos

GET

```
/posts
```

---

## Buscar por ID

GET

```
/posts/:id
```

---

## Atualizar

PUT

```
/posts/:id
```

---

## Excluir

DELETE

```
/posts/:id
```

---

# 📊 Scripts Disponíveis

| Script | Descrição |
|---------|-----------|
| npm run dev | Executa com Nodemon |
| npm start | Executa em produção |
| npm test | Executa testes |
| npm run prisma:generate | Gera Prisma Client |
| npm run prisma:migrate | Executa migrations |
| npm run prisma:studio | Abre Prisma Studio |
| npm run seed | Executa Seed |

---

# 🔒 Dependências

### Produção

- Express
- Prisma Client
- Dotenv
- JWT
- Redis
- Swagger
- Faker

### Desenvolvimento

- Prisma
- Nodemon
- Jest
- Supertest

---

# 🚀 Fluxo para Executar do Zero

```bash
git clone https://github.com/viniciusgodoy88/tech-challenge-blog2.git

cd tech-challenge-blog2

npm install

npx prisma generate

npx prisma migrate dev

npm run seed

npm run dev
```

Depois acesse

```
http://localhost:3000
```

Swagger

```
http://localhost:3000/api-docs
```

---

# 📄 Licença

Este projeto está licenciado sob a licença MIT.

---

# 👨‍💻 Autor

**Vinicius Godoy**

LinkedIn

https://linkedin.com/in/vinicius-godoy

GitHub

https://github.com/viniciusgodoy88

---

⭐ Caso este projeto tenha sido útil, deixe uma estrela no repositório!
