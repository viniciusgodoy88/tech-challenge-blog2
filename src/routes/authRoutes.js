// src/routes/userRoutes.js (ou authRoutes.js)
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// 🔒 ROTA EXCLUSIVA DO SUPERADMIN: Atualizar a role de um usuário (STUDENT <-> TEACHER)
router.patch(
  '/users/:id/role',
  authenticateToken,
  authorizeRoles('SUPERADMIN'),
  userController.updateUserRole
);

// 🔒 ROTA EXCLUSIVA DO SUPERADMIN: Remover um usuário do sistema
router.delete(
  '/users/:id',
  authenticateToken,
  authorizeRoles('SUPERADMIN'),
  userController.deleteUser
);

module.exports = router;