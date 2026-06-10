function notFoundHandler(req, res) {
  res.status(404).render("error", {
    title: "Page Not Found",
    statusCode: 404,
    message: "The page you are looking for does not exist.",
    detail: "Check the URL or return to the dashboard.",
  });
}

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const payload = {
    success: false,
    code: error.code || "SERVER_ERROR",
    message: error.publicMessage || error.message || "Something went wrong.",
  };

  if (req.originalUrl.startsWith("/api")) {
    return res.status(statusCode).json(payload);
  }

  return res.status(statusCode).render("error", {
    title: "Application Error",
    statusCode,
    message: payload.message,
    detail: "The dashboard caught the issue and kept the app running.",
  });
}

module.exports = { notFoundHandler, errorHandler };
