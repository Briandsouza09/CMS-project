const pool = require('../config/db');

class Project {
  static async create({
    student_id,
    name,
    usn,
    project_name,
    semester,
    guide_email,
    status = 'pending'
  }) {
    const [result] = await pool.query(
      `INSERT INTO projects 
      (student_id, name, usn, project_name, semester, guide_email, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [student_id, name, usn, project_name, semester, guide_email, status]
    );
    return result.insertId;
  }

  static async findByStudentId(student_id) {
    const [rows] = await pool.query(
      'SELECT * FROM projects WHERE student_id = ? ORDER BY created_at DESC',
      [student_id]
    );
    return rows;
  }

  static async findByGuideEmail(guide_email) {
    const [rows] = await pool.query(
      'SELECT * FROM projects WHERE guide_email = ? ORDER BY created_at DESC',
      [guide_email]
    );
    return rows;
  }

  static async updateStatus(id, status) {
    await pool.query(
      'UPDATE projects SET status = ? WHERE id = ?',
      [status, id]
    );
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Project;