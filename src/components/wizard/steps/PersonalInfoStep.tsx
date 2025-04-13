import React, { useState } from 'react';
import { Sparkles, Info } from 'lucide-react';
import { CVData } from '../../../types';
import { AIAssistPopover } from '../AIAssistPopover';

interface PersonalInfoStepProps {
  cvData: CVData;
  updateCVData: (field: string, subfield: string, value: string) => void;
}

export function PersonalInfoStep({ cvData, updateCVData }: PersonalInfoStepProps) {
  // Field completion tracking for validation
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
  
  const handleFocus = (field: string) => {
    setFocusedFields(prev => ({ ...prev, [field]: true }));
  };
  
  // Helper function to track if a required field has been touched but is empty
  const hasError = (field: string, value: string) => {
    return focusedFields[field] && !value.trim();
  };

  // Example suggestions for the AI assist feature
  const nameExamples = [
    'Use your full legal name for professional consistency',
    'Consider if you want to use any middle names or initials'
  ];
  
  const emailExamples = [
    'Use a professional email address (avoid nicknames)',
    'Gmail or a personal domain is typically best for job applications',
    'Ensure your email is current and regularly checked'
  ];
  
  const phoneExamples = [
    'Include country code for international applications',
    'Format consistently (e.g., +1 555-123-4567)',
    'Use a number where you can be reached during business hours'
  ];
  
  const locationExamples = [
    'City, State/Province, Country is usually sufficient',
    'Consider including postal code for local positions',
    'If relocating, you can note "Relocating to [Location] in [Timeframe]"'
  ];

  const linkedinExamples = [
    'Use the format: linkedin.com/in/your-profile-name',
    'Ensure your LinkedIn profile is complete and up-to-date',
    'Match your LinkedIn information to your CV for consistency'
  ];

  const portfolioExamples = [
    'Include your personal website or professional portfolio',
    'Ensure the link leads directly to your work samples',
    'Use a custom domain if possible for a professional appearance'
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Information</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Let's start with your basic details
        </p>
      </div>

      <div className="space-y-6">
        {/* Full Name */}
        <div className="relative">
          <div className="flex justify-between items-start mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name <span className="text-red-500">*</span>
            </label>
            <AIAssistPopover examples={nameExamples}>
              <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                <Sparkles size={14} className="mr-1" />
                AI Tips
              </button>
            </AIAssistPopover>
          </div>
          <input
            type="text"
            value={cvData.content.personal.fullName}
            onChange={(e) => updateCVData('personal', 'fullName', e.target.value)}
            onFocus={() => handleFocus('fullName')}
            className={`w-full px-3 py-2 rounded-md border ${
              hasError('fullName', cvData.content.personal.fullName)
                ? 'border-red-500 dark:border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
            placeholder="e.g., John Smith"
            required
          />
          {hasError('fullName', cvData.content.personal.fullName) && (
            <p className="mt-1 text-sm text-red-500">Full name is required</p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <div className="flex justify-between items-start mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address <span className="text-red-500">*</span>
            </label>
            <AIAssistPopover examples={emailExamples}>
              <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                <Sparkles size={14} className="mr-1" />
                AI Tips
              </button>
            </AIAssistPopover>
          </div>
          <input
            type="email"
            value={cvData.content.personal.email}
            onChange={(e) => updateCVData('personal', 'email', e.target.value)}
            onFocus={() => handleFocus('email')}
            className={`w-full px-3 py-2 rounded-md border ${
              hasError('email', cvData.content.personal.email)
                ? 'border-red-500 dark:border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
            placeholder="e.g., john.smith@example.com"
            required
          />
          {hasError('email', cvData.content.personal.email) && (
            <p className="mt-1 text-sm text-red-500">Email is required</p>
          )}
        </div>

        {/* Phone */}
        <div className="relative">
          <div className="flex justify-between items-start mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <AIAssistPopover examples={phoneExamples}>
              <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                <Sparkles size={14} className="mr-1" />
                AI Tips
              </button>
            </AIAssistPopover>
          </div>
          <input
            type="tel"
            value={cvData.content.personal.phone}
            onChange={(e) => updateCVData('personal', 'phone', e.target.value)}
            onFocus={() => handleFocus('phone')}
            className={`w-full px-3 py-2 rounded-md border ${
              hasError('phone', cvData.content.personal.phone)
                ? 'border-red-500 dark:border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
            placeholder="e.g., +1 (555) 123-4567"
            required
          />
          {hasError('phone', cvData.content.personal.phone) && (
            <p className="mt-1 text-sm text-red-500">Phone number is required</p>
          )}
        </div>

        {/* Location */}
        <div className="relative">
          <div className="flex justify-between items-start mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Location <span className="text-red-500">*</span>
            </label>
            <AIAssistPopover examples={locationExamples}>
              <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                <Sparkles size={14} className="mr-1" />
                AI Tips
              </button>
            </AIAssistPopover>
          </div>
          <input
            type="text"
            value={cvData.content.personal.location}
            onChange={(e) => updateCVData('personal', 'location', e.target.value)}
            onFocus={() => handleFocus('location')}
            className={`w-full px-3 py-2 rounded-md border ${
              hasError('location', cvData.content.personal.location)
                ? 'border-red-500 dark:border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent`}
            placeholder="e.g., New York, NY, USA"
            required
          />
          {hasError('location', cvData.content.personal.location) && (
            <p className="mt-1 text-sm text-red-500">Location is required</p>
          )}
        </div>

        {/* Optional LinkedIn */}
        <div className="relative">
          <div className="flex justify-between items-start mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              LinkedIn Profile
            </label>
            <AIAssistPopover examples={linkedinExamples}>
              <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                <Sparkles size={14} className="mr-1" />
                AI Tips
              </button>
            </AIAssistPopover>
          </div>
          <input
            type="url"
            value={cvData.content.personal.linkedin || ''}
            onChange={(e) => updateCVData('personal', 'linkedin', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
            placeholder="e.g., linkedin.com/in/johnsmith"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Optional, but recommended for professional networking
          </p>
        </div>

        {/* Optional Portfolio */}
        <div className="relative">
          <div className="flex justify-between items-start mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Portfolio or Personal Website
            </label>
            <AIAssistPopover examples={portfolioExamples}>
              <button className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center text-xs">
                <Sparkles size={14} className="mr-1" />
                AI Tips
              </button>
            </AIAssistPopover>
          </div>
          <input
            type="url"
            value={cvData.content.personal.portfolio || ''}
            onChange={(e) => updateCVData('personal', 'portfolio', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
            placeholder="e.g., johnsmith.com"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Especially valuable for creative and technical professionals
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <div className="flex">
          <Info size={20} className="text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
              Why this information matters
            </h3>
            <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-400">
              Your contact information is often the first thing recruiters look for. Make sure it's clear, professional, and up-to-date to ensure they can easily reach you about opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
