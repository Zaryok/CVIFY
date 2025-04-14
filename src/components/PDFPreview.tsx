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
    <div className="pdf-container">
      {/* Header with Name */}
      <div className="header">
        <h1 className="name">{data.content.personal.fullName}</h1>
      </div>
      
      {/* Contact Information */}
      <div className="contact-container">
        <div className="contact-row">
          {getContactIcon('location')}
          <span className="contact-text">{data.content.personal.location}</span>
          <span className="contact-bullet">•</span>
          {getContactIcon('phone')}
          <span className="contact-text">{data.content.personal.phone}</span>
        </div>
        
        <div className="contact-row">
          {getContactIcon('email')}
          <a 
            href={`mailto:${data.content.personal.email}`} 
            className="contact-text contact-link"
          >
            {data.content.personal.email}
          </a>
        </div>
        
        {data.content.personal.linkedin && (
          <div className="contact-row">
            {getContactIcon('linkedin')}
            <a 
              href={getFullURL(data.content.personal.linkedin, 'linkedin')} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-text contact-link"
            >
              {formatLinkedIn(data.content.personal.linkedin)}
            </a>
          </div>
        )}
        
        {data.content.personal.github && (
          <div className="contact-row">
            {getContactIcon('github')}
            <a 
              href={getFullURL(data.content.personal.github, 'github')} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-text contact-link"
            >
              {formatGitHub(data.content.personal.github)}
            </a>
          </div>
        )}
        
        {data.content.personal.portfolio && (
          <div className="contact-row">
            {getContactIcon('portfolio')}
            <a 
              href={getFullURL(data.content.personal.portfolio, 'portfolio')} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-text contact-link"
            >
              {data.content.personal.portfolio && data.content.personal.portfolio !== "Portfolio" 
                ? formatPortfolio(data.content.personal.portfolio)
                : "Portfolio"}
            </a>
          </div>
        )}
      </div>

      {/* Objective */}
      {getObjectiveText() && (
        <div className="section">
          <h2 className="section-title">Objective</h2>
          <p className="objective">{getObjectiveText()}</p>
        </div>
      )}

      {/* Education */}
      {data.content.education.some(edu => 
        edu.school.trim() || edu.degree.trim() || edu.field.trim() || edu.description.trim()
      ) && (
        <div className="section">
          <h2 className="section-title">Education</h2>
          {data.content.education
            .filter(edu => edu.school.trim() || edu.degree.trim() || edu.field.trim() || edu.description.trim())
            .map((edu, index) => (
              <div key={index} className="item">
                <h3 className="item-title">
                  {edu.degree}{edu.field ? `, ${edu.field}` : ''}{edu.school ? `, ${edu.school}` : ''}
                  {edu.endDate ? ` (${edu.endDate.includes('Expected') ? edu.endDate : 'Expected ' + edu.endDate})` : ''}
                </h3>
                {/* Education section description */}
                {edu.description.split('\n')[0]?.trim().startsWith('Branch:') && (
                  <p className="education-detail">{edu.description.split('\n')[0]}</p>
                )}
                {/* For other school entries, just show the branch as is */}
                {!edu.description.split('\n')[0]?.trim().startsWith('Branch:') && edu.description.split('\n')[0] && (
                  <p className="education-detail">Branch: {edu.description.split('\n')[0]}</p>
                )}
                
                {/* Display the rest of the description without forcing bullet points */}
                {edu.description.split('\n').slice(1).join('\n') && (
                  <div className="education-description">
                    {renderBulletPoints(edu.description.split('\n').slice(1).join('\n'))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Experience - Only show if there's valid content */}
      {hasValidExperience && (
        <div className="section">
          <h2 className="section-title">Professional Experience</h2>
          {data.content.experience
            .filter(exp => exp.company.trim() || exp.position.trim() || exp.description.trim())
            .map((exp, index) => (
              <div key={index} className="item">
                <h3 className="item-title">{exp.position}, {exp.company}</h3>
                <p className="item-dates">{exp.startDate} - {exp.endDate}</p>
                {renderBulletPoints(exp.description)}
              </div>
            ))}
        </div>
      )}

      {/* Skills */}
      {(data.content.skills.technical || data.content.skills.soft || data.content.skills.languages) && (
        <div className="section">
          <h2 className="section-title">Skills</h2>
          
          {data.content.skills.technical && (
            <div className="skills-item">
              <span className="skills-label">Languages:</span>
              <span className="skills-content">{data.content.skills.technical}</span>
            </div>
          )}
          
          {data.content.skills.soft && (
            <div className="skills-item">
              <span className="skills-label">Soft Skills:</span>
              <span className="skills-content">{data.content.skills.soft}</span>
            </div>
          )}
          
          {data.content.skills.languages && (
            <div className="skills-item">
              <span className="skills-label">Languages:</span>
              <span className="skills-content">{data.content.skills.languages}</span>
            </div>
          )}
        </div>
      )}

      {/* Projects and Other Custom Sections */}
      {data.content.customSections?.filter(
        section => !section.title.toLowerCase().includes('objective') && section.content.trim()
      ).map((section, index) => (
        <div key={index} className="section">
          <h2 className="section-title">{section.title}</h2>
          {section.title.toLowerCase().includes('project') ? (
            // For project sections, format with project title and description
            section.content.split('\n\n').map((project, pIndex) => {
              const lines = project.split('\n');
              const projectTitle = lines[0];
              const projectDesc = lines.slice(1).join('\n');
              
              return (
                <div key={pIndex} className="item">
                  <h3 className="project-title">{projectTitle}</h3>
                  {projectDesc.split('\n')[0] && (
                    <p className="project-description">
                      {projectDesc.split('\n')[0] || ''}
                    </p>
                  )}
                  {renderBulletPoints(projectDesc.split('\n').slice(1).join('\n'))}
                  {projectDesc.toLowerCase().includes('live demo') && (
                    <p className="link">Live Demo: LINK</p>
                  )}
                </div>
              );
            })
          ) : section.title.toLowerCase().includes('leadership') || 
             section.title.toLowerCase().includes('activities') || 
             section.title.toLowerCase().includes('volunteer') ? (
            // For leadership and activity sections
            section.content.split('\n\n').map((role, rIndex) => {
              const lines = role.split('\n');
              const roleTitle = lines[0];
              const roleDesc = lines.slice(1).join('\n');
              
              return (
                <div key={rIndex} className="item">
                  <h3 className="role-title">{roleTitle}</h3>
                  {renderBulletPoints(roleDesc)}
                </div>
              );
            })
          ) : (
            // For other sections, use bullet points
            renderBulletPoints(section.content)
          )}
        </div>
      ))}

      {/* Page Number */}
      <div className="page-number">1</div>
    </div>
  );
}