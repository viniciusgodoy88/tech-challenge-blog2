jest.mock("src/repositories/postRepository", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  search: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const PostRepository = require("src/repositories/postRepository");
const PostService = require("../../src/services/PostService");

describe("PostService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar um post", async () => {
    PostRepository.create.mockResolvedValue({
      id: 1,
      title: "Test",
      content: "Content",
    });

    const result = await PostService.create({
      title: "Test",
      content: "Content",
    });

    expect(result).toHaveProperty("id");
    expect(PostRepository.create).toHaveBeenCalled();
  });

  it("deve retornar erro se não tiver título ou conteúdo", async () => {
    await expect(PostService.create({})).rejects.toThrow(
      "Title and content required"
    );
  });

  it("deve listar posts", async () => {
    PostRepository.findAll.mockResolvedValue([{ id: 1 }]);

    const result = await PostService.findAll();

    expect(result.length).toBe(1);
  });

  it("deve buscar post por id", async () => {
    PostRepository.findById.mockResolvedValue({
      id: 1,
      title: "Test",
    });

    const result = await PostService.findById(1);

    expect(result.id).toBe(1);
  });

  it("deve lançar erro se post não existir", async () => {
    PostRepository.findById.mockResolvedValue(null);

    await expect(PostService.findById(999)).rejects.toThrow(
      "Post not found"
    );
  });

  it("deve buscar posts por termo", async () => {
    PostRepository.search.mockResolvedValue([{ id: 1 }]);

    const result = await PostService.search("node");

    expect(Array.isArray(result)).toBe(true);
  });

  it("deve validar termo de busca vazio", async () => {
    await expect(PostService.search("")).rejects.toThrow(
      "Search term required"
    );
  });
});