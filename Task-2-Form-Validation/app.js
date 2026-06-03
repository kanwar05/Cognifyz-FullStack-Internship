const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

const submissions = [];

app.post("/submit", (req, res) => {
  const { name, email, age, course, password, phone } = req.body;

  if (!name || !email || !age || !course || !password || !phone) {
    return res.send("All fields are required");
  }

  if (password.length < 6) {
    return res.send("Password must be at least 6 characters");
  }

  if (phone.length !== 10) {
    return res.send("Phone number must be 10 digits");
  }

  const userData = { name, email, age, course, phone };
  submissions.push(userData);

  res.render("success", {
    user: userData,
    totalSubmissions: submissions.length,
  });
});

app.listen(port, () => {
  console.log("server is listening on port : ", port);
});
