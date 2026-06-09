const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Task 1 - HTML Server",
    objective: "Serve an HTML form using Node.js, Express.js, and EJS.",
  });
});

app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;
  res.render("success", {
    title: "Submission Received",
    user: { name, email, message },
  });
});

app.listen(PORT, () => {
  console.log(`Task 1 server running at http://localhost:${PORT}`);
});
