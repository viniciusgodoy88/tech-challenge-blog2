// Importa o logger configurado na aplicação.
// Ele será utilizado para registrar informações de auditoria.
const logger = require("../config/logger");

// Middleware responsável por registrar informações
// sobre cada requisição recebida pela API.
function auditMiddleware(req, res, next) {

  // Registra um log contendo informações da requisição.
  logger.info({
    // ID do usuário autenticado, caso exista.
    user: req.user?.id,

    // Rota acessada pelo usuário.
    route: req.url,

    // Método HTTP utilizado na requisição (GET, POST, PUT, DELETE, etc.).
    method: req.method,
  });

  // Passa o controle para o próximo middleware ou controlador.
  next();
}

// Exporta o middleware para que possa ser utilizado
// nas rotas da aplicação.
module.exports = auditMiddleware;