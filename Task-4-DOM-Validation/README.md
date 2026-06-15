# Task 4 - Complex Form Validation and Dynamic DOM Manipulation

## Objective

Extend form validation and implement dynamic DOM updates using JavaScript in a complete Express + EJS project.

## Folder Structure

```text
Task-4-DOM-Validation/
  app.js
  package.json
  public/
    css/
      style.css
    js/
      script.js
  views/
    index.ejs
  README.md
```

## Required Packages

- express
- ejs
- bootstrap
- nodemon

## Features

- Express server runs on port 3004.
- `/` route renders `views/index.ejs`.
- Modern registration/profile form with full name, email, phone, age, password, confirm password, course, gender, skills, and bio fields.
- Complex client-side validation for name, email, phone, age, password rules, confirm password, selected skills, and bio length.
- Live validation messages while typing.
- Password strength meter.
- Dynamic selected skills display.
- Live profile preview card.
- Submit button stays disabled until the full form is valid.
- Success message appears without a page refresh.
- Simple JavaScript hash routing with `#/home`, `#/form`, `#/preview`, and `#/success`.
- Bootstrap 5 responsive layout with custom CSS animations, hover effects, transitions, cards, and mobile-friendly spacing.

## How to Run

```bash
npm install
npm start
```

Open the project in your browser:

```text
http://localhost:3004
```

For development with auto-restart:

```bash
npm run dev
```

## Screenshot Section
<img src="./screenshots/Screenshot 2026-06-15 181719.png"/>
<img src="./screenshots/Screenshot 2026-06-15 181800.png" />
<img src="./screenshots/Screenshot 2026-06-15 181947.png" />
<img src="./screenshots/Screenshot 2026-06-15 182004.png" />

## Learning Outcome

This task demonstrates how to combine Express, EJS, Bootstrap, custom CSS, and JavaScript to build an interactive client-side form experience. It practices real-time validation, DOM updates, conditional button states, hash-based routing, and responsive UI design.
