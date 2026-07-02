import postRepository from "../repositories/postRepository.js";

const redis = require("../config/redis");
const postRepository = require("../repositories/postRepository");

class PostService {
  async getAllPosts() {
    const cache = await redis.get("posts");

    if (cache) {
      return JSON.parse(cache);
    }

    const posts = await postRepository.findAll();

    await redis.setEx("posts", 60, JSON.stringify(posts));

    return posts;
  }
  async searchPosts(term) {

    if (!term) {
      throw new Error("O termo de busca é obrigatório.");
    }

    return await postRepository.search(term);
  }
}

module.exports = new PostService();