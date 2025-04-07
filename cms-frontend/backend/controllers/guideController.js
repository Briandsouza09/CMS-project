const Internship = require('../models/Internship');
const Project = require('../models/Project');
const Report = require('../models/Report');
const Student = require('../models/Student');

class GuideController {
  static async getGuideRequests(req, res) {
    try {
      const guide_email = req.user.email;
      
      const internships = await Internship.findByGuideEmail(guide_email);
      const projects = await Project.findByGuideEmail(guide_email);
      
      // Add student details to each request
      const enrichedInternships = await Promise.all(internships.map(async internship => {
        const student = await Student.findById(internship.student_id);
        return { ...internship, student };
      }));
      
      const enrichedProjects = await Promise.all(projects.map(async project => {
        const student = await Student.findById(project.student_id);
        return { ...project, student };
      }));
      
      res.json({ 
        internships: enrichedInternships, 
        projects: enrichedProjects 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async updateInternshipStatus(req, res) {
    try {
      const { internship_id } = req.params;
      const { status } = req.body;
      
      if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      
      await Internship.updateStatus(internship_id, status);
      
      res.json({ message: 'Internship status updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async updateProjectStatus(req, res) {
    try {
      const { project_id } = req.params;
      const { status } = req.body;
      
      if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      
      await Project.updateStatus(project_id, status);
      
      res.json({ message: 'Project status updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

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

module.exports = GuideController;