# Task 5 - API Integration

## Objective
Create REST API CRUD operations and connect them to a frontend using the Fetch API.

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

## How to Run
```bash
npm install
npm start
```
Open `http://localhost:3005`.

## Screenshot
### screenshots showing the task list, a newly added task, and a completed/deleted task interaction.
<video src="./screenshots/API-Integration.mp4" width="400" height="500" controls></video>



## Step-by-Step Implementation
1. Configure Express with JSON parsing and EJS.
2. Create in-memory task data.
3. Add CRUD API routes.
4. Build a frontend that uses `fetch`.
5. Render API data dynamically in the DOM.
