import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Users, FileText, BookOpen } from 'lucide-react';

const GuideDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Guide Dashboard</h2>
          <p className="mt-2 text-lg text-gray-600">Manage your students and their academic work</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Requests Card */}
          <Link 
            to="/guide/requests" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-indigo-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-4">
                <ClipboardList className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Student Requests</h3>
              <p className="mt-2 text-sm text-gray-500">View and approve internship/project requests</p>
            </div>
          </Link>

          {/* Students Card */}
          <Link 
            to="/guide/students" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-indigo-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">My Students</h3>
              <p className="mt-2 text-sm text-gray-500">Manage your assigned students</p>
            </div>
          </Link>

          {/* Reports Card */}
          <Link 
            to="/guide/reports/internship/123" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-indigo-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-4">
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Student Reports</h3>
              <p className="mt-2 text-sm text-gray-500">Review and evaluate student reports</p>
            </div>
          </Link>

          {/* Resources Card */}
          <Link 
            to="/guide/resources" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-indigo-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Resources</h3>
              <p className="mt-2 text-sm text-gray-500">Access teaching and mentoring resources</p>
            </div>
          </Link>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600">You approved John Doe's internship request</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600">Jane Smith submitted her project report</p>
              <p className="text-xs text-gray-400 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;
