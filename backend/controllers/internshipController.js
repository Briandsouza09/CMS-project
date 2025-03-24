const InternshipRequest = require('../models/InternshipRequest');

// Create a new internship request
const createInternshipRequest = async (req, res) => {
  const { name, usn, department, semester, company_name, company_location, start_date, end_date, guide_mail } = req.body;

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
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all internship requests for the logged-in user
const getInternshipRequests = async (req, res) => {
  const { usn } = req.user;

  try {
    const requests = await InternshipRequest.findByUsn(usn);
    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get count of internship requests for the logged-in user
const getInternshipCount = async (req, res) => {
  const { usn } = req.user;

  try {
    const count = await InternshipRequest.getCountByUsn(usn);
    res.status(200).json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createInternshipRequest, getInternshipRequests, getInternshipCount };