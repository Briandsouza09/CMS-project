import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Clock, Briefcase, BookOpen, User, Hash } from 'lucide-react';
import { getGuideRequests, updateInternshipStatus, updateProjectStatus } from '../../api';

const RequestList = () => {
  const [requests, setRequests] = useState({ internships: [], projects: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const { data } = await getGuideRequests();
        setRequests(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (type, id, status) => {
    try {
      if (type === 'internship') {
        await updateInternshipStatus(id, status);
      } else {
        await updateProjectStatus(id, status);
      }
      const { data } = await getGuideRequests();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Student Requests</h2>
          <p className="mt-2 text-sm text-gray-600">Review and manage student internship and project requests</p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Internship Requests */}
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
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{req.student.name} (<Hash className="inline h-3 w-3" /> {req.usn})</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{req.company_name}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end space-y-3">
                          <div className="flex items-center">
                            {getStatusIcon(req.status)}
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                              {req.status}
                            </span>
                          </div>
                          {req.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleStatusUpdate('internship', req.id, 'accepted')}
                                className="px-3 py-1 text-xs font-medium rounded bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleStatusUpdate('internship', req.id, 'rejected')}
                                className="px-3 py-1 text-xs font-medium rounded bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                              >
                                Reject
                              </button>
                            </div>
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

            {/* Project Requests */}
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
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{req.student.name} (<Hash className="inline h-3 w-3" /> {req.usn})</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{req.project_name}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end space-y-3">
                          <div className="flex items-center">
                            {getStatusIcon(req.status)}
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                              {req.status}
                            </span>
                          </div>
                          {req.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleStatusUpdate('project', req.id, 'accepted')}
                                className="px-3 py-1 text-xs font-medium rounded bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleStatusUpdate('project', req.id, 'rejected')}
                                className="px-3 py-1 text-xs font-medium rounded bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                              >
                                Reject
                              </button>
                            </div>
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
        )}
      </div>
    </div>
  );
};

export default RequestList;