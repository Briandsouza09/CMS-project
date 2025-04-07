import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FolderGit2, ClipboardList, ArrowRight, GraduationCap } from 'lucide-react';

const StudentDashboard = () => {
  const profile = JSON.parse(localStorage.getItem('profile'));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-indigo-100 p-3 rounded-full">
          <GraduationCap className="h-8 w-8 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Dashboard</h2>
          <p className="text-sm text-gray-600">Welcome back, {profile?.user?.name || 'Student'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          to="/student/internship" 
          className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Internship Request</h3>
          <p className="text-sm text-gray-600">Submit a new internship application for approval</p>
        </Link>

        <Link 
          to="/student/project" 
          className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FolderGit2 className="h-6 w-6 text-purple-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-200" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Request</h3>
          <p className="text-sm text-gray-600">Create a new project proposal for review</p>
        </Link>

        <Link 
          to="/student/requests" 
          className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <ClipboardList className="h-6 w-6 text-green-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-200" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">My Requests</h3>
          <p className="text-sm text-gray-600">View and track all your submitted requests</p>
        </Link>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Tips</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center">
            <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
            Keep your project documentation up to date
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
            Regular communication with your guide is key
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
            Submit progress reports on time
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;