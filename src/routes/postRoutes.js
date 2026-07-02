const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Buscar todos os posts
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 */
router.get("/posts", postController.getPosts);

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Buscar posts por palavra-chave
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resultado da busca
 */
router.get("/posts/search", postController.searchPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Buscar post por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post não encontrado
 */
router.get("/posts/:id", postController.getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Criar novo post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 */
router.post("/posts", postController.createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualizar post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post atualizado
 */
router.put("/posts/:id", postController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deletar post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deletado
 */
router.delete("/posts/:id", postController.deletePost);

module.exports = router;