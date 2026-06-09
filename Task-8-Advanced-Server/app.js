const path = require("path");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const requestLogger = require("./middleware/requestLogger");
const cache = require("./utils/cache");
const { addJob, getJobs, startWorker } = require("./utils/jobQueue");

const app = express();
const PORT = process.env.PORT || 3008;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.use(express.static(path.join(__dirname, "public"), { maxAge: "1h" }));

app.get("/", (req, res) => {
  res.render("index", { title: "Task 8 - Advanced Server" });
});

app.get("/api/stats", (req, res) => {
  const cached = cache.get("stats");
  if (cached) return res.json({ source: "cache", ...cached });

  const stats = {
    uptime: Math.round(process.uptime()),
    memoryMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
    generatedAt: new Date().toISOString(),
  };
  cache.set("stats", stats, 10);
  res.set("Cache-Control", "public, max-age=10");
  res.json({ source: "fresh", ...stats });
});

app.get("/api/jobs", (req, res) => {
  res.json(getJobs());
});

app.post("/api/jobs", (req, res) => {
  const job = addJob(req.body.name || "Generate internship report");
  res.status(202).json(job);
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Server error." });
});

startWorker();

app.listen(PORT, () => {
  console.log(`Task 8 server running at http://localhost:${PORT}`);
});
