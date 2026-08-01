// src/controllers/userController.js
const prisma = require('../database/prismaClient');

// Alterar papel do usuário (STUDENT / TEACHER) - Exclusivo do SUPERADMIN
async function updateUserRole(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ['STUDENT', 'TEACHER'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Papel inválido. Escolha 'STUDENT' ou 'TEACHER'." });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
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

// Remover usuário - Exclusivo do SUPERADMIN
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    if (req.user && req.user.id === id) {
      return res.status(400).json({ error: "O Superusuário não pode remover a própria conta." });
    }

    await prisma.user.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Usuário removido com sucesso!" });
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
    return res.status(500).json({ error: "Erro interno ao remover usuário." });
  }
}

module.exports = {
  updateUserRole,
  deleteUser,
};