# Task 4 - DOM Validation

## Objective
Create complex client-side validation with password strength, live DOM updates, and client-side routing/tabs.

## Folder Structure
```text
Task-4-DOM-Validation/
  app.js
  package.json
  public/css/style.css
  public/js/app.js
  views/index.ejs
  README.md
```

## Required npm Packages
- express
- ejs
- nodemon

## File Names
- app.js
- views/index.ejs
- public/js/app.js
- public/css/style.css

## How to Run
```bash
npm install
npm start
```
Open `http://localhost:3004`.

## What Screenshot to Take
Take screenshots of the account tab with password strength, the profile tab with validation errors, and the summary tab after valid input.

## Git Commit Message
```text
Add Task 4 DOM validation
```

## Step-by-Step Implementation
1. Build an Express server that renders one EJS page.
2. Add tabs that behave like client-side routes using hash URLs.
3. Validate email, password, confirm password, name, track, and terms in JavaScript.
4. Update password strength and summary content dynamically.
5. Prevent submission until all validation rules pass.
