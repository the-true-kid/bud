const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const router = express.Router();

// Login route
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database to find the user by email
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password using bcrypt
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token (JWT)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Remove password from the user data
    const { password, ...userWithoutPassword } = user.get({ plain: true });

    // Return user data and token
    return res.status(200).json({ user: userWithoutPassword, token });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
