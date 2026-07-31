const express = require("express");
const cors = require("cors"); // 1. Importação da biblioteca cors
const swaggerUi = require("swagger-ui-express");

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerSpec = require("./docs/swagger");

const app = express();

// 2. Habilita o CORS para permitir requisições de outras origens (ex: React em http://localhost:5173)
app.use(cors());

// Middleware para parsing de JSON nas requisições
app.use(express.json());

// LOG opcional do Swagger Spec
if (process.env.NODE_ENV !== "test") {
  console.log(JSON.stringify(swaggerSpec, null, 2));
}

// ROTAS DA APLICAÇÃO
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

// DOCUMENTAÇÃO SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// HEALTHCHECK DA API
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Tech Challenge Blog API",
    documentation: "/api-docs",
    status: "online",
  });
});

// TRATAMENTO DE ROTA NÃO ENCONTRADA (404)
app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada",
  });
});

module.exports = app;