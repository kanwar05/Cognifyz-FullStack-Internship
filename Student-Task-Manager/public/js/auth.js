const markInvalid = (input, isInvalid) => {
  input.classList.toggle('is-invalid', isInvalid);
  input.classList.toggle('is-valid', !isInvalid && input.value.trim() !== '');
};

document.querySelectorAll('form[novalidate]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    let valid = true;
    form.querySelectorAll('input[required]').forEach((input) => {
      const invalid = !input.checkValidity();
      markInvalid(input, invalid);
      if (invalid) valid = false;
    });

    if (!valid) event.preventDefault();
  });
});

const passwordInput = document.querySelector('#password');
const strengthBar = document.querySelector('#passwordStrength');
const strengthHint = document.querySelector('#passwordHint');

if (passwordInput && strengthBar && strengthHint) {
  passwordInput.addEventListener('input', () => {
    const value = passwordInput.value;
    let score = 0;
    if (value.length >= 6) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;

    const widths = ['15%', '35%', '60%', '80%', '100%'];
    const labels = ['Very weak', 'Weak', 'Good', 'Strong', 'Excellent'];
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];

    strengthBar.style.width = widths[score];
    strengthBar.style.background = colors[score];
    strengthHint.textContent = `Password strength: ${labels[score]}`;
  });
}
