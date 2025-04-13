import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, AlertCircle } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { CVData } from '../../../types';
import { AIAssistPopover } from '../AIAssistPopover';

interface EducationStepProps {
  cvData: CVData;
  updateCVData: (field: string, subfield: string, value: string, index?: number) => void;
  addItem: (section: string) => void;
  removeItem: (section: string, index: number) => void;
}

// Helper for degree suggestions
const getDegreeSuggestions = (input: string) => {
  const commonDegrees = [
    'Bachelor of Science', 'Bachelor of Arts', 'Bachelor of Engineering',
    'Master of Science', 'Master of Arts', 'Master of Business Administration',
    'Doctor of Philosophy', 'Associate of Arts', 'Associate of Science',
    'Bachelor of Technology', 'Master of Engineering', 'Bachelor of Commerce',
    'Bachelor of Fine Arts', 'Master of Fine Arts', 'Doctor of Medicine'
  ];
  
  if (!input.trim()) return [];
  
  return commonDegrees
    .filter(degree => degree.toLowerCase().includes(input.toLowerCase()))
    .slice(0, 5); // Limit to 5 suggestions
};

// Helper for field of study suggestions
const getFieldSuggestions = (input: string) => {
  const commonFields = [
    'Computer Science', 'Business Administration', 'Electrical Engineering', 
    'Mechanical Engineering', 'Psychology', 'Economics', 'Marketing',
    'Biology', 'Chemistry', 'Physics', 'Mathematics', 'English Literature',
    'History', 'Political Science', 'Sociology', 'Graphic Design',
    'Finance', 'Communications', 'Information Technology', 'Civil Engineering',
    'Nursing', 'Education', 'Accounting', 'Architecture'
  ];
  
  if (!input.trim()) return [];
  
  return commonFields
    .filter(field => field.toLowerCase().includes(input.toLowerCase()))
    .slice(0, 5); // Limit to 5 suggestions
};

