const db = require('../models');
const bcrypt = require('bcrypt');

// Create a new user
exports.createUser = async (userData) => {
  const { username, email, password, location } = userData;
  const existingUser = await db.User.findOne({ where: { email } });
  
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await db.User.create({
    username,
    email,
    password: hashedPassword,
    location,
  });
};

// Get a user by ID
exports.getUserById = async (userId) => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  const { password, ...userWithoutPassword } = user.get({ plain: true });
  return userWithoutPassword;
};

// Update user details
exports.updateUser = async (userId, userData) => {
  const { username, email, password, location } = userData;
  
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  let updateData = { username, email, location };
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }

  await user.update(updateData);
  const { password: _, ...updatedUser } = user.get({ plain: true });
  return updatedUser;
};

// Delete user
exports.deleteUser = async (userId) => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  await user.destroy();
};
