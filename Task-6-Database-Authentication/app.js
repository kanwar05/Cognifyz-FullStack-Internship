require("dotenv").config();

const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const User = require("./models/User");
const { requireAuth, redirectIfAuth } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3006;
const JWT_SECRET = process.env.JWT_SECRET || "development-secret";

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

function signToken(user) {
  return jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
}

app.get("/", (req, res) => res.redirect("/login"));

app.get("/register", redirectIfAuth, (req, res) => {
  res.render("register", { title: "Register", error: "", old: {} });
});

app.post("/register", redirectIfAuth, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6) {
      return res.status(422).render("register", {
        title: "Register",
        error: "All fields are required and password must be at least 6 characters.",
        old: req.body,
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).render("register", { title: "Register", error: "Email already registered.", old: req.body });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), passwordHash });
    res.cookie("token", signToken(user), { httpOnly: true, sameSite: "lax" });
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).render("register", { title: "Register", error: error.message, old: req.body });
  }
});

app.get("/login", redirectIfAuth, (req, res) => {
  res.render("login", { title: "Login", error: "" });
});

app.post("/login", redirectIfAuth, async (req, res) => {
  const user = await User.findOne({ email: req.body.email?.toLowerCase() });
  const valid = user && await bcrypt.compare(req.body.password || "", user.passwordHash);
  if (!valid) return res.status(401).render("login", { title: "Login", error: "Invalid email or password." });
  res.cookie("token", signToken(user), { httpOnly: true, sameSite: "lax" });
  res.redirect("/dashboard");
});

app.get("/dashboard", requireAuth, (req, res) => {
  res.render("dashboard", { title: "Protected Dashboard", user: req.user });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`Task 6 server running at http://localhost:${PORT}`);
});
