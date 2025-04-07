const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const StudentController = require('../controllers/studentController');

// Protect all routes with student authentication
router.use(auth(['student']));

// Internship requests
router.post('/internship', StudentController.createInternshipRequest);

// Project requests
router.post('/project', StudentController.createProjectRequest);

// Get all requests
router.get('/requests', StudentController.getStudentRequests);

// Reports
router.post('/internship/:internship_id/report', StudentController.createInternshipReport);
router.post('/project/:project_id/report', StudentController.createProjectReport);

module.exports = router;