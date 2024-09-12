// routes/login.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Optional for token generation
const db = require('../db'); // Assuming you have a database setup
const router = express.Router();

// Login route
router.post('/api/login', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Query the database to find the user by username and email
    const userQuery = 'SELECT * FROM users WHERE username = $1 AND email = $2';
    const user = await db.query(userQuery, [username, email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password using bcrypt
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token (JWT) (optional)
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return user data and token
    return res.status(200).json({ user: user.rows[0], token });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
