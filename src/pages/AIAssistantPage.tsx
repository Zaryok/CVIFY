import React, { useState } from 'react';
import { Send, Bot, Loader2 } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { templates } from '../lib/templates';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const industryKeywords = {
  tech: ['web', 'software', 'developer', 'engineering', 'programmer', 'frontend', 'backend', 'fullstack', 'devops'],
  creative: ['designer', 'artist', 'creative', 'ui', 'ux', 'graphic', 'multimedia'],
  academic: ['research', 'professor', 'lecturer', 'academic', 'scientist', 'phd'],
  business: ['finance', 'marketing', 'sales', 'business', 'consulting', 'management'],
  medical: ['doctor', 'nurse', 'healthcare', 'medical', 'clinical'],
};

export function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your CV Assistant. How can I help you today?\n\n" +
        "I can help you with:\n" +
        "1. Finding the perfect CV template\n" +
        "2. Writing professional summaries\n" +
        "3. Formatting your experience\n" +
        "4. Optimizing for ATS systems\n\n" +
        "What would you like to work on?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getTemplateRecommendation = (industry: string) => {
    const matchingTemplates = templates.filter(t => {
      const categoryMatches = t.category.toLowerCase() === industry.toLowerCase();
      return categoryMatches;
    });

    if (matchingTemplates.length === 0) {
      return templates.filter(t => t.category === 'Professional');
    }

    return matchingTemplates;
  };

  const generateResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    // Direct template recommendations
    if (msg.includes('template') || msg.includes('format')) {
      let industry = 'professional';
      for (const [key, keywords] of Object.entries(industryKeywords)) {
        if (keywords.some(word => msg.includes(word))) {
          industry = key;
          break;
        }
      }

      const recommendedTemplates = getTemplateRecommendation(industry);
      const templateLinks = recommendedTemplates.map(template => (
        `[${template.name}](/build/${template.id})`
      )).join('\n');

      return `Here are the best templates for your ${industry} CV:\n\n${templateLinks}\n\n` +
             "Click any template to start building your CV immediately. Each template is:\n" +
             "✓ ATS-friendly\n" +
             "✓ Professional design\n" +
             "✓ Fully customizable\n\n" +
             "Would you like specific guidance on using any of these templates?";
    }

    // Experience formatting
    if (msg.includes('experience') || msg.includes('work history')) {
      return "Here's how to write compelling work experience:\n\n" +
             "1. Use this format:\n" +
             "   • Position - Company, Location\n" +
             "   • Dates (MM/YYYY - MM/YYYY)\n" +
             "   • 3-5 bullet points of achievements\n\n" +
             "2. Start each bullet with an action verb\n" +
             "3. Include metrics where possible\n\n" +
             "Example:\n" +
             "```\n" +
             "Senior Developer - Tech Corp, New York\n" +
             "01/2020 - Present\n" +
             "• Led development of new product feature, increasing user engagement by 45%\n" +
             "• Mentored 5 junior developers, improving team velocity by 30%\n" +
             "```\n\n" +
             "Ready to add your experience? [Start Building](/build/classic-pro)";
    }

    // Skills section
    if (msg.includes('skill')) {
      return "Here's how to present your skills effectively:\n\n" +
             "1. Technical Skills\n" +
             "   • List most relevant to job first\n" +
             "   • Include proficiency levels\n" +
             "   • Group by category\n\n" +
             "2. Soft Skills\n" +
             "   • Leadership\n" +
             "   • Communication\n" +
             "   • Problem-solving\n\n" +
             "Ready to add your skills? [Start Building](/build/modern-minimal)";
    }

    // Default response with clear call-to-action
    return "I can help you with:\n\n" +
           "1. [Choose a Template](/templates)\n" +
           "2. Format your experience\n" +
           "3. Optimize your skills section\n" +
           "4. Write professional summaries\n\n" +
           "What would you like to work on first?";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">CV Assistant</h1>
          </div>
        </div>

        <div className="h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-4 ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      a: ({node, ...props}) => {
                        const href = props.href || '';
                        return (
                          <span
                            onClick={() => navigate(href)}
                            className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                            {...props}
                          />
                        );
                      }
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
                  <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
            <div className="flex space-x-4">
              <TextareaAutosize
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about CV templates, formatting, or best practices..."
                className="flex-1 min-h-[44px] p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 resize-none"
                maxRows={4}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}