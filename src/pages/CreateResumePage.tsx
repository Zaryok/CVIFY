import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { StepIndicator } from '../components/StepIndicator';
import { PersonalInfoForm } from '../components/forms/PersonalInfoForm';
import { ExperienceForm } from '../components/forms/ExperienceForm';
import { EducationForm } from '../components/forms/EducationForm';
import { SkillsForm } from '../components/forms/SkillsForm';
import { CustomSectionsForm } from '../components/forms/CustomSectionsForm';
import { PDFPreview } from '../components/PDFPreview';
import { CVData } from '../types';
import { saveResume } from '../utils/storageUtils';

// Default template - we're only using one template now
const DEFAULT_TEMPLATE_ID = 'template-professional-1';
const DEFAULT_TEMPLATE_NAME = 'Executive';

// Initial CV data structure
const initialCVData: CVData = {
  template_id: DEFAULT_TEMPLATE_ID,
  title: `${DEFAULT_TEMPLATE_NAME} Resume`,
  content: {
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
      github: '',
    },
    education: [
      {
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ],
    experience: [
      {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ],
    skills: {
      technical: '',
      soft: '',
      languages: '',
    },
    customSections: [],
  },
  styling: {
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    font: 'Inter',
    spacing: 1,
  }
};

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

export function CreateResumePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  
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
    setCvData(prev => ({
      ...prev,
      ...data,
    }));
  };
  
  // Save resume and redirect to dashboard
  const handleSaveResume = () => {
    try {
      const resumeId = saveResume(cvData);
      console.log('Resume saved with ID:', resumeId);
      if (resumeId) {
        navigate('/dashboard');
      } else {
        alert('Failed to save resume. Please try again.');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('There was a problem saving your resume. Please try again.');
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
