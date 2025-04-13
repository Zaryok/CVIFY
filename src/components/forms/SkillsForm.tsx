import { ChangeEvent } from 'react';

// Define skills interface
interface Skills {
  technical: string;
  soft: string;
  languages: string;
}

interface SkillsFormProps {
  data: Skills;
  onUpdate: (data: Skills) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function SkillsForm({ data, onUpdate, onNext, onPrev }: SkillsFormProps) {
  const handleSkillChange = (field: keyof Skills, value: string) => {
    onUpdate({
      ...data,
      [field]: value
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Skills</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Highlight your most relevant skills to stand out to employers.</p>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="technical" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Technical Skills *
          </label>
          <textarea
            id="technical"
            value={data.technical}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleSkillChange('technical', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
            placeholder="List your technical skills (e.g., Programming Languages, Frameworks, Tools)"
            required
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Separate skills with commas or list them on new lines.
          </p>
        </div>
        
        <div>
          <label htmlFor="soft" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Soft Skills *
          </label>
          <textarea
            id="soft"
            value={data.soft}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleSkillChange('soft', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
            placeholder="List your interpersonal skills (e.g., Communication, Leadership, Problem-solving)"
            required
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Include skills that showcase your ability to work with others effectively.
          </p>
        </div>
        
        <div>
          <label htmlFor="languages" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Languages (optional)
          </label>
          <textarea
            id="languages"
            value={data.languages}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleSkillChange('languages', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black dark:text-white"
            placeholder="List languages you speak and your proficiency level"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Example: English (Native), Spanish (Intermediate), French (Basic)
          </p>
        </div>
      </div>
      
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
          Next: Custom Sections
        </button>
      </div>
    </div>
  );
}
