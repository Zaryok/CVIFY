import { PlusCircle, Trash2 } from 'lucide-react';
import { ChangeEvent } from 'react';

// Define education interface
interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function EducationForm({ data, onUpdate, onNext, onPrev }: EducationFormProps) {
  const handleAddEducation = () => {
    onUpdate([
      ...data,
      {
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    onUpdate(data.filter((_, i) => i !== index));
  };

  const handleChangeEducation = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...data];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    onUpdate(updatedEducation);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Education</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">List your educational background, starting with the most recent.</p>
      
      {data.map((education, index) => (
        <div key={index} className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Education #{index + 1}
            </h3>
            {data.length > 1 && (
              <button 
                type="button" 
                onClick={() => handleRemoveEducation(index)}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`school-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                School/University *
              </label>
              <input
                type="text"
                id={`school-${index}`}
                value={education.school}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEducation(index, 'school', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
                placeholder="University name"
                required
              />
            </div>
            
            <div>
              <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Degree *
              </label>
              <input
                type="text"
                id={`degree-${index}`}
                value={education.degree}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEducation(index, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
                placeholder="Bachelor's, Master's, etc."
                required
              />
            </div>
            
            <div>
              <label htmlFor={`field-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Field of Study *
              </label>
              <input
                type="text"
                id={`field-${index}`}
                value={education.field}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEducation(index, 'field', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
                placeholder="Computer Science, Engineering, etc."
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
                  value={education.startDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEducation(index, 'startDate', e.target.value)}
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
                  value={education.endDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEducation(index, 'endDate', e.target.value)}
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
              value={education.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeEducation(index, 'description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
              placeholder="Describe your academic achievements, relevant coursework, etc."
              required
            />
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={handleAddEducation}
        className="mt-2 mb-6 flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <PlusCircle size={16} className="mr-1" />
        <span>Add another education</span>
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
          Next: Skills
        </button>
      </div>
    </div>
  );
}
