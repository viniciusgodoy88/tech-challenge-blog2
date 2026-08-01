// Importa a aplicação Express já configurada no arquivo app.js
const app = require("./app");

// Define a porta em que o servidor será executado.
const PORT = process.env.PORT || 3000;

/**
 * Inicia o servidor Express na porta definida.
 */
app.listen(PORT, () => {
  console.clear();

  console.log("=======================================");
  console.log("🚀 Tech Challenge Blog API");
  console.log("=======================================");
  console.log(`Servidor:       http://localhost:${PORT}`);
  console.log(`Swagger:        http://localhost:${PORT}/api-docs`);
  console.log("=======================================");
});