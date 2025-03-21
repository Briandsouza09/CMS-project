// backend/utils/generateToken.js
const jwt = require('jsonwebtoken');

console.log('JWT Secret:', process.env.JWT_SECRET); // Debug log

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

module.exports = generateToken;