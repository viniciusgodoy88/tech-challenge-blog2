import prisma from "../config/prisma.js";

const prisma = require("../database/prisma");

class PostRepository {
  async findAll() {
    return prisma.post.findMany();
  }

  async create(data) {
    return prisma.post.create({ data });
  }
  async search(term) {
    return prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

module.exports = new PostRepository();