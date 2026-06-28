const logger = require("../config/logger");

function auditMiddleware(req, res, next) {
  logger.info({
    user: req.user?.id,
    route: req.url,
    method: req.method,
  });

  next();
}