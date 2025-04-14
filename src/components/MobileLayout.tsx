import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronUp } from 'lucide-react';

interface MobileLayoutProps {
  editorContent: React.ReactNode;
  previewContent: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  editorContent, 
  previewContent 
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="md:hidden w-full h-full flex flex-col">
      <div className={`transition-all duration-300 ${
        activeTab === 'editor' 
          ? (isExpanded ? 'h-[85vh]' : 'h-[50vh]') 
          : 'h-0 overflow-hidden'
      }`}>
        {editorContent}
        
        {activeTab === 'editor' && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute bottom-16 right-4 z-50 bg-primary text-white rounded-full p-2 shadow-lg"
          >
            <ChevronUp className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
      
      <div className={`transition-all duration-300 ${
        activeTab === 'preview' 
          ? 'flex-1 overflow-auto' 
          : 'h-0 overflow-hidden'
      }`}>
        {previewContent}
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as 'editor' | 'preview')}
        className="sticky bottom-0 w-full bg-background border-t border-border z-50 p-2"
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MobileLayout; 