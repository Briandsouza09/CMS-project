import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, User, BookOpen, KeyRound } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">CMS - Academic Portal</h1>
          <p className="text-indigo-100">Content Management System for Students and Guides</p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          {/* Login Card */}
          <Link 
            to="/login" 
            className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200 hover:border-indigo-300"
          >
            <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-4">
              <KeyRound className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Login</h3>
            <p className="text-gray-500 text-sm">Access your existing account</p>
          </Link>

          {/* Student Registration Card */}
          <Link 
            to="/register/student" 
            className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200 hover:border-indigo-300"
          >
            <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-4">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Student Registration</h3>
            <p className="text-gray-500 text-sm">Register as a student</p>
          </Link>

          {/* Guide Registration Card */}
          <Link 
            to="/register/guide" 
            className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200 hover:border-indigo-300"
          >
            <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-4">
              <User className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Guide Registration</h3>
            <p className="text-gray-500 text-sm">Register as a faculty guide</p>
          </Link>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">Academic Content Management System © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;