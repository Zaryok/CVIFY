import React, { useState, ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Save, Download, Loader2 } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFPreview } from '../PDFPreview';
import { CVData, Template } from '../../types';
import { WizardProgressBar } from './WizardProgressBar';

interface WizardLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled: boolean;
  isComplete: boolean;
  cvData: CVData;
  template: Template;
  onSave: () => Promise<void>;
  isSaving: boolean;
}

export function WizardLayout({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled,
  isComplete,
  cvData,
  template,
  onSave,
  isSaving
}: WizardLayoutProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <WizardProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {/* Content area */}
        <div className="p-6 min-h-[60vh]">
          {children}
        </div>
        
        {/* Action buttons */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between">
          <button
            onClick={onPrevious}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
              currentStep === 0 
                ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
            }`}
          >
            <ArrowLeft size={18} />
            <span>Previous</span>
          </button>
          
          <div className="flex space-x-3">
            {isComplete && (
              <>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-md"
                >
                  {showPreview ? 'Hide Preview' : 'Preview CV'}
                </button>
                
                <button
                  onClick={onSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded-md flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Save Draft</span>
                    </>
                  )}
                </button>
                
                <PDFDownloadLink
                  document={<PDFPreview data={cvData} template={template} />}
                  fileName={`${cvData.title.toLowerCase().replace(/\s+/g, '-')}.pdf`}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md flex items-center space-x-2"
                >
                  {({ loading }) => (
                    <>
                      {loading ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <Download size={18} />
                      )}
                      <span>Download CV</span>
                    </>
                  )}
                </PDFDownloadLink>
              </>
            )}
            
            {!isComplete && (
              <button
                onClick={onNext}
                disabled={isNextDisabled}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                  isNextDisabled
                    ? 'opacity-50 cursor-not-allowed bg-indigo-300 dark:bg-indigo-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white'
                }`}
              >
                <span>Next</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Preview area */}
      {showPreview && isComplete && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            CV Preview
          </h2>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <PDFPreview data={cvData} template={template} />
          </div>
        </div>
      )}
    </div>
  );
}
