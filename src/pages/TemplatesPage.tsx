import React, { useState } from 'react';
import { ArrowRight, Star, ZoomIn, Download, Eye, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { templates } from '../lib/templates';

const categories = ['All', 'Professional', 'Creative', 'Modern'] as const;

export function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Professional CV Templates
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Choose from our collection of ATS-friendly templates
        </p>
      </div>

      <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-white dark:bg-gray-900 p-4">
              <img
                src={template.imageUrl}
                alt={template.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
              {template.popular && (
                <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Popular
                </div>
              )}
              <button
                onClick={() => setSelectedTemplate(template)}
                className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {template.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {template.description}
              </p>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to={`/build/${template.id}`}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Use Template
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <button
                  onClick={() => setSelectedTemplate(template)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedTemplate.name}
              </h3>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative bg-white dark:bg-gray-900 p-4 h-[calc(90vh-8rem)] overflow-hidden">
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={selectedTemplate.previewUrl}
                    alt={`${selectedTemplate.name} preview`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>
            <div className="p-4 border-t dark:border-gray-700 flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Click and drag to pan, use mouse wheel to zoom
              </div>
              <Link
                to={`/build/${selectedTemplate.id}`}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Use This Template
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}