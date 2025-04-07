import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, LogIn, GraduationCap, BookOpen, LogOut, LayoutDashboard } from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem('profile'));

  const handleLogout = () => {
    localStorage.removeItem('profile');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                CMS System
              </h1>
            </div>

            <nav className="flex items-center">
              {!profile ? (
                <div className="flex items-center space-x-1 sm:space-x-4">
                  <Link
                    to="/"
                    className="flex items-center px-3 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Home</span>
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center px-3 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                  <Link
                    to="/register/student"
                    className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow"
                  >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Register as Student</span>
                    <span className="sm:hidden">Student</span>
                  </Link>
                  <Link
                    to="/register/guide"
                    className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Register as Guide</span>
                    <span className="sm:hidden">Guide</span>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-6">
                  <span className="text-gray-700 hidden sm:flex items-center">
                    Welcome, <strong className="ml-1 text-indigo-600">{profile.user.name}</strong>
                  </span>
                  <Link
                    to={profile.user.role === 'student' ? '/student' : '/guide'}
                    className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-sm hover:shadow"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-600 font-medium">CMS Project</span>
            </div>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
