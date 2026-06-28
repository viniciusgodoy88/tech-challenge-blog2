const request = require("supertest");
const app = require("../../src/app");

describe("E2E Flow", () => {
  let token;

  it("deve registrar usuário", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: "e2e@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
  });

  it("deve logar e gerar token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "e2e@test.com",
        password: "123456",
      });

    token = res.body.accessToken;

    expect(token).toBeDefined();
  });

  it("deve criar post autenticado", async () => {
    const res = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Post E2E",
        content: "Conteúdo E2E",
      });

    expect(res.statusCode).toBe(201);
  });
});