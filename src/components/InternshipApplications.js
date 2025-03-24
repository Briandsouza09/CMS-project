import React, { useEffect, useState } from 'react';
import { Briefcase, Calendar, MapPin, Mail, User, BookOpen } from 'lucide-react';

const InternshipApplications = () => {
  const [applications, setApplications] = useState([]);

  // Fetch internship applications from the backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/internships', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        if (data.success) {
          setApplications(data.data);
        } else {
          console.error('Failed to fetch internship applications:', data.message);
        }
      } catch (err) {
        console.error('Error fetching internship applications:', err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Internship Applications</h1>

        {applications.length === 0 ? (
          <p className="text-gray-600 text-center">No internship applications found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) => (
              <div key={application.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex items-center space-x-4">
                    <User className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Student Name</p>
                      <p className="text-lg font-semibold text-gray-800">{application.name}</p>
                    </div>
                  </div>

                  {/* USN */}
                  <div className="flex items-center space-x-4">
                    <BookOpen className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">USN</p>
                      <p className="text-lg font-semibold text-gray-800">{application.usn}</p>
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="flex items-center space-x-4">
                    <Briefcase className="w-6 h-6 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Company Name</p>
                      <p className="text-lg font-semibold text-gray-800">{application.company_name}</p>
                    </div>
                  </div>

                  {/* Company Location */}
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-6 h-6 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-500">Company Location</p>
                      <p className="text-lg font-semibold text-gray-800">{application.company_location}</p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-6 h-6 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {application.start_date} to {application.end_date}
                      </p>
                    </div>
                  </div>

                  {/* Guide Email */}
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Guide Email</p>
                      <p className="text-lg font-semibold text-gray-800">{application.guide_mail}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6"></div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className={`text-lg font-semibold ${
                        application.status === 'approved' ? 'text-green-600' :
                        application.status === 'rejected' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {application.status}
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

export default InternshipApplications;