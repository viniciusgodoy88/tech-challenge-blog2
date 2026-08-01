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

// Cadastrar novo usuário público (Força perfil STUDENT por padrão)
router.post('/register', authController.register);

// Autenticar usuário e gerar token JWT
router.post('/login', authController.login);

// ==============================================================================
// ROTAS EXCLUSIVAS DO SUPERADMIN (Gestão de Usuários)
// ==============================================================================

// 🔒 Listar todos os usuários do sistema
router.get(
  '/users',
  authenticate,
  authorize('SUPERADMIN'),
  userController.getAllUsers
);

// 🔒 Cadastrar novo usuário (Aluno ou Professor) com senha padrão (Ex: mudar123)
router.post(
  '/users',
  authenticate,
  authorize('SUPERADMIN'),
  userController.createUserByAdmin
);

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