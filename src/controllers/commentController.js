// src/controllers/commentController.js
const prisma = require('../database/prismaClient');

// 1. Criar novo comentário para um Post
async function createComment(req, res) {
  try {
    const { id } = req.params; // Captura ID da rota /posts/:id/comments
    const postId = id || req.body.postId;
    const content = req.body.content || req.body.text;

    if (!content) {
      return res.status(400).json({ error: 'O conteúdo do comentário é obrigatório.' });
    }

    if (!postId) {
      return res.status(400).json({ error: 'O ID da postagem é obrigatório.' });
    }

    // Trata o ID (seja inteiro ou UUID/string)
    const numericPostId = isNaN(Number(postId)) ? postId : Number(postId);
    const userId = req.user ? req.user.id : null;
    const authorName = req.body.author || (req.user ? req.user.email : 'Membro FIAP');

    const newComment = await prisma.comment.create({
      data: {
        content,
        author: authorName,
        postId: numericPostId,
        ...(userId && { userId: isNaN(Number(userId)) ? userId : Number(userId) }),
      },
    });

    return res.status(201).json(newComment);
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    return res.status(500).json({ error: 'Erro interno ao criar comentário.' });
  }
}

// 2. Listar comentários de um Post específico
async function getCommentsByPost(req, res) {
  try {
    const { id } = req.params;
    const numericPostId = isNaN(Number(id)) ? id : Number(id);

    const comments = await prisma.comment.findMany({
      where: { postId: numericPostId },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error('Erro ao listar comentários:', error);
    return res.status(500).json({ error: 'Erro interno ao listar comentários.' });
  }
}

module.exports = {
  createComment,
  getCommentsByPost,
};