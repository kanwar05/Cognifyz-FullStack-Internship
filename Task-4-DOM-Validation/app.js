const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3004;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));

app.get("/", (req, res) => {
  res.render("index", { title: "Task 4 - Complex Form Validation" });
});

app.listen(PORT, () => {
  console.log(`Task 4 server running at http://localhost:${PORT}`);
});
