import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, MoreVertical, Pencil, Download } from 'lucide-react';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { CVData } from '../types';
import { generatePDF } from '../lib/pdf-generator';
import { getResumes, deleteResumeById } from '../utils/storageUtils';

export function DashboardPage() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<CVData[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    // Load resumes from storage
    setResumes(getResumes());
  }, []);
  
  const handleCreateNew = () => {
    navigate('/create-resume');
  };
  
  const handleEditResume = (id: string) => {
    console.log("Editing resume with ID:", id);
    // Ensure the ID is valid before navigating
    if (id) {
      navigate(`/edit-resume/${id}`);
    }
  };

  const handleDeleteResume = (resumeId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    if (window.confirm('Are you sure you want to delete this resume?')) {
      deleteResumeById(resumeId);
      setResumes(getResumes());
      setActiveMenu(null);
    }
  };

  const handleDuplicateResume = (resumeId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    // Just log the resumeId to avoid the unused variable warning
    console.log("Duplicate resume requested for ID:", resumeId);
    // Functionality would be added here
    setActiveMenu(null);
    alert('Duplicate functionality will be implemented in a future update');
  };

  const handleDownloadResume = async (resume: CVData, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    try {
      const pdfBlob = await generatePDF(resume);
      const url = URL.createObjectURL(pdfBlob);
      
      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resume.title || 'resume'}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setActiveMenu(activeMenu === id ? null : id);
  };

  const getTimeAgo = (timestamp?: string) => {
    if (!timestamp) return 'just now';
    
    const now = new Date();
    const updated = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'yesterday';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Create New Resume Card */}
          <div 
            onClick={handleCreateNew}
            className="border border-dashed border-gray-600 rounded-lg p-6 cursor-pointer hover:border-gray-400 transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] bg-gray-800/20"
          >
            <h3 className="text-xl font-medium text-gray-300 mb-2">Create new resume</h3>
            <PlusCircle size={36} className="text-gray-500 mt-4" />
          </div>
          
          {/* Resume Cards */}
          {resumes.length > 0 ? (
            resumes.map((resume) => (
              <div key={resume.id} className="bg-gray-800/40 rounded-lg overflow-hidden">
                <div className="relative">
                  <div 
                    onClick={() => handleEditResume(resume.id || '')}
                    className="p-4 cursor-pointer h-full relative"
                  >
                    <div className="mb-2 flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-normal text-gray-300">{resume.title.toLowerCase()}</h3>
                        <p className="text-sm text-gray-500">Edited {getTimeAgo(resume.updated_at)}</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        {/* Download button */}
                        <button 
                          onClick={(e) => handleDownloadResume(resume, e)}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                          aria-label="Download resume"
                        >
                          <Download size={18} className="text-gray-400 hover:text-gray-200" />
                        </button>
                        {/* Edit button for quick access */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditResume(resume.id || '');
                          }}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                          aria-label="Edit resume"
                        >
                          <Pencil size={18} className="text-gray-400 hover:text-gray-200" />
                        </button>
                        {/* Options Menu Button */}
                        <button 
                          onClick={(e) => toggleMenu(resume.id || '', e)} 
                          className="text-gray-500 hover:text-gray-300 p-1 rounded-full transition-colors"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Mini Resume Preview - Just showing basic format */}
                    <div className="bg-gray-900 p-4 rounded h-[120px] overflow-hidden">
                      <div className="border-b border-gray-700 pb-1 mb-1">
                        <div className="w-1/2 h-3 bg-gray-700 rounded-full mb-1"></div>
                        <div className="w-1/3 h-2 bg-gray-700 rounded-full"></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <div className="space-y-1 w-1/2">
                          <div className="w-3/4 h-2 bg-gray-800 rounded-full"></div>
                          <div className="w-2/3 h-2 bg-gray-800 rounded-full"></div>
                          <div className="w-4/5 h-2 bg-gray-800 rounded-full"></div>
                        </div>
                        <div className="space-y-1 w-1/3">
                          <div className="w-full h-2 bg-gray-800 rounded-full"></div>
                          <div className="w-3/4 h-2 bg-gray-800 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dropdown Menu - Now positioned relative to its parent */}
                  {activeMenu === resume.id && (
                    <div className="absolute right-4 top-12 w-40 bg-gray-800 rounded shadow-lg z-10">
                      <ul className="py-1">
                        <li>
                          <button
                            onClick={(e) => handleDuplicateResume(resume.id || '', e)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          >
                            Duplicate
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={(e) => handleDeleteResume(resume.id || '', e)}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-800/40 rounded-lg overflow-hidden">
              <div className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                <h3 className="text-xl font-medium text-gray-500 mb-2">Open resume to start</h3>
              </div>
            </div>
          )}
        </div>
        
        {/* Add Section Button (like in the reference UI) */}
        <div className="mt-8">
          <button 
            onClick={handleCreateNew} 
            className="flex items-center gap-2 px-4 py-2 border border-gray-700 text-gray-400 rounded-md hover:bg-gray-800/50 transition-colors"
          >
            <PlusCircle size={18} />
            <span>ADD SECTION</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
