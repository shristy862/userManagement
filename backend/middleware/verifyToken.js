const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user data (id and role) from the token to the request object
    req.user = { id: decoded.id, role: decoded.role };

    next(); 
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
