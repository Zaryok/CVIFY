import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowSidebar(!mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile menu toggle */}
      {isMobile && (
        <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="mr-2 p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">CVify</h1>
        </div>
      )}
      
      {/* Sidebar - conditionally shown on mobile */}
      {(showSidebar || !isMobile) && (
        <div className={`${isMobile ? 'fixed inset-0 z-40 bg-gray-800 bg-opacity-50' : ''}`}>
          <div className={`${isMobile ? 'w-64 h-full absolute z-50' : 'w-64 h-full'}`}>
            <Sidebar onClose={() => isMobile && setShowSidebar(false)} />
          </div>
          {isMobile && (
            <div 
              className="absolute inset-0" 
              onClick={() => setShowSidebar(false)}
            ></div>
          )}
        </div>
      )}
      
      {/* Main content */}
      <main className={`flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6 ${isMobile && showSidebar ? 'opacity-50' : ''}`}>
        {children}
      </main>
    </div>
  );
}
