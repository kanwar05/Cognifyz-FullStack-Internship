const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    if (req.originalUrl.startsWith('/api')) {
      return res.status(401).json({ error: 'Login required' });
    }
    return res.redirect('/login');
  }
  next();
};

const guestOnly = (req, res, next) => {
  if (req.session.user) return res.redirect('/dashboard');
  next();
};

module.exports = { requireAuth, guestOnly };
