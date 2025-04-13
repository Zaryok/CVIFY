import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Template } from '../../types';

interface TemplateSelectionProps {
  onSelect: (template: Template) => void;
}

// Mock templates data - in a real app, this would come from an API or database
const mockTemplates: Template[] = [
  {
    id: 'template-professional-1',
    name: 'Executive',
    description: 'A clean, professional template ideal for corporate roles and leadership positions.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&h=500&fit=crop',
    previewUrl: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&h=500&fit=crop',
    popular: true,
    category: 'Professional',
    features: ['ATS-Friendly', 'Clean Layout', 'Professional'],
    customization: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true,
    },
  },
  {
    id: 'template-creative-1',
    name: 'Artisan',
    description: 'A creative template with a unique layout, perfect for design and artistic roles.',
    imageUrl: 'https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?w=400&h=500&fit=crop',
    previewUrl: 'https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?w=400&h=500&fit=crop',
    category: 'Creative',
    features: ['Eye-catching', 'Creative Layout', 'Portfolio Focus'],
    customization: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true,
    },
  },
  {
    id: 'template-modern-1',
    name: 'Innovator',
    description: 'A modern, sleek template for tech professionals and forward-thinking roles.',
    imageUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=500&fit=crop',
    previewUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=500&fit=crop',
    category: 'Modern',
    features: ['ATS-Friendly', 'Modern Design', 'Technical Focus'],
    customization: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true,
    },
  },
  {
    id: 'template-professional-2',
    name: 'Diplomat',
    description: 'An elegant template suitable for academic, legal, or consulting professionals.',
    imageUrl: 'https://images.unsplash.com/photo-1616531770192-6eaea74c2456?w=400&h=500&fit=crop',
    previewUrl: 'https://images.unsplash.com/photo-1616531770192-6eaea74c2456?w=400&h=500&fit=crop',
    category: 'Professional',
    features: ['ATS-Friendly', 'Traditional', 'Structured'],
    customization: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true,
    },
  },
];

export function TemplateSelection({ onSelect }: TemplateSelectionProps) {
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template.id);
    onSelect(template);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Choose a Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTemplates.map((template) => (
          <div
            key={template.id}
            className={`cursor-pointer group border rounded-lg overflow-hidden ${
              selectedTemplate === template.id
                ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/30 dark:ring-blue-400/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
            onClick={() => handleSelectTemplate(template)}
          >
            <div className="relative">
              <img
                src={template.imageUrl}
                alt={template.name}
                className="w-full h-52 object-cover"
              />
              {template.popular && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Popular
                </div>
              )}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-blue-500 dark:bg-blue-600 text-white rounded-full p-1">
                  <CheckCircle size={16} />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">{template.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{template.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
