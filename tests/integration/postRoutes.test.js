// Importa a biblioteca Supertest para realizar requisições HTTP
// durante os testes de integração da API.
const request = require("supertest");

// Importa a aplicação Express que será utilizada nos testes.
const app = require("../../src/app");

// Agrupa os testes de integração (E2E) das rotas de posts.
describe("Post Routes - Integration Tests (E2E)", () => {
  // Variável que armazenará o token JWT obtido após o login.
  let token;

  // Executa uma única vez antes de todos os testes.
  beforeAll(async () => {
    // Garante que o usuário exista realizando o cadastro.
    await request(app)
      .post("/auth/register")
      .send({
        email: "test@test.com",
        password: "123456",
      });

    // Realiza o login com o usuário cadastrado.
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test@test.com",
        password: "123456",
      });

    // Armazena o token JWT retornado pela API.
    token = response.body.accessToken;
  });

  // Verifica se o login foi realizado com sucesso
  // e se o token de autenticação foi gerado.
  it("deve realizar login", () => {
    expect(token).toBeDefined();
  });
});