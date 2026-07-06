// Middleware responsável por controlar o acesso baseado em permissões (roles).
// Ele recebe uma role esperada e retorna um middleware configurado.
function roleMiddleware(role) {
  
  return (req, res, next) => {

    // Verifica se a role do usuário autenticado é diferente da permitida.
    if (req.user.role !== role) {
      // Caso o usuário não tenha permissão, retorna erro 403 (Forbidden).
      return res.status(403).json({ error: "Access denied" });
    }

    // Se a role for permitida, continua para a próxima etapa da requisição.
    next();
  };
}

// Exporta a função para ser utilizada na proteção de rotas
// com controle de acesso por perfil de usuário.
module.exports = roleMiddleware;