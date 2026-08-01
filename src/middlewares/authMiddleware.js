// Importa a biblioteca JWT para validar os tokens de autenticação.
const jwt = require("jsonwebtoken");

// Garante a mesma chave secreta usada no gerador de token (authController)
const JWT_SECRET = process.env.JWT_SECRET || "ci_cd_secret_key_test_123";

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token missing" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    console.error("Erro na validação JWT:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
}

function checkRole(...allowedRoles) {
  return (req, res, next) => {
    const rolesList = Array.isArray(allowedRoles[0])
      ? allowedRoles[0]
      : allowedRoles;

    if (req.user && req.user.role === "SUPERADMIN") {
      return next();
    }

    if (!req.user || !rolesList.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access denied. Requires one of the following roles: ${rolesList.join(", ")}.`,
      });
    }

    return next();
  };
}

module.exports = {
  ensureAuthenticated,
  checkRole,
  authenticateToken: ensureAuthenticated,
  authorizeRoles: checkRole,
};