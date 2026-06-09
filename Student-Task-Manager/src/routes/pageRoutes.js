const express = require('express');
const { requireAuth, guestOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Student Task Manager' });
});

router.get('/register', guestOnly, (req, res) => {
  res.render('register', { title: 'Register', errors: [], form: {} });
});

router.get('/login', guestOnly, (req, res) => {
  res.render('login', { title: 'Login', errors: [], form: {} });
});

router.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;
