const pool = require('../config/db');

class License {
  static async create(industryName, email, contact1, contact2 = null) {
    const [result] = await pool.query(
      'INSERT INTO licenses (industry_name, email, contact1, contact2) VALUES (?, ?, ?, ?)',
      [industryName, email, contact1, contact2]
    );
    return result.insertId;
  }

  static async findOne() {
    const [rows] = await pool.query('SELECT * FROM licenses LIMIT 1');
    return rows[0] || null;
  }
}

module.exports = License;