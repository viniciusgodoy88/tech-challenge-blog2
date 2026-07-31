// Importa a biblioteca JWT, utilizada para validar
// os tokens de autenticação enviados pelos usuários.
const jwt = require("jsonwebtoken");

// Middleware responsável por verificar se a requisição
// possui um token JWT válido.
function ensureAuthenticated(req, res, next) {
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
    // na variável de ambiente JWT_SECRET (ou chave padrão para desenvolvimento).
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");

    // Armazena os dados do usuário decodificados na requisição,
    // permitindo acesso às propriedades id, email e role nas próximas etapas.
    req.user = decoded;

    // Continua para o próximo middleware ou controlador.
    return next();
  } catch {
    // Retorna erro caso o token seja inválido ou tenha expirado.
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Middleware responsável por validar o perfil (role) do usuário logado.
function checkRole(requiredRole) {
  return (req, res, next) => {
    // Verifica se os dados do usuário existem na requisição e se o perfil bate com o exigido
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ 
        error: `Access denied. Only ${requiredRole} users can perform this action.` 
      });
    }

    return next();
  };
}

// Exporta os middlewares como um objeto contendo ambas as funções
module.exports = {
  ensureAuthenticated,
  checkRole,
};