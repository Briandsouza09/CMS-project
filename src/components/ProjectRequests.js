import React, { useEffect, useState } from 'react';
import { FolderGit, User, BookOpen, Mail, Calendar } from 'lucide-react';

const ProjectRequests = () => {
  const [requests, setRequests] = useState([]);

  // Fetch project requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/projects', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        if (data.success) {
          setRequests(data.data);
        } else {
          console.error('Failed to fetch project requests:', data.message);
        }
      } catch (err) {
        console.error('Error fetching project requests:', err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Project Requests</h1>

        {requests.length === 0 ? (
          <p className="text-gray-600 text-center">No project requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex items-center space-x-4">
                    <User className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Student Name</p>
                      <p className="text-lg font-semibold text-gray-800">{request.name}</p>
                    </div>
                  </div>

                  {/* USN */}
                  <div className="flex items-center space-x-4">
                    <BookOpen className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">USN</p>
                      <p className="text-lg font-semibold text-gray-800">{request.usn}</p>
                    </div>
                  </div>

                  {/* Project Name */}
                  <div className="flex items-center space-x-4">
                    <FolderGit className="w-6 h-6 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Project Name</p>
                      <p className="text-lg font-semibold text-gray-800">{request.project_name}</p>
                    </div>
                  </div>

                  {/* Branch */}
                  <div className="flex items-center space-x-4">
                    <BookOpen className="w-6 h-6 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-500">Branch</p>
                      <p className="text-lg font-semibold text-gray-800">{request.branch}</p>
                    </div>
                  </div>

                  {/* Guide Email */}
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Guide Email</p>
                      <p className="text-lg font-semibold text-gray-800">{request.guide_email}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6"></div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className={`text-lg font-semibold ${
                        request.status === 'approved' ? 'text-green-600' :
                        request.status === 'rejected' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {request.status}
                      </p>
                    </div>
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

export default ProjectRequests;