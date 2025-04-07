import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, BookOpen, Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { getStudentRequests } from '../../api';

const RequestStatus = () => {
  const [requests, setRequests] = useState({ internships: [], projects: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await getStudentRequests();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [navigate]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">My Requests</h2>
          <p className="mt-2 text-sm text-gray-600">Track the status of your internship and project requests</p>
        </div>

        <div className="space-y-8">
          {/* Internship Requests Section */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-indigo-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-indigo-600" />
                Internship Requests
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {requests.internships.length > 0 ? (
                requests.internships.map(req => (
                  <div key={`internship-${req.id}`} className="p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="font-medium">{req.company_name}</p>
                        <p className="text-sm text-gray-500">Period</p>
                        <p className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {new Date(req.start_date).toLocaleDateString()} - {new Date(req.end_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center">
                          {getStatusIcon(req.status)}
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                            {req.status}
                          </span>
                        </div>
                        {req.status === 'accepted' && (
                          <Link
                            to={`/student/internship/${req.id}/report`}
                            state={{
                              type: 'internship',
                              requestData: {
                                name: req.name,
                                usn: req.usn,
                                company_name: req.company_name,
                                guide_email: req.guide_email,
                                start_date: req.start_date,
                                end_date: req.end_date
                              }
                            }}
                          >
                            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Add Report
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No internship requests found
                </div>
              )}
            </div>
          </div>

          {/* Project Requests Section */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-indigo-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                Project Requests
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {requests.projects.length > 0 ? (
                requests.projects.map(req => (
                  <div key={`project-${req.id}`} className="p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Project</p>
                        <p className="font-medium">{req.project_name}</p>
                        <p className="text-sm text-gray-500">Semester</p>
                        <p className="font-medium">{req.semester}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center">
                          {getStatusIcon(req.status)}
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                            {req.status}
                          </span>
                        </div>
                        {req.status === 'accepted' && (
                          <Link
                            to={`/student/project/${req.id}/report`}
                            state={{
                              type: 'project',
                              requestData: {
                                name: req.name,
                                usn: req.usn,
                                project_name: req.project_name,
                                guide_email: req.guide_email,
                                semester: req.semester
                              }
                            }}
                          >
                            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Add Report
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No project requests found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestStatus;