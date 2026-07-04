const PostRepository = require("../repositories/postRepository");

class PostService {
  async create(data) {
    if (!data.title || !data.content) {
      throw new Error("Title and content required");
    }

    return PostRepository.create(data);
  }

  async findAll() {
    return PostRepository.findAll();
  }

  async findById(id) {
    if (!id) throw new Error("ID required");

    const post = await PostRepository.findById(id);

    if (!post) throw new Error("Post not found");

    return post;
  }

  async search(term) {
    if (!term || term.trim() === "") {
      throw new Error("Search term required");
    }

    return PostRepository.search(term);
  }

  async update(id, data) {
    return PostRepository.update(id, data);
  }

  async delete(id) {
    return PostRepository.delete(id);
  }
}

module.exports = new PostService();