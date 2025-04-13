import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { CVData } from '../../../types';
import { AIAssistPopover } from '../AIAssistPopover';

interface SkillsStepProps {
  cvData: CVData;
  updateCVData: (field: string, subfield: string, value: string) => void;
}

// Common technical skills by category for suggestions
const technicalSkillsCategories = {
  programming: ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'TypeScript', 'Rust'],
  webDev: ['React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind CSS'],
  database: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis', 'Oracle', 'SQLite', 'NoSQL', 'GraphQL'],
  cloud: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'CloudFormation', 'Serverless'],
  tools: ['Git', 'GitHub', 'GitLab', 'Jira', 'Confluence', 'Jenkins', 'CircleCI', 'Travis CI', 'Webpack', 'Babel'],
  design: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro', 'After Effects'],
  analytics: ['Excel', 'Tableau', 'Power BI', 'Google Analytics', 'R', 'SPSS', 'SAS', 'Pandas', 'NumPy', 'TensorFlow']
};

// Common soft skills for suggestions
const softSkillSuggestions = [
  'Communication', 'Teamwork', 'Problem-solving', 'Critical thinking', 
  'Adaptability', 'Time management', 'Leadership', 'Organization',
  'Creativity', 'Attention to detail', 'Conflict resolution', 'Decision making',
  'Emotional intelligence', 'Negotiation', 'Project management', 'Strategic planning',
  'Customer service', 'Active listening', 'Presentation skills', 'Empathy'
];

// Common languages for suggestions
const languageSuggestions = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 
  'Russian', 'Arabic', 'Portuguese', 'Italian', 'Hindi', 'Korean',
  'Dutch', 'Swedish', 'Norwegian', 'Finnish', 'Danish', 'Polish',
  'Turkish', 'Greek', 'Hebrew', 'Thai', 'Vietnamese'
];

// Language proficiency levels
const proficiencyLevels = [
  'Native', 'Fluent', 'Professional', 'Advanced', 'Intermediate', 'Basic', 'Elementary'
];

