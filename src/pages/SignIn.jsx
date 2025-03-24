import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../services/api';
import { Mail, Lock, Loader2, ArrowRight, LogIn } from 'lucide-react';

const SignIn = ({ setAuth, redirectPath }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await signIn(formData);
      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setAuth(true);
        navigate(redirectPath || '/dashboard');
      } else {
        setError('Login failed. No token received.');
      }
    } catch (error) {
      setError(error.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 transform rotate-12 rounded-3xl blur-3xl opacity-30"></div>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-inner">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg p-3">
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-600 mb-8">Sign in to your account</p>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: 'email', placeholder: 'Email address', icon: <Mail />, type: 'email' },
              { name: 'password', placeholder: 'Password', icon: <Lock />, type: 'password' },
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

            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-blue-600/20 transition-all duration-200 hover:shadow-blue-600/40 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <div className="absolute inset-0 bg-white/20 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300"></div>
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="ml-2">Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="font-medium text-blue-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;