# 🚀 Tech Challenge Blog API

![Node.js](https://img.shields.io/badge/Node.js-22+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-6.19.3-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Redis](https://img.shields.io/badge/Redis-Cache-red?logo=redis)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-green?logo=swagger)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

---

# 📚 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Objetivos](#-objetivos)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Dependências do Projeto](#-dependências-do-projeto)
- [Arquitetura da Aplicação](#-arquitetura-da-aplicação)
- [Fluxo da Requisição](#-fluxo-da-requisição)
- [Diagrama da Arquitetura](#-diagrama-da-arquitetura)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Explicação das Pastas](#-explicação-das-pastas)
- [Banco de Dados](#-banco-de-dados)
- [Modelagem de Dados](#-modelagem-de-dados)

---

# 📖 Sobre o Projeto

A **Tech Challenge Blog API** é uma API RESTful desenvolvida utilizando **Node.js**, **Express.js**, **Prisma ORM** e **PostgreSQL**.

O objetivo principal da aplicação é disponibilizar uma plataforma backend para gerenciamento de posts de blog, permitindo:

- Cadastro de usuários
- Autenticação via JWT
- Criação de posts
- Atualização de posts
- Exclusão de posts
- Consulta de posts
- Pesquisa por palavras-chave
- Documentação automática via Swagger
- Testes automatizados

---

# 🎯 Objetivos

Este projeto foi desenvolvido para demonstrar conhecimentos em:

### Backend

- Node.js
- Express
- APIs RESTful
- Arquitetura em camadas

### Banco de Dados

- PostgreSQL
- Prisma ORM
- Migrations
- Seeds

### Segurança

- JWT Authentication
- Middleware de autorização
- Middleware de roles

### Qualidade

- Testes automatizados
- Tratamento de erros
- Logging
- Auditoria

### Documentação

- Swagger/OpenAPI
- README profissional

---

# 🛠 Tecnologias Utilizadas

| Tecnologia | Função |
|------------|---------|
| Node.js | Ambiente de execução JavaScript |
| Express | Framework Web |
| Prisma ORM | ORM para PostgreSQL |
| PostgreSQL | Banco de dados relacional |
| JWT | Autenticação |
| Redis | Cache |
| Swagger | Documentação |
| Jest | Testes |
| Supertest | Testes de API |
| Faker | Dados fictícios |
| Dotenv | Variáveis de ambiente |

---

# 📦 Dependências do Projeto

Abaixo está a explicação detalhada de todas as bibliotecas utilizadas.

---

## Express

```json
"express": "^5.1.0"
```

Framework responsável pela criação da API.

Permite:

- Criar rotas
- Receber requisições HTTP
- Enviar respostas
- Utilizar middlewares

Exemplo:

```javascript
app.get("/", (req, res) => {
  res.json({ status: "online" });
});
```

---

## Prisma Client

```json
"@prisma/client": "^6.19.3"
```

Biblioteca utilizada para acessar o banco PostgreSQL.

Exemplo:

```javascript
const users = await prisma.user.findMany();
```

---

## Prisma

```json
"prisma": "^6.19.3"
```

Ferramenta utilizada para:

- Criar migrations
- Gerar Prisma Client
- Gerenciar banco de dados

Exemplo:

```bash
npx prisma migrate dev
```

---

## Dotenv

```json
"dotenv": "^17.2.3"
```

Carrega variáveis de ambiente do arquivo `.env`.

Exemplo:

```javascript
require("dotenv").config();
```

---

## JWT

```json
"jsonwebtoken": "^9.0.3"
```

Responsável por gerar tokens de autenticação.

Exemplo:

```javascript
const token = jwt.sign(payload, secret);
```

---

## Redis

```json
"redis": "^6.1.0"
```

Sistema de cache em memória.

Utilizado para:

- Cache de consultas
- Sessões
- Performance

---

## Swagger JSDoc

```json
"swagger-jsdoc": "^6.2.8"
```

Gera documentação OpenAPI automaticamente.

---

## Swagger UI Express

```json
"swagger-ui-express": "^5.0.1"
```

Cria interface visual da documentação.

Exemplo:

```
http://localhost:3000/api-docs
```

---

## Faker

```json
"@faker-js/faker": "^10.5.0"
```

Utilizado para gerar dados fictícios.

Exemplo:

```javascript
faker.internet.email();
```

---

## Jest

```json
"jest": "^30.2.0"
```

Framework de testes.

Permite:

- Testes unitários
- Testes integração
- Cobertura de código

---

## Supertest

```json
"supertest": "^7.1.4"
```

Utilizado para testar endpoints HTTP.

Exemplo:

```javascript
await request(app)
  .get("/posts")
  .expect(200);
```

---

## Nodemon

```json
"nodemon": "^3.1.10"
```

Reinicia automaticamente a aplicação quando arquivos são alterados.

Exemplo:

```bash
npm run dev
```

---

# 🏗 Arquitetura da Aplicação

O projeto segue uma arquitetura em camadas.

```text
Cliente
   │
   ▼
Rotas
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

---

# 🔄 Fluxo da Requisição

Exemplo de criação de um post:

```text
POST /posts
      │
      ▼
PostRoutes
      │
      ▼
PostController
      │
      ▼
PostService
      │
      ▼
PostRepository
      │
      ▼
Prisma
      │
      ▼
PostgreSQL
```

---

# 📊 Diagrama da Arquitetura

```mermaid
flowchart TD

A[Cliente/Postman]

A --> B[Express Routes]

B --> C[Controllers]

C --> D[Services]

D --> E[Repositories]

E --> F[Prisma ORM]

F --> G[(PostgreSQL)]

G --> F
F --> E
E --> D
D --> C
C --> B
B --> A
```

---

# 📁 Estrutura do Projeto

```text
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
│   ├── validators
│   ├── app.js
│   └── server.js
│
├── tests
│   ├── unit
│   ├── integration
│   └── e2e
│
├── package.json
├── README.md
└── .env
```

---

# 📂 Explicação das Pastas

## prisma/

Responsável pela camada de persistência.

Contém:

- Schema do banco
- Migrations
- Seed

---

## src/controllers

Responsável por receber as requisições HTTP.

Exemplo:

```javascript
create(req, res)
```

---

## src/services

Contém as regras de negócio.

Exemplo:

```javascript
if (!data.title) {
  throw new Error();
}
```

---

## src/repositories

Camada de acesso ao banco.

Responsável por:

- Buscar registros
- Criar registros
- Atualizar registros
- Remover registros

---

## src/routes

Define todos os endpoints.

Exemplo:

```javascript
router.get("/posts");
```

---

## src/middlewares

Contém:

- Auth Middleware
- Role Middleware
- Validation Middleware
- Error Handler
- Audit Middleware

---

## src/docs

Documentação Swagger.

---

## src/database

Configuração do Prisma Client.

---

## tests

Testes automatizados.

Separados em:

- Unitários
- Integração
- End-to-End

---

# 🗄 Banco de Dados

A aplicação utiliza PostgreSQL como banco principal.

O acesso é realizado através do Prisma ORM.

---

# 📐 Modelagem de Dados

## User

```prisma
model User {
  id        Int @id @default(autoincrement())
  email     String @unique
  password  String
  role      String @default("user")
  createdAt DateTime @default(now())
}
```

---

## Post

```prisma
model Post {
  id      Int @id @default(autoincrement())
  title   String
  content String
}
```

---

# 📊 Diagrama ER

```mermaid
erDiagram

USER {
  INT id PK
  STRING email
  STRING password
  STRING role
  DATETIME createdAt
}

POST {
  INT id PK
  STRING title
  STRING content
}
```

---

# 💻 Pré-requisitos

Antes de executar o projeto, certifique-se de que possui os seguintes softwares instalados em sua máquina.

| Software | Versão Recomendada | Obrigatório |
|-----------|-------------------|-------------|
| Git | 2.40+ | ✅ |
| Node.js | 22 ou superior | ✅ |
| npm | 10+ | ✅ |
| PostgreSQL | 16+ | ✅ |
| Docker Desktop | Última versão | Opcional |
| Docker Compose | Última versão | Opcional |
| Visual Studio Code | Última versão | Recomendado |
| Postman | Última versão | Recomendado |

---

# 🛠 Instalando o Git

Caso ainda não possua o Git instalado.

## Windows

Acesse:

https://git-scm.com/downloads

Baixe a versão correspondente ao seu sistema operacional e execute a instalação utilizando as configurações padrão.

### Verificando instalação

```bash
git --version
```

Saída esperada:

```bash
git version 2.x.x
```

---

# 🟢 Instalando o Node.js

O projeto utiliza Node.js versão **22 ou superior**.

Download:

https://nodejs.org

Após instalar execute:

```bash
node -v
```

Resultado esperado

```bash
v22.x.x
```

Agora confira o npm

```bash
npm -v
```

Resultado

```bash
10.x.x
```

---

# 🐘 Instalando PostgreSQL

Download

https://www.postgresql.org/download/

Durante a instalação utilize as seguintes configurações:

Usuário

```
postgres
```

Senha

```
postgres
```

Porta

```
5432
```

Após finalizar abra o **pgAdmin** ou o terminal do PostgreSQL.

---

# Criando o Banco

Execute:

```sql
CREATE DATABASE tech_challenge_blog;
```

Confira se foi criado

```sql
\l
```

ou no pgAdmin.

---

# 🐳 Instalando Docker

Caso deseje executar o projeto utilizando containers.

Download

https://www.docker.com/products/docker-desktop/

Após instalar execute

```bash
docker --version
```

Resultado esperado

```bash
Docker version xx.xx.xx
```

---

# Instalando Docker Compose

Nas versões atuais do Docker Desktop ele já acompanha a instalação.

Verifique

```bash
docker compose version
```

---

# 💙 Instalando VS Code

Download

https://code.visualstudio.com/

Extensões recomendadas

- ESLint
- Prettier
- Prisma
- Docker
- REST Client
- GitLens
- Thunder Client

---

# 📬 Instalando Postman

Download

https://www.postman.com/downloads/

O Postman será utilizado para testar todas as rotas da API.

---

# 📥 Clonando o Projeto

Clone o repositório

```bash
git clone https://github.com/viniciusgodoy88/tech-challenge-blog2.git
```

Entre na pasta

```bash
cd tech-challenge-blog2
```

---

# 📂 Estrutura Esperada

Após clonar você deverá visualizar algo semelhante:

```text
tech-challenge-blog2
│
├── prisma
├── src
├── tests
├── package.json
├── README.md
└── .env
```

---

# 📦 Instalando Dependências

Execute

```bash
npm install
```

Esse comando instalará automaticamente todas as bibliotecas declaradas no package.json.

Durante a instalação serão baixadas dependências como:

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

# Instalação Manual das Dependências

Caso deseje instalar biblioteca por biblioteca.

## Express

```bash
npm install express
```

Servidor HTTP da aplicação.

---

## Prisma

```bash
npm install prisma --save-dev
```

ORM utilizado para comunicação com o banco.

---

## Prisma Client

```bash
npm install @prisma/client
```

Cliente utilizado para executar consultas SQL através do Prisma.

---

## Dotenv

```bash
npm install dotenv
```

Carrega variáveis de ambiente do arquivo `.env`.

---

## JWT

```bash
npm install jsonwebtoken
```

Responsável pela autenticação utilizando tokens.

---

## Redis

```bash
npm install redis
```

Cliente para comunicação com servidor Redis.

---

## Swagger

```bash
npm install swagger-jsdoc swagger-ui-express
```

Gera automaticamente a documentação da API.

---

## Faker

```bash
npm install @faker-js/faker
```

Utilizado para gerar dados fictícios durante o Seed.

---

## Nodemon

```bash
npm install --save-dev nodemon
```

Reinicia automaticamente a API quando algum arquivo é alterado.

---

## Jest

```bash
npm install --save-dev jest
```

Framework responsável pelos testes automatizados.

---

## Supertest

```bash
npm install --save-dev supertest
```

Executa testes de integração simulando requisições HTTP.

---

# ⚙ Configurando Variáveis de Ambiente

Crie um arquivo chamado

```text
.env
```

na raiz do projeto.

Conteúdo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tech_challenge_blog"

JWT_SECRET=minha_chave_super_secreta

PORT=3000

NODE_ENV=development
```

---

# 🗄 Gerando o Prisma Client

Após configurar o banco execute

```bash
npx prisma generate
```

ou

```bash
npm run prisma:generate
```

Resultado esperado

```text
✔ Generated Prisma Client
```

---

# 🧱 Executando as Migrations

Execute

```bash
npx prisma migrate dev
```

ou

```bash
npm run prisma:migrate
```

Resultado esperado

```text
Applying migration...

Migration finished successfully.
```

---

# 🌱 Executando o Seed

Para popular automaticamente o banco com usuários e posts fictícios execute

```bash
npm run seed
```

Saída esperada

```text
🌱 Iniciando seed...

✅ Seed finalizado
```

Serão criados:

- 5 usuários
- 10 posts

---

# 🔍 Prisma Studio

Para visualizar os dados diretamente no banco execute

```bash
npm run prisma:studio
```

O navegador abrirá automaticamente.

---

# ▶ Executando a API

Modo desenvolvimento

```bash
npm run dev
```

Modo produção

```bash
npm start
```

---

# ✅ Resultado Esperado

Terminal

```text
=======================================
🚀 Tech Challenge Blog API
=======================================

Servidor:
http://localhost:3000

Swagger:
http://localhost:3000/api-docs

=======================================
```

---

# 🌐 Testando se a API está Online

Abra o navegador

```
http://localhost:3000
```

Resposta

```json
{
  "message": "Tech Challenge Blog API",
  "documentation": "/api-docs",
  "status": "online"
}
```

---

# 📘 Swagger

Com a aplicação iniciada acesse

```
http://localhost:3000/api-docs
```

Toda a documentação da API estará disponível para testes diretamente pelo navegador.

---

# 📜 Scripts Disponíveis

| Script | Descrição |
|----------|-----------|
| npm run dev | Executa a API em desenvolvimento |
| npm start | Executa a API em produção |
| npm test | Executa todos os testes |
| npm run prisma:generate | Gera o Prisma Client |
| npm run prisma:migrate | Executa migrations |
| npm run prisma:studio | Abre o Prisma Studio |
| npm run seed | Popula o banco de dados |

---

# 📬 Testando a API

Após iniciar a aplicação, a API estará disponível no endereço:

```text
http://localhost:3000
```

Toda a documentação também poderá ser acessada pelo Swagger:

```text
http://localhost:3000/api-docs
```

Embora o Swagger permita testar a API diretamente pelo navegador, recomenda-se utilizar o **Postman**, pois ele facilita o gerenciamento de ambientes, tokens JWT e coleções de requisições.

---

# 📮 Configurando o Postman

## 1. Criando uma Collection

Abra o Postman.

Clique em:

```
New
```

↓

```
Collection
```

Nome sugerido:

```
Tech Challenge Blog API
```

---

## 2. Criando um Environment

Clique em

```
Environments
```

↓

```
New Environment
```

Nome:

```
Local API
```

Crie as seguintes variáveis.

| Variável | Valor |
|-----------|--------|
| base_url | http://localhost:3000 |
| token | (deixe vazio) |

Salve.

---

# 🔐 Fluxo de Autenticação

A API utiliza autenticação baseada em **JWT (JSON Web Token)**.

Fluxo:

```mermaid
flowchart TD

A[Usuário] --> B[POST /auth/register]

B --> C[Usuário criado]

C --> D[POST /auth/login]

D --> E[JWT]

E --> F[Bearer Token]

F --> G[Rotas protegidas]
```

---

# 👤 Cadastro de Usuário

## Endpoint

```http
POST /auth/register
```

URL completa

```text
http://localhost:3000/auth/register
```

Body

```json
{
    "email":"vinicius@email.com",
    "password":"123456"
}
```

Resposta

### HTTP 201

```json
{
    "id":1,
    "email":"vinicius@email.com",
    "password":"123456"
}
```

---

### Usuário já existe

HTTP 400

```json
{
    "error":"User already exists"
}
```

---

# 🔑 Login

Endpoint

```http
POST /auth/login
```

Body

```json
{
    "email":"vinicius@email.com",
    "password":"123456"
}
```

Resposta

HTTP 200

```json
{
    "accessToken":"eyJhbGciOiJIUzI1NiIs..."
}
```

Copie o valor retornado.

Ele será utilizado nas próximas requisições.

---

# 🔐 Utilizando Bearer Token

No Postman.

Clique em

```
Authorization
```

↓

```
Bearer Token
```

Cole o token obtido no login.

Exemplo

```
Bearer eyJhbGciOiJIUzI1NiIs...
```

---

# 📝 Criando um Post

Endpoint

```http
POST /posts
```

Body

```json
{
    "title":"Meu Primeiro Post",
    "author":"Vinicius Godoy",
    "content":"Conteúdo do meu primeiro post."
}
```

Resposta

HTTP 201

```json
{
    "id":1,
    "title":"Meu Primeiro Post",
    "author":"Vinicius Godoy",
    "content":"Conteúdo do meu primeiro post."
}
```

---

## Fluxograma

```mermaid
flowchart TD

A[POST /posts]

A --> B[Controller]

B --> C[Service]

C --> D[Repository]

D --> E[Prisma]

E --> F[PostgreSQL]

F --> G[Resposta HTTP 201]
```

---

# 📄 Listando Todos os Posts

Endpoint

```http
GET /posts
```

Resposta

HTTP 200

```json
[
  {
      "id":1,
      "title":"Meu Primeiro Post",
      "author":"Vinicius",
      "content":"Conteúdo..."
  },
  {
      "id":2,
      "title":"Segundo Post",
      "author":"Maria",
      "content":"Outro conteúdo..."
  }
]
```

---

## Fluxograma

```mermaid
flowchart TD

Cliente --> GET

GET --> Controller

Controller --> Service

Service --> Repository

Repository --> Banco

Banco --> Lista

Lista --> Cliente
```

---

# 🔎 Buscar Post por ID

Endpoint

```http
GET /posts/1
```

Resposta

HTTP 200

```json
{
    "id":1,
    "title":"Meu Primeiro Post",
    "author":"Vinicius",
    "content":"Conteúdo..."
}
```

---

## Caso o Post não exista

HTTP 404

```json
{
    "message":"Post not found"
}
```

---

# ✏ Atualizando um Post

Endpoint

```http
PUT /posts/1
```

Body

```json
{
    "title":"Título Atualizado",
    "author":"Vinicius",
    "content":"Novo conteúdo."
}
```

Resposta

HTTP 200

```json
{
    "id":1,
    "title":"Título Atualizado",
    "author":"Vinicius",
    "content":"Novo conteúdo."
}
```

---

## Fluxograma

```mermaid
flowchart TD

PUT --> Controller

Controller --> Service

Service --> Repository

Repository --> Banco

Banco --> Atualiza

Atualiza --> Cliente
```

---

# 🗑 Excluindo um Post

Endpoint

```http
DELETE /posts/1
```

Resposta

HTTP 200

```json
{
    "message":"Deleted"
}
```

---

## Fluxograma

```mermaid
flowchart TD

DELETE --> Controller

Controller --> Service

Service --> Repository

Repository --> Banco

Banco --> Remove

Remove --> Cliente
```

---

# 🔍 Buscar por Palavra-chave

Endpoint

```http
GET /posts/search?q=post
```

Exemplo

```text
http://localhost:3000/posts/search?q=node
```

Resposta

HTTP 200

```json
[
    {
        "id":3,
        "title":"Node.js",
        "author":"Vinicius",
        "content":"Introdução ao Node..."
    }
]
```

---

## Fluxograma

```mermaid
flowchart TD

Busca --> Controller

Controller --> Service

Service --> Repository

Repository --> Banco

Banco --> Resultado

Resultado --> Cliente
```

---

# ❌ Erros Possíveis

## Token não enviado

HTTP 401

```json
{
    "error":"Token missing"
}
```

---

## Token inválido

HTTP 401

```json
{
    "error":"Invalid token"
}
```

---

## Usuário sem permissão

HTTP 403

```json
{
    "error":"Access denied"
}
```

---

## Dados inválidos

HTTP 400

```json
{
    "message":"Erro de validação",
    "errors":[
        "\"title\" length must be at least 5 characters long",
        "\"author\" is required"
    ]
}
```

---

## Rota inexistente

HTTP 404

```json
{
    "error":"Rota não encontrada"
}
```

---

## Erro interno

HTTP 500

```json
{
    "message":"Erro interno do servidor"
}
```

---

# 🧪 Executando os Testes

Todos os testes

```bash
npm test
```

Cobertura

```bash
npm test -- --coverage
```

Executar apenas um teste

```bash
npx jest tests/unit/postService.test.js
```

Executar testes em modo watch

```bash
npx jest --watch
```

---

# 🐳 Executando a Aplicação com Docker

O projeto também pode ser executado utilizando Docker, garantindo que todos os avaliadores utilizem o mesmo ambiente de desenvolvimento.

## Estrutura Recomendada

```
tech-challenge-blog2
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── prisma
├── src
├── package.json
└── .env
```

---

# Dockerfile

Crie um arquivo chamado **Dockerfile** na raiz do projeto.

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm","run","dev"]
```

---

# .dockerignore

```text
node_modules

coverage

.git

.vscode

.env

logs

README.md
```

---

# docker-compose.yml

```yaml
version: "3.9"

services:

  postgres:
    image: postgres:16

    container_name: tech-challenge-postgres

    restart: always

    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: tech_challenge_blog

    ports:
      - "5432:5432"

    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:

    build: .

    container_name: tech-challenge-api

    restart: always

    depends_on:
      - postgres

    ports:
      - "3000:3000"

    environment:

      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/tech_challenge_blog

      JWT_SECRET: minha_chave_super_secreta

      PORT: 3000

volumes:

  postgres_data:
```

---

# Construindo os Containers

Primeira execução

```bash
docker compose build
```

---

# Iniciando Containers

```bash
docker compose up
```

Modo background

```bash
docker compose up -d
```

---

# Visualizando Logs

```bash
docker compose logs
```

Logs em tempo real

```bash
docker compose logs -f
```

---

# Parando Containers

```bash
docker compose down
```

Removendo volumes

```bash
docker compose down -v
```

---

# Executando Prisma dentro do Container

Gerar Prisma Client

```bash
docker compose exec api npx prisma generate
```

Executar Migration

```bash
docker compose exec api npx prisma migrate dev
```

Executar Seed

```bash
docker compose exec api npm run seed
```

Abrir Prisma Studio

```bash
docker compose exec api npm run prisma:studio
```

---

# Arquitetura da Aplicação

A aplicação segue o padrão de arquitetura em camadas (Layered Architecture).

```mermaid
flowchart TD

A[Cliente]

A --> B[Routes]

B --> C[Controller]

C --> D[Service]

D --> E[Repository]

E --> F[Prisma ORM]

F --> G[(PostgreSQL)]
```

Cada camada possui uma responsabilidade específica.

| Camada | Responsabilidade |
|----------|------------------|
| Routes | Receber requisições HTTP |
| Controller | Controlar entrada e saída |
| Service | Regras de negócio |
| Repository | Persistência dos dados |
| Prisma | Comunicação com banco |
| PostgreSQL | Armazenamento |

---

# Arquitetura de Autenticação

```mermaid
sequenceDiagram

Usuário->>API: Login

API->>Banco: Buscar usuário

Banco-->>API: Dados

API->>JWT: Gerar Token

JWT-->>Usuário: Access Token
```

---

# Modelo do Banco

```mermaid
erDiagram

USER {

int id

string email

string password

string role

datetime createdAt

}

POST {

int id

string title

string content

}
```

---

# Fluxo Geral da Aplicação

```mermaid
flowchart LR

Cliente

Cliente --> Express

Express --> Rotas

Rotas --> Controller

Controller --> Service

Service --> Repository

Repository --> Prisma

Prisma --> PostgreSQL

PostgreSQL --> Cliente
```

---

# Organização das Camadas

```
Request

↓

Express

↓

Routes

↓

Controller

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL

↓

Response
```

---

# Cobertura de Testes

Executar

```bash
npm test
```

Ao final será exibido

```text
Statements

Branches

Functions

Lines
```

Também será criada a pasta

```
coverage
```

Abra

```
coverage/lcov-report/index.html
```

para visualizar o relatório detalhado.

---

# Boas Práticas Utilizadas

- Arquitetura em camadas
- Separação de responsabilidades
- RESTful API
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger Documentation
- Variáveis de ambiente
- Seed automatizado
- Testes automatizados
- Organização modular
- Middlewares
- Validação de entrada
- Tratamento de erros

---

# Troubleshooting

## Porta 3000 ocupada

Erro

```
EADDRINUSE
```

Solução

Windows

```bash
netstat -ano | findstr :3000

taskkill /PID PID /F
```

Linux

```bash
sudo lsof -i :3000

kill -9 PID
```

---

## Porta 5432 ocupada

Pare outro PostgreSQL ou altere a porta.

---

## DATABASE_URL inválida

Verifique

```
.env
```

---

## Prisma Client não encontrado

Execute

```bash
npx prisma generate
```

---

## Migration falhou

Execute

```bash
npx prisma migrate reset
```

---

## Swagger não abre

Verifique

```
http://localhost:3000/api-docs
```

Confirme se a API iniciou corretamente.

---

## JWT inválido

Faça login novamente e copie um novo token.

---

## npm install falha

Limpe cache

```bash
npm cache clean --force
```

Depois

```bash
npm install
```

---

## node_modules corrompido

Remova

```bash
rm -rf node_modules
```

Windows

```bash
rmdir /S node_modules
```

Depois

```bash
npm install
```

---

## PostgreSQL não conecta

Verifique

- usuário
- senha
- porta
- DATABASE_URL

---

# Deploy

O projeto pode ser publicado em:

- Render
- Railway
- Fly.io
- Azure App Service
- AWS Elastic Beanstalk
- Google Cloud Run
- DigitalOcean App Platform

Antes do deploy configure:

```
DATABASE_URL

JWT_SECRET

PORT
```

---

# FAQ

## Qual banco de dados é utilizado?

PostgreSQL com Prisma ORM.

---

## Como visualizar os dados?

```bash
npm run prisma:studio
```

---

## Como acessar a documentação?

```
http://localhost:3000/api-docs
```

---

## Como gerar dados fictícios?

```bash
npm run seed
```

---

## Como executar os testes?

```bash
npm test
```

---

## Como iniciar a API?

```bash
npm run dev
```

---

# Conclusão

Este projeto foi desenvolvido como parte do **Tech Challenge**, aplicando conceitos de desenvolvimento de APIs RESTful utilizando Node.js, Express, Prisma ORM e PostgreSQL.

A arquitetura foi organizada em camadas para facilitar manutenção, reutilização de código, escalabilidade e testes automatizados.

Além do CRUD de posts, a aplicação possui autenticação JWT, documentação Swagger, validações, seed automatizado e estrutura preparada para evolução.

---

# Licença

Este projeto está licenciado sob a licença **MIT**.

---

# Autors

**Vinicius Godoy - RM372941**
**Felipe Franco - RM371023**
**Gabriel Sancinetti - RM372901**

---

⭐ Se este projeto foi útil, considere deixar uma **estrela** no repositório para apoiar seu desenvolvimento.
