export function notFoundHandler(req, _res, next) {
  const error = new Error(`Rota nao encontrada: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message || 'Erro interno do servidor',
    statusCode
  });
}
