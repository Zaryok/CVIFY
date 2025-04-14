import { CVData } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { CVDocument } from './pdf-generator.tsx';
export { CVDocument };

// Define a simple version of PDFDocument for use in this file
// This breaks the circular dependency
const SimplePDFRenderer = ({ data }: { data: CVData }) => {
  return React.createElement('div', { className: 'pdf-container' },
    React.createElement('h1', { className: 'name' }, data.content.personal.fullName),
    React.createElement('div', { className: 'contact-container' },
      React.createElement('p', null, data.content.personal.email),
      React.createElement('p', null, data.content.personal.phone),
      React.createElement('p', null, data.content.personal.location)
    )
  );
};

/**
 * Generate a PDF document from the provided CV data
 * 
 * @param data CV data to be included in the PDF
 * @returns Blob of the generated PDF file
 */
export async function generatePDF(data: CVData): Promise<Blob> {
  try {
    // Create a temporary div to render the CV
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '794px'; // A4 width in pixels at 96 DPI
    tempDiv.style.height = 'auto';
    tempDiv.style.fontFamily = 'Times New Roman, Times, serif'; // Make sure font is loaded
    tempDiv.style.background = 'white';
    tempDiv.setAttribute('id', 'pdf-container');
    document.body.appendChild(tempDiv);

    // Load Times New Roman font to ensure it's available
    // Add Times New Roman font from Google Fonts equivalent (Tinos)
    const fontLoader = document.createElement('link');
    fontLoader.rel = 'stylesheet';
    fontLoader.href = 'https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap';
    document.head.appendChild(fontLoader);

    // Create and render the CV with a simple renderer
    const cvComponent = React.createElement(SimplePDFRenderer, { data });
    const cvHTML = ReactDOMServer.renderToString(cvComponent);
    tempDiv.innerHTML = cvHTML;

    // Add specific CSS to ensure exact matching with example CV
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
      @media print {
        @page { 
          size: A4;
          margin: 0; 
        }
        body { 
          margin: 0; 
          font-family: 'Times New Roman', Times, serif !important;
        }
      }
      .pdf-container {
        width: 794px;
        padding: 40px 60px;
        font-family: 'Times New Roman', Times, serif !important;
      }
      .name {
        letter-spacing: 2px;
        text-transform: uppercase;
      }
      .section-title {
        border-bottom: 1px solid #000;
        padding-bottom: 3px;
      }
      .bullet-point {
        margin-bottom: 6px;
      }
    `;
    document.head.appendChild(additionalStyles);

    // Wait for fonts and all resources to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Apply specific styles for PDF rendering
    const styleSheets = document.styleSheets;
    let cvStyles = '';
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const sheet = styleSheets[i];
        const rules = sheet.cssRules || sheet.rules;
        for (let j = 0; j < rules.length; j++) {
          cvStyles += rules[j].cssText;
        }
      } catch (e) {
        console.warn('Could not access stylesheet rules', e);
      }
    }

    // Add the styles to the temporary div
    const styleElement = document.createElement('style');
    styleElement.textContent = cvStyles;
    tempDiv.appendChild(styleElement);

    // Convert to PDF using html2canvas and jsPDF with improved settings
    const canvas = await html2canvas(tempDiv, {
      scale: 3, // Higher scale for better quality
      useCORS: true,
      logging: false,
      windowWidth: 794,
      width: 794,
      height: tempDiv.offsetHeight,
      backgroundColor: '#ffffff',
      allowTaint: true,
      imageTimeout: 5000,
    });

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgData = canvas.toDataURL('image/png', 1.0); // Higher quality
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    
    // Calculate image height to maintain aspect ratio
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add image to first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add new pages if needed for multi-page CVs
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Clean up
    document.body.removeChild(tempDiv);
    document.head.removeChild(fontLoader);
    document.head.removeChild(additionalStyles);
    
    // Return as blob
    const pdfBlob = pdf.output('blob');
    return pdfBlob;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}
