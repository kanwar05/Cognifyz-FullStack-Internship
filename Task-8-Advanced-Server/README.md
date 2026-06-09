# Task 8 - Advanced Server

## Objective
Add middleware, request logging, caching, and background task/job processing to an Express server.

## Folder Structure
```text
Task-8-Advanced-Server/
  app.js
  package.json
  middleware/requestLogger.js
  utils/cache.js
  utils/jobQueue.js
  public/css/style.css
  public/js/app.js
  views/index.ejs
  logs/requests.log
  README.md
```

## Required npm Packages
- express
- ejs
- helmet
- compression
- nodemon

## File Names
- app.js
- middleware/requestLogger.js
- utils/cache.js
- utils/jobQueue.js
- views/index.ejs
- public/js/app.js
- public/css/style.css

## How to Run
```bash
npm install
npm start
```
Open `http://localhost:3008`.

## What Screenshot to Take
Take screenshots of the server stats card showing cached/fresh data and the background jobs card while a job moves from queued to completed.

## Git Commit Message
```text
Add Task 8 advanced Express server
```

## Step-by-Step Implementation
1. Add security and compression middleware.
2. Add custom request logging middleware that writes to `logs/requests.log`.
3. Add a small in-memory cache utility with TTL support.
4. Create `/api/stats` to demonstrate cached responses.
5. Create a background job queue and worker using timers.
6. Build a frontend that creates jobs and polls status.
