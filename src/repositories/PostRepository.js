const prisma = require("../database/prisma");

class PostRepository {
  async findAll() {
    return prisma.post.findMany();
  }

  async create(data) {
    return prisma.post.create({ data });
  }
}

module.exports = new PostRepository();