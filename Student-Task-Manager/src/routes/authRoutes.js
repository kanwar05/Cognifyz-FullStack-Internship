const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const tempStore = require('../utils/tempStore');

const router = express.Router();

const validateRegister = ({ name, email, password }) => {
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('Enter a valid email address.');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters.');
  return errors;
};

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const errors = validateRegister(req.body);
    if (errors.length) return res.status(400).render('register', { title: 'Register', errors, form: req.body });

    let user;
    if (mongoose.connection.readyState === 1) {
      const exists = await User.findOne({ email: email.toLowerCase() });
      if (exists) {
        return res.status(400).render('register', {
          title: 'Register',
          errors: ['Email is already registered.'],
          form: req.body
        });
      }
      user = await User.create({ name, email, password });
    } else {
      user = await tempStore.createUser({ name, email, password });
    }

    req.session.user = { id: user._id.toString(), name: user.name, email: user.email };
    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const errors = [];
    if (!email || !password) errors.push('Email and password are required.');
    if (errors.length) return res.status(400).render('login', { title: 'Login', errors, form: req.body });

    let user;
    let passwordMatches = false;

    if (mongoose.connection.readyState === 1) {
      user = await User.findOne({ email: email.toLowerCase() });
      passwordMatches = user ? await user.matchPassword(password) : false;
    } else {
      user = tempStore.findUserByEmail(email);
      passwordMatches = user ? await tempStore.comparePassword(password, user.password) : false;
    }

    if (!user || !passwordMatches) {
      return res.status(401).render('login', {
        title: 'Login',
        errors: ['Invalid email or password.'],
        form: req.body
      });
    }

    req.session.user = { id: user._id.toString(), name: user.name, email: user.email };
    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

module.exports = router;
