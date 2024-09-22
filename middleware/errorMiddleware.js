// errorMiddleware.js
exports.handleError = (err, req, res, next) => {
    console.error(err.stack);  // Log the error stack for debugging
    res.status(err.status || 500).json({
      error: {
        message: err.message || 'An unexpected error occurred',
      },
    });
  };
  