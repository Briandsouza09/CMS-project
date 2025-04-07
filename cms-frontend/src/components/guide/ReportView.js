import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInternshipReports, getProjectReports } from '../../api';

const ReportView = () => {
  const { type, id } = useParams();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = type === 'internship' 
          ? await getInternshipReports(id)
          : await getProjectReports(id);
        setReports(data.reports);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReports();
  }, [type, id]);

  return (
    <div>
      <h2>{type === 'internship' ? 'Internship' : 'Project'} Reports</h2>
      {reports.length === 0 ? (
        <p>No reports submitted yet</p>
      ) : (
        reports.map(report => (
          <div key={report.id}>
            <h3>Report from {new Date(report.created_at).toLocaleDateString()}</h3>
            {type === 'internship' && (
              <>
                <p>Company: {report.company_name}</p>
                <p>Domain: {report.domain}</p>
                <p>Software: {report.software}</p>
              </>
            )}
            <p>Project: {report.project_name}</p>
            <h4>Daily Report:</h4>
            <p>{report.daily_report}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportView;