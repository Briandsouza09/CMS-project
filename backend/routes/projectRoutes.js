// backend/routes/projectRoutes.js
const express = require('express');
const { createProjectRequest, getProjectRequests } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes (require JWT authentication)
router.post('/', authMiddleware, createProjectRequest);
router.get('/', authMiddleware, getProjectRequests);

module.exports = router;