import { PlusCircle, Trash2 } from 'lucide-react';
import { ChangeEvent } from 'react';

// Define experience interface
interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ExperienceForm({ data, onUpdate, onNext, onPrev }: ExperienceFormProps) {
  const handleAddExperience = () => {
    onUpdate([
      ...data,
      {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    onUpdate(data.filter((_, i) => i !== index));
  };

  const handleChangeExperience = (index: number, field: keyof Experience, value: string) => {
    const updatedExperience = [...data];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    onUpdate(updatedExperience);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Work Experience</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">List your work experience, starting with the most recent.</p>
      
      {data.map((experience, index) => (
        <div key={index} className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Experience #{index + 1}
            </h3>
            {data.length > 1 && (
              <button 
                type="button" 
                onClick={() => handleRemoveExperience(index)}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company *
              </label>
              <input
                type="text"
                id={`company-${index}`}
                value={experience.company}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeExperience(index, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
                placeholder="Company name"
                required
              />
            </div>
            
            <div>
              <label htmlFor={`position-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Position *
              </label>
              <input
                type="text"
                id={`position-${index}`}
                value={experience.position}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeExperience(index, 'position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
                placeholder="Job title"
                required
              />
            </div>
            
            <div>
              <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location *
              </label>
              <input
                type="text"
                id={`location-${index}`}
                value={experience.location}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeExperience(index, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
                placeholder="City, State"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date *
                </label>
                <input
                  type="text"
                  id={`startDate-${index}`}
                  value={experience.startDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeExperience(index, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
                  placeholder="MM/YYYY"
                  required
                />
              </div>
              
              <div>
                <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date *
                </label>
                <input
                  type="text"
                  id={`endDate-${index}`}
                  value={experience.endDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeExperience(index, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
                  placeholder="MM/YYYY or Present"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              id={`description-${index}`}
              value={experience.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeExperience(index, 'description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
              placeholder="Describe your responsibilities and achievements"
              required
            />
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={handleAddExperience}
        className="mt-2 mb-6 flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <PlusCircle size={16} className="mr-1" />
        <span>Add another experience</span>
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
          onClick={onNext}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Next: Education
        </button>
      </div>
    </div>
  );
}
