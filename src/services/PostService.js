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
}

module.exports = new PostService();