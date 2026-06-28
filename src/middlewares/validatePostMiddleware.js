const validatePost = require("../validators/postValidator");

const validatePostMiddleware = (req, res, next) => {
  const { error } = validatePost(req.body);

  if (error) {
    return res.status(400).json({
      message: "Erro de validação",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = validatePostMiddleware;