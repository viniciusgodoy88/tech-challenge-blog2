// Cria um mock do repositório de posts.
// Todas as funções do repositório são substituídas por funções simuladas (mocks),
// evitando acesso ao banco de dados durante os testes.
jest.mock("src/repositories/postRepository", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  search: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

// Importa o repositório (mockado) e o serviço que será testado.
const PostRepository = require("src/repositories/postRepository");
const PostService = require("../../src/services/PostService");

// Agrupa todos os testes da camada de serviço de posts.
describe("PostService", () => {
  // Executa antes de cada teste, limpando o histórico dos mocks
  // para garantir que um teste não interfira no outro.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Testa a criação de um novo post.
  it("deve criar um post", async () => {
    // Simula o retorno do repositório após criar o post.
    PostRepository.create.mockResolvedValue({
      id: 1,
      title: "Test",
      content: "Content",
    });

    // Chama o método do serviço.
    const result = await PostService.create({
      title: "Test",
      content: "Content",
    });

    // Verifica se o post possui um ID e se o repositório foi chamado.
    expect(result).toHaveProperty("id");
    expect(PostRepository.create).toHaveBeenCalled();
  });

  // Testa a validação dos dados obrigatórios.
  it("deve retornar erro se não tiver título ou conteúdo", async () => {
    await expect(PostService.create({})).rejects.toThrow(
      "Title and content required"
    );
  });

  // Testa a listagem de todos os posts.
  it("deve listar posts", async () => {
    // Simula o retorno de uma lista de posts.
    PostRepository.findAll.mockResolvedValue([{ id: 1 }]);

    const result = await PostService.findAll();

    // Verifica se a lista possui um item.
    expect(result.length).toBe(1);
  });

  // Testa a busca de um post pelo ID.
  it("deve buscar post por id", async () => {
    // Simula um post encontrado.
    PostRepository.findById.mockResolvedValue({
      id: 1,
      title: "Test",
    });

    const result = await PostService.findById(1);

    // Verifica se o ID retornado está correto.
    expect(result.id).toBe(1);
  });

  // Testa o comportamento quando o post não existe.
  it("deve lançar erro se post não existir", async () => {
    // Simula que nenhum post foi encontrado.
    PostRepository.findById.mockResolvedValue(null);

    // Verifica se o serviço lança a exceção esperada.
    await expect(PostService.findById(999)).rejects.toThrow(
      "Post not found"
    );
  });

  // Testa a busca de posts por um termo.
  it("deve buscar posts por termo", async () => {
    // Simula o retorno de posts encontrados.
    PostRepository.search.mockResolvedValue([{ id: 1 }]);

    const result = await PostService.search("node");

    // Verifica se o resultado é um array.
    expect(Array.isArray(result)).toBe(true);
  });

  // Testa a validação quando o termo de busca é vazio.
  it("deve validar termo de busca vazio", async () => {
    await expect(PostService.search("")).rejects.toThrow(
      "Search term required"
    );
  });
});