// Importa o Express, framework utilizado para criação de rotas HTTP.
const express = require("express");

// Cria uma instância do Router do Express para definir rotas de forma modular.
const router = express.Router();

// Importa os controllers responsáveis pela lógica de negócios dos posts e comentários.
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

// Importa os middlewares de autenticação e autorização por perfil (role)
const { ensureAuthenticated, checkRole } = require("../middlewares/authMiddleware");

// ==============================================================================
// ROTAS PÚBLICAS (Acesso liberado para Alunos, Visitantes e Professores)
// ==============================================================================

// Rota para buscar posts por termo de pesquisa.
// Método: GET /posts/search?q=termo
router.get("/search", (req, res) => postController.search(req, res));

// Rota para listar todos os posts.
// Método: GET /posts
router.get("/", (req, res) => postController.findAll(req, res));

// Rota para buscar um post específico pelo ID.
// Método: GET /posts/:id
router.get("/:id", (req, res) => postController.findById(req, res));

// 💬 Rota para buscar os comentários de um post específico.
// Método: GET /posts/:id/comments
router.get("/:id/comments", (req, res) => commentController.getCommentsByPost(req, res));


// ==============================================================================
// ROTAS AUTENTICADAS (Alunos, Professores e SuperAdmin autenticados)
// ==============================================================================

// 💬 Rota para enviar um comentário em um post.
// Método: POST /posts/:id/comments
router.post(
  "/:id/comments",
  ensureAuthenticated,
  (req, res) => commentController.createComment(req, res)
);


// ==============================================================================
// ROTAS RESTRITAS (Acesso EXCLUSIVO para Docentes / Professores com token JWT)
// ==============================================================================

// Rota para criar um novo post.
// Método: POST /posts
router.post(
  "/", 
  ensureAuthenticated, 
  checkRole("TEACHER"), 
  (req, res) => postController.create(req, res)
);

// Rota para atualizar um post existente pelo ID.
// Método: PUT /posts/:id
router.put(
  "/:id", 
  ensureAuthenticated, 
  checkRole("TEACHER"), 
  (req, res) => postController.update(req, res)
);

// Rota para deletar um post pelo ID.
// Método: DELETE /posts/:id
router.delete(
  "/:id", 
  ensureAuthenticated, 
  checkRole("TEACHER"), 
  (req, res) => postController.delete(req, res)
);

// Exporta o conjunto de rotas para ser usado na aplicação principal (app.js).
module.exports = router;