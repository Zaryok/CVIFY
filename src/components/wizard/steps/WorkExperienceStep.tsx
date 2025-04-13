import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, AlertCircle } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { CVData } from '../../../types';
import { AIAssistPopover } from '../AIAssistPopover';

interface WorkExperienceStepProps {
  cvData: CVData;
  updateCVData: (field: string, subfield: string, value: string, index?: number) => void;
  addItem: (section: string) => void;
  removeItem: (section: string, index: number) => void;
}

// Helper for job title suggestions based on input
const getJobSuggestions = (input: string) => {
  const commonTitles = [
    'Software Engineer', 'Product Manager', 'Data Scientist', 
    'Marketing Specialist', 'Project Manager', 'UX Designer',
    'Sales Representative', 'Financial Analyst', 'Customer Success Manager',
    'Operations Manager', 'Human Resources Specialist', 'Research Associate',
    'Content Writer', 'Graphic Designer', 'Business Analyst',
    'Front-end Developer', 'Back-end Developer', 'Full Stack Developer'
  ];
  
  if (!input.trim()) return [];
  
  return commonTitles
    .filter(title => title.toLowerCase().includes(input.toLowerCase()))
    .slice(0, 5); // Limit to 5 suggestions
};

export function WorkExperienceStep({ 
  cvData, 
  updateCVData, 
  addItem, 
  removeItem 
}: WorkExperienceStepProps) {
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
  const [jobSuggestions, setJobSuggestions] = useState<string[]>([]);
  const [activeSuggestionField, setActiveSuggestionField] = useState<string | null>(null);
  
  const handleFocus = (field: string, index: number) => {
    setFocusedFields(prev => ({ ...prev, [`${field}_${index}`]: true }));
  };
  
  const hasError = (field: string, index: number, value: string) => {
    return focusedFields[`${field}_${index}`] && !value.trim();
  };

  // Handle job title input for auto-suggestions
  const handlePositionInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    updateCVData('experience', 'position', value, index);
    
    if (value.trim().length > 1) {
      setJobSuggestions(getJobSuggestions(value));
      setActiveSuggestionField(`position_${index}`);
    } else {
      setJobSuggestions([]);
      setActiveSuggestionField(null);
    }
  };
  
  // Apply a suggestion
  const applySuggestion = (suggestion: string, index: number) => {
    updateCVData('experience', 'position', suggestion, index);
    setJobSuggestions([]);
    setActiveSuggestionField(null);
  };

  // AI Suggestions for work descriptions
  const descriptionExamples = [
    '• Developed [specific feature/product] using [technologies], resulting in [measurable outcome (e.g., 20% increase in user engagement)]',
    '• Led a team of [X] members to deliver [project/initiative] on time and under budget, exceeding client expectations',
    '• Implemented [process/system] that improved [specific metric] by [X]%, saving approximately [amount] annually',
    '• Collaborated with cross-functional teams to successfully launch [product/feature] to [user base size] users',
    '• Recognized for excellence with [award/recognition] for contributions to [project/initiative]'
  ];
  
  // AI Suggestions for job positions
  const positionExamples = [
    'Be specific with your title (e.g., "Senior Java Developer" instead of just "Developer")',
    'Match the title that appears on your official employment records',
    'If your official title is vague, you can add a more descriptive title in parentheses',
    'Avoid using internal title codes or abbreviations unfamiliar to outside readers'
  ];
  
  // AI Suggestions for company names
  const companyExamples = [
    'Use the official company name as it appears on the company website',
    'For well-known companies, you don\'t need to include "Inc." or "LLC"',
    'For lesser-known companies, consider adding a brief description (e.g., "Acme Corp, a regional healthcare provider")',
    'Be consistent with how you format company names throughout your resume'
  ];
  
  // AI Suggestions for dates
  const dateExamples = [
    'Use the same date format consistently throughout your resume',
    'If you\'re currently employed, use "Present" or "Current" for the end date',
    'For gaps in employment, consider using years only instead of months and years',
    'If you had multiple roles at the same company, list them separately with appropriate dates'
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Work Experience</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Add your relevant work history, starting with your most recent position
        </p>
      </div>
      
      {cvData.content.experience.length === 0 ? (
        <div className="text-center py-10">
          <AlertCircle className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-base font-medium text-gray-700 dark:text-gray-300">No experience added</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding your work experience</p>
          <button
            onClick={() => addItem('experience')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {cvData.content.experience.map((exp, index) => (
            <div key={index} className="relative bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 shadow-sm">
              {index > 0 && (
                <button
                  onClick={() => removeItem('experience', index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                  aria-label="Remove experience"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Position */}
                <div className="relative">
                  <div className="flex justify-between items-start mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <AIAssistPopover examples={positionExamples}>
                      <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                        <Sparkles size={14} className="mr-1" />
                        AI Tips
                      </button>
                    </AIAssistPopover>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => handlePositionInput(e, index)}
                      onFocus={() => handleFocus('position', index)}
                      onBlur={() => {
                        // Delay hiding suggestions to allow for clicks
                        setTimeout(() => {
                          setJobSuggestions([]);
                          setActiveSuggestionField(null);
                        }, 200);
                      }}
                      className={`w-full px-3 py-2 rounded-md border ${
                        hasError('position', index, exp.position)
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
                      placeholder="e.g., Senior Software Engineer"
                      required
                    />
                    
                    {/* Autocomplete dropdown */}
                    {jobSuggestions.length > 0 && activeSuggestionField === `position_${index}` && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                        <ul className="py-1 max-h-60 overflow-auto">
                          {jobSuggestions.map((suggestion, i) => (
                            <li
                              key={i}
                              className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => applySuggestion(suggestion, index)}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {hasError('position', index, exp.position) && (
                    <p className="mt-1 text-sm text-red-500">Job title is required</p>
                  )}
                </div>
                
                {/* Company */}
                <div className="relative">
                  <div className="flex justify-between items-start mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <AIAssistPopover examples={companyExamples}>
                      <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                        <Sparkles size={14} className="mr-1" />
                        AI Tips
                      </button>
                    </AIAssistPopover>
                  </div>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateCVData('experience', 'company', e.target.value, index)}
                    onFocus={() => handleFocus('company', index)}
                    className={`w-full px-3 py-2 rounded-md border ${
                      hasError('company', index, exp.company)
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
                    placeholder="e.g., Google, Inc."
                    required
                  />
                  {hasError('company', index, exp.company) && (
                    <p className="mt-1 text-sm text-red-500">Company name is required</p>
                  )}
                </div>
                
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateCVData('experience', 'location', e.target.value, index)}
                    onFocus={() => handleFocus('location', index)}
                    className={`w-full px-3 py-2 rounded-md border ${
                      hasError('location', index, exp.location)
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
                    placeholder="e.g., San Francisco, CA"
                    required
                  />
                  {hasError('location', index, exp.location) && (
                    <p className="mt-1 text-sm text-red-500">Location is required</p>
                  )}
                </div>
                
                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <AIAssistPopover examples={dateExamples}>
                        <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                          <Sparkles size={14} className="mr-1" />
                          Tips
                        </button>
                      </AIAssistPopover>
                    </div>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateCVData('experience', 'startDate', e.target.value, index)}
                      onFocus={() => handleFocus('startDate', index)}
                      className={`w-full px-3 py-2 rounded-md border ${
                        hasError('startDate', index, exp.startDate)
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
                      required
                    />
                    {hasError('startDate', index, exp.startDate) && (
                      <p className="mt-1 text-sm text-red-500">Required</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateCVData('experience', 'endDate', e.target.value, index)}
                      onFocus={() => handleFocus('endDate', index)}
                      className={`w-full px-3 py-2 rounded-md border ${
                        hasError('endDate', index, exp.endDate)
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
                      required
                    />
                    {hasError('endDate', index, exp.endDate) && (
                      <p className="mt-1 text-sm text-red-500">Required</p>
                    )}
                  </div>
                </div>
                
                {/* Description */}
                <div className="md:col-span-2">
                  <div className="flex justify-between items-start mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <AIAssistPopover 
                      examples={descriptionExamples}
                      title="AI Bullet Point Suggestions"
                    >
                      <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                        <Sparkles size={14} className="mr-1" />
                        Generate Professional Bullet Points
                      </button>
                    </AIAssistPopover>
                  </div>
                  <TextareaAutosize
                    value={exp.description}
                    onChange={(e) => updateCVData('experience', 'description', e.target.value, index)}
                    onFocus={() => handleFocus('description', index)}
                    className={`w-full px-3 py-2 rounded-md border ${
                      hasError('description', index, exp.description)
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
                    minRows={4}
                    placeholder="• Led [specific project] resulting in [quantifiable outcome]&#13;&#10;• Managed team of [X] people to achieve [specific goal]&#13;&#10;• Implemented [specific solution] that improved [metric] by [X]%"
                    required
                  />
                  {hasError('description', index, exp.description) && (
                    <p className="mt-1 text-sm text-red-500">Description is required</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Use bullet points starting with • to highlight your achievements and responsibilities
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={() => addItem('experience')}
            className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Plus className="w-5 h-5 mx-auto" />
            <span className="text-sm font-medium mt-1">Add Another Experience</span>
          </button>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <div className="flex">
          <AlertCircle className="text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
              Pro Tips for Work Experience
            </h3>
            <ul className="mt-2 text-sm text-indigo-700 dark:text-indigo-400 list-disc pl-5 space-y-1">
              <li>Start bullet points with strong action verbs like "Achieved," "Implemented," or "Led"</li>
              <li>Include measurable results and quantify your achievements whenever possible</li>
              <li>Tailor your experience to highlight skills relevant to your target position</li>
              <li>For recent graduates, include internships, relevant coursework, and projects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
