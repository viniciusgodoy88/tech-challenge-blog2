const request = require("supertest");
const app = require("../../src/app");

describe("Post Routes - Integration Tests (E2E)", () => {
  let token;

  beforeAll(async () => {
    // garante usuário existe
    await request(app)
      .post("/auth/register")
      .send({
        email: "test@test.com",
        password: "123456",
      });

    // login
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test@test.com",
        password: "123456",
      });

    token = response.body.accessToken;
  });

  it("deve realizar login", () => {
    expect(token).toBeDefined();
  });
});