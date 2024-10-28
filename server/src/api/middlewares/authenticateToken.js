const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(401); // No token provided, unauthorized
  }

  jwt.verify(token, 'secret-key', (err, user) => {
    if (err) {
      return res.sendStatus(403); // Invalid token, forbidden
    }
    req.user = user; // Attach the decoded user to the request object
    next(); // Pass control to the next middleware/function
  });
}

module.exports = authenticateToken;
