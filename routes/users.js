const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/authenticateToken');  // Import the JWT middleware
const db = require('../models');

// Get all users (Only for admins or specific roles, usually)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific user by ID (For the authenticated user only)
router.get('/:id', authenticateToken, async (req, res) => {
  // Ensure the user is only fetching their own data
  if (parseInt(req.params.id) !== req.user.id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
      const { password, ...userWithoutPassword } = user.get({ plain: true });  // Exclude password from response
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user with password hashing and location (Public route, no authentication needed)
router.post('/', async (req, res) => {
  const { username, email, password, location } = req.body;

  if (!username || !email || !password || !location) {
    return res.status(400).json({ error: 'Username, email, password, and location are required' });
  }

  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      username,
      email,
      password: hashedPassword,
      location,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a user by ID (Only the authenticated user can update their own profile)
router.put('/:id', authenticateToken, async (req, res) => {
  if (parseInt(req.params.id) !== req.user.id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { username, email, password, location } = req.body;

  if (!username || !email || !location) {
    return res.status(400).json({ error: 'Username, email, and location are required' });
  }

  try {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
      let updateData = { username, email, location };
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }

      await user.update(updateData);
      const { password, ...updatedUser } = user.get({ plain: true });
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID (Only the authenticated user can delete their own profile)
router.delete('/:id', authenticateToken, async (req, res) => {
  if (parseInt(req.params.id) !== req.user.id) {
    return res.status(403).json({ message: 'Access denied' });
  }

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
