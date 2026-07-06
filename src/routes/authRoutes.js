// Importa o Express, framework utilizado para criar rotas HTTP.
const express = require("express");

// Cria uma instância do Router do Express, responsável por definir
// rotas de forma modular.
const router = express.Router();

// Importa o controller de autenticação, responsável pela lógica
// de registro e login de usuários.
const authController = require("../controllers/authController");

// Define a rota de registro de usuários.
// Quando receber uma requisição POST em /register,
// chama o método register do controller.
router.post("/register", authController.register);

// Define a rota de login de usuários.
// Quando receber uma requisição POST em /login,
// chama o método login do controller.
router.post("/login", authController.login);

// Exporta o conjunto de rotas para ser utilizado na aplicação principal.
module.exports = router;