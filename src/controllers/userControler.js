// src/controllers/userController.js
const prisma = require('../database/prismaClient');

// Alterar papel/propriedade do usuário (STUDENT / TEACHER)
async function updateUserRole(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Garante que só é possível alterar para papéis válidos
    const validRoles = ['STUDENT', 'TEACHER'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Papel inválido. Escolha entre 'STUDENT' ou 'TEACHER'." });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, email: true, role: true },
    });

    return res.status(200).json({
      message: `Papel do usuário atualizado para ${role} com sucesso!`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar papel do usuário:", error);
    return res.status(500).json({ error: "Erro interno ao atualizar papel." });
  }
}

// Remover usuário
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    // Evita que o Superadmin delete a si próprio por engano
    if (req.user && req.user.id === id) {
      return res.status(400).json({ error: "Você não pode deletar sua própria conta de Superusuário." });
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