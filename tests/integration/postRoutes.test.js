const request = require("supertest");
const app = require("../../src/app");

describe("Post Routes - Integration Tests (E2E)", () => {
  let token;

  it("login e gera token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@test.com", password: "123456" });

    token = res.body.accessToken;

    expect(token).toBeDefined();
  });

  it("cria post autenticado", async () => {
    const res = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Post",
        content: "Content",
      });

    expect(res.statusCode).toBe(201);
  });
});