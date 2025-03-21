// backend/routes/authRoutes.js
const express = require('express');
const { signUp, signIn } = require('../controllers/authController'); // Import the functions

const router = express.Router();

router.post('/signup', signUp); // Use the signUp function
router.post('/signin', signIn); // Use the signIn function

module.exports = router;