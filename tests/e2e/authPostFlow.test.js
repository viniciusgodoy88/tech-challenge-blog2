// Importa a biblioteca Supertest, utilizada para realizar requisições HTTP
// durante os testes da API.
const request = require("supertest");

// Importa a aplicação Express para que ela seja testada sem precisar
// iniciar o servidor manualmente.
const app = require("../../src/app");

// Agrupa os testes de ponta a ponta (End-to-End - E2E),
// simulando o fluxo completo de um usuário na API.
describe("E2E Flow", () => {
  // Variável que armazenará o token JWT gerado após o login.
  let token;

  // Testa o cadastro de um novo usuário.
  it("deve registrar usuário", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: "e2e@test.com",
        password: "123456",
      });

    // Verifica se o cadastro foi realizado com sucesso (HTTP 201).
    expect(res.statusCode).toBe(201);
  });

  // Testa o login do usuário e a geração do token de autenticação.
  it("deve logar e gerar token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "e2e@test.com",
        password: "123456",
      });

    // Armazena o token para ser utilizado nos próximos testes.
    token = res.body.accessToken;

    // Verifica se o token foi gerado corretamente.
    expect(token).toBeDefined();
  });

  // Testa a criação de um post utilizando autenticação JWT.
  it("deve criar post autenticado", async () => {
    const res = await request(app)
      .post("/posts")
      // Envia o token no cabeçalho Authorization.
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Post E2E",
        content: "Conteúdo E2E",
      });

    // Verifica se o post foi criado com sucesso (HTTP 201).
    expect(res.statusCode).toBe(201);
  });
});