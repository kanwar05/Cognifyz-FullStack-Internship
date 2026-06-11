# Task 1 - HTML Server

## Objective
Create a basic Node.js and Express.js server that renders an EJS form, accepts form data, and displays a success page.

## Folder Structure
```text
Task-1-HTML-Server/
  app.js
  package.json
  public/css/style.css
  views/index.ejs
  views/success.ejs
  README.md
```

## Required npm Packages
- express
- ejs
- nodemon

## File Names
- app.js
- views/index.ejs
- views/success.ejs
- public/css/style.css

## How to Run
```bash
npm install
npm start
```
Open `http://localhost:3001`.

## Screenshot

### form
<img src="./screenshots/Screenshot 2026-06-11 184028.png" width="400" alt="Home Page">

### sumbited form
<img src="./screenshots/Screenshot 2026-06-11 184044.png" width="400" alt="Home Page">


## Step-by-Step Implementation
1. Initialize the folder with `npm init -y`.
2. Install Express, EJS, and Nodemon.
3. Create `app.js` and configure Express, EJS, static files, and form parsing.
4. Create `views/index.ejs` for the form.
5. Create `views/success.ejs` to display submitted data.
6. Add CSS in `public/css/style.css`.

