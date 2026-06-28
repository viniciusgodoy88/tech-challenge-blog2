const postService = require("../../src/services/postService");
const PostRepository = require("../../src/repositories/postRepository");

jest.mock("../../src/repositories/postRepository");

describe("PostService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar post", async () => {
    const mock = { id: 1, title: "teste" };

    PostRepository.create.mockResolvedValue(mock);

    const result = await postService.createPost({ title: "teste" });

    expect(result.id).toBe(1);
    expect(PostRepository.create).toHaveBeenCalled();
  });
});