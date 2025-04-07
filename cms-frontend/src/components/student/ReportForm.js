import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  createInternshipReport,
  createProjectReport,
  getStudentRequests
} from '../../api';
import {
  User,
  Hash,
  Briefcase,
  BookOpen,
  FileText
} from 'lucide-react';

const ReportForm = () => {
  const { type, id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    company_name: '',
    domain: '',
    software: '',
    project_name: '',
    daily_report: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoading(true);
        if (state?.requestData) {
          const requestData = state.requestData;
          setFormData(prev => ({
            ...prev,
            name: requestData.name || '',
            usn: requestData.usn || '',
            company_name: requestData.company_name || '',
            domain: requestData.domain || '',
            software: requestData.software || '',
            project_name: requestData.project_name || ''
          }));
          return;
        }

        const { data } = await getStudentRequests();
        const req = type === 'internship'
          ? data.internships.find(i => i.id === parseInt(id))
          : data.projects.find(p => p.id === parseInt(id));

        if (req) {
          setFormData(prev => ({
            ...prev,
            name: req.name || '',
            usn: req.usn || '',
            company_name: req.company_name || '',
            domain: req.domain || '',
            software: req.software || '',
            project_name: req.project_name || ''
          }));
        }
      } catch (error) {
        console.error('Error fetching request:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [type, id, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (type === 'internship') {
        await createInternshipReport(id, formData);
      } else {
        await createProjectReport(id, formData);
      }
      navigate('/student/requests', { state: { reportSubmitted: true } });
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          {type === 'internship' ? (
            <Briefcase className="h-6 w-6 mr-2 text-indigo-600" />
          ) : (
            <BookOpen className="h-6 w-6 mr-2 text-indigo-600" />
          )}
          {type === 'internship' ? 'Internship' : 'Project'} Report Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="usn"
                placeholder="USN"
                value={formData.usn}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {type === 'internship' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="company_name"
                  placeholder="Company Name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <input
                type="text"
                name="domain"
                placeholder="Domain/Technology"
                value={formData.domain}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />

              <input
                type="text"
                name="software"
                placeholder="Software/Tools Used"
                value={formData.software}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />

              <input
                type="text"
                name="project_name"
                placeholder="Project Name"
                value={formData.project_name}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          )}

          {type === 'project' && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="project_name"
                placeholder="Project Name"
                value={formData.project_name}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              name="daily_report"
              placeholder="Daily Report (Describe your work in detail)"
              value={formData.daily_report}
              onChange={handleChange}
              rows={8}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
