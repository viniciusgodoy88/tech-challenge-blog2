const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

// Buscar todos os posts
router.get("/posts", postController.getPosts);

// Buscar posts por palavra-chave (deve vir antes de /posts/:id)
router.get("/posts/search", postController.searchPosts);

// Buscar post por ID
router.get("/posts/:id", postController.getPostById);

// Criar post
router.post("/posts", postController.createPost);

// Atualizar post
router.put("/posts/:id", postController.updatePost);

// Deletar post
router.delete("/posts/:id", postController.deletePost);

module.exports = router;