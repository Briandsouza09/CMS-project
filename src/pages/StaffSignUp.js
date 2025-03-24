import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Building2, Loader2 } from "lucide-react";

const StaffSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    role: "", // Role selection
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(), // Trim input to avoid accidental spaces
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic form validation
    if (!formData.name || !formData.email || !formData.password || !formData.branch || !formData.role) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/staff/signup", formData);
      console.log(response.data);
      navigate("/signin"); // Redirect to Sign In after successful registration
    } catch (error) {
      console.error("Sign-up failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Sign-up failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="relative z-10 w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
          Staff Sign Up
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-center bg-red-800 bg-opacity-50 p-2 rounded-md mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex items-center bg-gray-700 rounded-lg p-3">
            <User className="w-5 h-5 text-purple-400 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              onChange={handleChange}
              value={formData.name}
              required
              autoFocus
            />
          </div>

          {/* Email */}
          <div className="flex items-center bg-gray-700 rounded-lg p-3">
            <Mail className="w-5 h-5 text-purple-400 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-gray-700 rounded-lg p-3">
            <Lock className="w-5 h-5 text-purple-400 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          {/* Branch */}
          <div className="flex items-center bg-gray-700 rounded-lg p-3">
            <Building2 className="w-5 h-5 text-purple-400 mr-3" />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              onChange={handleChange}
              value={formData.branch}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="flex items-center bg-gray-700 rounded-lg p-3">
            <select
              name="role"
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              onChange={handleChange}
              value={formData.role}
              required
            >
              <option value="">Select Role</option>
              <option value="HOD">HOD</option>
              <option value="Guide">Guide</option>
              <option value="Mentor">Mentor</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center p-3 bg-purple-500 rounded-lg font-semibold hover:bg-purple-600 transition duration-300 disabled:opacity-50"
            disabled={loading || !formData.name || !formData.email || !formData.password || !formData.branch || !formData.role}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
          </button>

          {/* Navigate to Sign In */}
          <p className="text-center text-gray-400 mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default StaffSignUp;