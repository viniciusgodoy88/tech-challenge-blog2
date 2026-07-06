// Importa a biblioteca JWT, utilizada para validar
// os tokens de autenticação enviados pelos usuários.
const jwt = require("jsonwebtoken");

// Middleware responsável por verificar se a requisição
// possui um token JWT válido.
function authMiddleware(req, res, next) {
  // Obtém o cabeçalho Authorization da requisição.
  const authHeader = req.headers.authorization;

  // Verifica se o token foi enviado.
  if (!authHeader) {
    return res.status(401).json({ error: "Token missing" });
  }

  // Extrai apenas o token, removendo o prefixo "Bearer".
  const token = authHeader.split(" ")[1];

  try {
    // Valida o token utilizando a chave secreta definida
    // na variável de ambiente JWT_SECRET.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Armazena os dados do usuário decodificados na requisição,
    // permitindo seu acesso nas próximas etapas do processamento.
    req.user = decoded;

    // Continua para o próximo middleware ou controlador.
    return next();
  } catch {
    // Retorna erro caso o token seja inválido ou tenha expirado.
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Exporta o middleware para ser utilizado nas rotas protegidas.
module.exports = authMiddleware;