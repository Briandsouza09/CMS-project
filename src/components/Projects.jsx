import React, { useState, useEffect } from 'react';
import { createProjectRequest, getProjectRequests } from '../services/api';
import { BookOpen, Mail, User, Calendar } from 'lucide-react';

const Projects = () => {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    fetchProjectRequests();
  }, []);

  const fetchProjectRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getProjectRequests(token);
      setRequests(response.data);
      setRequestCount(response.data.length);
    } catch (err) {
      setError(err.message || 'Failed to fetch project requests.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newRequest = {
      name: formData.get('name'),
      usn: formData.get('usn'),
      semester: formData.get('semester'),
      branch: formData.get('branch'),
      project_name: formData.get('project_name'),
      guide_email: formData.get('guide_email'),
    };

    try {
      const token = localStorage.getItem('token');
      const response = await createProjectRequest(newRequest, token);
      setRequests([...requests, response.data]);
      setRequestCount(requestCount + 1);
      setShowForm(false);
      e.currentTarget.reset();
      setError(null);
    } catch (err) {
      setError(err.message || 'An error occurred while submitting the request.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Project Requests</h1>
          <p className="text-gray-600">Submit and manage your project proposals</p>
          <p className="text-gray-600">Total Requests: {requestCount}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          {showForm ? 'Cancel' : 'New Project'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow-md p-6 rounded mb-6">
          <h2 className="text-lg font-semibold mb-4">New Project Request</h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input type="text" name="name" placeholder="Full Name" required className="border p-2 rounded w-full" />
            <input type="text" name="usn" placeholder="USN" required className="border p-2 rounded w-full" />
            <select name="semester" required className="border p-2 rounded w-full">
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
            <input type="text" name="branch" placeholder="Branch" required className="border p-2 rounded w-full" />
            <input type="text" name="project_name" placeholder="Project Name" required className="border p-2 rounded w-full" />
            <input type="email" name="guide_email" placeholder="Guide's Email" required className="border p-2 rounded w-full" />
            <button type="submit" className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 w-full">
              Submit Request
            </button>
          </form>
        </div>
      )}

      <div className="bg-white shadow-md p-6 rounded">
        <h2 className="text-lg font-semibold mb-4">Your Project Requests</h2>
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No project requests yet</p>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border p-4 rounded shadow-sm hover:shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-semibold">{request.project_name}</h3>
                    <p className="text-sm text-gray-600">{request.name} - {request.usn}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    request.status ? (
                      request.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      request.status === 'approved' ? 'bg-green-200 text-green-800' :
                      'bg-red-200 text-red-800'
                    ) : 'bg-gray-200 text-gray-800'
                  }`}>
                    {request.status ? request.status.charAt(0).toUpperCase() + request.status.slice(1) : 'Unknown Status'}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    Semester {request.semester}
                  </div>
                  <div className="flex items-center gap-1">
                    {request.guide_email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;