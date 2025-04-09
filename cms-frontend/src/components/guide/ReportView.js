import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInternshipReports, getProjectReports } from '../../api';

const ReportView = () => {
  const { type, id } = useParams();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = type === 'internship' 
          ? await getInternshipReports(id)
          : await getProjectReports(id);
        setReports(response.data.reports || response.data); // Handles both response structures
      } catch (error) {
        console.error('Failed to load reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [type, id]);

  return (
    <div className="report-view-container">
      <h2>{type === 'internship' ? 'Internship' : 'Project'} Reports</h2>
      
      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No reports submitted yet</p>
      ) : (
        reports.map(report => (
          <div key={report.id || report.report_id} className="report-card">
            <h3>Report from {new Date(report.created_at).toLocaleDateString()}</h3>
            {type === 'internship' && (
              <>
                <p><strong>Company:</strong> {report.company_name}</p>
                <p><strong>Domain:</strong> {report.domain}</p>
                <p><strong>Software:</strong> {report.software}</p>
              </>
            )}
            <p><strong>Project:</strong> {report.project_name}</p>
            <h4>Daily Report:</h4>
            <div className="report-content">
              {report.daily_report}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportView;