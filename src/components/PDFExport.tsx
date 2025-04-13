import React from 'react';
import { Download } from 'lucide-react';
import { CVData, Template } from '../types';
import { generatePDF } from '../lib/pdf-generator';

interface PDFExportProps {
  data: CVData;
  template: Template;
}

export function PDFExport({ data, template }: PDFExportProps) {
  const handleExport = async () => {
    try {
      const pdfBlob = await generatePDF(data);
      const url = URL.createObjectURL(pdfBlob);
      
      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.title || 'resume'}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to download resume. Please try again.');
    }
  };
  
  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      <Download size={18} />
      <span>Export PDF</span>
    </button>
  );
}
