// src/controllers/userController.js
const prisma = require('../database/prismaClient');
const bcrypt = require('bcryptjs');

// 1. Listar todos os usuários - Exclusivo do SUPERADMIN
async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ error: "Erro interno ao listar usuários." });
  }
}

// 2. Criar Novo Usuário (Aluno ou Professor) - Exclusivo do SUPERADMIN
async function createUserByAdmin(req, res) {
  try {
    const { email, role, password } = req.body;
    const defaultPassword = password || 'mudar123';

    if (!email) {
      return res.status(400).json({ error: "E-mail é obrigatório." });
    }

    const validRoles = ['STUDENT', 'TEACHER'];
    const selectedRole = validRoles.includes(role) ? role : 'STUDENT';

    // Verificar se o e-mail já está em uso
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Este e-mail já está cadastrado no sistema." });
    }

    // Hash da senha inicial (padrão: mudar123)
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: selectedRole,
      },
      select: { id: true, email: true, role: true },
    });

    return res.status(201).json({
      message: `Usuário (${selectedRole}) cadastrado com sucesso! Senha inicial: ${defaultPassword}`,
      user: newUser,
    });
  } catch (error) {
    console.error("Erro ao criar usuário pelo SuperAdmin:", error);
    return res.status(500).json({ error: "Erro interno ao cadastrar novo usuário." });
  }
}

// 3. Alterar papel do usuário (STUDENT / TEACHER) - Exclusivo do SUPERADMIN
async function updateUserRole(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ['STUDENT', 'TEACHER'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Papel inválido. Escolha 'STUDENT' ou 'TEACHER'." });
    }

    // Suporta ID tanto como número inteiro quanto como string/UUID
    const userId = isNaN(Number(id)) ? id : Number(id);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, email: true, role: true },
    });

    return res.status(200).json({
      message: `Papel atualizado para ${role} com sucesso!`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar papel do usuário:", error);
    return res.status(500).json({ error: "Erro interno ao atualizar papel do usuário." });
  }
}

// 4. Remover usuário - Exclusivo do SUPERADMIN
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const userId = isNaN(Number(id)) ? id : Number(id);

    // Evita que o Superusuário delete a própria conta por engano
    if (req.user && (req.user.id === id || req.user.id === userId)) {
      return res.status(400).json({ error: "O Superusuário não pode remover a própria conta." });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({ message: "Usuário removido com sucesso!" });
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
    return res.status(500).json({ error: "Erro interno ao remover usuário." });
  }
}

// Exportação das funções do controller
module.exports = {
  getAllUsers,
  createUserByAdmin,
  updateUserRole,
  deleteUser,
};