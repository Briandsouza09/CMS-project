const db = require('../config/db');

class User {
  static async create({ usn, name, email, password, branch, role }) {
    const [result] = await db.execute(
      'INSERT INTO users (usn, name, email, password, branch, role) VALUES (?, ?, ?, ?, ?, ?)',
      [usn, name, email, password, branch, role]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findByUsn(usn) {
    const [rows] = await db.execute('SELECT * FROM users WHERE usn = ?', [usn]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = User;