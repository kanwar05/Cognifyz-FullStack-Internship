const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "..", "logs");
const logFile = path.join(logDir, "requests.log");

function requestLogger(req, res, next) {
  const started = Date.now();

  res.on("finish", () => {
    fs.mkdirSync(logDir, { recursive: true });
    const duration = Date.now() - started;
    const line = `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms\n`;
    fs.appendFile(logFile, line, () => {});
  });

  next();
}

module.exports = requestLogger;
