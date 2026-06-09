const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = error.status || 500;

  if (req.originalUrl.startsWith('/api')) {
    return res.status(statusCode).json({
      error: error.message || 'Server error'
    });
  }

  res.status(statusCode).render('error', {
    title: 'Error',
    message: error.message || 'Something went wrong'
  });
};

module.exports = { notFound, errorHandler };
