const db = require('../config/db');

class Staff {
  static async create({ name, email, password, branch, role }) {
    const [result] = await db.execute(
      'INSERT INTO staff (name, email, password, branch, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, branch, role]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM staff WHERE email = ?', [email]);
    return rows[0];
  }
}

module.exports = Staff;