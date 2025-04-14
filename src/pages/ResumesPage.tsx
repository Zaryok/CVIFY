import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, FileText, Download, Pencil, Trash2 } from 'lucide-react';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { getResumes, deleteResumeById } from '../utils/storageUtils';
import { CVData } from '../types';
import { generatePDF } from '../lib/pdf-generator';

// Mock templates - in a real app, this would come from an API or database
const mockTemplates = [
  {
    id: 'template-professional-1',
    name: 'Executive',
    category: 'Professional',
  },
  {
    id: 'template-creative-1',
    name: 'Artisan',
    category: 'Creative',
  },
  {
    id: 'template-modern-1',
    name: 'Innovator',
    category: 'Modern',
  },
  {
    id: 'template-professional-2',
    name: 'Diplomat',
    category: 'Professional',
  },
];

export function ResumesPage() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<CVData[]>([]);
  
  useEffect(() => {
    // Load resumes from storage
    setResumes(getResumes());
  }, []);
  
  const handleCreateNew = () => {
    navigate('/create-resume');
  };
  
  const handleEditResume = (id: string) => {
    navigate(`/edit-resume/${id}`);
  };
  
  const handleDeleteResume = (id: string) => {
    if (window.confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      deleteResumeById(id);
      setResumes(getResumes());
    }
  };
  
  const handleDownloadResume = async (resume: CVData) => {
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
  
  // Get template name from template ID
  const getTemplateName = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId);
    return template ? template.name : 'Custom Template';
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">My Resumes</h1>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            <PlusCircle size={16} />
            <span>Create New Resume</span>
          </button>
        </div>
        
        {resumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
              >
                <div 
                  className="h-32 sm:h-40 bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-b border-gray-200 dark:border-gray-600 cursor-pointer"
                  onClick={() => handleEditResume(resume.id || '')}
                >
                  <FileText size={32} className="text-gray-400 dark:text-gray-500" />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
                    {resume.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Template: {getTemplateName(resume.template_id)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Last updated: {new Date(resume.updated_at || Date.now()).toLocaleDateString()}
                  </p>
                  
                  <div className="flex justify-between mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditResume(resume.id || '')}
                        className="p-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        aria-label="Edit resume"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteResume(resume.id || '')}
                        className="p-1 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                        aria-label="Delete resume"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDownloadResume(resume)}
                      className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      <Download size={12} />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
            <FileText size={40} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">No resumes yet</h3>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6">Create your first resume to get started</p>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto text-sm sm:text-base"
            >
              <PlusCircle size={16} />
              <span>Create New Resume</span>
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
