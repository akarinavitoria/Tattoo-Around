// No middleware de errorHandler (errorMiddleware.js)
const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Erro no servidor'
  });
};

module.exports = errorHandler;
