import React from 'react';
import { CheckCircle } from 'lucide-react';

export interface StepItem {
  id: string;
  label: string;
}

export interface StepIndicatorProps {
  currentStep: string;
  steps: StepItem[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isCompleted
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : isCurrent
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle size={16} />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs ${
                    isCurrent
                      ? 'font-medium text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    index < currentStepIndex
                      ? 'bg-green-500 dark:bg-green-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
