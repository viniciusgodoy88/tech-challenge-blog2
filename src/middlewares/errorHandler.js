const errorHandler = (err, req, res, next) => {
    console.error("🔥 Erro capturado:", err);
  
    const statusCode = res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : 500;
  
    return res.status(statusCode).json({
      message: err.message || "Erro interno do servidor",
    });
  };
  
  module.exports = errorHandler;