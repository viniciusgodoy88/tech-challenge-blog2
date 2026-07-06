// Importa o repositório responsável pelo acesso e manipulação
// dos dados de posts.
const PostRepository = require("../repositories/postRepository");

// Classe responsável pelas regras de negócio relacionadas aos posts.
// Aqui ficam as validações e regras antes de chamar o repositório.
class PostService {

  // Cria um novo post com validação dos dados obrigatórios.
  async create(data) {

    // Valida se título e conteúdo foram informados.
    if (!data.title || !data.content) {
      throw new Error("Title and content required");
    }

    // Encaminha a criação para o repositório.
    return PostRepository.create(data);
  }

  // Retorna todos os posts cadastrados.
  async findAll() {
    return PostRepository.findAll();
  }

  // Busca um post pelo ID com validação.
  async findById(id) {

    // Valida se o ID foi informado.
    if (!id) throw new Error("ID required");

    // Busca o post no repositório.
    const post = await PostRepository.findById(id);

    // Caso não exista, lança erro.
    if (!post) throw new Error("Post not found");

    return post;
  }

  // Realiza busca de posts por termo.
  async search(term) {

    // Valida se o termo foi informado.
    if (!term || term.trim() === "") {
      throw new Error("Search term required");
    }

    // Executa a busca no repositório.
    return PostRepository.search(term);
  }

  // Atualiza um post existente.
  async update(id, data) {
    return PostRepository.update(id, data);
  }

  // Remove um post pelo ID.
  async delete(id) {
    return PostRepository.delete(id);
  }
}

// Exporta uma instância única do serviço de posts.
module.exports = new PostService();