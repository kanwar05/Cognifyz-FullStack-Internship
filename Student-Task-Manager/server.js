const express = require('express');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const pageRoutes = require('./src/routes/pageRoutes');
const taskApiRoutes = require('./src/routes/taskApiRoutes');
const externalApiRoutes = require('./src/routes/externalApiRoutes');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');
const { clearExpiredCache, cacheStatus } = require('./src/utils/cache');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'student-task-manager-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
};

if (process.env.USE_MONGO_SESSION === 'true' && process.env.MONGO_URI) {
  const MongoStore = require('connect-mongo');
  sessionOptions.store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  });
}

app.use(session(sessionOptions));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.path = req.path;
  next();
});

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please try again later.' }
  })
);

app.use('/', pageRoutes);
app.use('/', authRoutes);
app.use('/api/tasks', taskApiRoutes);
app.use('/api/external', externalApiRoutes);

setInterval(() => {
  clearExpiredCache();
  console.log(`[cache] ${cacheStatus()}`);
}, 60 * 1000);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Student Task Manager running at http://localhost:${PORT}`);
});
