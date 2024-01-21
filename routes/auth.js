// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Register a new user
router.post('/register', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    // If registration is successful, log in the user
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Registration successful', user });
    });
  })(req, res, next);
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    // If login is successful, log in the user
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});

// Example protected route (requires authentication)
router.get('/profile', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

module.exports = router;