// Wait until the page is ready before selecting elements.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#registrationForm");
  const submitBtn = document.querySelector("#submitBtn");
  const routeSections = document.querySelectorAll(".route-section");
  const routeLinks = document.querySelectorAll(".route-link");

  const fields = {
    fullName: document.querySelector("#fullName"),
    email: document.querySelector("#email"),
    phone: document.querySelector("#phone"),
    age: document.querySelector("#age"),
    password: document.querySelector("#password"),
    confirmPassword: document.querySelector("#confirmPassword"),
    course: document.querySelector("#course"),
    bio: document.querySelector("#bio"),
  };

  const strengthFill = document.querySelector("#strengthFill");
  const strengthText = document.querySelector("#strengthText");
  const selectedSkills = document.querySelector("#selectedSkills");
  const bioCount = document.querySelector("#bioCount");
  const successMessage = document.querySelector("#successMessage");
  const heroMeterFill = document.querySelector("#heroMeterFill");
  const heroValidStatus = document.querySelector("#heroValidStatus");

  const preview = {
    initials: document.querySelector("#previewInitials"),
    course: document.querySelector("#previewCourse"),
    name: document.querySelector("#previewName"),
    bio: document.querySelector("#previewBio"),
    email: document.querySelector("#previewEmail"),
    phone: document.querySelector("#previewPhone"),
    age: document.querySelector("#previewAge"),
    gender: document.querySelector("#previewGender"),
    skills: document.querySelector("#previewSkills"),
  };

  const routes = ["home", "form", "preview", "success"];

  function getSelectedGender() {
    const selected = document.querySelector("input[name='gender']:checked");
    return selected ? selected.value : "";
  }

  function getSelectedSkills() {
    return Array.from(document.querySelectorAll("input[name='skills']:checked")).map((skill) => skill.value);
  }

  function setRoute(routeName) {
    const nextRoute = routes.includes(routeName) ? routeName : "home";

    routeSections.forEach((section) => {
      section.classList.toggle("active", section.dataset.route === nextRoute);
    });

    routeLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#/${nextRoute}`);
    });

    if (window.location.hash !== `#/${nextRoute}`) {
      window.location.hash = `/${nextRoute}`;
    }
  }

  function routeFromHash() {
    return window.location.hash.replace("#/", "") || "home";
  }

  function passwordScore(password) {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }

  function updatePasswordStrength() {
    const score = passwordScore(fields.password.value);
    const labels = ["empty", "weak", "fair", "good", "strong", "excellent"];
    const colors = ["#dc2626", "#dc2626", "#f59e0b", "#f59e0b", "#16a34a", "#16a34a"];
    const percent = (score / 5) * 100;

    strengthFill.style.width = `${percent}%`;
    strengthFill.style.background = colors[score];
    strengthText.textContent = `Password strength: ${labels[score]}`;
  }

  function setFieldState(field, isValid, message) {
    const messageNode = document.querySelector(`[data-error-for='${field}']`);
    const input = fields[field];

    if (input) {
      input.classList.toggle("is-valid", isValid && input.value.trim() !== "");
      input.classList.toggle("is-invalid", !isValid && input.value.trim() !== "");
    }

    if (messageNode) {
      messageNode.textContent = message;
      messageNode.classList.toggle("valid", isValid && message !== "");
    }
  }

  function setGroupMessage(field, isValid, message) {
    const messageNode = document.querySelector(`[data-error-for='${field}']`);
    if (messageNode) {
      messageNode.textContent = message;
      messageNode.classList.toggle("valid", isValid && message !== "");
    }
  }

  function validateForm() {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    const age = Number(fields.age.value);
    const skills = getSelectedSkills();
    const gender = getSelectedGender();

    if (fields.fullName.value.trim().length < 3) {
      errors.fullName = "Name must be at least 3 characters.";
    }

    if (!emailPattern.test(fields.email.value.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!phonePattern.test(fields.phone.value.trim())) {
      errors.phone = "Phone number must contain exactly 10 digits.";
    }

    if (!age || age < 18 || age > 60) {
      errors.age = "Age must be between 18 and 60.";
    }

    if (passwordScore(fields.password.value) < 5) {
      errors.password = "Use uppercase, lowercase, number, special character, and 8+ characters.";
    }

    if (fields.confirmPassword.value !== fields.password.value || fields.confirmPassword.value === "") {
      errors.confirmPassword = "Confirm password must match password.";
    }

    if (fields.course.value === "") {
      errors.course = "Please select a course.";
    }

    if (gender === "") {
      errors.gender = "Please select a gender.";
    }

    if (skills.length === 0) {
      errors.skills = "Select at least one skill.";
    }

    if (fields.bio.value.trim().length < 20) {
      errors.bio = "Bio must be at least 20 characters.";
    }

    setFieldState("fullName", !errors.fullName, errors.fullName || "Looks good.");
    setFieldState("email", !errors.email, errors.email || "Valid email.");
    setFieldState("phone", !errors.phone, errors.phone || "Valid phone number.");
    setFieldState("age", !errors.age, errors.age || "Valid age.");
    setFieldState("password", !errors.password, errors.password || "Strong password.");
    setFieldState("confirmPassword", !errors.confirmPassword, errors.confirmPassword || "Passwords match.");
    setFieldState("course", !errors.course, errors.course || "Course selected.");
    setFieldState("bio", !errors.bio, errors.bio || "Bio has enough detail.");
    setGroupMessage("gender", !errors.gender, errors.gender || "Gender selected.");
    setGroupMessage("skills", !errors.skills, errors.skills || "Skills selected.");

    const isValid = Object.keys(errors).length === 0;
    submitBtn.disabled = !isValid;
    updateHeroStatus(isValid);
    return { isValid, errors };
  }

  function updateHeroStatus(isValid) {
    const validCount = countValidRules();
    const totalRules = 10;
    const percent = (validCount / totalRules) * 100;

    heroMeterFill.style.width = `${percent}%`;
    heroMeterFill.style.background = isValid ? "#16a34a" : "#f59e0b";
    heroValidStatus.textContent = isValid ? "Ready" : `${validCount}/${totalRules}`;
  }

  function countValidRules() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    const age = Number(fields.age.value);

    return [
      fields.fullName.value.trim().length >= 3,
      emailPattern.test(fields.email.value.trim()),
      phonePattern.test(fields.phone.value.trim()),
      age >= 18 && age <= 60,
      passwordScore(fields.password.value) >= 5,
      fields.confirmPassword.value !== "" && fields.confirmPassword.value === fields.password.value,
      fields.course.value !== "",
      getSelectedGender() !== "",
      getSelectedSkills().length > 0,
      fields.bio.value.trim().length >= 20,
    ].filter(Boolean).length;
  }

  function getInitials(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "--";
    return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join("");
  }

  function renderSkillChips(container, skills) {
    if (skills.length === 0) {
      container.innerHTML = "<span>No skills selected</span>";
      return;
    }

    container.innerHTML = skills.map((skill) => `<span>${skill}</span>`).join("");
  }

  function updateSelectedSkills(skills) {
    if (skills.length === 0) {
      selectedSkills.textContent = "No skills selected yet.";
      return;
    }

    selectedSkills.innerHTML = skills.map((skill) => `<span>${skill}</span>`).join("");
  }

  function updatePreview() {
    const skills = getSelectedSkills();
    const name = fields.fullName.value.trim();
    const bio = fields.bio.value.trim();

    preview.initials.textContent = getInitials(name);
    preview.course.textContent = fields.course.value || "Course not selected";
    preview.name.textContent = name || "Your Name";
    preview.bio.textContent = bio || "Your bio preview will appear here.";
    preview.email.textContent = fields.email.value.trim() || "Not entered";
    preview.phone.textContent = fields.phone.value.trim() || "Not entered";
    preview.age.textContent = fields.age.value || "Not entered";
    preview.gender.textContent = getSelectedGender() || "Not selected";

    renderSkillChips(preview.skills, skills);
    updateSelectedSkills(skills);
    bioCount.textContent = `${fields.bio.value.trim().length} / 20 characters`;
  }

  function handleFormUpdate() {
    updatePasswordStrength();
    updatePreview();
    validateForm();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = validateForm();

    if (!result.isValid) {
      setRoute("form");
      return;
    }

    const name = fields.fullName.value.trim();
    successMessage.textContent = `Great work, ${name}. Your registration was validated on the client and submitted without a page refresh.`;
    setRoute("success");
  });

  Object.values(fields).forEach((field) => {
    field.addEventListener("input", handleFormUpdate);
    field.addEventListener("change", handleFormUpdate);
  });

  document.querySelectorAll("input[name='gender'], input[name='skills']").forEach((field) => {
    field.addEventListener("change", handleFormUpdate);
  });

  window.addEventListener("hashchange", () => setRoute(routeFromHash()));

  setRoute(routeFromHash());
  handleFormUpdate();
});