export function SkillsStep({ cvData, updateCVData }: SkillsStepProps) {
  // Track focus state to provide suggestions
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // AI suggestions examples
  const technicalSkillsExamples = [
    'Group skills by category: "Programming: JavaScript, Python, Java"',
    'List most important/relevant skills first',
    'Include skill level if appropriate: "React (Expert), Angular (Intermediate)"',
    'Focus on skills requested in job descriptions for your target roles',
    'Include both technical tools and methodologies (e.g., Agile, TDD)'
  ];
  
  const softSkillsExamples = [
    'Include soft skills that you can demonstrate with examples from your experience',
    'Focus on skills most relevant to your target role and industry',
    'Consider including interpersonal skills valued in your field',
    'Be specific rather than using generic terms where possible',
    'Align with soft skills mentioned in job descriptions for roles you're targeting'
  ];
  
  const languageExamples = [
    'Include proficiency level: "English (Native), Spanish (Fluent), French (Intermediate)"',
    'Only include languages where you have meaningful proficiency',
    'For technical roles, programming languages go in Technical Skills, not here',
    'Be honest about your level of proficiency',
    'Consider including certifications if you have them (e.g., TOEFL, DELF)'
  ];

  // Generate suggestions based on input text and category
  const generateSuggestions = (input: string, category: 'technical' | 'soft' | 'languages') => {
    const inputLower = input.toLowerCase();
    
    if (category === 'technical') {
      // Flatten all technical skills categories into one array and filter
      const allTechnicalSkills = Object.values(technicalSkillsCategories).flat();
      return allTechnicalSkills.filter(skill => 
        skill.toLowerCase().includes(inputLower) && !input.includes(skill)
      ).slice(0, 5);
    } 
    else if (category === 'soft') {
      return softSkillSuggestions.filter(skill => 
        skill.toLowerCase().includes(inputLower) && !input.includes(skill)
      ).slice(0, 5);
    } 
    else if (category === 'languages') {
      // Suggest both languages and proficiency levels
      const languageMatches = languageSuggestions.filter(lang => 
        lang.toLowerCase().includes(inputLower) && !input.includes(lang)
      );
      
      const proficiencyMatches = proficiencyLevels.filter(level => 
        level.toLowerCase().includes(inputLower) && !input.includes(level)
      );
      
      return [...languageMatches, ...proficiencyMatches].slice(0, 5);
    }
    
    return [];
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skills & Languages</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Highlight your technical skills, soft skills, and language proficiencies
        </p>
      </div>

      {/* Technical Skills */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Technical Skills</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              List your professional and technical capabilities
            </p>
          </div>
          <AIAssistPopover examples={technicalSkillsExamples}>
            <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
              <Sparkles size={14} className="mr-1" />
              AI Suggestions
            </button>
          </AIAssistPopover>
        </div>
        
        <div className="mt-3">
          <TextareaAutosize
            value={cvData.content.skills.technical}
            onChange={(e) => updateCVData('skills', 'technical', e.target.value)}
            onFocus={() => setFocusedField('technical')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
            minRows={4}
            placeholder="Programming Languages: JavaScript, Python, Java&#13;&#10;Frameworks & Libraries: React, Node.js, Express&#13;&#10;Tools & Platforms: Git, AWS, Docker&#13;&#10;Database: SQL, MongoDB, PostgreSQL"
          />
        </div>
        
        {/* Show skill category suggestions when field is focused */}
        {focusedField === 'technical' && (
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.keys(technicalSkillsCategories).map((category) => (
              <div key={category} className="relative group">
                <button
                  type="button"
                  className="px-3 py-1 text-xs rounded-md bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                  onClick={() => {
                    const updatedValue = cvData.content.skills.technical 
                      ? `${cvData.content.skills.technical}\n${category.charAt(0).toUpperCase() + category.slice(1)}: `
                      : `${category.charAt(0).toUpperCase() + category.slice(1)}: `;
                    updateCVData('skills', 'technical', updatedValue);
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
                {/* Tooltip with skills in this category */}
                <div className="hidden group-hover:block absolute z-10 bg-white dark:bg-gray-800 shadow-md rounded-md p-2 w-48 text-xs mt-1 border border-gray-200 dark:border-gray-700 left-0">
                  <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Examples:</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {technicalSkillsCategories[category as keyof typeof technicalSkillsCategories].slice(0, 5).join(', ')}
                    {technicalSkillsCategories[category as keyof typeof technicalSkillsCategories].length > 5 && '...'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Show auto-complete suggestions based on input */}
        {focusedField === 'technical' && cvData.content.skills.technical && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              {generateSuggestions(cvData.content.skills.technical, 'technical').map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300"
                  onClick={() => {
                    const updatedValue = cvData.content.skills.technical.endsWith(', ') || cvData.content.skills.technical.endsWith(',')
                      ? `${cvData.content.skills.technical.trim()} ${suggestion}, `
                      : `${cvData.content.skills.technical}, ${suggestion}`;
                    updateCVData('skills', 'technical', updatedValue);
                  }}
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Soft Skills */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Soft Skills</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Highlight your interpersonal and transferable skills
            </p>
          </div>
          <AIAssistPopover examples={softSkillsExamples}>
            <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
              <Sparkles size={14} className="mr-1" />
              AI Suggestions
            </button>
          </AIAssistPopover>
        </div>
        
        <div className="mt-3">
          <TextareaAutosize
            value={cvData.content.skills.soft}
            onChange={(e) => updateCVData('skills', 'soft', e.target.value)}
            onFocus={() => setFocusedField('soft')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
            minRows={3}
            placeholder="• Leadership & Team Management&#13;&#10;• Problem Solving & Critical Thinking&#13;&#10;• Communication & Collaboration"
          />
        </div>
        
        {/* Show auto-complete suggestions for soft skills */}
        {focusedField === 'soft' && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              {generateSuggestions(cvData.content.skills.soft, 'soft').map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300"
                  onClick={() => {
                    const prefix = cvData.content.skills.soft.trim().length > 0 && !cvData.content.skills.soft.endsWith('\n') ? '\n' : '';
                    const updatedValue = `${cvData.content.skills.soft}${prefix}• ${suggestion}`;
                    updateCVData('skills', 'soft', updatedValue);
                  }}
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Languages */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Languages</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              List languages you speak and your proficiency level
            </p>
          </div>
          <AIAssistPopover examples={languageExamples}>
            <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
              <Sparkles size={14} className="mr-1" />
              AI Suggestions
            </button>
          </AIAssistPopover>
        </div>
        
        <div className="mt-3">
          <TextareaAutosize
            value={cvData.content.skills.languages}
            onChange={(e) => updateCVData('skills', 'languages', e.target.value)}
            onFocus={() => setFocusedField('languages')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
            minRows={2}
            placeholder="English (Native), Spanish (Fluent), French (Intermediate)"
          />
        </div>
        
        {/* Show language and proficiency suggestions */}
        {focusedField === 'languages' && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              {generateSuggestions(cvData.content.skills.languages, 'languages').map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300"
                  onClick={() => {
                    const isLanguage = languageSuggestions.includes(suggestion);
                    const isProficiency = proficiencyLevels.includes(suggestion);
                    const currentText = cvData.content.skills.languages;
                    
                    let updatedValue = currentText;
                    if (isLanguage) {
                      // Add language with open parenthesis for proficiency
                      updatedValue = currentText.trim().length > 0 
                        ? `${currentText}, ${suggestion} (` 
                        : `${suggestion} (`;
                    } else if (isProficiency && currentText.includes('(')) {
                      // Complete the proficiency level with closing parenthesis
                      updatedValue = currentText.endsWith('(') 
                        ? `${currentText}${suggestion})` 
                        : currentText;
                    }
                    
                    updateCVData('skills', 'languages', updatedValue);
                  }}
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <div className="flex">
          <AlertCircle className="text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
              Pro Tips for Skills Section
            </h3>
            <ul className="mt-2 text-sm text-indigo-700 dark:text-indigo-400 list-disc pl-5 space-y-1">
              <li>Tailor your skills to match the job description for better results</li>
              <li>Only include skills you can confidently demonstrate</li>
              <li>Consider organizing technical skills by category for better readability</li>
              <li>Be specific (e.g., "Advanced data visualization with Tableau" instead of just "Tableau")</li>
              <li>For languages, include proficiency level (Native, Fluent, Intermediate, Basic)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
