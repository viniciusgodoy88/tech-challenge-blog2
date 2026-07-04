const express = require("express");
const swaggerUi = require("swagger-ui-express");

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerSpec = require("./docs/swagger");

const app = express();

app.use(express.json());

// LOG opcional
if (process.env.NODE_ENV !== "test") {
  console.log(JSON.stringify(swaggerSpec, null, 2));
}

// ROTAS
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

// SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// HEALTHCHECK
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Tech Challenge Blog API",
    documentation: "/api-docs",
    status: "online",
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada",
  });
});

module.exports = app;