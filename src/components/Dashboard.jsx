import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Award } from 'lucide-react';

const DashboardCard = ({ title, icon: Icon, color, onClick, count }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md text-white ${color} flex items-center gap-4 cursor-pointer transition-transform transform hover:scale-105`}
      onClick={onClick}
    >
      <Icon size={28} />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{count !== undefined ? `${count} entries` : 'Loading...'}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [internshipCount, setInternshipCount] = useState(null);
  const [projectCount, setProjectCount] = useState(null);

  // Fetch counts from the backend
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch internship applications count
        const internshipResponse = await fetch('/api/internships/count', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const internshipData = await internshipResponse.json();
        if (internshipData.success) {
          setInternshipCount(internshipData.count);
        }

        // Fetch project requests count
        const projectResponse = await fetch('/api/projects/count', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const projectData = await projectResponse.json();
        if (projectData.success) {
          setProjectCount(projectData.count);
        }
      } catch (err) {
        console.error('Error fetching counts:', err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
        <p className="text-gray-600">Here's what's happening with your academic progress.</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <DashboardCard
          title="Internship Applications"
          icon={Briefcase}
          color="bg-purple-500"
          onClick={() => navigate('/internship-applications')}
          count={internshipCount}
        />
        <DashboardCard
          title="Project Requests"
          icon={Award}
          color="bg-green-500"
          onClick={() => navigate('/project-requests')}
          count={projectCount}
        />
      </div>
    </div>
  );
};

export default Dashboard;