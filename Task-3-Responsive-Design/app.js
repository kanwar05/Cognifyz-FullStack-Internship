const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3003;

// Cards shown in the features/services section.
const services = [
  {
    icon: "01",
    title: "Responsive Layouts",
    text: "Mobile-first sections built with the Bootstrap grid system.",
  },
  {
    icon: "02",
    title: "Modern Styling",
    text: "Smooth gradients, shadows, hover effects, and clean spacing.",
  },
  {
    icon: "03",
    title: "Fast Express App",
    text: "A simple Node.js server renders reusable EJS templates.",
  },
];

// Stats shown in the highlight band.
const stats = [
  { value: "100%", label: "Responsive" },
  { value: "5+", label: "Page Sections" },
  { value: "3", label: "Breakpoints" },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Task 3 - Advanced CSS Styling",
    services,
    stats,
  });
});

app.listen(PORT, () => {
  console.log(`Task 3 server running at http://localhost:${PORT}`);
});
