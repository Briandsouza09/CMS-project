const express = require('express');
const { createInternshipRequest, getInternshipRequests } = require('../controllers/internshipController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes (require JWT authentication)
router.post('/', authMiddleware, createInternshipRequest);
router.get('/', authMiddleware, getInternshipRequests);

module.exports = router;