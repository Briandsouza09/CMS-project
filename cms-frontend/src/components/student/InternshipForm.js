import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, User, Hash, School, Calendar, Mail, BookOpen } from 'lucide-react';
import { createInternship } from '../../api';

const InternshipForm = () => {
  const [formData, setFormData] = useState({
    name: '', 
    usn: '', 
    college_name: '', 
    semester: '',
    start_date: '', 
    end_date: '', 
    company_name: '',
    company_email: '', 
    guide_email: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createInternship(formData);
      navigate('/student');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Field configuration with icons and types
  const fields = [
    { key: 'name', icon: User, placeholder: 'Student Name' },
    { key: 'usn', icon: Hash, placeholder: 'USN Number' },
    { key: 'college_name', icon: School, placeholder: 'College Name' },
    { key: 'semester', icon: BookOpen, placeholder: 'Semester' },
    { key: 'company_name', icon: Briefcase, placeholder: 'Company Name' },
    { key: 'company_email', icon: Mail, placeholder: 'Company Email' },
    { key: 'guide_email', icon: Mail, placeholder: 'Guide Email' },
    { key: 'start_date', icon: Calendar, placeholder: 'Start Date', type: 'date' },
    { key: 'end_date', icon: Calendar, placeholder: 'End Date', type: 'date' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-100 p-3 rounded-full">
            <Briefcase className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Internship Request Form</h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Submit your internship details for approval
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ key, icon: Icon, placeholder, type = 'text' }) => (
            <div className="relative" key={key}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={type}
                placeholder={placeholder}
                value={formData[key]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Briefcase className="h-5 w-5 mr-2" />
                Submit Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InternshipForm;