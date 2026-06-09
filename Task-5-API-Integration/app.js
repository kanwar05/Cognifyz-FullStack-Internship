const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3005;

let nextId = 3;
let tasks = [
  { id: 1, title: "Create REST API", completed: true },
  { id: 2, title: "Connect frontend with fetch", completed: false },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Task 5 - API Integration" });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  if (!req.body.title || req.body.title.trim().length < 3) {
    return res.status(400).json({ message: "Title must be at least 3 characters." });
  }
  const task = { id: nextId++, title: req.body.title.trim(), completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find((item) => item.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: "Task not found." });
  task.title = req.body.title?.trim() || task.title;
  task.completed = Boolean(req.body.completed);
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const before = tasks.length;
  tasks = tasks.filter((task) => task.id !== Number(req.params.id));
  if (tasks.length === before) return res.status(404).json({ message: "Task not found." });
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Task 5 server running at http://localhost:${PORT}`);
});
