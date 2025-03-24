const express = require('express');
const { signUp, login, getStudents, getRequests, updateRequestStatus } = require('../controllers/staffController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/signup', signUp); // Staff Signup
router.post('/login', login);   // Staff Login

// Protected Routes (require authentication)
router.get('/students', authMiddleware, getStudents); // Fetch students by branch and semester
router.get('/requests', authMiddleware, getRequests); // Fetch requests for a specific student
router.put('/requests/:id', authMiddleware, updateRequestStatus); // Approve/Reject request

module.exports = router;