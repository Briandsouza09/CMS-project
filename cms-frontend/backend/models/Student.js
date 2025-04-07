const pool = require('../config/db');

class Student {
  static async create({ name, usn, branch, password }) {
    const [result] = await pool.query(
      'INSERT INTO students (name, usn, branch, password) VALUES (?, ?, ?, ?)',
      [name, usn, branch, password]
    );
    return result.insertId;
  }

  static async findByUSN(usn) {
    const [rows] = await pool.query('SELECT * FROM students WHERE usn = ?', [usn]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Student;