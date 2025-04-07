const Report = require('../models/Report');

class ReportController {
  static async getInternshipReports(req, res) {
    try {
      const { internship_id } = req.params;
      
      const reports = await Report.getInternshipReports(internship_id);
      
      res.json({ reports });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async getProjectReports(req, res) {
    try {
      const { project_id } = req.params;
      
      const reports = await Report.getProjectReports(project_id);
      
      res.json({ reports });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = ReportController;