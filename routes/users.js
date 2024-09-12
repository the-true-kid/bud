const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user with password hashing and location
router.post('/', async (req, res) => {
  const { username, email, password, location } = req.body;

  // Basic input validation
  if (!username || !email || !password || !location) {
    return res.status(400).json({ error: 'Username, email, password, and location are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await db.User.create({
      username,
      email,
      password: hashedPassword,  // Store the hashed password
      location,  // Store the location
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  const { username, email, password, location } = req.body;

  // Basic input validation
  if (!username || !email || !location) {
    return res.status(400).json({ error: 'Username, email, and location are required' });
  }

  try {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
      // If the password is being updated, hash the new password
      let updateData = { username, email, location };
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }
      
      // Update the user
      await user.update(updateData);
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
