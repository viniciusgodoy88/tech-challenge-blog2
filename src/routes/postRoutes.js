const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

const { ensureAuthenticated, checkRole } = require("../middlewares/authMiddleware");

// ==============================================================================
// ROTAS PÚBLICAS
// ==============================================================================
router.get("/search", (req, res) => postController.search(req, res));
router.get("/", (req, res) => postController.findAll(req, res));
router.get("/:id", (req, res) => postController.findById(req, res));

// 💬 Buscar comentários de um post (Público)
router.get("/:id/comments", (req, res) => commentController.getCommentsByPost(req, res));

// ==============================================================================
// ROTAS PARA USUÁRIOS AUTENTICADOS (Alunos, Professores e SuperAdmin)
// ==============================================================================

// 💬 Criar comentário ou resposta (Qualquer usuário logado pode comentar)
router.post(
  "/:id/comments",
  ensureAuthenticated,
  (req, res) => commentController.createComment(req, res)
);

// ==============================================================================
// ROTAS RESTRITAS PARA DOCENTES (TEACHER / SUPERADMIN)
// ==============================================================================

// 🗑️ Remover comentário (Exclusivo para professores/admin)
router.delete(
  "/comments/:commentId",
  ensureAuthenticated,
  checkRole("TEACHER"),
  (req, res) => commentController.deleteComment(req, res)
);

router.post(
  "/", 
  ensureAuthenticated, 
  checkRole("TEACHER"), 
  (req, res) => postController.create(req, res)
);

router.put(
  "/:id", 
  ensureAuthenticated, 
  checkRole("TEACHER"), 
  (req, res) => postController.update(req, res)
);

router.delete(
  "/:id", 
  ensureAuthenticated, 
  checkRole("TEACHER"), 
  (req, res) => postController.delete(req, res)
);

module.exports = router;