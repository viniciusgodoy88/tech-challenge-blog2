// Importa o Express, framework utilizado para gerenciamento de rotas HTTP.
const express = require("express");

// Importa as rotas relacionadas aos posts, definidas em outro módulo.
const postRoutes = require("./postRoutes");

// Cria uma instância do Router do Express para agrupar as rotas da aplicação.
const router = express.Router();

// Registra todas as rotas de posts sob o prefixo "/posts".
// Exemplo:
// GET /posts
// POST /posts
// GET /posts/:id
router.use("/posts", postRoutes);

// Exporta o router principal, que centraliza as rotas da aplicação.
module.exports = router;