export function EducationStep({ 
  cvData, 
  updateCVData, 
  addItem, 
  removeItem 
}: EducationStepProps) {
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestionField, setActiveSuggestionField] = useState<string | null>(null);
  
  const handleFocus = (field: string, index: number) => {
    setFocusedFields(prev => ({ ...prev, [`${field}_${index}`]: true }));
  };
  
  const hasError = (field: string, index: number, value: string) => {
    return focusedFields[`${field}_${index}`] && !value.trim();
  };

  // Handle input for auto-suggestions
  const handleSuggestionInput = (
    e: React.ChangeEvent<HTMLInputElement>, 
    field: 'degree' | 'field', 
    index: number
  ) => {
    const value = e.target.value;
    updateCVData('education', field, value, index);
    
    if (value.trim().length > 1) {
      setSuggestions(field === 'degree' 
        ? getDegreeSuggestions(value) 
        : getFieldSuggestions(value)
      );
      setActiveSuggestionField(`${field}_${index}`);
    } else {
      setSuggestions([]);
      setActiveSuggestionField(null);
    }
  };
  
  // Apply a suggestion
  const applySuggestion = (suggestion: string, field: 'degree' | 'field', index: number) => {
    updateCVData('education', field, suggestion, index);
    setSuggestions([]);
    setActiveSuggestionField(null);
  };

  // AI Suggestions for education descriptions
  const descriptionExamples = [
    '• Graduated with honors (GPA: X.X/4.0)',
    '• Relevant coursework: [Course 1], [Course 2], and [Course 3]',
    '• Completed thesis/capstone project on [topic] resulting in [outcome]',
    '• Recipient of [scholarship/award] for academic excellence',
    '• Participated in [relevant extracurricular activity/club] as [your role]'
  ];
  
  // AI Suggestions for school/university
  const schoolExamples = [
    'Use the official name of your institution (check their website)',
    'For internationally recognized universities, you can omit location details',
    'For lesser-known institutions, consider adding the city and state/country',
    'If you studied abroad or had an exchange program, mention it'
  ];
  
  // AI Suggestions for degree
  const degreeExamples = [
    'Use the full official name of your degree (e.g., "Bachelor of Science" rather than "BS")',
    'If your degree is from another country, consider adding the US equivalent in parentheses',
    'For multiple specializations, list them all or focus on the most relevant one',
    'If you're currently pursuing a degree, add "(Expected)" after the graduation date'
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Add your educational background, starting with your highest degree
        </p>
      </div>
      
      {cvData.content.education.length === 0 ? (
        <div className="text-center py-10">
          <AlertCircle className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-base font-medium text-gray-700 dark:text-gray-300">No education added</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding your educational background</p>
          <button
            onClick={() => addItem('education')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {cvData.content.education.map((edu, index) => (
            <div key={index} className="relative bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 shadow-sm">
              {index > 0 && (
                <button
                  onClick={() => removeItem('education', index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                  aria-label="Remove education"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* School/University */}
                <div className="relative">
                  <div className="flex justify-between items-start mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      School/University <span className="text-red-500">*</span>
                    </label>
                    <AIAssistPopover examples={schoolExamples}>
                      <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                        <Sparkles size={14} className="mr-1" />
                        AI Tips
                      </button>
                    </AIAssistPopover>
                  </div>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateCVData('education', 'school', e.target.value, index)}
                    onFocus={() => handleFocus('school', index)}
                    className={`w-full px-3 py-2 rounded-md border ${
                      hasError('school', index, edu.school)
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
                    placeholder="e.g., Stanford University"
                    required
                  />
                  {hasError('school', index, edu.school) && (
                    <p className="mt-1 text-sm text-red-500">School/University is required</p>
                  )}
                </div>
                
                {/* Degree */}
                <div className="relative">
                  <div className="flex justify-between items-start mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Degree <span className="text-red-500">*</span>
                    </label>
                    <AIAssistPopover examples={degreeExamples}>
                      <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                        <Sparkles size={14} className="mr-1" />
                        AI Tips
                      </button>
                    </AIAssistPopover>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleSuggestionInput(e, 'degree', index)}
                      onFocus={() => handleFocus('degree', index)}
                      onBlur={() => {
                        setTimeout(() => {
                          setSuggestions([]);
                          setActiveSuggestionField(null);
                        }, 200);
                      }}
                      className={`w-full px-3 py-2 rounded-md border ${
                        hasError('degree', index, edu.degree)
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
                      placeholder="e.g., Bachelor of Science"
                      required
                    />
                    
                    {/* Autocomplete dropdown for degree */}
                    {suggestions.length > 0 && activeSuggestionField === `degree_${index}` && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                        <ul className="py-1 max-h-60 overflow-auto">
                          {suggestions.map((suggestion, i) => (
                            <li
                              key={i}
                              className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => applySuggestion(suggestion, 'degree', index)}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {hasError('degree', index, edu.degree) && (
                    <p className="mt-1 text-sm text-red-500">Degree is required</p>
                  )}
                </div>
                
                {/* Field of Study */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Field of Study <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => handleSuggestionInput(e, 'field', index)}
                      onFocus={() => handleFocus('field', index)}
                      onBlur={() => {
                        setTimeout(() => {
                          setSuggestions([]);
                          setActiveSuggestionField(null);
                        }, 200);
                      }}
                      className={`w-full px-3 py-2 rounded-md border ${
                        hasError('field', index, edu.field)
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
                      placeholder="e.g., Computer Science"
                      required
                    />
                    
                    {/* Autocomplete dropdown for field */}
                    {suggestions.length > 0 && activeSuggestionField === `field_${index}` && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                        <ul className="py-1 max-h-60 overflow-auto">
                          {suggestions.map((suggestion, i) => (
                            <li
                              key={i}
                              className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => applySuggestion(suggestion, 'field', index)}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {hasError('field', index, edu.field) && (
                    <p className="mt-1 text-sm text-red-500">Field of study is required</p>
                  )}
                </div>
                
                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateCVData('education', 'startDate', e.target.value, index)}
                      onFocus={() => handleFocus('startDate', index)}
                      className={`w-full px-3 py-2 rounded-md border ${
                        hasError('startDate', index, edu.startDate)
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
                      required
                    />
                    {hasError('startDate', index, edu.startDate) && (
                      <p className="mt-1 text-sm text-red-500">Required</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateCVData('education', 'endDate', e.target.value, index)}
                      onFocus={() => handleFocus('endDate', index)}
                      className={`w-full px-3 py-2 rounded-md border ${
                        hasError('endDate', index, edu.endDate)
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
                      required
                    />
                    {hasError('endDate', index, edu.endDate) && (
                      <p className="mt-1 text-sm text-red-500">Required</p>
                    )}
                  </div>
                </div>
                
                {/* Description */}
                <div className="md:col-span-2">
                  <div className="flex justify-between items-start mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <AIAssistPopover 
                      examples={descriptionExamples}
                      title="AI Description Suggestions"
                    >
                      <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                        <Sparkles size={14} className="mr-1" />
                        Generate Bullet Points
                      </button>
                    </AIAssistPopover>
                  </div>
                  <TextareaAutosize
                    value={edu.description}
                    onChange={(e) => updateCVData('education', 'description', e.target.value, index)}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                    minRows={3}
                    placeholder="• Relevant coursework: [Courses]&#13;&#10;• GPA: X.X/4.0&#13;&#10;• Academic achievements or extracurricular activities"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Optional, but helpful to highlight relevant coursework and achievements
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={() => addItem('education')}
            className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Plus className="w-5 h-5 mx-auto" />
            <span className="text-sm font-medium mt-1">Add Another Education</span>
          </button>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <div className="flex">
          <AlertCircle className="text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
              Pro Tips for Education Section
            </h3>
            <ul className="mt-2 text-sm text-indigo-700 dark:text-indigo-400 list-disc pl-5 space-y-1">
              <li>List education in reverse chronological order (most recent first)</li>
              <li>Include your GPA if it's 3.0 or higher (on a 4.0 scale)</li>
              <li>For recent graduates, highlight relevant coursework and academic projects</li>
              <li>Include certifications and continuing education if relevant</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
