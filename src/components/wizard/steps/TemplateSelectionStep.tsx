import React from 'react';
import { Check } from 'lucide-react';
import { templates } from '../../../lib/templates';
import { Template } from '../../../types';

interface TemplateSelectionStepProps {
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
}

export function TemplateSelectionStep({ selectedTemplate, onSelectTemplate }: TemplateSelectionStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Your Template</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Select a professional template that best represents your style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div 
            key={template.id} 
            onClick={() => onSelectTemplate(template)}
            className={`
              relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all
              ${selectedTemplate.id === template.id 
                ? 'border-indigo-500 shadow-md' 
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
              }
            `}
          >
            {/* Template preview image */}
            <div className="aspect-[3/4] bg-white">
              <img 
                src={template.preview} 
                alt={template.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback for missing images
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/300x400?text=Template+Preview';
                }}
              />
            </div>
            
            {/* Template info */}
            <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">{template.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{template.description}</p>
            </div>
            
            {/* Selected checkmark */}
            {selectedTemplate.id === template.id && (
              <div className="absolute top-2 right-2 bg-indigo-500 text-white p-1 rounded-full">
                <Check size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Don't worry, you can change the template later if needed</p>
      </div>
    </div>
  );
}
