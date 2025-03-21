import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../services/api';
import { User, Mail, Lock, BookOpen, ArrowRight, Loader2 } from 'lucide-react';

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
        navigate('/student/signin');
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
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border">
        <h2 className="text-gray-800 text-2xl font-semibold mb-6 text-center">Student Sign Up</h2>
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: 'name', placeholder: 'Full Name', icon: <User />, type: 'text' },
            { name: 'email', placeholder: 'Email', icon: <Mail />, type: 'email' },
            { name: 'password', placeholder: 'Password', icon: <Lock />, type: 'password' },
            { name: 'usn', placeholder: 'USN', icon: <BookOpen />, type: 'text' },
          ].map(({ name, placeholder, icon, type }) => (
            <div key={name} className="relative">
              <div className="absolute left-3 top-3 text-gray-500">{icon}</div>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          ))}

          <div className="relative">
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded flex items-center justify-center space-x-2 hover:bg-blue-700 transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Sign In Option */}
        <div className="text-center text-gray-600 mt-4">
          Already have an account?  
          <Link to="/student/signin" className="text-blue-600 hover:underline ml-1">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;