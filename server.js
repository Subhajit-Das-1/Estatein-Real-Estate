const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require('express-session');

// Connect to MongoDB
mongoose.connect('mongodb+srv://subhajitdas1768:yyrdi9DQyCOZitJL@cluster0.oq7x442.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Add session middleware
app.use(session({
  secret: 'your-secret-key', // use a strong secret in production!
  resave: false,
  saveUninitialized: false
}));

// Middleware to serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Add middleware to parse form data
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies too
app.use(express.json());

// Serve static files from dist (React build)
app.use(express.static(path.join(__dirname, "dist")));

// Mount auth routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
