import React, { useEffect, useState } from 'react';
import { UserCircle, BookOpen, Mail, Calendar } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);

  // Fetch user data from localStorage or backend
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-pulse flex space-x-2">
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg backdrop-filter">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
            <p className="mt-2 text-blue-100">Welcome back</p>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Name */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <UserCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* USN */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <BookOpen className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">USN</p>
                      <p className="text-lg font-semibold text-gray-800">{user.usn}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <BookOpen className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Branch</p>
                      <p className="text-lg font-semibold text-gray-800">{user.branch}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <Mail className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;