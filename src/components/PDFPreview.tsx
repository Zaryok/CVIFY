/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from 'react';
import { CVData } from '../types';
import './PDFPreview.css';
import { MapPin, Phone, Mail, Linkedin, Github, Globe } from 'lucide-react';

interface PDFPreviewProps {
  data: CVData;
}

export function PDFPreview({ data }: PDFPreviewProps) {
  // Get objective text from custom sections
  const getObjectiveText = (): string => {
    const objectiveSection = data.content.customSections?.find(section => 
      section.title.toLowerCase().includes('objective'));
    return objectiveSection?.content || '';
  };

  // Format LinkedIn URL
  const formatLinkedIn = (url: string): string => {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'linkedin.com/in/');
  };

  // Format GitHub URL
  const formatGitHub = (url: string): string => {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?github\.com\//, 'github.com/');
  };

  // Format Portfolio URL
  const formatPortfolio = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url.replace(/^https?:\/\/(www\.)?/, '');
    }
    return url;
  };
  
  // Get full URL with protocol for linking
  const getFullURL = (url: string, type: string): string => {
    if (!url) return '#';
    
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    switch (type) {
      case 'linkedin':
        return `https://linkedin.com/in/${url.replace('linkedin.com/in/', '')}`;
      case 'github':
        return `https://github.com/${url.replace('github.com/', '')}`;
      case 'portfolio':
        return `https://${url}`;
      case 'email':
        return `mailto:${url}`;
      default:
        return `https://${url}`;
    }
  };

  // Check if the experience section has any valid entries
  const hasValidExperience = data.content.experience.some(
    exp => exp.company.trim() || exp.position.trim() || exp.description.trim()
  );

  // Helper function to render bullet points
  const renderBulletPoints = (description: string) => {
    if (!description) return null;
    
    const lines = description.split('\n').filter(line => line.trim());
    
    // Check if any line starts with a bullet marker
    const hasBullets = lines.some(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'));
    
    // If the text does not already have bullet points, return it as a paragraph
    if (!hasBullets) {
      return <p className="bullet-content">{description}</p>;
    }
    
    // Otherwise, render with bullet points
    return lines.map((line, i) => (
      <div key={i} className="bullet-point">
        <span className="bullet">•</span>
        <span className="bullet-content">{line.trim().replace(/^[•\*\-]\s*/, '')}</span>
      </div>
    ));
  };

  // Return appropriate contact icon component
  const getContactIcon = (type: string) => {
    switch (type) {
      case 'location':
        return <MapPin size={16} className="contact-icon-svg" />;
      case 'phone':
        return <Phone size={16} className="contact-icon-svg" />;
      case 'email':
        return <Mail size={16} className="contact-icon-svg" />;
      case 'linkedin':
        return <Linkedin size={16} className="contact-icon-svg" />;
      case 'github':
        return <Github size={16} className="contact-icon-svg" />;
      case 'portfolio':
        return <Globe size={16} className="contact-icon-svg" />;
      default:
        return <span className="bullet">•</span>;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-auto bg-white dark:bg-gray-900 p-4 sm:p-6">
        <div className="max-w-[800px] mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {data.content.personal.fullName}
                  </h1>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300">
                    {data.content.personal.email && (
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {data.content.personal.email}
                      </span>
                    )}
                    {data.content.personal.phone && (
                      <span className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {data.content.personal.phone}
                      </span>
                    )}
                    {data.content.personal.location && (
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {data.content.personal.location}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
                  {data.content.personal.linkedin && (
                    <a
                      href={data.content.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {data.content.personal.portfolio && (
                    <a
                      href={data.content.personal.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Objective */}
              {data.content.objective && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Objective
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {data.content.objective}
                  </p>
                </div>
              )}

              {/* Education */}
              {data.content.education.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Education
                  </h2>
                  <div className="space-y-4">
                    {data.content.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-indigo-500 pl-4">
                        <div className="flex flex-col sm:flex-row justify-between mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {edu.school}
                          </h3>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {edu.degree} in {edu.field}
                        </p>
                        {edu.description && (
                          <div className="mt-2 text-gray-600 dark:text-gray-400">
                            {renderBulletPoints(edu.description)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {data.content.experience.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Experience
                  </h2>
                  <div className="space-y-4">
                    {data.content.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-indigo-500 pl-4">
                        <div className="flex flex-col sm:flex-row justify-between mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {exp.company}
                          </h3>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {exp.position} | {exp.location}
                        </p>
                        {exp.description && (
                          <div className="mt-2 text-gray-600 dark:text-gray-400">
                            {renderBulletPoints(exp.description)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {(data.content.skills.technical || data.content.skills.soft || data.content.skills.languages) && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Skills
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.content.skills.technical && (
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          Technical Skills
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {data.content.skills.technical}
                        </p>
                      </div>
                    )}
                    {data.content.skills.soft && (
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          Soft Skills
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {data.content.skills.soft}
                        </p>
                      </div>
                    )}
                    {data.content.skills.languages && (
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          Languages
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {data.content.skills.languages}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Custom Sections */}
              {data.content.customSections?.map((section) => (
                <div key={section.id} className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <div className="text-gray-600 dark:text-gray-400">
                    {renderBulletPoints(section.content)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}