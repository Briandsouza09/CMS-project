// backend/controllers/authController.js
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const signUp = async (req, res) => {
  const { usn, name, email, password, branch, role } = req.body;

  try {
    // Check if email or usn already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const existingUsn = await User.findByUsn(usn);
    if (existingUsn) {
      return res.status(400).json({ success: false, message: 'USN already exists' });
    }

    // Create new user
    const user = await User.create({ usn, name, email, password, branch, role });
    const token = generateToken({ id: user.id, usn: user.usn });
    res.status(201).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, usn: user.usn });
    res.status(200).json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { signUp, signIn }; // Export the functions