const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  // Include `usn` in the payload
  const payload = {
    id: user.id,
    usn: user.usn, // Ensure `usn` is included
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

module.exports = generateToken;