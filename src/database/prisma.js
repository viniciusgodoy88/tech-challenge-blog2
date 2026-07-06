// Importa a classe PrismaClient da biblioteca Prisma.
// Ela é responsável por realizar a comunicação da aplicação
// com o banco de dados.
const { PrismaClient } = require("@prisma/client");

// Cria uma única instância do Prisma Client.
// Essa instância será utilizada para executar consultas,
// inserções, atualizações e exclusões no banco de dados.
const prisma = new PrismaClient();

// Exporta a instância do Prisma para que ela possa ser
// reutilizada em toda a aplicação, evitando múltiplas conexões.
module.exports = prisma;