const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// GET /posts
const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany()

    return res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar posts' })
  }
}

// GET /posts/:id
const getPostById = async (req, res) => {
  try {
    const { id } = req.params

    const post = await prisma.post.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' })
    }

    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar post' })
  }
}

// POST /posts
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body

    const post = await prisma.post.create({
      data: {
        title,
        content
      }
    })

    return res.status(201).json(post)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar post' })
  }
}

// PUT /posts/:id
const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body

    const postExists = await prisma.post.findUnique({
      where: { id: Number(id) }
    })

    if (!postExists) {
      return res.status(404).json({ error: 'Post não encontrado' })
    }

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content
      }
    })

    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar post' })
  }
}

// DELETE /posts/:id
const deletePost = async (req, res) => {
  try {
    const { id } = req.params

    const postExists = await prisma.post.findUnique({
      where: { id: Number(id) }
    })

    if (!postExists) {
      return res.status(404).json({ error: 'Post não encontrado' })
    }

    await prisma.post.delete({
      where: { id: Number(id) }
    })

    return res.status(200).json({ message: 'Post deletado com sucesso' })
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar post' })
  }
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
}