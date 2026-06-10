const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60 * 1000),
  limit: Number(process.env.RATE_LIMIT_MAX || 12),
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      code: "RATE_LIMITED",
      message: "Request limit reached. Please wait a minute before trying again.",
      retryAfter: req.rateLimit?.resetTime || null,
    });
  },
});

module.exports = { apiLimiter };
