const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Tech Challenge Blog API (Fase 2) - FSDT - Grupo 1 - Turma 9",
    version: "1.0.0",
    description: "API REST para gerenciamento de posts",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // mantém isso
};

module.exports = swaggerJSDoc(options);