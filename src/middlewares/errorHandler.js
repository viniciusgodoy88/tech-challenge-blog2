// Middleware responsável por tratar os erros da aplicação.
const errorHandler = (err, req, res, next) => {

  // Exibe o erro completo no console para facilitar a depuração.
  console.error("🔥 Erro capturado:", err);

  // Define o código de status da resposta.
  // Caso já exista um código diferente de 200, ele será mantido.
  // Caso contrário, será utilizado o código 500 (Erro Interno do Servidor).
  const statusCode = res.statusCode && res.statusCode !== 200
    ? res.statusCode
    : 500;

  // Retorna uma resposta em formato JSON contendo
  // a mensagem do erro ou uma mensagem padrão.
  return res.status(statusCode).json({
    message: err.message || "Erro interno do servidor",
  });
};

// Exporta o middleware para ser utilizado na aplicação.
module.exports = errorHandler;