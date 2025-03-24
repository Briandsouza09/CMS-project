const ProjectRequest = require('../models/ProjectRequest');

// Create a new project request
const createProjectRequest = async (req, res) => {
  const { name, usn, semester, branch, project_name, guide_email } = req.body;

  // Validate required fields
  if (!name || !usn || !semester || !branch || !project_name || !guide_email) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    // Create the project request
    const result = await ProjectRequest.create({
      name,
      usn,
      semester,
      branch,
      project_name,
      guide_email,
    });

    // Fetch the newly created record
    const newRequest = await ProjectRequest.findById(result.insertId);
    res.status(201).json({ success: true, data: newRequest });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all project requests for the logged-in user
const getProjectRequests = async (req, res) => {
  const { usn } = req.user;

  try {
    const requests = await ProjectRequest.findByUsn(usn);
    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get count of project requests for the logged-in user
const getProjectCount = async (req, res) => {
  const { usn } = req.user;

  try {
    const count = await ProjectRequest.getCountByUsn(usn);
    res.status(200).json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createProjectRequest, getProjectRequests, getProjectCount };