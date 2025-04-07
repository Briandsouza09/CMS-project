import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Hash, Mail, ClipboardList } from 'lucide-react';
import { createProject } from '../../api';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    project_name: '',
    semester: '',
    guide_email: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProject(formData);
      navigate('/student');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Field configuration with icons
  const fields = [
    { key: 'name', icon: User, placeholder: 'Student Name' },
    { key: 'usn', icon: Hash, placeholder: 'USN Number' },
    { key: 'project_name', icon: BookOpen, placeholder: 'Project Name' },
    { key: 'semester', icon: ClipboardList, placeholder: 'Semester' },
    { key: 'guide_email', icon: Mail, placeholder: 'Guide Email' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-100 p-3 rounded-full">
            <BookOpen className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Project Request Form</h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Submit your project details for approval
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ key, icon: Icon, placeholder }) => (
            <div className="relative" key={key}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
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
                <BookOpen className="h-5 w-5 mr-2" />
                Submit Project
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;