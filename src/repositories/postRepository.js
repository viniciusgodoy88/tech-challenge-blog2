const posts = [];

class PostRepository {
  create(data) {
    const post = { id: posts.length + 1, ...data };
    posts.push(post);
    return post;
  }

  findAll() {
    return posts;
  }

  findById(id) {
    return posts.find(p => p.id === id);
  }

  update(id, data) {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;

    posts[index] = { ...posts[index], ...data };
    return posts[index];
  }

  delete(id) {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return false;

    posts.splice(index, 1);
    return true;
  }

  search(query) {
    return posts.filter(p =>
      p.title?.toLowerCase().includes(query?.toLowerCase())
    );
  }
}

module.exports = new PostRepository();