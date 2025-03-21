import React, { useState, useEffect } from 'react';
import { createInternshipRequest, getInternshipRequests } from '../services/api';

const Internships = () => {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    department: '',
    semester: '',
    company_name: '',
    company_location: '',
    start_date: '',
    end_date: '',
    guide_mail: '',
  });

  useEffect(() => {
    fetchInternshipRequests();
  }, []);

  const fetchInternshipRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getInternshipRequests(token);
      setRequests(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch internship requests.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await createInternshipRequest(formData, token);
      setRequests([...requests, response.data]);
      setShowForm(false);
      setFormData({
        name: '',
        usn: '',
        department: '',
        semester: '',
        company_name: '',
        company_location: '',
        start_date: '',
        end_date: '',
        guide_mail: '',
      });
      setError(null);
    } catch (err) {
      setError(err.message || 'An error occurred while submitting the request.');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Internship Requests</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          {showForm ? 'Cancel' : 'New Request'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 mb-8">
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{key.replace(/_/g, ' ').toUpperCase()}</label>
                <input
                  type={key.includes('date') ? 'date' : 'text'}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Submit Request
              </button>
            </div>
          </div>
        </form>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-6">Existing Requests</h2>
        <ul>
          {requests.map(request => (
            <li key={request.id} className="border-b py-2">{request.name} - {request.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Internships;