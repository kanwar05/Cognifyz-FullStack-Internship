const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3002;
const submissions = [];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

function validateStudent(data) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[6-9]\d{9}$/;

  if (!data.name || data.name.trim().length < 3) errors.name = "Name must be at least 3 characters.";
  if (!emailPattern.test(data.email || "")) errors.email = "Enter a valid email address.";
  if (!data.age || Number(data.age) < 16 || Number(data.age) > 60) errors.age = "Age must be between 16 and 60.";
  if (!data.course) errors.course = "Please select a course.";
  if (!phonePattern.test(data.phone || "")) errors.phone = "Phone must be a valid 10-digit Indian mobile number.";
  if (!data.password || data.password.length < 6) errors.password = "Password must contain at least 6 characters.";

  return errors;
}

app.get("/", (req, res) => {
  res.render("index", { title: "Task 2 - Form Validation", errors: {}, old: {} });
});

app.post("/submit", (req, res) => {
  const errors = validateStudent(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(422).render("index", {
      title: "Task 2 - Form Validation",
      errors,
      old: req.body,
    });
  }

  const student = {
    name: req.body.name.trim(),
    email: req.body.email.trim().toLowerCase(),
    age: Number(req.body.age),
    course: req.body.course,
    phone: req.body.phone,
  };

  submissions.push(student);
  res.render("success", {
    title: "Validated Submission",
    student,
    totalSubmissions: submissions.length,
  });
});

app.listen(PORT, () => {
  console.log(`Task 2 server running at http://localhost:${PORT}`);
});
