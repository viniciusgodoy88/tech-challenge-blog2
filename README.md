# 🚀 Tech Challenge Blog API

> Documentação completa do projeto.

## Sobre

API RESTful desenvolvida com Node.js, Express, Prisma ORM e PostgreSQL.

## Arquitetura

``` mermaid
flowchart LR
A[Cliente]-->B[Express Routes]
B-->C[Controllers]
C-->D[Services]
D-->E[Repositories]
E-->F[Prisma]
F-->G[(PostgreSQL)]
```

## Tecnologias

-   Node.js
-   Express
-   Prisma
-   PostgreSQL
-   JWT
-   Redis
-   Swagger
-   Jest
-   Supertest
-   Faker

## Instalação

``` bash
git clone https://github.com/viniciusgodoy88/tech-challenge-blog2.git
cd tech-challenge-blog2
npm install
```

Crie `.env`:

``` env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tech_challenge_blog"
JWT_SECRET=secret
PORT=3000
```

``` bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```

Swagger: http://localhost:3000/api-docs

## Docker

Exemplo Dockerfile:

``` dockerfile
FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm","run","dev"]
```

docker-compose:

``` yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: tech_challenge_blog
    ports: ["5432:5432"]
  api:
    build: .
    depends_on: [db]
    ports: ["3000:3000"]
```

## Fluxo CRUD

``` mermaid
flowchart TD
Req-->Route-->Controller-->Service-->Repository-->Prisma-->DB
DB-->Resp
```

## Dependências

  Dependência          Função
  -------------------- ------------
  express              API REST
  @prisma/client       ORM
  prisma               migrations
  dotenv               variáveis
  jsonwebtoken         JWT
  redis                cache
  swagger-jsdoc        OpenAPI
  swagger-ui-express   UI Swagger
  faker                seed
  jest                 testes
  supertest            integração
  nodemon              hot reload

## Exemplos

POST /posts

Request:

``` json
{"title":"Meu Post","author":"Vinicius","content":"Conteúdo"}
```

201:

``` json
{"id":1,"title":"Meu Post","author":"Vinicius","content":"Conteúdo"}
```

404:

``` json
{"error":"Rota não encontrada"}
```

401:

``` json
{"error":"Invalid token"}
```

## Licença

MIT
