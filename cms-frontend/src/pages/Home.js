import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, User, KeyRound } from 'lucide-react';
import { getLicenseData } from '../api/index';

const Home = () => {
  const [license, setLicense] = useState(null);

  useEffect(() => {
    const fetchLicense = async () => {
      try {
        const response = await getLicenseData();
        setLicense(response.data);
      } catch (error) {
        console.error('Failed to fetch license:', error);
      }
    };
    fetchLicense();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            {license?.industryName || 'CMS - Academic Portal'}
          </h1>
          <p className="text-indigo-100">
            {license ? 'Industry Portal for Students and Guides' : 'Content Management System for Students and Guides'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          <Link to="/login" className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200 hover:border-indigo-300">
            <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-4">
              <KeyRound className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Login</h3>
            <p className="text-gray-500 text-sm">Access your existing account</p>
          </Link>

          <Link to="/register/student" className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200 hover:border-indigo-300">
            <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-4">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Student Registration</h3>
            <p className="text-gray-500 text-sm">Register as a student</p>
          </Link>

          <Link to="/register/guide" className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200 hover:border-indigo-300">
            <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-4">
              <User className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Guide Registration</h3>
            <p className="text-gray-500 text-sm">Register as a faculty guide</p>
          </Link>
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            {license ? `${license.industryName} © ${new Date().getFullYear()}` : `Academic Content Management System © ${new Date().getFullYear()}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;