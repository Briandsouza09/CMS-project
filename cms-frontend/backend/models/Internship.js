const pool = require('../config/db');

class Internship {
  static async create({
    student_id,
    name,
    usn,
    college_name,
    semester,
    start_date,
    end_date,
    company_name,
    company_email,
    guide_email,
    status = 'pending'
  }) {
    const [result] = await pool.query(
      `INSERT INTO internships 
      (student_id, name, usn, college_name, semester, start_date, end_date, 
       company_name, company_email, guide_email, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student_id, name, usn, college_name, semester, start_date, end_date,
        company_name, company_email, guide_email, status
      ]
    );
    return result.insertId;
  }

  static async findByStudentId(student_id) {
    const [rows] = await pool.query(
      'SELECT * FROM internships WHERE student_id = ? ORDER BY created_at DESC',
      [student_id]
    );
    return rows;
  }

  static async findByGuideEmail(guide_email) {
    const [rows] = await pool.query(
      'SELECT * FROM internships WHERE guide_email = ? ORDER BY created_at DESC',
      [guide_email]
    );
    return rows;
  }

  static async updateStatus(id, status) {
    await pool.query(
      'UPDATE internships SET status = ? WHERE id = ?',
      [status, id]
    );
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM internships WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Internship;