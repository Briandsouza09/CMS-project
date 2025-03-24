const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Decode the token and attach the payload to `req.user`
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded payload to `req.user`
    console.log('Decoded User:', decoded); // Debug log
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err); // Debug log
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;