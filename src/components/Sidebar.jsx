import React from 'react';
import { Home, BookOpen, Briefcase, FolderGit2, UserCircle, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Briefcase, label: 'Internships', path: '/internships' },
  { icon: FolderGit2, label: 'Projects', path: '/projects' },

  { icon: UserCircle, label: 'Profile', path: '/profile' },

];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 h-screen bg-slate-800 text-white w-64 flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Student Portal</h2>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-slate-700 text-white' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-3 text-slate-300 hover:text-white w-full px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
