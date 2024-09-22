// validationMiddleware.js
exports.validateUserCreation = (req, res, next) => {
    const { username, email, password, location } = req.body;
    if (!username || !email || !password || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    next();  // Proceed to the controller function if validation passes
  };
  
  exports.validateUserUpdate = (req, res, next) => {
    const { username, email, location } = req.body;
    if (!username || !email || !location) {
      return res.status(400).json({ error: 'Username, email, and location are required' });
    }
    next();  // Proceed to the controller function if validation passes
  };
  