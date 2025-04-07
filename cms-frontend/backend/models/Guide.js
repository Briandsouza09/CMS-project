const pool = require('../config/db');

class Guide {
  static async create({ name, branch, password, email }) {
    const [result] = await pool.query(
      'INSERT INTO guides (name, branch, password, email) VALUES (?, ?, ?, ?)',
      [name, branch, password, email]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM guides WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM guides WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Guide;