const express = require('express');
const router = express.Router();

// Importação dos Controllers
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// Importação do Middleware com suporte a múltiplos nomes (aliases)
const authMiddleware = require('../middlewares/authMiddleware');

const authenticate = authMiddleware.authenticateToken || authMiddleware.ensureAuthenticated;
const authorize = authMiddleware.authorizeRoles || authMiddleware.checkRole;

// ==============================================================================
// ROTAS PÚBLICAS DE AUTENTICAÇÃO
// ==============================================================================

// Cadastrar novo usuário (Cadastro público força perfil STUDENT)
router.post('/register', authController.register);

// Autenticar usuário e gerar token JWT
router.post('/login', authController.login);

// ==============================================================================
// ROTAS EXCLUSIVAS DO SUPERADMIN (Gestão de Usuários)
// ==============================================================================

// 🔒 Atualizar o papel/role de um usuário (STUDENT <-> TEACHER)
router.patch(
  '/users/:id/role',
  authenticate,
  authorize('SUPERADMIN'),
  userController.updateUserRole
);

// 🔒 Remover um usuário do sistema
router.delete(
  '/users/:id',
  authenticate,
  authorize('SUPERADMIN'),
  userController.deleteUser
);

module.exports = router;