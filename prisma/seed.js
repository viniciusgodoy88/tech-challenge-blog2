const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // 1. Criptografia das senhas para compatibilidade com a API
  const superAdminPassword = await bcrypt.hash("admin123", 10);
  const teacherPassword = await bcrypt.hash("professor", 10);
  const studentPassword = await bcrypt.hash("aluno", 10);
  const defaultPassword = await bcrypt.hash("123456", 10);

  // 2. Criar Superusuário (Tem acesso total para alterar papéis/roles)
  const superUser = await prisma.user.upsert({
    where: { email: "superadmin@fiap.com.br" },
    update: {},
    create: {
      email: "superadmin@fiap.com.br",
      password: superAdminPassword,
      role: "SUPERADMIN",
    },
  });
  console.log("👤 Superusuário criado:", superUser.email);

  // 3. Criar Professor Padrão (FIAP PÓS TECH)
  const teacherUser = await prisma.user.upsert({
    where: { email: "professorpostech@fiap.com.br" },
    update: {},
    create: {
      email: "professorpostech@fiap.com.br",
      password: teacherPassword,
      role: "TEACHER",
    },
  });
  console.log("👨‍🏫 Professor criado:", teacherUser.email);

  // 4. Criar Aluno Padrão (FIAP PÓS TECH)
  const studentUser = await prisma.user.upsert({
    where: { email: "alunofiap@fiap.com.br" },
    update: {},
    create: {
      email: "alunofiap@fiap.com.br",
      password: studentPassword,
      role: "STUDENT",
    },
  });
  console.log("👨‍🎓 Aluno criado:", studentUser.email);

  // 5. Criar Usuários Aleatórios extras via Faker
  await prisma.user.createMany({
    data: Array.from({ length: 5 }).map(() => ({
      email: faker.internet.email().toLowerCase(),
      password: defaultPassword,
      role: "STUDENT",
    })),
    skipDuplicates: true,
  });
  console.log("👥 Usuários dinâmicos criados com Faker");

  // 6. Criar Posts Iniciais via Faker (Apenas title e content)
  await prisma.post.createMany({
    data: Array.from({ length: 10 }).map(() => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(2),
    })),
  });
  console.log("📝 10 Posts fictícios gerados com sucesso");

  console.log("✅ Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });