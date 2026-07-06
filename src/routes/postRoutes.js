// Importa o Express, framework utilizado para criação de rotas HTTP.
const express = require("express");

// Cria uma instância do Router do Express para definir rotas de forma modular.
const router = express.Router();

// Importa o controller responsável pela lógica de negócios dos posts.
const postController = require("../controllers/postController");

// Rota para criar um novo post.
// Método: POST /
router.post("/", (req, res) => postController.create(req, res));

// Rota para listar todos os posts.
// Método: GET /
router.get("/", (req, res) => postController.findAll(req, res));

// Rota para buscar um post específico pelo ID.
// Método: GET /:id
router.get("/:id", (req, res) => postController.findById(req, res));

// Rota para atualizar um post existente pelo ID.
// Método: PUT /:id
router.put("/:id", (req, res) => postController.update(req, res));

// Rota para deletar um post pelo ID.
// Método: DELETE /:id
router.delete("/:id", (req, res) => postController.delete(req, res));

// Rota para buscar posts por termo.
// Método: GET /search?q=termo
router.get("/search", (req, res) => postController.search(req, res));

// Exporta o conjunto de rotas para ser usado na aplicação principal.
module.exports = router;