# Task 6 - Database Authentication

## Objective
Use MongoDB, Mongoose, user registration, login, JWT/session-style authentication, and protected routes.

## Folder Structure
```text
Task-6-Database-Authentication/
  app.js
  package.json
  .env.example
  config/db.js
  middleware/auth.js
  models/User.js
  public/css/style.css
  views/register.ejs
  views/login.ejs
  views/dashboard.ejs
  README.md
```

## Required npm Packages
- express
- ejs
- mongoose
- bcryptjs
- jsonwebtoken
- cookie-parser
- dotenv
- nodemon

## File Names
- app.js
- config/db.js
- models/User.js
- middleware/auth.js
- views/register.ejs
- views/login.ejs
- views/dashboard.ejs
- public/css/style.css

## How to Run
```bash
npm install
copy .env.example .env
npm start
```
Make sure MongoDB is running locally, then open `http://localhost:3006`.

## What Screenshot to Take
Take screenshots of the register page, login page, and protected dashboard after login.

## Git Commit Message
```text
Add Task 6 MongoDB authentication
```

## Step-by-Step Implementation
1. Configure environment variables in `.env`.
2. Connect Express to MongoDB using Mongoose.
3. Create a `User` model with unique email and hashed password.
4. Register users with bcrypt password hashing.
5. Login users and create a JWT.
6. Store the JWT in an HTTP-only cookie.
7. Protect `/dashboard` with authentication middleware.
