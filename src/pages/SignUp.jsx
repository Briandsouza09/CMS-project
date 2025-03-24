import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../services/api';
import { User, Mail, Lock, BookOpen, ArrowRight, Loader2, UserPlus } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    usn: '',
    branch: 'Computer Science',
    role: 'student',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await signUp(formData);
      if (response.success) {
        navigate('/login');
      } else {
        setError(response.message || 'Signup failed');
      }
    } catch (error) {
      setError(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 transform -rotate-12 rounded-3xl blur-3xl opacity-30"></div>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-inner">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg p-3">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Account</h2>
          <p className="text-center text-gray-600 mb-8">Join us to get started</p>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: 'name', placeholder: 'Full Name', icon: <User />, type: 'text' },
              { name: 'email', placeholder: 'Email address', icon: <Mail />, type: 'email' },
              { name: 'password', placeholder: 'Password', icon: <Lock />, type: 'password' },
              { name: 'usn', placeholder: 'USN Number', icon: <BookOpen />, type: 'text' },
            ].map(({ name, placeholder, icon, type }) => (
              <div key={name} className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200">
                  {icon}
                </div>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 outline-none text-gray-700 text-base transition-all duration-200"
                  required
                />
              </div>
            ))}

            <div className="relative group">
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 outline-none text-gray-700 text-base transition-all duration-200 appearance-none"
                required
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Computer science and design">Computer science and design</option>
                <option value="Computer science and business management">Computer science and business management</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Artificial intelligence and machine learning">Artificial intelligence and machine learning</option>
                <option value="Electronics">Electronics</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-blue-600/20 transition-all duration-200 hover:shadow-blue-600/40 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <div className="absolute inset-0 bg-white/20 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300"></div>
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="ml-2">Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium text-blue-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;