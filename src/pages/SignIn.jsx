import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/api';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const SignIn = ({ setAuth }) => {
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
        navigate('/dashboard');
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
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-300">
        <h2 className="text-gray-900 text-2xl font-bold mb-6 text-center">Student Sign In</h2>

        {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: 'email', placeholder: 'Email', icon: <Mail />, type: 'email' },
            { name: 'password', placeholder: 'Password', icon: <Lock />, type: 'password' },
          ].map(({ name, placeholder, icon, type }) => (
            <div key={name} className="relative">
              <div className="absolute left-3 top-3 text-gray-500">{icon}</div>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-900"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account? 
            <a href="/signup" className="text-blue-600 ml-1 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;