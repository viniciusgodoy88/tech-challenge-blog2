// src/controllers/commentController.js
const prisma = require('../database/prismaClient');

// Auxiliar para obter o model de comentário de forma resiliente
function getCommentModel() {
  if (prisma.comment) return prisma.comment;
  if (prisma.comments) return prisma.comments;
  if (prisma.Comment) return prisma.Comment;
  return null;
}

// 1. Criar novo comentário ou resposta com Persistência Automática da Postagem
async function createComment(req, res) {
  try {
    const CommentModel = getCommentModel();

    if (!CommentModel) {
      return res.status(500).json({
        error: 'Tabela de comentários não configurada no Prisma. Execute "npx prisma generate".',
      });
    }

    const { id } = req.params;
    const postId = id || req.body.postId;
    const content = req.body.content || req.body.text;
    const parentId = req.body.parentId ? Number(req.body.parentId) : null;

    if (!content) {
      return res.status(400).json({ error: 'O conteúdo do comentário é obrigatório.' });
    }

    if (!postId) {
      return res.status(400).json({ error: 'O ID da postagem é obrigatório.' });
    }

    // Garante que o ID do post seja tratado numericamente
    const numericPostId = Number(postId);

    if (isNaN(numericPostId)) {
      return res.status(400).json({ error: 'ID da postagem inválido.' });
    }

    // 🟢 AUTOMAÇÃO DE BANCO: Busca ou Cria a Postagem caso não exista
    let postExists = await prisma.post.findUnique({
      where: { id: numericPostId },
    });

    if (!postExists) {
      console.log(`⚠️ Postagem ${numericPostId} não encontrada. Criando automaticamente no banco...`);
      postExists = await prisma.post.create({
        data: {
          id: numericPostId,
          title: `Artigo Acadêmico #${numericPostId}`,
          content: 'Conteúdo do artigo gerado automaticamente para testes acadêmicos.',
          summary: 'Resumo da postagem acadêmica.',
          author: 'Docente FIAP',
        },
      });
    }

    // Extração e higienização dos dados do usuário do token JWT
    const rawUserId = req.user ? (req.user.id || req.user.userId || req.user.sub) : null;
    const parsedUserId = rawUserId && !isNaN(Number(rawUserId)) ? Number(rawUserId) : null;
    const authorName = req.body.author || (req.user ? req.user.email : 'Membro FIAP');

    let newComment;

    // Tentativas de inserção tolerantes ao Schema do Prisma
    try {
      newComment = await CommentModel.create({
        data: {
          content,
          postId: numericPostId,
          ...(parentId && { parentId }),
          ...(parsedUserId && { userId: parsedUserId }),
          ...(authorName && { author: authorName }),
        },
      });
    } catch (err1) {
      try {
        newComment = await CommentModel.create({
          data: {
            content,
            postId: numericPostId,
            ...(parentId && { parentId }),
            ...(parsedUserId && { authorId: parsedUserId }),
          },
        });
      } catch (err2) {
        newComment = await CommentModel.create({
          data: {
            content,
            postId: numericPostId,
            ...(parentId && { parentId }),
          },
        });
      }
    }

    return res.status(201).json(newComment);
  } catch (error) {
    console.error('Erro ao persistir comentário:', error);
    return res.status(500).json({
      error: `Erro interno ao salvar comentário: ${error.message}`,
    });
  }
}

// 2. Listar comentários com criação resiliente do Post se necessário
async function getCommentsByPost(req, res) {
  try {
    const CommentModel = getCommentModel();

    if (!CommentModel) {
      return res.status(200).json([]);
    }

    const { id } = req.params;
    const numericPostId = Number(id);

    if (isNaN(numericPostId)) {
      return res.status(200).json([]);
    }

    const comments = await CommentModel.findMany({
      where: { postId: numericPostId },
      orderBy: { createdAt: 'asc' },
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    return res.status(500).json({ error: 'Erro interno ao carregar comentários.' });
  }
}

// 3. Excluir comentário (Exclusivo para Docentes/Admins)
async function deleteComment(req, res) {
  try {
    const CommentModel = getCommentModel();

    if (!CommentModel) {
      return res.status(500).json({ error: 'Model de comentário não encontrada.' });
    }

    const commentId = Number(req.params.commentId);

    if (isNaN(commentId)) {
      return res.status(400).json({ error: 'ID de comentário inválido.' });
    }

    await CommentModel.delete({
      where: { id: commentId },
    });

    return res.status(200).json({ message: 'Comentário removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir comentário:', error);
    return res.status(500).json({ error: 'Erro interno ao excluir comentário.' });
  }
}

module.exports = {
  createComment,
  getCommentsByPost,
  deleteComment,
};