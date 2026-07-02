const express = require("express");
const swaggerUi = require("swagger-ui-express");

const postRoutes = require("./routes/postRoutes");
const swaggerSpec = require("./docs/swagger");

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Rotas da API
app.use("/", postRoutes);

console.log(JSON.stringify(swaggerSpec, null, 2));

// Documentação Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Rota inicial
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Tech Challenge Blog API",
    documentation: "http://localhost:3000/api-docs",
    status: "online",
  });
});

// Middleware para rotas inexistentes
app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada",
  });
});

module.exports = app;