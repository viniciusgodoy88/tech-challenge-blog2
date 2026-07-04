const PostService = require("../services/PostService");

class PostController {
  async create(req, res) {
    const post = await PostService.create(req.body);
    return res.status(201).json(post);
  }

  async findAll(req, res) {
    const posts = await PostService.findAll();
    return res.status(200).json(posts);
  }

  async findById(req, res) {
    const post = await PostService.findById(Number(req.params.id));
    return res.status(200).json(post);
  }

  async search(req, res) {
    const posts = await PostService.search(req.query.q);
    return res.status(200).json(posts);
  }

  async update(req, res) {
    const post = await PostService.update(
      Number(req.params.id),
      req.body
    );
    return res.status(200).json(post);
  }

  async delete(req, res) {
    await PostService.delete(Number(req.params.id));
    return res.status(200).json({ message: "deleted" });
  }
}

module.exports = new PostController();