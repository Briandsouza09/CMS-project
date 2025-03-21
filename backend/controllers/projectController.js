// backend/controllers/projectController.js
const ProjectRequest = require('../models/ProjectRequest');

const createProjectRequest = async (req, res) => {
  const { name, usn, semester, branch, project_name, guide_email } = req.body;

  // Debug log to check request body
  console.log('Request Body:', { name, usn, semester, branch, project_name, guide_email });

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
    console.error('Error creating project request:', err); // Debug log
    res.status(500).json({ success: false, message: err.message });
  }
};

const getProjectRequests = async (req, res) => {
  const { usn } = req.user; // Extracted from JWT token

  // Debug log to check usn
  console.log('USN from JWT:', usn);

  if (!usn) {
    return res.status(400).json({ success: false, message: 'USN is required' });
  }

  try {
    const requests = await ProjectRequest.findByUsn(usn);

    // If no requests are found, return an empty array
    if (!requests || requests.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    console.error('Error fetching project requests:', err); // Debug log
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createProjectRequest, getProjectRequests };