const postService = require("../../src/services/postService");
const PostRepository = require("../../src/repositories/postRepository");

jest.mock("../../src/repositories/postRepository");

describe("PostService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createPost", () => {
    it("deve criar um post", async () => {
      const mock = {
        id: 1,
        title: "Teste",
        content: "Conteúdo"
      };

      PostRepository.create.mockResolvedValue(mock);

      const result = await postService.createPost({
        title: "Teste",
        content: "Conteúdo"
      });

      expect(result).toEqual(mock);
      expect(PostRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("searchPosts", () => {
    it("deve retornar posts encontrados", async () => {
      const mockPosts = [
        {
          id: 1,
          title: "Introdução ao Node",
          content: "Aprendendo Node.js"
        }
      ];

      PostRepository.search.mockResolvedValue(mockPosts);

      const result = await postService.searchPosts("Node");

      expect(result).toEqual(mockPosts);
      expect(PostRepository.search).toHaveBeenCalledWith("Node");
    });

    it("deve retornar lista vazia quando nenhum post for encontrado", async () => {
      PostRepository.search.mockResolvedValue([]);

      const result = await postService.searchPosts("Python");

      expect(result).toEqual([]);
      expect(PostRepository.search).toHaveBeenCalledWith("Python");
    });

    it("deve lançar erro quando o termo não for informado", async () => {
      await expect(postService.searchPosts()).rejects.toThrow();
    });
  });
});