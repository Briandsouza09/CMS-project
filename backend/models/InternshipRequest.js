const db = require('../config/db');

class InternshipRequest {
  // Create a new internship request
  static async create({ name, usn, department, semester, company_name, company_location, start_date, end_date, guide_mail }) {
    const [result] = await db.execute(
      'INSERT INTO internship_requests (name, usn, department, semester, company_name, company_location, start_date, end_date, guide_mail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, usn, department, semester, company_name, company_location, start_date, end_date, guide_mail]
    );
    return result;
  }

  // Find an internship request by ID
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM internship_requests WHERE id = ?', [id]);
    return rows[0];
  }

  // Find all internship requests for a specific USN
  static async findByUsn(usn) {
    const [rows] = await db.execute('SELECT * FROM internship_requests WHERE usn = ?', [usn]);
    return rows;
  }

  // Get count of internship requests for a specific USN
  static async getCountByUsn(usn) {
    const [rows] = await db.execute('SELECT COUNT(*) AS count FROM internship_requests WHERE usn = ?', [usn]);
    return rows[0].count;
  }
}

module.exports = InternshipRequest;