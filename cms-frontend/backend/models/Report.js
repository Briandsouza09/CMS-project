const pool = require('../config/db');

class Report {
  static async createInternshipReport({
    internship_id,
    name,
    usn,
    company_name,
    domain,
    software,
    project_name,
    daily_report
  }) {
    const [result] = await pool.query(
      `INSERT INTO internship_reports 
      (internship_id, name, usn, company_name, domain, software, project_name, daily_report) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [internship_id, name, usn, company_name, domain, software, project_name, daily_report]
    );
    return result.insertId;
  }

  static async createProjectReport({
    project_id,
    name,
    usn,
    project_name,
    daily_report
  }) {
    const [result] = await pool.query(
      `INSERT INTO project_reports 
      (project_id, name, usn, project_name, daily_report) 
      VALUES (?, ?, ?, ?, ?)`,
      [project_id, name, usn, project_name, daily_report]
    );
    return result.insertId;
  }

  static async getInternshipReports(internship_id) {
    const [rows] = await pool.query(
      'SELECT * FROM internship_reports WHERE internship_id = ? ORDER BY created_at DESC',
      [internship_id]
    );
    return rows;
  }

  static async getProjectReports(project_id) {
    const [rows] = await pool.query(
      'SELECT * FROM project_reports WHERE project_id = ? ORDER BY created_at DESC',
      [project_id]
    );
    return rows;
  }
}

module.exports = Report;