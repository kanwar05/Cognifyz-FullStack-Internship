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

## ScreenSHots

<video src="./screenshots/DOM-Validation.mp4" width="400" height="500" controls></video>

## Step-by-Step Implementation

1. Build an Express server that renders one EJS page.
2. Add tabs that behave like client-side routes using hash URLs.
3. Validate email, password, confirm password, name, track, and terms in JavaScript.
4. Update password strength and summary content dynamically.
5. Prevent submission until all validation rules pass.
