import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { StepIndicator } from '../components/StepIndicator';
import { PersonalInfoForm } from '../components/forms/PersonalInfoForm';
import { ExperienceForm } from '../components/forms/ExperienceForm';
import { EducationForm } from '../components/forms/EducationForm';
import { SkillsForm } from '../components/forms/SkillsForm';
import { CustomSectionsForm } from '../components/forms/CustomSectionsForm';
import { PDFPreview } from '../components/PDFPreview';
import { CVData } from '../types';
import { getResumeById, saveResume } from '../utils/storageUtils';

// Type for steps - removed 'templates' since we're skipping that step
type Step = 'personal' | 'experience' | 'education' | 'skills' | 'custom';

// Define interfaces for the form component props
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
}

interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skills {
  technical: string;
  soft: string;
  languages: string;
}

interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export function EditResumePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (id) {
      try {
        // Load resume data from storage
        const resume = getResumeById(id);
        
        if (resume) {
          console.log("Resume loaded successfully:", resume);
          setCvData(resume);
        } else {
          console.error("Resume not found for ID:", id);
          setError("Resume not found. It may have been deleted.");
        }
      } catch (err) {
        console.error("Error loading resume:", err);
        setError("An error occurred while loading the resume.");
      }
    }
    
    setLoading(false);
  }, [id]);
  
  // Navigation between steps
  const handleNextStep = () => {
    switch (currentStep) {
      case 'personal':
        setCurrentStep('experience');
        break;
      case 'experience':
        setCurrentStep('education');
        break;
      case 'education':
        setCurrentStep('skills');
        break;
      case 'skills':
        setCurrentStep('custom');
        break;
    }
  };
  
  const handlePrevStep = () => {
    switch (currentStep) {
      case 'experience':
        setCurrentStep('personal');
        break;
      case 'education':
        setCurrentStep('experience');
        break;
      case 'skills':
        setCurrentStep('education');
        break;
      case 'custom':
        setCurrentStep('skills');
        break;
    }
  };
  
  // Update CV data
  const handleUpdateCV = (data: Partial<CVData>) => {
    if (cvData) {
      setCvData(prev => prev ? {
        ...prev,
        ...data,
      } : null);
    }
  };
  
  // Save resume and redirect to dashboard
  const handleSaveResume = () => {
    if (cvData) {
      try {
        const resumeId = saveResume(cvData);
        console.log('Resume updated with ID:', resumeId);
        if (resumeId) {
          navigate('/dashboard');
        } else {
          alert('Failed to save resume. Please try again.');
        }
      } catch (error) {
        console.error('Error saving resume:', error);
        alert('There was a problem saving your resume. Please try again.');
      }
    }
  };

  // Define the steps for the step indicator
  const steps = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'custom', label: 'Custom Sections' },
  ];
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto p-4 text-center py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 max-w-md mx-auto rounded mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 max-w-sm mx-auto rounded"></div>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading resume...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error || !cvData) {
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto p-4 text-center py-12">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{error || "Could not load resume data."}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto p-4">
        <div className="mb-6">
          <StepIndicator 
            steps={steps}
            currentStep={currentStep} 
          />
        </div>
      
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
            {currentStep === 'personal' && (
              <PersonalInfoForm 
                data={cvData.content.personal} 
                onUpdate={(personal: PersonalInfo) => handleUpdateCV({ 
                  content: { ...cvData.content, personal } 
                })} 
                onNext={handleNextStep} 
              />
            )}
            
            {currentStep === 'experience' && (
              <ExperienceForm 
                data={cvData.content.experience} 
                onUpdate={(experience: Experience[]) => handleUpdateCV({ 
                  content: { ...cvData.content, experience } 
                })} 
                onNext={handleNextStep} 
                onPrev={handlePrevStep} 
              />
            )}
            
            {currentStep === 'education' && (
              <EducationForm 
                data={cvData.content.education} 
                onUpdate={(education: Education[]) => handleUpdateCV({ 
                  content: { ...cvData.content, education } 
                })} 
                onNext={handleNextStep} 
                onPrev={handlePrevStep} 
              />
            )}
            
            {currentStep === 'skills' && (
              <SkillsForm 
                data={cvData.content.skills} 
                onUpdate={(skills: Skills) => handleUpdateCV({ 
                  content: { ...cvData.content, skills } 
                })} 
                onNext={handleNextStep} 
                onPrev={handlePrevStep} 
              />
            )}
            
            {currentStep === 'custom' && (
              <CustomSectionsForm 
                data={cvData.content.customSections || []} 
                onUpdate={(customSections: CustomSection[]) => handleUpdateCV({ 
                  content: { ...cvData.content, customSections } 
                })} 
                onPrev={handlePrevStep} 
                onSave={handleSaveResume} 
              />
            )}
          </div>
          
          <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Preview</h2>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg max-h-[70vh] overflow-y-auto">
              <PDFPreview data={cvData} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
