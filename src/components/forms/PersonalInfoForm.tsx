import { ChangeEvent } from 'react';

// Define the personal info interface
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
  onNext: () => void;
  onPrev?: () => void;
}

export function PersonalInfoForm({ data, onUpdate, onNext, onPrev }: PersonalInfoFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({
      ...data,
      [name]: value,
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Personal Information</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
            placeholder="johndoe@example.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
            placeholder="(123) 456-7890"
            required
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={data.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
            placeholder="New York, NY"
            required
          />
        </div>
        
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            LinkedIn (optional)
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        
        <div>
          <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Portfolio Website (optional)
          </label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            value={data.portfolio || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
            placeholder="https://johndoe.com"
          />
        </div>
        
        <div>
          <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            GitHub (optional)
          </label>
          <input
            type="url"
            id="github"
            name="github"
            value={data.github || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Next: Experience
        </button>
      </div>
    </div>
  );
}
