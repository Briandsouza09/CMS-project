// backend/models/User.js
const db = require('../config/db');

class User {
  static async create({ usn, name, email, password, branch, role }) { // Use `usn` instead of `username`
    const [result] = await db.execute(
      'INSERT INTO users (usn, name, email, password, branch, role) VALUES (?, ?, ?, ?, ?, ?)', // Use `usn`
      [usn, name, email, password, branch, role] // Use `usn`
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findByUsn(usn) { // Add this method to check for existing usn
    const [rows] = await db.execute('SELECT * FROM users WHERE usn = ?', [usn]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = User;