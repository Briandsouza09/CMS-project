const db = require('../config/db');

class ProjectRequest {
  // Create a new project request
  static async create({ name, usn, semester, branch, project_name, guide_email }) {
    const [result] = await db.execute(
      'INSERT INTO project_requests (name, usn, semester, branch, project_name, guide_email) VALUES (?, ?, ?, ?, ?, ?)',
      [name, usn, semester, branch, project_name, guide_email]
    );
    return result;
  }

  // Find a project request by ID
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM project_requests WHERE id = ?', [id]);
    return rows[0];
  }

  // Find all project requests for a specific USN
  static async findByUsn(usn) {
    const [rows] = await db.execute('SELECT * FROM project_requests WHERE usn = ?', [usn]);
    return rows;
  }

  // Get count of project requests for a specific USN
  static async getCountByUsn(usn) {
    const [rows] = await db.execute('SELECT COUNT(*) AS count FROM project_requests WHERE usn = ?', [usn]);
    return rows[0].count;
  }
}

module.exports = ProjectRequest;