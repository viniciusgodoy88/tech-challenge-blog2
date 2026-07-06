// Simula um banco de dados em memória para armazenar os posts.
// Os dados são perdidos sempre que a aplicação é reiniciada.
const posts = [];

// Classe responsável por gerenciar as operações de persistência
// dos posts (CRUD) em memória.
class PostRepository {

  // Cria um novo post.
  create(data) {
    // Gera um ID incremental baseado no tamanho do array.
    const post = { id: posts.length + 1, ...data };

    // Adiciona o post ao "banco" em memória.
    posts.push(post);

    return post;
  }

  // Retorna todos os posts armazenados.
  findAll() {
    return posts;
  }

  // Busca um post pelo ID.
  findById(id) {
    return posts.find(p => p.id === id);
  }

  // Atualiza um post existente.
  update(id, data) {
    // Encontra o índice do post no array.
    const index = posts.findIndex(p => p.id === id);

    // Se não existir, retorna null.
    if (index === -1) return null;

    // Atualiza o post mantendo os dados anteriores.
    posts[index] = { ...posts[index], ...data };

    return posts[index];
  }

  // Remove um post pelo ID.
  delete(id) {
    const index = posts.findIndex(p => p.id === id);

    // Se não encontrar o post, retorna false.
    if (index === -1) return false;

    // Remove o post do array.
    posts.splice(index, 1);

    return true;
  }

  // Realiza busca por título (case-insensitive).
  search(query) {
    return posts.filter(p =>
      p.title?.toLowerCase().includes(query?.toLowerCase())
    );
  }
}

// Exporta uma instância única do repositório,
// seguindo o padrão Singleton.
module.exports = new PostRepository();