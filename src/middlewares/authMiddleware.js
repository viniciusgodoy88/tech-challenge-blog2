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
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const token = parts[1];

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
// Aceita uma única string 'TEACHER' ou um array/múltiplos argumentos ['TEACHER', 'SUPERADMIN']
function checkRole(...allowedRoles) {
  return (req, res, next) => {
    // Normaliza os papéis permitidos para um array simples
    const rolesList = Array.isArray(allowedRoles[0])
      ? allowedRoles[0]
      : allowedRoles;

    // SUPERADMIN tem permissão irrestrita a qualquer operação restrita
    if (req.user && req.user.role === "SUPERADMIN") {
      return next();
    }

    // Verifica se os dados do usuário existem na requisição e se o perfil bate com os permitidos
    if (!req.user || !rolesList.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access denied. Requires one of the following roles: ${rolesList.join(", ")}.`,
      });
    }

    return next();
  };
}

// Exporta os middlewares originais e seus aliases para compatibilidade com a aplicação
module.exports = {
  ensureAuthenticated,
  checkRole,
  // Aliases para manter compatibilidade com rotas/testes que usam nomes alternativos:
  authenticateToken: ensureAuthenticated,
  authorizeRoles: checkRole,
};