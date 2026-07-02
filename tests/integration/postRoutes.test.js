const request = require("supertest");
const app = require("../../src/app");

describe("Post Routes - Integration Tests (E2E)", () => {
  let token;
  let postId;

  beforeAll(async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({
        email: "test@test.com",
        password: "123456",
      });

    token = login.body.accessToken;
  });

  it("deve realizar login", () => {
    expect(token).toBeDefined();
  });

  it("deve criar um post autenticado", async () => {
    const res = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Introdução ao Node",
        content: "Aprendendo Node.js com Express",
      });

    expect(res.statusCode).toBe(201);

    postId = res.body.id;
  });

  it("deve listar todos os posts", async () => {
    const res = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("deve buscar post por id", async () => {
    const res = await request(app)
      .get(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(postId);
  });

  it("deve pesquisar posts por palavra-chave", async () => {
    const res = await request(app)
      .get("/posts/search?q=Node")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("deve atualizar um post", async () => {
    const res = await request(app)
      .put(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Node Atualizado",
        content: "Conteúdo Atualizado",
      });

    expect(res.statusCode).toBe(200);
  });

  it("deve excluir um post", async () => {
    const res = await request(app)
      .delete(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});