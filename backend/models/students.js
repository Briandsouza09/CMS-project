const db = require('../config/db');

class Student {
  static async findByBranchAndSemester(branch, semester) {
    const [rows] = await db.execute(
      'SELECT id, name, usn, branch, semester FROM users WHERE branch = ? AND semester = ?',
      [branch, semester]
    );
    return rows;
  }
}

module.exports = Student;