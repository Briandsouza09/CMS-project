const Staff = require('../models/Staff');
const Student = require('../models/Student');
const InternshipRequest = require('../models/InternshipRequest');
const ProjectRequest = require('../models/ProjectRequest');
const generateToken = require('../utils/generateToken');

// Staff Signup
const signUp = async (req, res) => {
  const { name, email, password, branch, role } = req.body;

  try {
    // Check if email already exists
    const existingStaff = await Staff.findByEmail(email);
    if (existingStaff) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Create new staff member
    const staff = await Staff.create({ name, email, password, branch, role });
    const token = generateToken({ id: staff.id, email: staff.email });
    res.status(201).json({ success: true, token, staff });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Staff Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const staff = await Staff.findByEmail(email);
    if (!staff || staff.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken({ id: staff.id, email: staff.email });
    res.status(200).json({ success: true, token, staff });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Fetch Students by Branch and Semester
const getStudents = async (req, res) => {
  const { branch, semester } = req.query;

  try {
    const students = await Student.findByBranchAndSemester(branch, semester);
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Fetch Requests for a Specific Student
const getRequests = async (req, res) => {
  const { studentId } = req.query;

  try {
    const internshipRequests = await InternshipRequest.findByStudentId(studentId);
    const projectRequests = await ProjectRequest.findByStudentId(studentId);
    res.status(200).json({ success: true, data: { internshipRequests, projectRequests } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Approve/Reject Request
const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status, type } = req.body;

  try {
    if (type === 'internship') {
      await InternshipRequest.updateStatus(id, status);
    } else if (type === 'project') {
      await ProjectRequest.updateStatus(id, status);
    } else {
      return res.status(400).json({ success: false, message: 'Invalid request type' });
    }

    res.status(200).json({ success: true, message: `Request ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { signUp, login, getStudents, getRequests, updateRequestStatus };