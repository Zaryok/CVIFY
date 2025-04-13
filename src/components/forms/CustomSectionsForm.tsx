import { ChangeEvent } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

// Define custom section interface
interface CustomSection {
  id: string;
  title: string;
  content: string;
}

interface CustomSectionsFormProps {
  data: CustomSection[];
  onUpdate: (data: CustomSection[]) => void;
  onSave: () => void;
  onPrev: () => void;
}

export function CustomSectionsForm({ data, onUpdate, onSave, onPrev }: CustomSectionsFormProps) {
  const handleAddCustomSection = () => {
    onUpdate([
      ...data,
      {
        id: `custom-${Date.now()}`,
        title: '',
        content: ''
      }
    ]);
  };
  
  const handleRemoveCustomSection = (index: number) => {
    onUpdate(data.filter((_, i) => i !== index));
  };
  
  const handleChangeCustomSection = (index: number, field: keyof Omit<CustomSection, 'id'>, value: string) => {
    const updatedCustomSections = [...data];
    updatedCustomSections[index] = {
      ...updatedCustomSections[index],
      [field]: value
    };
    onUpdate(updatedCustomSections);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Custom Sections</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Add any additional sections that you'd like to include in your resume, such as Projects, Certifications, or Publications.
      </p>
      
      {data.length === 0 && (
        <div className="text-center py-8 mb-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            No custom sections added yet. Click below to add one.
          </p>
        </div>
      )}
      
      {data.map((section, index) => (
        <div key={section.id} className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Section #{index + 1}
            </h3>
            <button 
              type="button" 
              onClick={() => handleRemoveCustomSection(index)}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Section Title *
              </label>
              <input
                type="text"
                id={`title-${index}`}
                value={section.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeCustomSection(index, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
                placeholder="e.g., Projects, Certifications, Publications"
                required
              />
            </div>
            
            <div>
              <label htmlFor={`content-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content *
              </label>
              <textarea
                id={`content-${index}`}
                value={section.content}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeCustomSection(index, 'content', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
                placeholder="Describe your projects, certifications, or other relevant information"
                required
              />
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={handleAddCustomSection}
        className="mt-2 mb-6 flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <PlusCircle size={16} className="mr-1" />
        <span>Add another section</span>
      </button>
      
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Save Resume
        </button>
      </div>
    </div>
  );
}
