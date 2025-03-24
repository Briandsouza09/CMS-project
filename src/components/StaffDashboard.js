import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, FolderGit, User, Check, X } from 'lucide-react';

const StaffDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [requests, setRequests] = useState({ internshipRequests: [], projectRequests: [] });
  const [branch, setBranch] = useState('CSE');
  const [semester, setSemester] = useState(4);
  const navigate = useNavigate();

  // Fetch students by branch and semester
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/staff/students?branch=${branch}&semester=${semester}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setStudents(response.data.data);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };

    fetchStudents();
  }, [branch, semester]);

  // Fetch requests for the selected student
  useEffect(() => {
    if (selectedStudent) {
      const fetchRequests = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`/api/staff/requests?studentId=${selectedStudent.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setRequests(response.data.data);
        } catch (err) {
          console.error('Error fetching requests:', err);
        }
      };

      fetchRequests();
    }
  }, [selectedStudent]);

  // Handle approve/reject request
  const handleUpdateStatus = async (id, type, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/staff/requests/${id}`,
        { status, type },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      // Refresh requests after update
      const response = await axios.get(`/api/staff/requests?studentId=${selectedStudent.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setRequests(response.data.data);
    } catch (err) {
      console.error('Error updating request status:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Staff Dashboard</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="CSE">CSE</option>
            <option value="ISE">ISE</option>
            <option value="ECE">ECE</option>
          </select>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
        </div>

        {/* Student List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedStudent(student)}
            >
              <div className="flex items-center gap-4">
                <User className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.usn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Requests */}
        {selectedStudent && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Requests for {selectedStudent.name}</h2>

            {/* Internship Requests */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Internship Requests</h3>
              {requests.internshipRequests.length === 0 ? (
                <p className="text-gray-600">No internship requests found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {requests.internshipRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-lg shadow-lg p-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Company: {request.company_name}</p>
                        <p className="text-sm text-gray-500">Status: {request.status}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateStatus(request.id, 'internship', 'approved')}
                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(request.id, 'internship', 'rejected')}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Project Requests */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Requests</h3>
              {requests.projectRequests.length === 0 ? (
                <p className="text-gray-600">No project requests found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {requests.projectRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-lg shadow-lg p-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Project: {request.project_name}</p>
                        <p className="text-sm text-gray-500">Status: {request.status}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateStatus(request.id, 'project', 'approved')}
                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(request.id, 'project', 'rejected')}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;