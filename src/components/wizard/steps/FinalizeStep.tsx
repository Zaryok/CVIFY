import React, { useState } from 'react';
import { Sparkles, Check, ExternalLink } from 'lucide-react';
import { Sketch } from '@uiw/react-color';
import { CVData, Template } from '../../../types';
import { AIAssistPopover } from '../AIAssistPopover';

interface FinalizeStepProps {
  cvData: CVData;
  template: Template;
  updateCVData: (data: CVData) => void;
}

const fonts = [
  { name: 'Helvetica', value: 'Helvetica' },
  { name: 'Times New Roman', value: 'Times-Roman' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'OpenSans' },
] as const;

const spacingPresets = [
  { name: 'Compact', value: 1 },
  { name: 'Normal', value: 1.15 },
  { name: 'Comfortable', value: 1.3 },
  { name: 'Spacious', value: 1.5 },
] as const;

export function FinalizeStep({ cvData, template, updateCVData }: FinalizeStepProps) {
  const [activeTab, setActiveTab] = useState<'review' | 'customize'>('review');
  
  // Color picker states
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);
  
  // CV title suggestions for the user
  const titleExamples = [
    'Use a specific title like "Marketing Executive CV - John Smith"',
    'Include your target position to make it easier to find later',
    'Keep it professional and descriptive',
    'Consider including the date if you plan to create multiple versions'
  ];

  // Handle color changes
  const handleColorChange = (color: { hex: string }, type: 'primary' | 'secondary') => {
    updateCVData({
      ...cvData,
      styling: {
        ...cvData.styling,
        [`${type}Color`]: color.hex,
      },
    });
  };

  // Handle font changes
  const handleFontChange = (font: string) => {
    updateCVData({
      ...cvData,
      styling: {
        ...cvData.styling,
        font,
      },
    });
  };

  // Handle spacing changes
  const handleSpacingChange = (spacing: number) => {
    updateCVData({
      ...cvData,
      styling: {
        ...cvData.styling,
        spacing,
      },
    });
  };

  // Handle title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCVData({
      ...cvData,
      title: e.target.value,
    });
  };

  // Sections to review in the review tab
  const sections = [
    {
      title: 'Personal Information',
      data: cvData.content.personal,
      fields: [
        { label: 'Full Name', value: cvData.content.personal.fullName },
        { label: 'Email', value: cvData.content.personal.email },
        { label: 'Phone', value: cvData.content.personal.phone },
        { label: 'Location', value: cvData.content.personal.location },
        { label: 'LinkedIn', value: cvData.content.personal.linkedin },
        { label: 'Portfolio', value: cvData.content.personal.portfolio },
      ]
    },
    {
      title: 'Education',
      isArray: true,
      data: cvData.content.education,
      fields: (item: any) => [
        { label: 'School', value: item.school },
        { label: 'Degree', value: item.degree },
        { label: 'Field', value: item.field },
        { label: 'Dates', value: `${item.startDate} to ${item.endDate}` },
      ]
    },
    {
      title: 'Experience',
      isArray: true,
      data: cvData.content.experience,
      fields: (item: any) => [
        { label: 'Position', value: item.position },
        { label: 'Company', value: item.company },
        { label: 'Location', value: item.location },
        { label: 'Dates', value: `${item.startDate} to ${item.endDate}` },
      ]
    },
    {
      title: 'Skills',
      data: cvData.content.skills,
      fields: [
        { label: 'Technical Skills', value: cvData.content.skills.technical },
        { label: 'Soft Skills', value: cvData.content.skills.soft },
        { label: 'Languages', value: cvData.content.skills.languages },
      ]
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Finalize Your CV</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Review, customize, and make final adjustments to your CV
        </p>
      </div>
      
      {/* CV Title */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            CV Title <span className="text-red-500">*</span>
          </label>
          <AIAssistPopover examples={titleExamples}>
            <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
              <Sparkles size={14} className="mr-1" />
              AI Tips
            </button>
          </AIAssistPopover>
        </div>
        <input
          type="text"
          value={cvData.title}
          onChange={handleTitleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          placeholder="e.g., Professional Software Engineer CV - John Smith"
          required
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          This title is for your reference only and won't appear on the CV
        </p>
      </div>

      {/* Tabs for Review or Customize */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex -mb-px">
          <button
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'review'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('review')}
          >
            Review Content
          </button>
          <button
            className={`ml-8 py-2 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'customize'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('customize')}
          >
            Customize Design
          </button>
        </div>
      </div>

      {/* Review Content Tab */}
      {activeTab === 'review' && (
        <div className="space-y-8 mt-6">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-900/50 px-4 py-3 border-b dark:border-gray-700">
                <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                  {section.title}
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <Check size={12} className="mr-1" />
                    Complete
                  </span>
                </h3>
              </div>
              
              <div className="p-4">
                {section.isArray ? (
                  <div className="space-y-4">
                    {section.data.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="bg-gray-50 dark:bg-gray-900/30 p-3 rounded-md">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                          {section.title === 'Education' 
                            ? `${item.degree} in ${item.field}` 
                            : `${item.position} at ${item.company}`}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {section.fields(item).map((field: any, fieldIndex: number) => (
                            <div key={fieldIndex} className="text-sm">
                              <span className="text-gray-500 dark:text-gray-400">{field.label}: </span>
                              <span className="text-gray-800 dark:text-gray-200">{field.value || '—'}</span>
                            </div>
                          ))}
                        </div>
                        {item.description && (
                          <div className="mt-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Description: </span>
                            <div className="mt-1 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
                              {item.description}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.fields.map((field: any, fieldIndex: number) => (
                      <div key={fieldIndex} className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{field.label}: </span>
                        {field.label.includes('Skills') || field.label.includes('Languages') ? (
                          <div className="mt-1 text-gray-800 dark:text-gray-200 whitespace-pre-line">
                            {field.value || '—'}
                          </div>
                        ) : (
                          <span className="text-gray-800 dark:text-gray-200">{field.value || '—'}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-3 text-right">
                  <a
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      // Navigate to the appropriate step for editing
                      // This would need to be implemented with the parent component
                    }}
                    className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium inline-flex items-center"
                  >
                    <span>Edit {section.title}</span>
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Customize Design Tab */}
      {activeTab === 'customize' && (
        <div className="space-y-8 mt-6">
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Template Design
            </h2>
            
            <div className="space-y-6">
              {/* Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Primary Color */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Color
                  </h4>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowPrimaryPicker(!showPrimaryPicker);
                        setShowSecondaryPicker(false);
                      }}
                      className="w-full flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    >
                      <div 
                        className="w-6 h-6 rounded-md border border-gray-300 dark:border-gray-500 mr-3" 
                        style={{ backgroundColor: cvData.styling?.primaryColor || '#000000' }}
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {cvData.styling?.primaryColor || '#000000'}
                      </span>
                    </button>
                    
                    {showPrimaryPicker && (
                      <div className="absolute z-10 mt-2">
                        <div 
                          className="fixed inset-0" 
                          onClick={() => setShowPrimaryPicker(false)}
                        />
                        <div className="relative">
                          <Sketch
                            color={cvData.styling?.primaryColor || '#000000'}
                            onChange={(color) => handleColorChange(color, 'primary')}
                            disableAlpha={true}
                            presetColors={[
                              '#000000', '#1a56db', '#2563eb', '#3b82f6', 
                              '#0891b2', '#0d9488', '#059669', '#16a34a',
                              '#4f46e5', '#7c3aed', '#9333ea', '#c026d3',
                              '#db2777', '#e11d48', '#dc2626', '#ea580c'
                            ]}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Used for headings and section titles
                  </p>
                </div>
                
                {/* Secondary Color */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Secondary Color
                  </h4>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowSecondaryPicker(!showSecondaryPicker);
                        setShowPrimaryPicker(false);
                      }}
                      className="w-full flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    >
                      <div 
                        className="w-6 h-6 rounded-md border border-gray-300 dark:border-gray-500 mr-3" 
                        style={{ backgroundColor: cvData.styling?.secondaryColor || '#666666' }}
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {cvData.styling?.secondaryColor || '#666666'}
                      </span>
                    </button>
                    
                    {showSecondaryPicker && (
                      <div className="absolute z-10 mt-2">
                        <div 
                          className="fixed inset-0" 
                          onClick={() => setShowSecondaryPicker(false)}
                        />
                        <div className="relative">
                          <Sketch
                            color={cvData.styling?.secondaryColor || '#666666'}
                            onChange={(color) => handleColorChange(color, 'secondary')}
                            disableAlpha={true}
                            presetColors={[
                              '#666666', '#4b5563', '#6b7280', '#9ca3af',
                              '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0',
                              '#374151', '#1f2937', '#111827', '#030712',
                              '#525252', '#404040', '#262626', '#171717'
                            ]}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Used for subtitles and body text
                  </p>
                </div>
              </div>
              
              {/* Font */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Font
                </h4>
                <select
                  value={cvData.styling?.font || 'Helvetica'}
                  onChange={(e) => handleFontChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                >
                  {fonts.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Choose a professional font that matches your style
                </p>
              </div>

              {/* Spacing */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content Spacing
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {spacingPresets.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => handleSpacingChange(preset.value)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        cvData.styling?.spacing === preset.value
                          ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Adjust the spacing between elements in your CV
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Additional Tips
            </h2>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Keep your CV to 1-2 pages for optimal readability.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Use consistent formatting throughout your document.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Choose colors that are professional and easy to read when printed.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    After downloading, review your PDF to ensure everything looks as expected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
