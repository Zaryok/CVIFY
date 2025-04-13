import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { WizardLayout } from './WizardLayout';
import { TemplateSelectionStep } from './steps/TemplateSelectionStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { WorkExperienceStep } from './steps/WorkExperienceStep';
import { EducationStep } from './steps/EducationStep';
import { SkillsStep } from './steps/SkillsStep';
import { FinalizeStep } from './steps/FinalizeStep';
import { CVData, Template } from '../../types';
import { defaultTemplates } from '../../data/templates';

// Initial empty CV data structure
const initialCVData: CVData = {
  id: uuidv4(),
  template_id: defaultTemplates[0].id,
  title: 'My Professional CV',
  content: {
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
    },
    education: [{
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    experience: [{
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    skills: {
      technical: '',
      soft: '',
      languages: ''
    },
    customSections: []
  },
  styling: {
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    font: 'Helvetica',
    spacing: 1.15
  }
};

export function CVWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [cvData, setCVData] = useState<CVData>(initialCVData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(defaultTemplates[0]);
  const [isSaving, setIsSaving] = useState(false);

  // Total number of steps in the wizard
  const totalSteps = 6;

  // Step completion validation
  const isStepComplete = () => {
    switch (currentStep) {
      case 0: // Template Selection
        return !!cvData.template_id;
      
      case 1: // Personal Info
        return !!(
          cvData.content.personal.fullName &&
          cvData.content.personal.email &&
          cvData.content.personal.phone &&
          cvData.content.personal.location
        );
      
      case 2: // Work Experience
        return cvData.content.experience.some(exp => 
          !!exp.company && !!exp.position && !!exp.startDate
        );
      
      case 3: // Education
        return cvData.content.education.some(edu => 
          !!edu.school && !!edu.degree && !!edu.startDate
        );
      
      case 4: // Skills
        return !!(
          cvData.content.skills.technical ||
          cvData.content.skills.soft ||
          cvData.content.skills.languages
        );
      
      case 5: // Finalize
        return !!cvData.title;
      
      default:
        return true;
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // CV data update handlers
  const updateCVData = (newData: Partial<CVData>) => {
    setCVData({ ...cvData, ...newData });
  };

  const updateSpecificField = (field: string, subfield: string, value: any) => {
    setCVData({
      ...cvData,
      content: {
        ...cvData.content,
        [field]: {
          ...cvData.content[field as keyof typeof cvData.content],
          [subfield]: value
        }
      }
    });
  };

  // Template selection handler
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    updateCVData({ template_id: template.id });
  };

  // Save draft handler
  const handleSaveDraft = async () => {
    setIsSaving(true);
    
    try {
      // Here you would implement the actual saving logic
      // For example, save to localStorage or make an API call

      // Mock saving with a delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save to localStorage for now
      localStorage.setItem('cv_draft', JSON.stringify(cvData));
      
      // Navigate to dashboard or confirm save
      console.log('CV draft saved successfully', cvData);
      // Optional: navigate('/dashboard');
    } catch (error) {
      console.error('Error saving CV draft', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <TemplateSelectionStep
            templates={defaultTemplates}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateSelect}
          />
        );
      
      case 1:
        return (
          <PersonalInfoStep
            personal={cvData.content.personal}
            updatePersonal={(field, value) => 
              updateSpecificField('personal', field, value)
            }
          />
        );
      
      case 2:
        return (
          <WorkExperienceStep
            experiences={cvData.content.experience}
            updateExperiences={(experiences) => 
              updateCVData({ 
                content: { ...cvData.content, experience: experiences } 
              })
            }
          />
        );
      
      case 3:
        return (
          <EducationStep
            educations={cvData.content.education}
            updateEducations={(educations) => 
              updateCVData({ 
                content: { ...cvData.content, education: educations } 
              })
            }
          />
        );
      
      case 4:
        return (
          <SkillsStep
            cvData={cvData}
            updateCVData={updateSpecificField}
          />
        );
      
      case 5:
        return (
          <FinalizeStep
            cvData={cvData}
            template={selectedTemplate}
            updateCVData={updateCVData}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <WizardLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
      isNextDisabled={!isStepComplete()}
      isComplete={currentStep === totalSteps - 1}
      cvData={cvData}
      template={selectedTemplate}
      onSave={handleSaveDraft}
      isSaving={isSaving}
    >
      {renderStep()}
    </WizardLayout>
  );
}
