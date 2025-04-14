import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, X
} from 'lucide-react';

const navItems = [
  { title: 'My Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
  { title: 'My Resumes', icon: <FileText size={20} />, path: '/resumes' },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  
  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">CVify</h1>
        {onClose && (
          <button 
            onClick={onClose}
            className="md:hidden p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={onClose}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
