# Task 5 - API Integration

## Objective
Create REST API CRUD operations and connect them to a frontend using the Fetch API. This task is built as a small task board so the API actions feel clear when testing them in the browser.

## Folder Structure
```text
Task-5-API-Integration/
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

## API Routes
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## What the UI Shows
- A friendly task board heading with a short explanation of what the page is doing.
- A task input form with a clear placeholder and validation message.
- A live task list loaded from `/api/tasks`.
- Total and completed task counters.
- Human-readable success and error messages after add, complete, and delete actions.
- Loading and empty states so the page does not feel unfinished.

## How to Run
```bash
npm install
npm start
```
Open `http://localhost:3005`.


## Step-by-Step Implementation
1. Configure Express with JSON parsing and EJS.
2. Create in-memory task data.
3. Add CRUD API routes.
4. Build a frontend that uses `fetch`.
5. Render API data dynamically in the DOM.
