const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "development-secret";

function readUser(req) {
  const token = req.cookies.token;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function requireAuth(req, res, next) {
  const user = readUser(req);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

function redirectIfAuth(req, res, next) {
  const user = readUser(req);
  if (user) return res.redirect("/dashboard");
  next();
}

module.exports = { requireAuth, redirectIfAuth };
