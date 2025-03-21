// backend/models/ProjectRequest.js
const db = require('../config/db');

class ProjectRequest {
  static async create({ name, usn, semester, branch, project_name, guide_email }) {
    const [result] = await db.execute(
      'INSERT INTO project_requests (name, usn, semester, branch, project_name, guide_email) VALUES (?, ?, ?, ?, ?, ?)',
      [name, usn, semester, branch, project_name, guide_email]
    );
    return result;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM project_requests WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByUsn(usn) {
    const [rows] = await db.execute('SELECT * FROM project_requests WHERE usn = ?', [usn]);
    return rows;
  }
}

module.exports = ProjectRequest; // Export the class