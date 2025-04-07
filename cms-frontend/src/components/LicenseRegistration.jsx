import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LicenseRegistration = () => {
  const [industryName, setIndustryName] = useState('');
  const [email, setEmail] = useState('');
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const licenseData = { industryName, email, contact1, contact2 };
    localStorage.setItem('license', JSON.stringify(licenseData));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Industry License Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Industry Name</label>
            <input
              type="text"
              value={industryName}
              onChange={(e) => setIndustryName(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email (Contact Gmail)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Contact Number 1</label>
            <input
              type="tel"
              value={contact1}
              onChange={(e) => setContact1(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Contact Number 2</label>
            <input
              type="tel"
              value={contact2}
              onChange={(e) => setContact2(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
          >
            Register License
          </button>
        </form>
      </div>
    </div>
  );
};

export default LicenseRegistration;
