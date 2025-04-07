const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Student registration
router.post('/register/student', AuthController.registerStudent);

// Guide registration
router.post('/register/guide', AuthController.registerGuide);

// Login (for both student and guide)
router.post('/login', AuthController.login);

module.exports = router;