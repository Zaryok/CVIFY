/** @jsxRuntime classic */
/** @jsx React.createElement */
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { CVDocument } from '../lib/pdf-generator';
import { CVData } from '../types';
import { pdf } from '@react-pdf/renderer';
import { Loader2 } from 'lucide-react';
import './PDFPreview.css';
import { MapPin, Phone, Mail, Linkedin, Github, Globe } from 'lucide-react';

// Initialize pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFPreviewProps {
  data: CVData;
  template?: any;
}

export function PDFPreview({ data, template }: PDFPreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Responsive scaling for mobile devices
    const handleResize = () => {
      const containerWidth = document.querySelector('.preview-container')?.clientWidth || 0;
      setWidth(containerWidth);
      
      // Adjust scale based on screen width
      if (containerWidth < 500) {
        setScale(containerWidth / 830); // A4 paper width is ~830px at 100% scale
      } else {
        setScale(1);
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial call
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const generatePDF = async () => {
      try {
        setLoading(true);
        const doc = <CVDocument cvData={data} />;
        
        // More robust error handling for PDF generation
        let pdfBlob: Blob;
        try {
          pdfBlob = await pdf(doc).toBlob();
        } catch (pdfError) {
          console.error('PDF generation error:', pdfError);
          setLoading(false);
          return;
        }
        
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);
        setLoading(false);
      } catch (error) {
        console.error('Error generating PDF:', error);
        setLoading(false);
      }
    };

    if (data) {
      generatePDF();
    }

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [data, pdfUrl]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Generating PDF preview...</p>
      </div>
    );
  }

  return (
    <div className="pdf-preview flex flex-col items-center">
      {pdfUrl ? (
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error('Error loading PDF:', error)}
          className="pdf-document"
          loading={
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading PDF...</p>
            </div>
          }
        >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <div key={`page_${index + 1}`} className="pdf-page-container mb-4">
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="pdf-page shadow-lg"
                loading={
                  <div className="flex items-center justify-center h-[1100px] w-full">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                  </div>
                }
              />
            </div>
          ))}
        </Document>
      ) : (
        <div className="text-center p-6">
          <p className="text-gray-600 dark:text-gray-300">Unable to generate PDF preview.</p>
        </div>
      )}
    </div>
  );
}