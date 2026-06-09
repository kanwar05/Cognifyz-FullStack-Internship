# Student Task Manager

Student Task Manager is a complete Cognifyz Full Stack Development Internship project. It combines HTML, CSS, Bootstrap, JavaScript, Node.js, Express.js, EJS, MongoDB, Mongoose, session authentication, REST APIs, external API integration, rate limiting, logging, caching, and background processing.

## Folder Structure

```text
Student-Task-Manager/
  public/
    css/styles.css
    js/auth.js
    js/dashboard.js
  src/
    config/db.js
    middleware/auth.js
    middleware/errorHandler.js
    models/User.js
    models/Task.js
    routes/authRoutes.js
    routes/externalApiRoutes.js
    routes/pageRoutes.js
    routes/taskApiRoutes.js
    utils/cache.js
    utils/tempStore.js
    validators/taskValidator.js
    views/
      partials/header.ejs
      partials/footer.ejs
      dashboard.ejs
      error.ejs
      index.ejs
      login.ejs
      register.ejs
  .env.example
  package.json
  server.js
```

## Features

- Registration, login, and logout with session authentication.
- MongoDB and Mongoose models for users and tasks.
- Temporary in-memory fallback data when MongoDB is not connected.
- Protected task dashboard where users only access their own tasks.
- REST API CRUD endpoints for tasks.
- Frontend `fetch()` calls for loading, creating, editing, and deleting tasks.
- Client-side validation, server-side validation, dynamic error messages, and password strength meter.
- Bootstrap responsive navbar, hero section, dashboard tabs, task cards, and footer.
- CSS animations and hover transitions.
- External quote API integration with simple cache.
- Express rate limiting, request logging, body parsing, global 404/error handling.
- Background `setInterval` job that clears expired cache and logs cache status.

## Setup Commands

```bash
cd Student-Task-Manager
npm install
copy .env.example .env
npm run dev
```

Open:

```text
http://localhost:3000
```

Use MongoDB locally:

```text
MONGO_URI=mongodb://127.0.0.1:27017/student_task_manager
```

If MongoDB is unavailable, the app still runs with temporary in-memory data for demonstration.

## REST API Endpoints

All task routes require login.

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/external/quote
```

## Cognifyz Task Mapping

### Task 1: HTML Structure and Basic Server Interaction
- EJS pages render HTML from Express.
- Forms exist for register, login, and task creation.
- Express routes serve pages and process form submissions.

### Task 2: Inline Styles, Basic Interaction, and Server-Side Validation
- Bootstrap utility classes are used directly in EJS for simple inline-style-like presentation.
- Login/register forms include browser and JavaScript validation.
- Express validates registration and login data on the server.

### Task 3: Advanced CSS Styling and Responsive Design
- `public/css/styles.css` adds hero styling, cards, transitions, dashboard layout, and responsive media queries.
- Bootstrap grid and navbar make the interface responsive.

### Task 4: Complex Form Validation and Dynamic DOM Manipulation
- `auth.js` validates forms and updates password strength dynamically.
- `dashboard.js` updates task cards, errors, summaries, and tabs without a full page reload.

### Task 5: API Integration and Front-End Interaction
- Frontend uses `fetch()` to call `/api/tasks`.
- Dashboard dynamically displays API data.
- CRUD actions update the UI immediately.

### Task 6: Database Integration and User Authentication
- `User` and `Task` Mongoose models store data in MongoDB.
- Session authentication protects the dashboard and task API routes.
- Users can only query and mutate tasks that match their own session user id.

### Task 7: Advanced API Usage and External API Integration
- `/api/external/quote` calls an external quotes API.
- The quote response is shown on the dashboard.
- External API responses are cached for 5 minutes.

### Task 8: Advanced Server-Side Functionality
- Rate limiting protects the app.
- Morgan logs requests.
- Global 404 and error handling middleware are included.
- `setInterval` clears expired cache and logs cache status.

## Suggested Git Commit Messages

```text
Task 1: scaffold Express EJS pages and basic forms
Task 2: add interaction and server-side form validation
Task 3: add responsive Bootstrap UI and advanced CSS
Task 4: add dynamic DOM task handling and complex validation
Task 5: add task REST API and frontend fetch integration
Task 6: add MongoDB models and session authentication
Task 7: add cached external quote API integration
Task 8: add rate limiting, logging, global errors, and cache cleanup job
```

## Screenshots

Add screenshots here after running the project:

```text
screenshots/home.png
screenshots/register.png
screenshots/dashboard.png
```
