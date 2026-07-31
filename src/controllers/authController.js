// src/controllers/authController.js

const prisma = require('../database/prismaClient'); // ou seu model de banco de dados
const bcrypt = require('bcryptjs');

async function register(req, res) {
  try {
    const { name, email, pass, password, role } = req.body;
    const userPassword = password || pass;

    if (!email || !userPassword) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    // 1. Verifica se quem está fazendo a requisição é um SUPERUSUÁRIO / ADMIN
    // (req.user é preenchido pelo middleware de autenticação se houver token)
    const isSuperUser = req.user && (req.user.role === 'SUPERADMIN' || req.user.role === 'ADMIN');

    // 2. REGRA DE SEGURANÇA SUPREMA DO BACK-END:
    // Se for Superusuário, aceita o 'role' enviado no body.
    // Se for cadastro público ou usuário comum, FORÇA a role para 'STUDENT'.
    const finalRole = isSuperUser && role ? role : 'STUDENT';

    // 3. Hash da senha para segurança
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // 4. Criação do usuário no Banco de Dados com a role validada
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: finalRole, // Garantido contra falsificação / tampering de requisição!
      },
    });

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "Erro interno ao cadastrar usuário." });
  }
}

module.exports = { register };