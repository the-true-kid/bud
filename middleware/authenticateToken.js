const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Extract token from header

  if (!token) {
    console.log('No token provided');  // Optional: Add logging for debugging
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Invalid token');  // Optional: Add logging for debugging
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;  // Attach user info from token to req.user
    next();
  });
};

module.exports = authenticateToken;
