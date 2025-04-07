const Internship = require('../models/Internship');
const Project = require('../models/Project');
const Report = require('../models/Report');

class StudentController {
  static async createInternshipRequest(req, res) {
    try {
      const student_id = req.user.id;
      const {
        name,
        usn,
        college_name,
        semester,
        start_date,
        end_date,
        company_name,
        company_email,
        guide_email
      } = req.body;
      
      const internshipId = await Internship.create({
        student_id,
        name,
        usn,
        college_name,
        semester,
        start_date,
        end_date,
        company_name,
        company_email,
        guide_email
      });
      
      res.status(201).json({ 
        message: 'Internship request submitted successfully',
        internshipId
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async createProjectRequest(req, res) {
    try {
      const student_id = req.user.id;
      const {
        name,
        usn,
        project_name,
        semester,
        guide_email
      } = req.body;
      
      const projectId = await Project.create({
        student_id,
        name,
        usn,
        project_name,
        semester,
        guide_email
      });
      
      res.status(201).json({ 
        message: 'Project request submitted successfully',
        projectId
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async getStudentRequests(req, res) {
    try {
      const student_id = req.user.id;
      
      const internships = await Internship.findByStudentId(student_id);
      const projects = await Project.findByStudentId(student_id);
      
      res.json({ internships, projects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async createInternshipReport(req, res) {
    try {
      const { internship_id } = req.params;
      const {
        name,
        usn,
        company_name,
        domain,
        software,
        project_name,
        daily_report
      } = req.body;
      
      // Check if internship exists and is accepted
      const internship = await Internship.findById(internship_id);
      if (!internship) {
        return res.status(404).json({ message: 'Internship not found' });
      }
      if (internship.status !== 'accepted') {
        return res.status(400).json({ message: 'Internship not accepted yet' });
      }
      
      const reportId = await Report.createInternshipReport({
        internship_id,
        name,
        usn,
        company_name,
        domain,
        software,
        project_name,
        daily_report
      });
      
      res.status(201).json({ 
        message: 'Internship report submitted successfully',
        reportId
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async createProjectReport(req, res) {
    try {
      const { project_id } = req.params;
      const {
        name,
        usn,
        project_name,
        daily_report
      } = req.body;
      
      // Check if project exists and is accepted
      const project = await Project.findById(project_id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      if (project.status !== 'accepted') {
        return res.status(400).json({ message: 'Project not accepted yet' });
      }
      
      const reportId = await Report.createProjectReport({
        project_id,
        name,
        usn,
        project_name,
        daily_report
      });
      
      res.status(201).json({ 
        message: 'Project report submitted successfully',
        reportId
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = StudentController;