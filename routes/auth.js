// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = '170937269959-ddfk1jv3qrle7s40ls06ddihnrtv57b3.apps.googleusercontent.com';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Remove EJS login/register form rendering
// router.get("/register", (req, res) => {
//   res.render("register");
// });
// router.get("/login", (req, res) => {
//   res.render("login");
// });

// Handle registration
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: "Email already exists. Please use another email." });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ error: "Username already exists. Please choose another username." });
      }
      return res.status(400).json({ error: "Username or email already exists. Please choose another." });
    }
    const user = new User({ username, email, password });
    await user.save();
    req.session.user = user;
    // Send full user object for frontend
    res.json({ username: user.username, email: user.email });
  } catch (err) {
    if (err.code === 11000) {
      if (err.keyPattern && err.keyPattern.email) {
        return res.status(400).json({ error: "Email already exists. Please use another email." });
      }
      if (err.keyPattern && err.keyPattern.username) {
        return res.status(400).json({ error: "Username already exists. Please choose another username." });
      }
      return res.status(400).json({ error: "Username or email already exists. Please choose another." });
    }
    res.status(500).json({ error: "Error registering user: " + err.message });
  }
});

// Handle login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);
  const user = await User.findOne({ email });
  if (!user) {
    console.log("No user found with email:", email);
    return res.status(400).json({ error: "Invalid credentials" });
  }
  console.log("User found:", user.username);
  const isMatch = await require('bcryptjs').compare(password, user.password);
  console.log("Password match:", isMatch);
  if (!isMatch) {
    console.log("Password does not match for user:", user.username);
    return res.status(400).json({ error: "Invalid credentials" });
  }
  req.session.user = user;
  // Send full user object for frontend
  res.json({ username: user.username, email: user.email });
});

// Get current user info
router.get('/api/me', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ username: req.session.user.username });
  }
  res.status(401).json({ error: 'Not authenticated' });
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('connect.sid'); // default cookie name for express-session
    res.json({ message: 'Logged out' });
  });
});

// Request password reset
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'No user with that email.' });
  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();
  // In production, send email. For now, log the reset link:
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  console.log('Password reset link:', resetLink);
  res.json({ message: 'Password reset link has been sent (check server log).' });
});

// Reset password
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) return res.status(400).json({ error: 'Invalid or expired token.' });
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json({ message: 'Password has been reset.' });
});

// Google OAuth sign-in
router.post('/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        username: payload.name,
        email: payload.email,
        password: Math.random().toString(36), // random password, not used
      });
      await user.save();
    }
    req.session.user = user;
    res.json({ username: user.username });
  } catch (err) {
    res.status(401).json({ error: 'Google authentication failed' });
  }
});

module.exports = router;
