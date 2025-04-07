const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const GuideController = require('../controllers/guideController');

// Protect all routes with guide authentication
router.use(auth(['guide']));

// Get all requests
router.get('/requests', GuideController.getGuideRequests);

// Update request status
router.put('/internship/:internship_id/status', GuideController.updateInternshipStatus);
router.put('/project/:project_id/status', GuideController.updateProjectStatus);

// Get reports
router.get('/internship/:internship_id/reports', GuideController.getInternshipReports);
router.get('/project/:project_id/reports', GuideController.getProjectReports);

module.exports = router;