const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // usuários
  await prisma.user.createMany({
    data: Array.from({ length: 5 }).map(() => ({
      email: faker.internet.email(),
      password: "123456",
      role: "user",
    })),
  });

  // posts
  await prisma.post.createMany({
    data: Array.from({ length: 10 }).map(() => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    })),
  });

  console.log("✅ Seed finalizado");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });