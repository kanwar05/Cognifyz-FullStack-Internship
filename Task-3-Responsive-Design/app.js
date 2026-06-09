const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3003;

const services = [
  { title: "Frontend", text: "Responsive pages with semantic HTML, CSS, and Bootstrap." },
  { title: "Backend", text: "Express routes, EJS templates, and structured form handling." },
  { title: "Deployment", text: "Clean project structure ready for screenshots and Git commits." },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));

app.get("/", (req, res) => {
  res.render("index", { title: "Task 3 - Responsive Design", services });
});

app.listen(PORT, () => {
  console.log(`Task 3 server running at http://localhost:${PORT}`);
});
