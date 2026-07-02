const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.clear();

  console.log("=======================================");
  console.log("🚀 Tech Challenge Blog API");
  console.log("=======================================");
  console.log(`Servidor:      http://localhost:${PORT}`);
  console.log(`Swagger:       http://localhost:${PORT}/api-docs`);
  console.log("=======================================");
});