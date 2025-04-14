import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, Download, Eye, Loader2, HelpCircle, AlertCircle, X, Smartphone, Monitor } from 'lucide-react';
import { templates } from '../lib/templates';
import { PDFPreview } from '../components/PDFPreview';
import { CustomizationPanel } from '../components/CustomizationPanel';
import TextareaAutosize from 'react-textarea-autosize';
import { CVData } from '../types';
import { toast } from 'sonner';
import { PDFDownloadLink } from '@react-pdf/renderer';

interface Section {
  id: string;
  title: string;
  description?: string;
  isCustom?: boolean;
}

const defaultSections: Section[] = [
  { 
    id: 'personal',
    title: 'Personal Information',
    description: 'Add your contact details and basic information'
  },
  { 
    id: 'education',
    title: 'Education',
    description: 'List your academic qualifications and achievements'
  },
  { 
    id: 'experience',
    title: 'Work Experience',
    description: 'Highlight your professional experience and accomplishments'
  },
  { 
    id: 'skills',
    title: 'Skills',
    description: 'Showcase your technical, soft skills, and languages'
  },
];

const defaultCVData: CVData = {
  template_id: '',
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
      description: '',
    }],
    experience: [{
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    }],
    skills: {
      technical: '',
      soft: '',
      languages: '',
    },
    customSections: [],
  },
  styling: {
    primaryColor: '#1a56db',
    secondaryColor: '#4b5563',
    font: 'Helvetica',
    spacing: 1,
  },
};

