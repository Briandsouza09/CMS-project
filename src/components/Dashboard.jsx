import React from 'react';
import { BookOpen, Briefcase, Award, Clock } from 'lucide-react';

const DashboardCard = ({ title, value, icon: Icon, color }: any) => {
  return (
    <div className={`p-4 rounded-lg shadow-md text-white ${color} flex items-center gap-4`}>
      <Icon size={28} />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const recentActivities = [
    { id: 1, title: 'Submitted Project Report', time: '2 hours ago' },
    { id: 2, title: 'Applied for Summer Internship', time: '5 hours ago' },
    { id: 3, title: 'Completed Python Course', time: '1 day ago' },
    { id: 4, title: 'Updated Portfolio', time: '2 days ago' },
  ];

  const upcomingDeadlines = [
    { id: 1, title: 'Database Project Submission', date: 'March 25, 2024' },
    { id: 2, title: 'Web Development Assignment', date: 'March 28, 2024' },
    { id: 3, title: 'Research Paper Review', date: 'April 2, 2024' },
  ];

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Student!</h1>
        <p className="text-gray-600">Here's what's happening with your academic progress.</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        
        <DashboardCard title="Internship Applications" value="" icon={Briefcase} color="bg-purple-500" />
        <DashboardCard title="Projects" value="" icon={Award} color="bg-green-500" />
        
      </div>

      {/* Recent Activities & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Recent Activities */}
        

        {/* Upcoming Deadlines */}
       
      </div>
    </div>
  );
};

export default Dashboard;
