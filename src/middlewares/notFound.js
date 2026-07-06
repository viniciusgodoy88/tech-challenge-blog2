// Middleware responsável por tratar requisições para rotas inexistentes.
const notFound = (req, res, next) => {

  // Retorna uma resposta HTTP 404 (Not Found)
  // informando que a rota solicitada não existe.
  res.status(404).json({
    // Mensagem de erro.
    message: "Rota não encontrada",

    // Caminho da rota que foi solicitada.
    path: req.originalUrl,
  });
};

// Exporta o middleware para ser utilizado ao final
// da configuração das rotas da aplicação.
module.exports = notFound;