export function BuilderPage() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>(defaultSections);
  const [cvData, setCVData] = useState<CVData>({ ...defaultCVData, template_id: templateId || '' });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [showTips, setShowTips] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const template = templates.find(t => t.id === templateId);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileDevice(isMobile);
      if (isMobile && !isPreviewOpen) {
        setIsMobileView(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isPreviewOpen]);

  const handleInputChange = (section: string, field: string, value: string, index?: number) => {
    setCVData(prev => {
      const newData = { ...prev };
      if (index !== undefined && Array.isArray(newData.content[section])) {
        newData.content[section][index] = {
          ...newData.content[section][index],
          [field]: value,
        };
      } else if (typeof newData.content[section] === 'object') {
        newData.content[section] = {
          ...newData.content[section],
          [field]: value,
        };
      }
      return newData;
    });
  };

  const addItem = (section: 'education' | 'experience') => {
    setCVData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: [
          ...prev.content[section],
          section === 'education' ? {
            school: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            description: '',
          } : {
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            description: '',
          },
        ],
      },
    }));
  };

  const removeItem = (section: 'education' | 'experience', index: number) => {
    setCVData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: prev.content[section].filter((_, i) => i !== index),
      },
    }));
  };

  const addCustomSection = () => {
    const newSection = {
      id: `custom-${Date.now()}`,
      title: 'New Section',
      description: 'Add custom content to your CV',
      isCustom: true,
    };
    setSections([...sections, newSection]);
    setCVData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        customSections: [
          ...(prev.content.customSections || []),
          { id: newSection.id, title: 'New Section', content: '' },
        ],
      },
    }));
  };

  const removeCustomSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
    setCVData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        customSections: prev.content.customSections?.filter(section => section.id !== sectionId) || [],
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('cv-data', JSON.stringify(cvData));
      toast.success('CV saved successfully');
    } catch (error) {
      console.error('Error saving CV:', error);
      toast.error('Failed to save CV. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const getTip = (sectionId: string): string => {
    switch (sectionId) {
      case 'personal':
        return 'Keep your contact information professional and up-to-date. Include your LinkedIn profile if relevant.';
      case 'education':
        return 'List your most recent education first. Include relevant coursework and achievements.';
      case 'experience':
        return 'Use action verbs and quantify your achievements where possible. Focus on impact rather than duties.';
      case 'skills':
        return 'Group skills by category and list the most relevant ones first. Include proficiency levels if applicable.';
      default:
        return 'Add relevant information that supports your application.';
    }
  };

  if (!template) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {!template ? (
        <div className="max-w-7xl mx-auto pt-10 px-4 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Template not found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">The template you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{cvData.title || 'Untitled CV'}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Template: {template.name}</p>
            </div>

            {isMobileDevice && (
              <button 
                onClick={() => setIsMobileView(!isMobileView)}
                className="mt-4 md:mt-0 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md flex items-center text-sm font-medium mr-2"
              >
                {isMobileView ? (
                  <>
                    <Monitor className="w-4 h-4 mr-1.5" />
                    <span>Preview Mode</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4 mr-1.5" />
                    <span>Edit Mode</span>
                  </>
                )}
              </button>
            )}
            
            <div className="flex gap-2 mt-4 md:mt-0">
              <button 
                onClick={handleSave}
                className="px-3 py-1.5 bg-green-600 text-white rounded-md flex items-center text-sm font-medium"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
                Save
              </button>
              <button 
                onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-md flex items-center text-sm font-medium"
              >
                <Eye className="w-4 h-4 mr-1.5" />
                Preview
              </button>
              {cvData.content.personal.fullName && (
                <PDFDownloadLink 
                  document={<PDFPreview data={cvData} template={template} />}
                  fileName={`${cvData.content.personal.fullName.replace(/\s+/g, '_')}_CV.pdf`}
                  className="px-3 py-1.5 bg-gray-800 dark:bg-gray-700 text-white rounded-md flex items-center text-sm font-medium"
                >
                  {({ loading }) => 
                    loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                        Preparing...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-1.5" />
                        Download PDF
                      </>
                    )
                  }
                </PDFDownloadLink>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {(!isMobileDevice || !isMobileView) && (
              <div className={`w-full ${!isPreviewOpen ? 'md:w-2/5' : 'md:w-full'}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                  <div className="flex border-b dark:border-gray-700">
                    {sections.map(section => (
                      <button
                        key={section.id}
                        className={`px-3 py-2 text-sm font-medium ${activeSection === section.id ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        {section.title}
                      </button>
                    ))}
                    <button
                      className="px-3 py-2 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 ml-auto"
                      onClick={addCustomSection}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4">
                    {activeSection === 'personal' && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={cvData.content.personal.fullName}
                            onChange={(e) => handleInputChange('personal', 'fullName', e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={cvData.content.personal.email}
                            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={cvData.content.personal.phone}
                            onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={cvData.content.personal.location}
                            onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                            placeholder="City, Country"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            LinkedIn Profile
                          </label>
                          <input
                            type="url"
                            value={cvData.content.personal.linkedin}
                            onChange={(e) => handleInputChange('personal', 'linkedin', e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                            placeholder="https://linkedin.com/in/johndoe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Portfolio Website
                          </label>
                          <input
                            type="url"
                            value={cvData.content.personal.portfolio}
                            onChange={(e) => handleInputChange('personal', 'portfolio', e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                            placeholder="https://portfolio.com"
                          />
                        </div>
                      </div>
                    )}

                    {activeSection === 'education' && (
                      <div className="space-y-8">
                        {cvData.content.education.map((edu, index) => (
                          <div key={index} className="relative border dark:border-gray-700 rounded-lg p-6">
                            {index > 0 && (
                              <button
                                onClick={() => removeItem('education', index)}
                                className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  School/University
                                </label>
                                <input
                                  type="text"
                                  value={edu.school}
                                  onChange={(e) => handleInputChange('education', 'school', e.target.value, index)}
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                  placeholder="University Name"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Degree
                                </label>
                                <input
                                  type="text"
                                  value={edu.degree}
                                  onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                  placeholder="Bachelor's, Master's, etc."
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Field of Study
                                </label>
                                <input
                                  type="text"
                                  value={edu.field}
                                  onChange={(e) => handleInputChange('education', 'field', e.target.value, index)}
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                  placeholder="Computer Science, Business, etc."
                                />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Start Date
                                  </label>
                                  <input
                                    type="text"
                                    value={edu.startDate}
                                    onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                    placeholder="MM/YYYY"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    End Date
                                  </label>
                                  <input
                                    type="text"
                                    value={edu.endDate}
                                    onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                    placeholder="MM/YYYY or Present"
                                  />
                                </div>
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Description
                                </label>
                                <TextareaAutosize
                                  value={edu.description}
                                  onChange={(e) => handleInputChange('education', 'description', e.target.value, index)}
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                  minRows={3}
                                  placeholder="• Relevant coursework, achievements, or projects&#13;&#10;• Academic honors or awards&#13;&#10;• Leadership roles or activities"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => addItem('education')}
                          className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <Plus className="w-5 h-5 mx-auto" />
                          <span className="text-sm font-medium mt-1">Add Education</span>
                        </button>
                      </div>
                    )}

                    {activeSection === 'experience' && (
                      <div className="space-y-8">
                        {cvData.content.experience.map((exp, index) => (
                          <div key={index} className="relative border dark:border-gray-700 rounded-lg p-6">
                            {index > 0 && (
                              <button
                                onClick={() => removeItem('experience', index)}
                                className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Company
                                </label>
                                <input
                                  type="text"
                                  value={exp.company}
                                  onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                  placeholder="Company Name"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Position
                                </label>
                                <input
                                  type="text"
                                  value={exp.position}
                                  onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                  placeholder="Job Title"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Location
                                </label>
                                <input
                                  type="text"
                                  value={exp.location}
                                  onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                  placeholder="City, Country"
                                />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Start Date
                                  </label>
                                  <input
                                    type="text"
                                    value={exp.startDate}
                                    onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                    placeholder="MM/YYYY"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    End Date
                                  </label>
                                  <input
                                    type="text"
                                    value={exp.endDate}
                                    onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                    placeholder="MM/YYYY or Present"
                                  />
                                </div>
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Description
                                </label>
                                <TextareaAutosize
                                  value={exp.description}
                                  onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                                  minRows={3}
                                  placeholder="• Led [specific project] resulting in [quantifiable outcome]&#13;&#10;• Managed team of [X] people to achieve [specific goal]&#13;&#10;• Implemented [specific solution] that improved [metric] by [X]%"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => addItem('experience')}
                          className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <Plus className="w-5 h-5 mx-auto" />
                          <span className="text-sm font-medium mt-1">Add Experience</span>
                        </button>
                      </div>
                    )}

                    {activeSection === 'skills' && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Technical Skills
                          </label>
                          <TextareaAutosize
                            value={cvData.content.skills.technical}
                            onChange={(e) => handleInputChange('skills', 'technical', e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                            minRows={3}
                            placeholder="Programming Languages: Python, JavaScript, Java&#13;&#10;Frameworks: React, Node.js, Django&#13;&#10;Tools: Git, Docker, AWS"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Soft Skills
                          </label>
                          <TextareaAutosize
                            value={cvData.content.skills.soft}
                            onChange={(e) => handleInputChange('skills', 'soft', e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                            minRows={3}
                            placeholder="• Leadership & Team Management&#13;&#10;• Problem Solving & Critical Thinking&#13;&#10;• Communication & Collaboration"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Languages
                          </label>
                          <TextareaAutosize
                            value={cvData.content.skills.languages}
                            onChange={(e) => handleInputChange('skills', 'languages', e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                            minRows={2}
                            placeholder="English (Native), Spanish (Fluent), French (Intermediate)"
                          />
                        </div>
                      </div>
                    )}

                    {sections.find(s => s.id === activeSection)?.isCustom && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={cvData.content.customSections?.find(s => s.id === activeSection)?.title || ''}
                            onChange={(e) => {
                              setCVData(prev => ({
                                ...prev,
                                content: {
                                  ...prev.content,
                                  customSections: prev.content.customSections?.map(s =>
                                    s.id === activeSection ? { ...s, title: e.target.value } : s
                                  ) || [],
                                },
                              }));
                              setSections(prev =>
                                prev.map(s =>
                                  s.id === activeSection ? { ...s, title: e.target.value } : s
                                )
                              );
                            }}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                            placeholder="e.g., Publications, Certifications, Projects"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Content
                          </label>
                          <TextareaAutosize
                            value={cvData.content.customSections?.find(s => s.id === activeSection)?.content || ''}
                            onChange={(e) => {
                              setCVData(prev => ({
                                ...prev,
                                content: {
                                  ...prev.content,
                                  customSections: prev.content.customSections?.map(s =>
                                    s.id === activeSection ? { ...s, content: e.target.value } : s
                                  ) || [],
                                },
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                            minRows={4}
                            placeholder="Add your content here..."
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => removeCustomSection(activeSection)}
                            className="text-red-500 hover:text-red-600 flex items-center"
                          >
                            <Trash2 className="w-5 h-5 mr-2" />
                            Remove Section
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {(!isMobileDevice || isMobileView || isPreviewOpen) && (
              <div className={`w-full ${!isPreviewOpen ? 'md:w-3/5' : 'md:w-full'} overflow-auto`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                  <div className="preview-container overflow-auto max-h-[800px] md:max-h-screen">
                    <PDFPreview data={cvData} template={template} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}