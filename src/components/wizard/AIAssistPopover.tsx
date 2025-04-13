import React, { useState, ReactNode } from 'react';
import { X } from 'lucide-react';

interface AIAssistPopoverProps {
  children: ReactNode;
  examples: string[];
  title?: string;
}

export function AIAssistPopover({ 
  children, 
  examples, 
  title = "AI Suggestions" 
}: AIAssistPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)}>
        {children}
      </div>
      
      {isOpen && (
        <>
          {/* Backdrop to close the popover */}
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute z-40 right-0 mt-2 w-80 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="mt-3 space-y-2">
                {examples.map((example, index) => (
                  <div 
                    key={index}
                    className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md"
                  >
                    {example}
                  </div>
                ))}
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                  Click on a suggestion to use it as inspiration
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
