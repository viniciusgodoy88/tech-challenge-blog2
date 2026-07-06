// Importa o validador responsável por validar os dados de um post.
// Geralmente utiliza bibliotecas como Joi ou Zod.
const validatePost = require("../validators/postValidator");

// Middleware responsável por validar o corpo da requisição
// antes de permitir a criação ou atualização de um post.
const validatePostMiddleware = (req, res, next) => {

  // Executa a validação dos dados enviados no body da requisição.
  const { error } = validatePost(req.body);

  // Caso exista erro de validação, interrompe o fluxo da requisição.
  if (error) {
    return res.status(400).json({
      // Mensagem geral de erro de validação.
      message: "Erro de validação",

      // Lista detalhada dos erros encontrados.
      errors: error.details.map((err) => err.message),
    });
  }

  // Se não houver erros, permite que a requisição continue.
  next();
};

// Exporta o middleware para ser utilizado nas rotas de posts.
module.exports = validatePostMiddleware;