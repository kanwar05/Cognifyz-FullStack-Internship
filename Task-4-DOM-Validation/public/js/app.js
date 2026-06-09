const form = document.querySelector("#signupForm");
const tabs = document.querySelectorAll(".tab");
const routes = document.querySelectorAll(".route");
const summaryBox = document.querySelector("#summaryBox");
const strengthMeter = document.querySelector("#strengthMeter");
const strengthText = document.querySelector("#strengthText");

const fields = {
  email: document.querySelector("#email"),
  password: document.querySelector("#password"),
  confirmPassword: document.querySelector("#confirmPassword"),
  name: document.querySelector("#name"),
  track: document.querySelector("#track"),
  terms: document.querySelector("#terms"),
};

function setRoute(routeId) {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.route === routeId));
  routes.forEach((route) => route.classList.toggle("active", route.id === routeId));
  window.history.replaceState({}, "", `#${routeId}`);
}

function passwordScore(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

function validate() {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(fields.email.value)) errors.email = "Enter a valid email.";
  if (passwordScore(fields.password.value) < 3) errors.password = "Use 8+ chars with uppercase, number, or symbol.";
  if (fields.confirmPassword.value !== fields.password.value) errors.confirmPassword = "Passwords must match.";
  if (fields.name.value.trim().length < 3) errors.name = "Name must be at least 3 characters.";
  if (!fields.track.value) errors.track = "Choose a skill track.";
  if (!fields.terms.checked) errors.terms = "You must accept the guidelines.";

  document.querySelectorAll("[data-error-for]").forEach((node) => {
    node.textContent = errors[node.dataset.errorFor] || "";
  });

  return errors;
}

function updateStrength() {
  const score = passwordScore(fields.password.value);
  const labels = ["empty", "weak", "fair", "good", "strong"];
  strengthMeter.value = score;
  strengthText.textContent = `Password strength: ${labels[score]}`;
}

function updateSummary() {
  summaryBox.innerHTML = `
    <p><strong>Email:</strong> ${fields.email.value || "Not entered"}</p>
    <p><strong>Name:</strong> ${fields.name.value || "Not entered"}</p>
    <p><strong>Track:</strong> ${fields.track.value || "Not selected"}</p>
    <p><strong>Terms:</strong> ${fields.terms.checked ? "Accepted" : "Pending"}</p>
  `;
}

tabs.forEach((tab) => tab.addEventListener("click", () => setRoute(tab.dataset.route)));
Object.values(fields).forEach((field) => field.addEventListener("input", () => {
  updateStrength();
  updateSummary();
  validate();
}));
fields.terms.addEventListener("change", updateSummary);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const errors = validate();
  if (Object.keys(errors).length > 0) {
    setRoute(["email", "password", "confirmPassword"].some((key) => errors[key]) ? "account" : "profile");
    return;
  }
  summaryBox.insertAdjacentHTML("beforeend", "<p class=\"success\">Client-side validation completed successfully.</p>");
});

setRoute(window.location.hash.replace("#", "") || "account");
updateStrength();
updateSummary();
