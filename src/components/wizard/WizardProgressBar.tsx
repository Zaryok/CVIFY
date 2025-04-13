import React from 'react';
import { Check } from 'lucide-react';

interface WizardProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function WizardProgressBar({ currentStep, totalSteps }: WizardProgressBarProps) {
  const steps = [
    { name: 'Template', description: 'Choose your template' },
    { name: 'Personal', description: 'Basic information' },
    { name: 'Experience', description: 'Work history' },
    { name: 'Education', description: 'Academic background' },
    { name: 'Skills', description: 'Your capabilities' },
    { name: 'Finalize', description: 'Review and customize' },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.slice(0, totalSteps).map((step, index) => (
          <React.Fragment key={step.name}>
            <div className="flex flex-col items-center">
              <div 
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full 
                  ${index < currentStep 
                    ? 'bg-indigo-600 dark:bg-indigo-500' 
                    : index === currentStep 
                      ? 'bg-indigo-500 ring-4 ring-indigo-100 dark:ring-indigo-900' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }
                  transition-all duration-300
                `}
              >
                {index < currentStep ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <span className={`text-sm font-medium ${index === currentStep ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="mt-2 text-center">
                <div 
                  className={`text-sm font-medium ${
                    index <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step.name}
                </div>
                <div 
                  className={`text-xs ${
                    index <= currentStep ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {step.description}
                </div>
              </div>
            </div>
            
            {index < steps.slice(0, totalSteps).length - 1 && (
              <div 
                className={`
                  flex-1 h-0.5 mx-2
                  ${index < currentStep ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
