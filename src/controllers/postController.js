// Importa a camada de serviço responsável pelas regras de negócio
// relacionadas aos posts.
const PostService = require("../services/PostService");

// Classe responsável por controlar as requisições HTTP relacionadas aos posts.
class PostController {

  // Cria um novo post.
  async create(req, res) {
    // Envia os dados da requisição para a camada de serviço.
    const post = await PostService.create(req.body);

    // Retorna o post criado com status HTTP 201 (Created).
    return res.status(201).json(post);
  }

  // Retorna todos os posts cadastrados.
  async findAll(req, res) {
    // Obtém a lista de posts através da camada de serviço.
    const posts = await PostService.findAll();

    // Retorna a lista de posts com status HTTP 200 (OK).
    return res.status(200).json(posts);
  }

  // Busca um post pelo seu ID.
  async findById(req, res) {
    // Converte o parâmetro da URL para número antes da busca.
    const post = await PostService.findById(Number(req.params.id));

    // Retorna o post encontrado.
    return res.status(200).json(post);
  }

  // Atualiza um post existente.
  async update(req, res) {
    // Envia o ID e os novos dados para a camada de serviço.
    const post = await PostService.update(Number(req.params.id), req.body);

    // Retorna o post atualizado.
    return res.status(200).json(post);
  }

  // Remove um post pelo ID.
  async delete(req, res) {
    // Solicita a exclusão do post.
    await PostService.delete(Number(req.params.id));

    // Retorna uma mensagem de confirmação.
    return res.status(200).json({ message: "Deleted" });
  }

  // Busca posts com base em um termo informado na query string.
  async search(req, res) {
    // Obtém o termo de busca pelo parâmetro "q".
    const posts = await PostService.search(req.query.q);

    // Retorna os posts encontrados.
    return res.status(200).json(posts);
  }
}

// Exporta uma única instância do controlador.
module.exports = new PostController();