// Define a porta em que o servidor será executado.
// Utiliza a variável de ambiente PORT (caso exista),
// ou a porta 3000 como padrão.
const PORT = process.env.PORT || 3000;

// Inicia o servidor Express na porta definida.
app.listen(PORT, () => {
  // Limpa o terminal para deixar a saída mais organizada.
  console.clear();

  // Exibe informações da aplicação no console após o servidor iniciar.
  console.log("=======================================");
  console.log("🚀 Tech Challenge Blog API");
  console.log("=======================================");
  
  // Mostra a URL onde a API está disponível.
  console.log(`Servidor:      http://localhost:${PORT}`);
  
  // Mostra a URL da documentação da API gerada pelo Swagger.
  console.log(`Swagger:       http://localhost:${PORT}/api-docs`);
  
  console.log("=======================================");
});