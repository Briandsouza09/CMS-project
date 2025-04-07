const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController');

// Get reports (public for now, can add auth if needed)
router.get('/internship/:internship_id/reports', ReportController.getInternshipReports);
router.get('/project/:project_id/reports', ReportController.getProjectReports);

module.exports = router;