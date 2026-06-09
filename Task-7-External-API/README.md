# Task 7 - External API

## Objective
Integrate an external API, explain OAuth concepts, add rate limiting, and handle errors gracefully.

## Folder Structure
```text
Task-7-External-API/
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
- express-rate-limit
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
Open `http://localhost:3007`.

## What Screenshot to Take
Take screenshots of a successful weather result, the OAuth explanation section, and an error or rate-limit response if demonstrated.

## Git Commit Message
```text
Add Task 7 external API integration
```

## Step-by-Step Implementation
1. Create an Express server and EJS page.
2. Add `/api/weather` as a backend wrapper around the Open-Meteo API.
3. Add `express-rate-limit` to protect the API route.
4. Use frontend `fetch` to request weather data.
5. Display success and error states in the DOM.
6. Explain where OAuth access tokens fit in a real protected API flow.
