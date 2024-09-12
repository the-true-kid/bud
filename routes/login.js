const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Optional for token generation
const db = require('../models'); // Assuming Sequelize is set up in models/index.js
const router = express.Router();

// Login route
router.post('/', async (req, res) => {
  const { email, password } = req.body; // Removed username, typically login is by email

  try {
    // Query the database to find the user by email (using Sequelize)
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password using bcrypt
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token (JWT) (optional)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return user data and token
    return res.status(200).json({ user, token });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
