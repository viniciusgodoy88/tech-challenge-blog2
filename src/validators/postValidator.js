// Importa a biblioteca Joi, utilizada para validação de dados.
const Joi = require("joi");

// Define o schema de validação para um post.
// Ele determina as regras que os dados devem seguir.
const postSchema = Joi.object({

  // Título do post:
  // - Deve ser string
  // - Mínimo de 5 caracteres
  // - Máximo de 100 caracteres
  // - Obrigatório
  title: Joi.string().min(5).max(100).required(),

  // Autor do post:
  // - Deve ser string
  // - Obrigatório
  author: Joi.string().required(),

  // Conteúdo do post:
  // - Deve ser string
  // - Obrigatório
  content: Joi.string().required(),
});

// Exporta uma função responsável por validar os dados recebidos.
// O parâmetro "abortEarly: false" faz com que o Joi retorne
// todos os erros encontrados, não apenas o primeiro.
module.exports = (data) =>
  postSchema.validate(data, { abortEarly: false });