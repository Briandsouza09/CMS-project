const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
const Student = require('../models/Student');
const Guide = require('../models/Guide');

const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      // Get token from header
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }
      
      // Verify token
      const decoded = jwt.verify(token, secret);
      
      // Check if user exists
      let user;
      if (decoded.role === 'student') {
        user = await Student.findById(decoded.id);
      } else if (decoded.role === 'guide') {
        user = await Guide.findById(decoded.id);
      }
      
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      // Check if role is allowed
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      
      // Add user to request
      req.user = { ...user, role: decoded.role };
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

module.exports = auth;