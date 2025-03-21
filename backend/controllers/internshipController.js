// backend/controllers/internshipController.js
const InternshipRequest = require('../models/InternshipRequest');

// Create a new internship request
const createInternshipRequest = async (req, res) => {
  const { name, usn, department, semester, company_name, company_location, start_date, end_date, guide_mail } = req.body;

  // Debug log to check request body
  console.log('Request Body:', { name, usn, department, semester, company_name, company_location, start_date, end_date, guide_mail });

  // Validate required fields
  if (!name || !usn || !department || !semester || !company_name || !company_location || !start_date || !end_date || !guide_mail) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    // Create the internship request
    const result = await InternshipRequest.create({
      name,
      usn,
      department,
      semester,
      company_name,
      company_location,
      start_date,
      end_date,
      guide_mail,
    });

    // Fetch the newly created record
    const newRequest = await InternshipRequest.findById(result.insertId);

    res.status(201).json({ success: true, data: newRequest });
  } catch (err) {
    console.error('Error creating internship request:', err); // Debug log
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all internship requests for the logged-in user
const getInternshipRequests = async (req, res) => {
  const { usn } = req.user; // Extracted from JWT token

  // Debug log to check usn
  console.log('USN from JWT:', usn);

  if (!usn) {
    return res.status(400).json({ success: false, message: 'USN is required' });
  }

  try {
    const requests = await InternshipRequest.findByUsn(usn);

    // If no requests are found, return an empty array
    if (!requests || requests.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    console.error('Error fetching internship requests:', err); // Debug log
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createInternshipRequest, getInternshipRequests };