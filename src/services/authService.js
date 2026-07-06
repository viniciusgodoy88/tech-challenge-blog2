// Importa a instância do Prisma para comunicação com o banco de dados.
const prisma = require("../database/prisma");

// Biblioteca para criptografar e comparar senhas.
const bcrypt = require("bcryptjs");

// Biblioteca para geração de tokens JWT (autenticação).
const jwt = require("jsonwebtoken");

// Classe responsável pela lógica de autenticação da aplicação.
class AuthService {

  // Método responsável pelo registro de um novo usuário.
  async register({ email, password }) {

    // Verifica se já existe um usuário cadastrado com o mesmo e-mail.
    const userExists = await prisma.user.findUnique({ where: { email } });

    // Se o usuário já existir, lança um erro.
    if (userExists) {
      throw new Error("User already exists");
    }

    // Criptografa a senha antes de salvar no banco.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário no banco de dados.
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  // Método responsável pelo login do usuário.
  async login({ email, password }) {

    // Busca o usuário pelo e-mail.
    const user = await prisma.user.findUnique({ where: { email } });

    // Se o usuário não existir, retorna erro.
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Compara a senha informada com a senha armazenada (hash).
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Se a senha estiver incorreta, retorna erro.
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    // Gera um token JWT contendo informações do usuário.
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    // Retorna o token de autenticação.
    return { token };
  }
}

// Exporta uma instância única do serviço de autenticação.
module.exports = new AuthService();