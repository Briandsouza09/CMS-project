const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const Guide = require('../models/Guide');
const { secret, expiresIn } = require('../config/jwt');

class AuthController {
  static async registerStudent(req, res) {
    try {
      const { name, usn, branch, password } = req.body;
      
      // Check if student already exists
      const existingStudent = await Student.findByUSN(usn);
      if (existingStudent) {
        return res.status(400).json({ message: 'Student with this USN already exists' });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create student
      const studentId = await Student.create({
        name,
        usn,
        branch,
        password: hashedPassword
      });
      
      res.status(201).json({ message: 'Student registered successfully', studentId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async registerGuide(req, res) {
    try {
      const { name, branch, password, email } = req.body;
      
      // Check if guide already exists
      const existingGuide = await Guide.findByEmail(email);
      if (existingGuide) {
        return res.status(400).json({ message: 'Guide with this email already exists' });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create guide
      const guideId = await Guide.create({
        name,
        branch,
        password: hashedPassword,
        email
      });
      
      res.status(201).json({ message: 'Guide registered successfully', guideId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async login(req, res) {
    try {
      const { usn, email, password } = req.body;
      let user, role;
      
      // Check if logging in as student or guide
      if (usn) {
        // Student login
        user = await Student.findByUSN(usn);
        role = 'student';
      } else if (email) {
        // Guide login
        user = await Guide.findByEmail(email);
        role = 'guide';
      } else {
        return res.status(400).json({ message: 'Please provide USN or Email' });
      }
      
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      // Create JWT token
      const token = jwt.sign(
        { id: user.id, role },
        secret,
        { expiresIn }
      );
      
      // Remove password from response
      delete user.password;
      
      res.json({ 
        message: 'Login successful', 
        token, 
        user: { ...user, role } 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = AuthController;