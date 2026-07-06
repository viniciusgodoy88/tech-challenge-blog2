// Importa a biblioteca swagger-jsdoc, responsável por gerar
// automaticamente a documentação da API a partir dos comentários
// presentes nas rotas da aplicação.
const swaggerJSDoc = require("swagger-jsdoc");

// Define as informações básicas da documentação OpenAPI.
const swaggerDefinition = {
  // Especifica a versão da especificação OpenAPI utilizada.
  openapi: "3.0.0",

  // Informações gerais da API.
  info: {
    // Nome da API exibido na documentação.
    title: "Tech Challenge Blog API (Fase 2) - FSDT - Grupo 1 - Turma 9",

    // Versão da API.
    version: "1.0.0",

    // Descrição resumida da API.
    description: "API REST para gerenciamento de posts",
  },

  // Define os servidores onde a API pode ser acessada.
  servers: [
    {
      // URL base utilizada pela documentação Swagger.
      url: "http://localhost:3000",
    },
  ],
};

// Configura as opções utilizadas pelo swagger-jsdoc.
const options = {
  // Utiliza a definição criada anteriormente.
  swaggerDefinition,

  // Informa onde estão os arquivos contendo as anotações
  // que serão utilizadas para gerar a documentação.
  apis: ["./src/routes/*.js"],
};

// Gera e exporta a documentação Swagger da aplicação.
module.exports = swaggerJSDoc(options);