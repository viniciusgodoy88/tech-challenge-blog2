const request = require("supertest");
const app = require("../../src/app");
const prisma = require("../../src/database/prismaClient");
const bcrypt = require("bcryptjs");

describe("E2E Flow", () => {
  let token;
  const teacherEmail = `teacher_e2e_${Date.now()}@test.com`;
  const teacherPassword = "123456";

  // Prepara o usuário com permissão de TEACHER diretamente antes de testar
  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(teacherPassword, 10);
    await prisma.user.create({
      data: {
        email: teacherEmail,
        password: hashedPassword,
        role: "TEACHER", // Garante permissão para criar posts
      },
    });
  });

  // 1. Testa o cadastro de um novo usuário Aluno via API
  it("deve registrar usuário", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: `student_e2e_${Date.now()}@test.com`,
        password: "123456",
        pass: "123456",
      });

    expect(res.statusCode).toBe(201);
  });

  // 2. Testa o login do usuário Professor e geração do token
  it("deve logar e gerar token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: teacherEmail,
        password: teacherPassword,
        pass: teacherPassword,
      });

    expect(res.statusCode).toBe(200);

    token = res.body.token || res.body.accessToken;
    expect(token).toBeDefined();
  });

  // 3. Testa a criação de post com o token do TEACHER
  it("deve criar post autenticado", async () => {
    const res = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Post E2E Teste",
        content: "Conteúdo do post de testes E2E",
      });

    expect(res.statusCode).toBe(201);
  });
});